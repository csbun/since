export default function uid(length: number = 8) {
  return new Array(length)
    .fill('x')
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
}
