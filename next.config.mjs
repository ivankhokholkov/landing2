import { withSentryConfig } from '@sentry/nextjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://plausible.io https://client.crisp.chat https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://js.hcaptcha.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://plausible.io https://client.crisp.chat wss://client.crisp.chat https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ https://hcaptcha.com https://*.hcaptcha.com",
      "frame-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; ');

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';
    const isLocal = /localhost|example\.com/.test(siteUrl);
    const isHttps = siteUrl.startsWith('https://');
    const enableCsp = siteUrl && !isLocal;

    /**
     * Security headers beyond CSP
     */
    const extraSecurity = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
      { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
      { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
      { key: 'Origin-Agent-Cluster', value: '?1' },
      // HSTS only for HTTPS and non-local hosts
      ...(isHttps && !isLocal
        ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
        : []),
      ...(enableCsp ? [{ key: 'Content-Security-Policy', value: csp }] : []),
    ];

    const headers = [
      {
        source: '/:path*',
        headers: extraSecurity,
      },
    ];

    // For previews or non-canonical hosts, discourage indexing
    if (!isHttps || isLocal || siteUrl.includes('vercel.app')) {
      headers.push({
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      });
    }

    return headers;
  },
};

// Wrap with Sentry (no-op if DSN not set at runtime)
const sentryExport = withSentryConfig(nextConfig, {
  silent: true,
});

export default sentryExport;

