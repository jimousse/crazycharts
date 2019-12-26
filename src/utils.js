import {
	CHARACTER_WIDTH,
} from './constants';

export const getLongestLabel = (series) => {
  const {data, value} = series;
  const labelLengths = data.map(d => `${d[value]}`.length);
  return Math.max(...labelLengths)*CHARACTER_WIDTH;
}