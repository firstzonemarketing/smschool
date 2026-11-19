/**
 * Resolves public asset paths cleanly for both root hosting ('/') and
 * subpath hosting such as GitHub Pages ('/smschool/').
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  if (path.startsWith('/assets/')) {
    return `${base}${path.slice(1)}`;
  }
  return path;
}
