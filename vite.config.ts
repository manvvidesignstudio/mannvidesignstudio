import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createClient } from '@supabase/supabase-js'
import { loadEnv } from 'vite'
import type { Plugin } from 'vite'
import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const publicRoutes = [
  '/',
  '/studio',
  '/services',
  '/process',
  '/portfolio',
  '/contact',
]

const prerender = require('vite-plugin-prerender') as {
  (options: Record<string, unknown>): Plugin
  PuppeteerRenderer: new (options: Record<string, unknown>) => unknown
}

async function getProjectRoutes(mode: string): Promise<string[]> {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseUrl = env.VITE_SUPABASE_URL
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
    console.warn('Supabase is not configured; no project pages will be prerendered.')
    return []
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabase
    .from('projects')
    .select('slug')
    .eq('published', true)

  if (error) {
    throw new Error(`Unable to load project slugs for prerendering: ${error.message}`)
  }

  return (data ?? [])
    .map(({ slug }) => slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => `/portfolio/${encodeURIComponent(slug)}`)
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      staticDir: path.resolve(__dirname, 'dist'),
      routes: [...publicRoutes, ...(await getProjectRoutes(mode))],
      renderer: new prerender.PuppeteerRenderer({
        renderAfterTime: 1500,
        maxConcurrentRoutes: 2,
      }),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2018',
  },
}))
