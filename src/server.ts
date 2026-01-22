import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');
const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(
  '/assets/i18n',
  express.static(join(browserDistFolder, 'assets/i18n'), {
    index: false,
    redirect: false,
  })
);



app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

const robotsPath = join(browserDistFolder, 'assets/robots.txt');

app.get('/robots.txt', (req, res) => {
  try {
    const content = readFileSync(robotsPath, 'utf-8');
    res.type('text/plain').send(content);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next()
    )
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
