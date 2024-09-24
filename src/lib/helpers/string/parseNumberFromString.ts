export function parseNumberFromString(input: string): number {
  const result = parseFloat(input.replace(/,/g, ''));
  return result;
}
