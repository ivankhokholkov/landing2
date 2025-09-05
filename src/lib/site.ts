export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
}

export function canonical(path?: string) {
  const base = getSiteUrl();
  if (!path) return base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

