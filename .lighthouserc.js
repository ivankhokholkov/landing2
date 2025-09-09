/* eslint-disable @typescript-eslint/no-require-imports */

module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000/',
        'http://localhost:3000/blog',
        'http://localhost:3000/cases',
        'http://localhost:3000/contact'
      ],
      settings: {
        budgets: require('./lighthouse-budgets.json')
      }
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Category gates
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.95 }],
        // In CI (localhost) SEO may be skewed by robots headers; keep as warning.
        'categories:seo': ['warn', { minScore: 0.95 }],
        // Tune noisy audits to warn/off to avoid flaky CI
        'is-crawlable': 'warn',
        'errors-in-console': 'warn',
        'heading-order': 'warn',
        'largest-contentful-paint': 'warn',
        'unused-javascript': 'warn',
        'uses-long-cache-ttl': 'warn',
        'third-party-cookies': 'warn',
        'inspector-issues': 'warn',
        // Non-scoring audits: disable minScore checks
        'lcp-lazy-loaded': 'off',
        'non-composited-animations': 'off',
        'prioritize-lcp-image': 'off'
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouse',
      reportFilenamePattern: 'lhr-{{urlPath}}-{{timestamp}}.html'
    }
  }
};
