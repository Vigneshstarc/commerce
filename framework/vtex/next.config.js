const commerce = require('./commerce.config.json')

module.exports = {
  commerce,
  images: {
    domains: [`${process.env.NEXT_PUBLIC_VTEX_ACCOUNT}.vteximg.com.br`],
  },
}
