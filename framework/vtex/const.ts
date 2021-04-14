export const VTEX_CHECKOUT_ID_COOKIE = 'vtex_checkoutId'

export const VTEX_CHECKOUT_URL_COOKIE = 'vtex_checkoutUrl'

export const VTEX_CUSTOMER_TOKEN_COOKIE = 'vtex_customerToken'

export const STORE_DOMAIN = process.env.NEXT_PUBLIC_VTEX_STORE_DOMAIN

export const VTEX_COOKIE_EXPIRE = 30

export const API_URL = `https://${STORE_DOMAIN}/_v/private/graphql/v1?workspace=next`

export const INTERNAL_API_URL = `/api/vtex/graphql`

// export const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
