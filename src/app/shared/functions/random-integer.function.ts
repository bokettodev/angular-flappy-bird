export function randomInteger(min: number, max: number): number {
  const minInteger = Math.ceil(min);
  const maxInteger = Math.floor(max);
  return Math.floor(Math.random() * (maxInteger - minInteger + 1)) + minInteger;
}
