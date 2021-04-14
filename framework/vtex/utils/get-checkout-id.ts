import Cookies from 'js-cookie'
import { VTEX_CHECKOUT_ID_COOKIE } from '../const'

const getCheckoutId = (id?: string) => {
  return id ?? Cookies.get(VTEX_CHECKOUT_ID_COOKIE)
}

export default getCheckoutId
