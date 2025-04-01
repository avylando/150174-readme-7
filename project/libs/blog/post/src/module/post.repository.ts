import {
  Post,
  PostgresRepository,
  PlainObject,
  PaginationResult,
  PostSortBy,
} from '@avylando-readme/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/blog-models';

import { PostFactory } from './post.factory';
import { BlogPostEntity } from './post.entity';
import { Prisma } from '@prisma/client';
import { PostQuery } from './post.query';

type RawData = Omit<Post, 'data' | 'tags'> & {
  data: PlainObject;
  tags: { name: string }[];
  _count?: {
    favorite: number;
  };
};

@Injectable()
class PostRepository extends PostgresRepository<BlogPostEntity> {
  constructor(entityFactory: PostFactory, client: PrismaClientService) {
    super(entityFactory, client);
  }

  public async save(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const { data, comments, tags, ...commonPostData } = entity.toPlainObject();
    const raw = await this.client.post.create({
      relationLoadStrategy: 'join',
      data: {
        ...commonPostData,
        data: {
          create: {
            [entity.kind]: {
              create: data,
            },
          },
        },
        tags: {
          connectOrCreate: tags?.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
      include: {
        data: {
          select: {
            [entity.kind]: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const post = this.extractPostData(raw as RawData);

    return this.createEntityFromDocument(post);
  }

  public async findById(id: string): Promise<BlogPostEntity> {
    const raw = await this.client.post.findUnique({
      relationLoadStrategy: 'join',
      where: {
        id,
      },

      include: {
        data: {
          select: {
            link: true,
            image: true,
            quote: true,
            text: true,
            video: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
        comments: true,
        _count: {
          select: {
            favorite: true,
          },
        },
      },
    });

    if (!raw) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const post = this.extractPostData(raw as RawData);
    return this.createEntityFromDocument(post);
  }

  public async update(entity: BlogPostEntity): Promise<BlogPostEntity> {
    const { data, tags, comments, ...commonPostData } = entity.toPlainObject();

    const updatedEntity = await this.client.post.update({
      where: {
        id: entity.id,
      },
      data: {
        ...commonPostData,
        data: {
          update: {
            [entity.kind]: {
              update: data,
            },
          },
        },
        tags: {
          connectOrCreate: tags?.map((tag) => ({
            where: {
              name: tag,
            },
            create: {
              name: tag,
            },
          })),
        },
      },
      include: {
        data: {
          select: {
            [entity.kind]: true,
          },
        },
        tags: {
          select: {
            name: true,
          },
        },
      },
    });

    const post = this.extractPostData(updatedEntity as RawData);
    return this.createEntityFromDocument(post);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.post.delete({
      where: {
        id,
      },
    });
  }

  public async findMany(
    query: PostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    const { limit, page } = query;

    const options = this.getQueryOptions(query);

    const [posts, totalItems] = await Promise.all([
      this.client.post.findMany({
        ...options,
        include: {
          data: {
            select: {
              link: true,
              image: true,
              quote: true,
              text: true,
              video: true,
            },
          },
          tags: {
            select: {
              name: true,
            },
          },
          comments: true,
          _count: {
            select: {
              favorite: true,
            },
          },
        },
      }),
      this.getPostCount(options.where as Prisma.PostWhereInput),
    ]);

    return {
      entities: posts.map((post) =>
        this.createEntityFromDocument(this.extractPostData(post as RawData))
      ),
      totalItems,
      totalPages: this.calculatePostsPage(totalItems, limit),
      currentPage: page,
      itemsPerPage: limit,
    };
  }

  private extractPostData(rawData: RawData): Post {
    const { data: relatedData, tags, _count, ...rest } = rawData;
    const kindData = relatedData[rest.kind] as Post['data'];
    return {
      ...rest,
      data: kindData,
      tags: tags.map((el) => el.name),
      likesCount: _count?.favorite,
    } as Post;
  }

  private async getPostCount(where: Prisma.PostWhereInput): Promise<number> {
    return this.client.post.count({ where });
  }

  private calculatePostsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  private getQueryOptions(query: PostQuery): Prisma.PostFindManyArgs {
    const { limit, page, sortDirection, sortBy, tags, authorId } = query;

    const where: Prisma.PostWhereInput = {
      status: 'published',
    };

    const orderBy: Prisma.PostOrderByWithRelationInput = {};

    if (sortBy === PostSortBy.CreatedAt) {
      orderBy.createdAt = sortDirection;
    } else if (sortBy === PostSortBy.CommentsCount) {
      orderBy.comments = {
        _count: sortDirection,
      };
    } else if (sortBy === PostSortBy.LikesCount) {
      orderBy.favorite = {
        _count: sortDirection,
      };
    }

    if (tags) {
      where.tags = {
        some: {
          name: {
            in: tags,
          },
        },
      };
    }

    if (authorId) {
      where.authorId = authorId;
    }

    return {
      take: limit,
      skip: (page - 1) * limit,
      where,
      orderBy,
    };
  }
}

export { PostRepository };
