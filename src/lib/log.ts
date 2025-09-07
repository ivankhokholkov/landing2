export function logError(...args: unknown[]) {
  try {
    const scrub = (v: unknown): unknown => {
      if (typeof v === 'string') {
        // redact email-like patterns
        return v.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[redacted-email]');
      }
      if (v && typeof v === 'object') {
        try {
          const json = JSON.stringify(v);
          return json.replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, '[redacted-email]');
        } catch {}
      }
      return v;
    };
    // eslint-disable-next-line no-console
    console.error(...args.map(scrub));
  } catch {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
}
