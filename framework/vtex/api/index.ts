import type { CommerceAPIConfig } from '@commerce/api'

import {
  API_URL,
  VTEX_CHECKOUT_ID_COOKIE,
  VTEX_CUSTOMER_TOKEN_COOKIE,
  VTEX_COOKIE_EXPIRE,
} from '../const'

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_VTEX_ACCOUNT is missing and it's required to access your store`
  )
}

import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface VtexConfig extends CommerceAPIConfig {}

export class Config {
  private config: VtexConfig

  constructor(config: VtexConfig) {
    this.config = config
  }

  getConfig(userConfig: Partial<VtexConfig> = {}) {
    return Object.entries(userConfig).reduce<VtexConfig>(
      (cfg, [key, value]) => Object.assign(cfg, { [key]: value }),
      { ...this.config }
    )
  }

  setConfig(newConfig: Partial<VtexConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const config = new Config({
  locale: 'en-US',
  commerceUrl: API_URL,
  apiToken: '',
  cartCookie: VTEX_CHECKOUT_ID_COOKIE,
  cartCookieMaxAge: VTEX_COOKIE_EXPIRE,
  fetch: fetchGraphqlApi,
  customerCookie: VTEX_CUSTOMER_TOKEN_COOKIE,
})

export function getConfig(userConfig?: Partial<VtexConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<VtexConfig>) {
  return config.setConfig(newConfig)
}
