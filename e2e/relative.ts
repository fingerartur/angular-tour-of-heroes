// http://localhost:49152/xxx
export function relative(url: string): string {
  return url.replace(new RegExp('http://localhost:[0-9]*/'), '');
}
