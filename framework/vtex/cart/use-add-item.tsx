import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import useCart from './use-cart'
import {
  checkoutLineItemAddMutation,
  getCheckoutId,
  checkoutToCart,
} from '../utils'

import { Cart, CartItemBody } from '../types'

import { Mutation, MutationCheckoutLineItemsAddArgs } from '../schema'

export default (useAddItem as unknown) as UseAddItem<typeof handler>

export const handler: MutationHook<Cart, {}, CartItemBody> = {
  fetchOptions: {
    query: checkoutLineItemAddMutation,
  },
  async fetcher({ input: item, options, fetch }) {
    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const data = await fetch<any, MutationCheckoutLineItemsAddArgs>({
      ...options,
      variables: {
        orderFormId: getCheckoutId(),
        items: [
          {
            id: parseInt(item.variantId),
            quantity: item.quantity ?? 1,
            seller: 1,
          },
        ],
      },
    })
    let checkout = data.addToCart
    return checkoutToCart({ checkout })
  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useCart()

    return useCallback(
      async function addItem(input) {
        const data = await fetch({ input })
        await mutate(data, false)
        return data
      },
      [fetch, mutate]
    )
  },
}
