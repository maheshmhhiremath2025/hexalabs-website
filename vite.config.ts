import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Dev only: serve the Vercel functions in /api (hexa-chat, lead) from the Vite dev
 * server, with secrets from .env.local (never committed). Production uses Vercel.
 */
function devApi(): Plugin {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '');
      for (const key of ['OPENAI_API_KEY', 'HEXA_MODEL', 'GMAIL_USER', 'GMAIL_APP_PASSWORD']) {
        if (env[key] && !process.env[key]) process.env[key] = env[key];
      }
      server.middlewares.use(async (req, res, next) => {
        const match = req.url?.match(/^\/api\/([a-z-]+)(?:\?|$)/);
        if (!match) return next();
        const file = path.resolve('api', `${match[1]}.js`);
        try {
          const mod = await import(`${pathToFileURL(file).href}?t=${Date.now()}`);
          await mod.default(req, res);
        } catch (err) {
          server.config.logger.error(`[dev-api] ${match[1]}: ${String(err)}`);
          if (!res.headersSent) {
            res.statusCode = 404;
            res.end('Not found');
          }
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), devApi()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
  },
});
