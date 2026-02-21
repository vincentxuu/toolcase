/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://toolcase.cc',
  generateRobotsTxt: true,
  alternateRefs: [
    { href: 'https://toolcase.cc', hreflang: 'en' },
    { href: 'https://toolcase.cc/zh-tw', hreflang: 'zh-Hant-TW' },
  ],
}
