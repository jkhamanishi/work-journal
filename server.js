import fs from 'node:fs/promises'
import express from 'express'
import { networkInterfaces } from 'node:os'

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''
const ssrManifest = isProduction
  ? await fs.readFile('./dist/client/.vite/ssr-manifest.json', 'utf-8')
  : undefined

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: {
      middlewareMode: true,
      https: false
    },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist/client', { extensions: [] }))
}

// Serve HTML
app.use('*all', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '')
    
    let template
    let render
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render
    } else {
      template = templateHtml
      render = (await import('./dist/server/entry-server.js')).render
    }
    
    const rendered = await render(url, ssrManifest)
    
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
    
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

function resolveServerUrls() {
  return Object.values(networkInterfaces()).flatMap((nInterface) => nInterface ?? []).filter(
    (detail) => detail && detail.address && (detail.family === "IPv4" || detail.family === 4)
  ).map(({address: host}) => ({
    address: (`http://${host}:${port}/`).replace("127.0.0.1", "localhost"),
    interface: host.includes("127.0.0.1") ? "Local" : "Network"
  })).sort((a, b) => (a.interface == "Local" ? -1 : b.interface == "Local" ? 1 : 0));
}

function printServerUrls(urls, info) {
  const format = {
    bold: (s) => "\x1b[1m" + s + "\x1b[22m",
    green: (s) => "\x1b[32m" + s + "\x1b[39m",
    cyan: (s) => "\x1b[36m" + s + "\x1b[39m"
  }
  const colorUrl = (url) => format.cyan(url.replace(/:(\d+)\//, (_, port) => `:${format.bold(port)}/`));
  urls.forEach(url => {
    info(`  ${format.green("\u279C")}  ` + (`${format.bold(url.interface)}:`).padEnd(18) + colorUrl(url.address));
  });
}

// Start http server
app.listen(port, '0.0.0.0', () => {
  console.log("Server started at following URLs:\n");
  const urls = resolveServerUrls();
  printServerUrls(urls, console.log);
})
