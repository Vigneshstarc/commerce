import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, { VtexApiHandler } from '../utils/create-api-handler'

import {
  VTEX_CHECKOUT_ID_COOKIE,
  VTEX_CHECKOUT_URL_COOKIE,
  VTEX_CUSTOMER_TOKEN_COOKIE,
} from '../../const'

import { getConfig } from '..'
import associateCustomerWithCheckoutMutation from '../../utils/mutations/associate-customer-with-checkout'

const METHODS = ['GET']

const checkoutApi: VtexApiHandler<any> = async (req, res, config) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  config = getConfig()

  const { cookies } = req
  const checkoutUrl = cookies[VTEX_CHECKOUT_URL_COOKIE]
  const customerCookie = cookies[VTEX_CUSTOMER_TOKEN_COOKIE]

  if (customerCookie) {
    try {
      await config.fetch(associateCustomerWithCheckoutMutation, {
        variables: {
          checkoutId: cookies[VTEX_CHECKOUT_ID_COOKIE],
          customerAccessToken: cookies[VTEX_CUSTOMER_TOKEN_COOKIE],
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (checkoutUrl) {
    res.redirect(checkoutUrl)
  } else {
    res.redirect('/cart')
  }
}

export default createApiHandler(checkoutApi, {}, {})
