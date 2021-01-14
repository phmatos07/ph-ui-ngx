import { Target } from './target.enum';

export interface Carousel {
  src: string;
  alt: string;
  isActivated: boolean;
  href?: string;
  target?: Target;
}
