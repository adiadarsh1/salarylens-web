/** Base-aware URL helper so all internal links respect Astro's `base`. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/')) p = `${p}/`;
  const out = `${base}${p}`.replace(/\/{2,}/g, '/');
  return out === '' ? '/' : out;
}

/** Absolute canonical URL for a given path (uses Astro.site at build). */
export function canonical(site: URL | undefined, base: string, path: string): string {
  const origin = site ? site.origin : '';
  const b = base.replace(/\/+$/, '');
  let p = path.startsWith('/') ? path : `/${path}`;
  if (!p.endsWith('/')) p = `${p}/`;
  return `${origin}${`${b}${p}`.replace(/\/{2,}/g, '/')}`;
}
