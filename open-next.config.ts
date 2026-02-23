import type { OpenNextConfig } from '@opennextjs/cloudflare'
import { categories, tools } from './src/lib/tools-config'
import fs from 'node:fs'
import path from 'node:path'

const categoryFunctions = Object.fromEntries(
  categories.flatMap((category) => {
    const routes = tools
      .filter((tool) => tool.category === category.key)
      .flatMap((tool) => [
        `app/(en)/${category.key}/${tool.slug}/page`,
        `app/zh-tw/${category.key}/${tool.slug}/page`,
      ])
      .filter((route) => {
        const filePath = path.join(process.cwd(), 'src', route + '.tsx')
        return fs.existsSync(filePath)
      })

    if (routes.length === 0) return []
    return [[`cat-${category.key}`, { routes, patterns: [`/${category.key}/*`, `/zh-tw/${category.key}/*`] }]]
  })
)

const config: OpenNextConfig = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
  functions: {
    ...categoryFunctions,
    "api-exchange-rates": {
      routes: ["app/api/exchange-rates/route"],
      patterns: ["/api/exchange-rates*"],
    },
  },
  edgeExternals: [
    "node:crypto",
    "node:fs",
    "node:path",
    "react-dom/server.browser",
    "react-dom/server.edge"
  ],
  middleware: {
    external: true,
    override: {
      wrapper: "cloudflare-edge",
      converter: "edge",
      proxyExternalRequest: "fetch",
      incrementalCache: "dummy",
      tagCache: "dummy",
      queue: "dummy",
    },
  },
}

export default config
