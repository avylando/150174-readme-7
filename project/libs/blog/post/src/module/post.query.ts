import { SortDirection, Tag } from '@avylando-readme/core';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  DEFAULT_POSTS_LIMIT,
  DEFAULT_POSTS_PAGE,
  DEFAULT_POSTS_SORT,
} from './post.constants';
import { Transform } from 'class-transformer';

class PostQuery {
  @Transform(({ value }) => Number(value) || DEFAULT_POSTS_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POSTS_LIMIT;

  @Transform(({ value }) => Number(value) || DEFAULT_POSTS_PAGE)
  @IsNumber()
  @IsOptional()
  public page = DEFAULT_POSTS_PAGE;

  @IsEnum(SortDirection)
  @IsOptional()
  public sortDirection: SortDirection = DEFAULT_POSTS_SORT;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  public tags?: Tag[];
}

export { PostQuery };
