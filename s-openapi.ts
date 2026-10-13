import { defineCommand, runMain } from 'citty'
import { $fetch } from 'ofetch'
import fs from 'node:fs'
import { objectMap } from '@antfu/utils'

const main = defineCommand({
  meta: {
    name: 's-openapi',
    version: '1.0.0',
    description: 'Convert Swagger to JSON',
  },
  args: {
    url: {
      type: 'positional',
      description: 'Url',
      required: true,
    },
    covert: {
      type: 'boolean',
      description: 'Covert 2.0 to 3.0',
    },
    prefix: {
      type: 'string',
      description: 'Path prefix to strip (e.g. /api/v1) so schema paths match the endpoint base URL',
    },
    output: {
      type: 'positional',
      description: 'Output',
      required: true,
    },
  },
  async run({ args }) {
    let res: any
    try {
      if (fs.existsSync(args.url)) {
        console.log(`Reading OpenAPI spec from local file: ${args.url}`)
        res = JSON.parse(fs.readFileSync(args.url, 'utf8'))
      } else {
        console.log(`Fetching OpenAPI spec from: ${args.url}`)
        res = await $fetch(args.url)
      }
    } catch (err: any) {
      console.error('\n[LỖI] Không thể tải OpenAPI schema từ:', args.url)
      if (err?.status === 500) {
        console.error('-> Server backend trả về lỗi HTTP 500 Internal Server Error.')
      } else if (err?.status === 404) {
        console.error('-> Không tìm thấy schema. food-store-be (NestJS Swagger) phục vụ JSON ở /api/docs-json.')
      } else {
        console.error('-> Chi tiết lỗi:', err?.message || err)
      }
      console.error(`-> Lưu ý: File schema cục bộ (${args.output}) vẫn giữ nguyên, pnpm dev / nuxt prepare vẫn dùng được.`)
      process.exit(1)
    }

    if (args.prefix) {
      const prefix = args.prefix.replace(/\/$/, '')
      res.paths = Object.fromEntries(
        Object.entries(res.paths ?? {}).map(([k, v]) => [k.startsWith(`${prefix}/`) ? k.slice(prefix.length) : k, v]),
      )
    }
    // A DTO documented without fields (e.g. the Swagger CLI plugin didn't run on the API build) would type
    // every request body as `never`; let it accept any fields instead.
    for (const schema of Object.values<any>(res.components?.schemas ?? {})) {
      if (schema.type === 'object' && !Object.keys(schema.properties ?? {}).length && schema.additionalProperties === undefined)
        schema.additionalProperties = true
    }

    const dir = args.output.substring(0, args.output.lastIndexOf('/'))
    if (dir) fs.mkdirSync(dir, { recursive: true })
    if (args.covert) {
      const coverted = await $fetch('https://converter.swagger.io/api/convert', { method: 'POST', body: res })
      const baseUrl = coverted.servers[0].url
      const paths = objectMap(coverted.paths, (k, v) => [baseUrl + k, v])
      coverted.paths = paths
      fs.writeFileSync(args.output, JSON.stringify(coverted, null, 2))
    } else {
      fs.writeFileSync(args.output, JSON.stringify(res, null, 2))
    }
    console.log(`Successfully updated: ${args.output}`)
  },
})

runMain(main)
