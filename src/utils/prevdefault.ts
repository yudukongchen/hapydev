import { MouseEventHandler } from 'react';

export const handlePrevDefaultClick: MouseEventHandler<HTMLElement> = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};
