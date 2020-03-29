export function countWords(str = '') {
  const trimmed = str.trim();
  if (!trimmed) return 0;
  return str.trim().split(/\s+/).length;
}
