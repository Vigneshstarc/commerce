import {
  VTEX_CHECKOUT_ID_COOKIE,
  VTEX_CHECKOUT_URL_COOKIE,
  VTEX_COOKIE_EXPIRE,
} from '../../const'

import checkoutCreateMutation from '../../utils/mutations/checkout-create'
import Cookies from 'js-cookie'

export const checkoutCreate = async (fetch: any) => {
  const data = await fetch({
    query: checkoutCreateMutation,
  })

  const checkout = data.checkoutCreate?.checkout
  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: VTEX_COOKIE_EXPIRE,
    }
    Cookies.set(VTEX_CHECKOUT_ID_COOKIE, checkoutId, options)
    Cookies.set(VTEX_CHECKOUT_URL_COOKIE, checkout?.webUrl, options)
  }

  return checkout
}

export default checkoutCreate
