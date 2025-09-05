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
      ]
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // High-level category gates (warnings only)
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        // Tune noisy audits to warn/off to avoid flaky CI
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
