import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { configDefaults } from 'vitest/config';
import { lingui } from '@lingui/vite-plugin';
import tailwindcss from 'tailwindcss';
import { createHtmlPlugin } from 'vite-plugin-html';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const RPC_PROVIDER_MAINNET = process.env.VITE_RPC_PROVIDER_MAINNET || '';
  const RPC_PROVIDER_SEPOLIA = process.env.VITE_RPC_PROVIDER_SEPOLIA || '';
  const RPC_PROVIDER_TENDERLY = process.env.VITE_RPC_PROVIDER_TENDERLY || '';

  const CONTENT_SECURITY_POLICY = `
    default-src 'self';
    script-src 'self'
      'unsafe-inline'
      https://cdn.markfi.xyz
      https://cdn.cookie3.co
      https://static.cloudflareinsights.com
      https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://explorer-api.walletconnect.com;
    font-src 'self';
    connect-src 'self'
      ${RPC_PROVIDER_MAINNET}
      ${RPC_PROVIDER_TENDERLY}
      ${RPC_PROVIDER_SEPOLIA}
      https://virtual.mainnet.rpc.tenderly.co
      https://rpc.sepolia.org
      https://vote.makerdao.com
      https://query-subgraph-testnet.sky.money
      https://query-subgraph-staging.sky.money
      https://query-subgraph.sky.money
      https://api.thegraph.com
      https://staging-api.sky.money
      https://api.sky.money
      https://api.ipify.org
      https://info-sky.blockanalitica.com
      https://sky-tenderly.blockanalitica.com
      https://api.cow.fi/
      wss://relay.walletconnect.com
      wss://www.walletlink.org
      https://explorer-api.walletconnect.com/
      https://enhanced-provider.rainbow.me
      https://a.markfi.xyz/
      https://c.staging.cookie3.co/
      cloudflareinsights.com;
    frame-src 'self'
      https://verify.walletconnect.com
      https://verify.walletconnect.org
`;

  // Need to remove whitespaces otherwise the app won't build due to unsupported characters
  const parsedCSP = CONTENT_SECURITY_POLICY.replace(/\n/g, '');

  return defineConfig({
    server: {
      // vite default is 5173
      port: 3000
    },
    preview: {
      port: 3000
    },
    root: 'src',
    envDir: '../',
    build: {
      outDir: '../dist',
      emptyOutDir: true
    },
    test: {
      exclude: [...configDefaults.exclude],
      globals: true,
      environment: 'happy-dom'
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            csp: parsedCSP
          },
          tags: [
            {
              injectTo: 'head',
              tag: 'script',
              children: `
                const cookie3Options = {"siteId": "4e20d42b-14ed-45a0-8062-436098ed1358","additionalTracking":true,"cookielessEnabled":true};
                window._paq = window._paq || [];
                (function () {
                    var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
                    g.async = true; g.src = 'https://cdn.markfi.xyz/scripts/analytics/latest/cookie3.analytics.min.js';
                    s.parentNode.insertBefore(g, s);
                })();
              `
            },
            {
              injectTo: 'head',
              tag: 'script',
              attrs: {
                async: true,
                src: 'https://cdn.markfi.xyz/scripts/analytics/0.11.21/cookie3.analytics.min.js',
                integrity: 'sha384-wtYmYhbRlAqGwxc5Vb9GZVyp/Op3blmJICmXjRiJu2/TlPze5dHsmg2gglbH8viT',
                crossOrigin: 'anonymous',
                strategy: 'lazyOnload',
                siteId: '4e20d42b-14ed-45a0-8062-436098ed1358'
              },
              children: `
                const cookie3Options = {"siteId":"4e20d42b-14ed-45a0-8062-436098ed1358","additionalTracking":true,"cookielessEnabled":true};
              `
            }
          ]
        }
      }),
      nodePolyfills({
        include: ['buffer']
      }),
      react({
        plugins: [['@lingui/swc-plugin', {}]]
      }),
      lingui()
    ],
    css: {
      postcss: {
        plugins: [tailwindcss()]
      }
    }
  });
}
