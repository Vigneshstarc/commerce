import * as React from 'react'
import { ReactNode } from 'react'

import {
  CommerceConfig,
  CommerceProvider as CoreCommerceProvider,
  useCommerce as useCoreCommerce,
} from '@commerce'

import { vtexProvider, VtexProvider } from './provider'
import { VTEX_CHECKOUT_ID_COOKIE } from './const'

export { vtexProvider }
export type { VtexProvider }

export const vtexConfig: CommerceConfig = {
  locale: 'en-us',
  cartCookie: VTEX_CHECKOUT_ID_COOKIE,
}

export type VtexConfig = Partial<CommerceConfig>

export type VtexProps = {
  children?: ReactNode
  locale: string
} & VtexConfig

export function CommerceProvider({ children, ...config }: VtexProps) {
  return (
    <CoreCommerceProvider
      // TODO: Fix this type
      provider={vtexProvider as any}
      config={{ ...vtexConfig, ...config }}
    >
      {children}
    </CoreCommerceProvider>
  )
}

export const useCommerce = () => useCoreCommerce()
