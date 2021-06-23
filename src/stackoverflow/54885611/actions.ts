export function start() {
  return { type: 'START' };
}
export function bar(payload) {
  return { type: 'START', payload };
}
export function done() {
  return { type: 'DONE' };
}
