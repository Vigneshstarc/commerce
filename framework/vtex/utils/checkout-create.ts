import Cookies from 'js-cookie'

import {
  VTEX_CHECKOUT_ID_COOKIE,
  VTEX_CHECKOUT_URL_COOKIE,
  VTEX_COOKIE_EXPIRE,
  STORE_DOMAIN,
} from '../const'

import checkoutCreateQuery from './queries/checkout-create-query'
import { CheckoutCreatePayload } from '../schema'

export const checkoutCreate = async (
  fetch: any
): Promise<CheckoutCreatePayload> => {
  const data = await fetch({
    query: checkoutCreateQuery,
  })

  const checkout = data?.orderForm
  const orderFormId = checkout?.id

  if (orderFormId) {
    const checkoutWebUrl = `https://${STORE_DOMAIN}/checkout/?orderFormId=${orderFormId}#/cart`
    const options = {
      expires: VTEX_COOKIE_EXPIRE,
    }
    Cookies.set(VTEX_CHECKOUT_ID_COOKIE, orderFormId, options)
    Cookies.set(VTEX_CHECKOUT_URL_COOKIE, checkoutWebUrl, options)
  }

  return checkout
}

export default checkoutCreate
