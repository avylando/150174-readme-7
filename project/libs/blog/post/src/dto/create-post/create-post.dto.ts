import { CreateImagePostDto } from './create-image-post.dto';
import { CreateLinkPostDto } from './create-link-post.dto';
import { CreateQuotePostDto } from './create-quote-post.dto';
import { CreateTextPostDto } from './create-text-post.dto';
import { CreateVideoPostDto } from './create-video-post.dto';

export type CreatePostDto =
  | CreateImagePostDto
  | CreateLinkPostDto
  | CreateTextPostDto
  | CreateQuotePostDto
  | CreateVideoPostDto;
