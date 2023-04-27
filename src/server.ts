import express from 'express';
import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';

const app = express();

const PORT = 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlIndex = resolve(__dirname, '../index.html');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

app.use(vite.middlewares);

app.use('*', async (req, res, next) => {
  const url = req.originalUrl;

  try {
    const template = await readFile(htmlIndex, 'utf-8');

    const htmlData = await vite.transformIndexHtml(url, template);

    const [htmlStart, htmlEnd] = htmlData.split(`<!--ssr-outlet-->`);

    const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');

    const { pipe, injection } = await render(url, {
      onShellReady() {
        res.write(htmlStart);
        pipe(res);
      },

      onAllReady() {
        const addInjection = htmlEnd.replace('<!--preload-->', injection);
        res.write(addInjection);
        res.end();
      },
    });
  } catch (e) {
    vite.ssrFixStacktrace(e as Error);
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server has been started http://localhost:${PORT}`);
});
