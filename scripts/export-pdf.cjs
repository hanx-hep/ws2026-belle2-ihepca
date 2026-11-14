/**
 * Export the built deck (dist/) to a vector PDF with selectable text.
 *
 * Why not `slidev export`: in the stacked print mode Slidev uses, this
 * theme's two-column layouts collapse (right column disappears). Rendering
 * each slide from the production build at the natural canvas size and
 * printing page-by-page produces a faithful PDF.
 *
 * Usage: npm run build && npm run export:pdf
 */
const { chromium } = require('playwright-chromium')
const { PDFDocument } = require('pdf-lib')
const http = require('http')
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PORT = 4319
const BASE = `http://127.0.0.1:${PORT}`
const OUT = process.argv[2] || path.join(ROOT, 'public', 'ws2026-belle2-ihepca.pdf')
const SLIDES = Number(process.env.SLIDES || 41)
const CANVAS = { width: '980px', height: '552px' }

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
}

function serveDist() {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0])
    const file = path.join(DIST, url === '/' ? 'index.html' : url)
    if (!file.startsWith(DIST)) {
      res.writeHead(403)
      return res.end()
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404)
        return res.end('not found')
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' })
      res.end(data)
    })
  })
  return new Promise(resolve => server.listen(PORT, '127.0.0.1', () => resolve(server)))
}

;(async () => {
  if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('dist/index.html not found — run `npm run build` first')
    process.exit(1)
  }
  const server = await serveDist()
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 980, height: 552 } })
  const merged = await PDFDocument.create()

  for (let i = 1; i <= SLIDES; i++) {
    await page.goto(`${BASE}/#/${i}`, { waitUntil: 'load', timeout: 30000 }).catch(() => {})
    await page.waitForTimeout(1800)
    const buf = await page.pdf({ ...CANVAS, printBackground: true, pageRanges: '1' })
    const doc = await PDFDocument.load(buf)
    const [pg] = await merged.copyPages(doc, [0])
    merged.addPage(pg)
    process.stdout.write(`\r${i}/${SLIDES}`)
  }

  const bytes = await merged.save()
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, bytes)
  await browser.close()
  server.close()
  console.log(`\nPDF written: ${OUT} (${(bytes.length / 1e6).toFixed(1)} MB)`)
})().catch(err => {
  console.error(err)
  process.exit(1)
})
