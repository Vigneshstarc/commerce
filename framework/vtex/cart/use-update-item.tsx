import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type {
  HookFetcherContext,
  MutationHookContext,
} from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useUpdateItem, {
  UpdateItemInput as UpdateItemInputBase,
  UseUpdateItem,
} from '@commerce/cart/use-update-item'

import useCart from './use-cart'
import { handler as removeItemHandler } from './use-remove-item'
import type { Cart, LineItem, UpdateCartItemBody } from '../types'
import { checkoutToCart } from '../utils'
import { getCheckoutId, checkoutLineItemUpdateMutation } from '../utils'
import { Mutation, MutationCheckoutLineItemsUpdateArgs } from '../schema'

export type UpdateItemInput<T = any> = T extends LineItem
  ? Partial<UpdateItemInputBase<LineItem>>
  : UpdateItemInputBase<LineItem>

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler = {
  fetchOptions: {
    query: checkoutLineItemUpdateMutation,
  },
  async fetcher({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<any>) {
    if (Number.isInteger(item.quantity)) {
      // Also allow the update hook to remove an item if the quantity is lower than 1
      if (item.quantity! < 1) {
        return removeItemHandler.fetcher({
          options: removeItemHandler.fetchOptions,
          input: {
            itemId,
            cartIndex: item.cartIndex,
          },
          fetch,
        })
      }
    } else if (item.quantity) {
      throw new ValidationError({
        message: 'The item quantity has to be a valid integer',
      })
    }
    const data = await fetch<any, MutationCheckoutLineItemsUpdateArgs>({
      ...options,
      variables: {
        orderFormId: getCheckoutId(),
        orderItems: [
          {
            id: parseInt(itemId),
            quantity: item.quantity,
            index: item.cartIndex,
          },
        ],
      },
    })
    let checkout = data.updateItems
    return checkoutToCart({ checkout })
  },
  useHook: ({
    fetch,
  }: MutationHookContext<Cart | null, UpdateCartItemBody>) => <
    T extends LineItem | undefined = undefined
  >(
    ctx: {
      item?: T
      wait?: number
    } = {}
  ) => {
    const { item } = ctx
    const { mutate } = useCart() as any

    return useCallback(
      debounce(async (input: UpdateItemInput<T>) => {
        const itemId = input.id ?? item?.id
        const productId = input.productId ?? item?.productId
        const variantId = input.productId ?? item?.variantId
        const cartIndex = input.cartIndex ?? item?.cartIndex

        if (!itemId || !productId || !variantId || cartIndex == undefined) {
          throw new ValidationError({
            message: 'Invalid input used for this operation',
          })
        }

        const data = await fetch({
          input: {
            item: {
              productId,
              variantId,
              cartIndex,
              quantity: input.quantity,
            },
            itemId,
          },
        })
        await mutate(data, false)
        return data
      }, ctx.wait ?? 500),
      [fetch, mutate]
    )
  },
}
