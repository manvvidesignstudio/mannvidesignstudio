import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { createClient } from '@supabase/supabase-js'
import { fileURLToPath } from 'url'
import path from 'path'
import { mkdir, readFile, writeFile } from 'fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface StaticPage {
  route: string
  title: string
  description: string
  heading: string
}

const publicPages: StaticPage[] = [
  ['/', 'Interior Design Studio in Mumbai | Manvvi Design Studio', 'Manvvi Design Studio is a Mumbai-based interior architecture studio creating considered residential and commercial spaces with restraint, craft, and permanence.', 'Interior design studio in Mumbai'],
  ['/about', 'Interior Design Studio in Mumbai | Manvvi Design Studio', 'Discover the people, philosophy, and architectural approach behind Manvvi Design Studio, a Mumbai interior design studio rooted in Bandra.', 'Interior design studio rooted in Bandra, Mumbai'],
  ['/services', 'Interior Design Services in Mumbai | Manvvi Design Studio', 'Explore residential, commercial, and hospitality interior design services by Manvvi Design Studio in Mumbai, from concept to turnkey delivery.', 'Interior design services for homes and commercial spaces in Mumbai'],
  ['/process', 'Interior Design Process in Mumbai | Manvvi Design Studio', 'Learn how Manvvi Design Studio develops Mumbai interiors through a disciplined process from daylight study and concept design to final key reveal.', 'Our interior design process in Mumbai'],
  ['/portfolio', 'Interior Design Projects in Mumbai | Manvvi Design Studio', 'Explore residential, commercial, and hospitality interior design projects by Manvvi Design Studio across Mumbai and Western India.', 'Interior design projects in Mumbai and Western India'],
  ['/contact', 'Contact Our Mumbai Design Studio | Manvvi Design Studio', 'Start a conversation with Manvvi Design Studio for residential, commercial, or hospitality interior design in Mumbai and beyond.', 'Start your interior design project in Mumbai'],
].map(([route, title, description, heading]) => ({ route, title, description, heading }))

const escapeXml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const escapeHtml = (value: string): string =>
  escapeXml(value).replace(/'/g, '&#039;')

function staticSitePlugin(pages: StaticPage[], siteUrl: string): Plugin {
  return {
    name: 'generate-static-seo-pages',
    async closeBundle() {
      const indexPath = path.resolve(__dirname, 'dist/index.html')
      const baseHtml = await readFile(indexPath, 'utf8')
      if (!baseHtml) {
        throw new Error('Unable to generate static SEO pages: Vite index.html was not found.')
      }

      const urls = pages
        .map(({ route }) => `${siteUrl}${route === '/' ? '' : route}`)
        .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
        .join('\n')
      for (const page of pages) {
        const canonicalUrl = `${siteUrl}${page.route === '/' ? '' : page.route}`
        const pageHtml = baseHtml
          .replace('</head>', `    <title>${escapeHtml(page.title)}</title>\n    <meta name="description" content="${escapeHtml(page.description)}" />\n    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />\n  </head>`)
          .replace(
            '<div id="root"></div>',
            `<div id="root"><main><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.description)}</p></main></div>`,
          )

        if (page.route === '/') {
          await writeFile(indexPath, pageHtml)
        } else {
          const outputPath = path.resolve(__dirname, `dist/${page.route.slice(1)}/index.html`)
          await mkdir(path.dirname(outputPath), { recursive: true })
          await writeFile(outputPath, pageHtml)
        }
      }

      await writeFile(path.resolve(__dirname, 'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
      await writeFile(path.resolve(__dirname, 'dist/robots.txt'), `User-agent: *\nDisallow: /admin\n\nSitemap: ${siteUrl}/sitemap.xml\n`)
    },
  }
}

async function getStaticPages(mode: string): Promise<StaticPage[]> {
  const env = loadEnv(mode, process.cwd(), '')
  const supabaseUrl = env.VITE_SUPABASE_URL
  const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project')) {
    console.warn('Supabase is not configured; no project pages will be generated.')
    return publicPages
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabase
    .from('projects')
    .select('slug, title, category, location, short_description')
    .eq('published', true)

  if (error) throw new Error(`Unable to load project pages: ${error.message}`)

  return [
    ...publicPages,
    ...(data ?? [])
      .filter(({ slug }) => Boolean(slug))
      .map((project) => ({
        route: `/portfolio/${encodeURIComponent(project.slug)}`,
        title: `${project.title} | Mumbai Interior Design`,
        description: `Explore ${project.title}, a ${project.category.toLowerCase()} interior design project in ${project.location} by Manvvi Design Studio. ${project.short_description}`,
        heading: `${project.title} — ${project.category} Interior Design in ${project.location}`,
      })),
  ]
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'https://manvvidesignstudio.in').replace(/\/$/, '')
  const pages = await getStaticPages(mode)

  return {
    plugins: [react(), tailwindcss(), staticSitePlugin(pages, siteUrl)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'es2018',
    },
  }
})
