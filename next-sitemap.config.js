console.log('NEXT_PUBLIC_URL', process.env.NEXT_PUBLIC_URL)
console.log('NEXT_PUBLIC_ENV_NAME', process.env.NEXT_PUBLIC_ENV_NAME)

const policies = []
const additionalSitemaps = []
let generateIndexSitemap = false

if (process.env.NEXT_PUBLIC_ENV_NAME === 'production') {
  policies.push({ userAgent: '*', disallow: '/private/' })
  policies.push({ userAgent: '*', allow: '/' })

  generateIndexSitemap = true
  additionalSitemaps.push(`${process.env.NEXT_PUBLIC_URL}/server-sitemap-0.xml`)
  additionalSitemaps.push(`${process.env.NEXT_PUBLIC_URL}/server-sitemap-1.xml.gz`)

} else {
  policies.push({ userAgent: '*', disallow: '/' })
}

const config = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: policies,
    additionalSitemaps: additionalSitemaps,
  },
  generateIndexSitemap: generateIndexSitemap,
  transform: async (config, path) => { return null },
};

module.exports = config;
