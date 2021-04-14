import Cookies, { CookieAttributes } from 'js-cookie'
import { VTEX_COOKIE_EXPIRE, VTEX_CUSTOMER_TOKEN_COOKIE } from '../const'

export const getCustomerToken = () => Cookies.get(VTEX_CUSTOMER_TOKEN_COOKIE)

export const setCustomerToken = (
  token: string | null,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove(VTEX_CUSTOMER_TOKEN_COOKIE)
  } else {
    Cookies.set(
      VTEX_CUSTOMER_TOKEN_COOKIE,
      token,
      options ?? {
        expires: VTEX_COOKIE_EXPIRE,
      }
    )
  }
}
