import { Product } from '@commerce/types'

import {
  Product as VtexProduct,
  Checkout,
  CheckoutLineItemEdge,
  SelectedOption,
  ImageConnection,
  ProductVariantConnection,
  MoneyV2,
  ProductOption,
} from '../schema'

import type { Cart, LineItem } from '../types'

const money = ({ amount, currencyCode }: MoneyV2) => {
  return {
    value: +amount,
    currencyCode,
  }
}

const normalizeProductOption = ({
  id,
  name: displayName,
  values,
}: ProductOption) => {
  return {
    __typename: 'MultipleChoiceOption',
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      }
      if (displayName === 'Color') {
        output = {
          ...output,
          hexColors: [value],
        }
      }
      return output
    }),
  }
}

const normalizeProductImages = ({ edges }: ImageConnection) =>
  edges?.map(({ node: { originalSrc: url, ...rest } }) => ({
    url,
    ...rest,
  }))

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
  return edges?.map(
    ({
      node: { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 },
    }) => ({
      id,
      name: title,
      sku: sku ?? id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
      options: selectedOptions.map(({ name, value }: SelectedOption) =>
        normalizeProductOption({
          id,
          name,
          values: [value],
        })
      ),
    })
  )
}

export function normalizeProduct(productNode: VtexProduct): Product {
  const {
    id,
    title: name,
    vendor,
    images,
    variants,
    description,
    handle,
    priceRange,
    options,
    ...rest
  } = productNode

  const product = {
    id,
    name,
    vendor,
    description,
    path: `/${handle}`,
    slug: handle?.replace(/^\/+|\/+$/g, ''),
    price: money(priceRange?.minVariantPrice),
    images: normalizeProductImages(images),
    variants: variants ? normalizeProductVariants(variants) : [],
    options: options ? options.map((o) => normalizeProductOption(o)) : [],
    ...rest,
  }

  return product
}

export function normalizeCart(checkout: any): Cart {
  return {
    id: checkout.id,
    customerId: '',
    email: '',
    createdAt: '',
    currency: {
      code: checkout?.storePreferencesData?.currencyCode,
    },
    taxesIncluded: true,
    lineItems: checkout.items?.map(normalizeLineItem),
    lineItemsSubtotalPrice: +checkout.value,
    subtotalPrice: +checkout.value,
    totalPrice: checkout.value,
    discounts: [],
  }
}

function normalizeLineItem(item: any, index: number): LineItem {
  return {
    cartIndex: index,
    id: item.id,
    variantId: String(item?.id),
    productId: String(item?.productId),
    name: item?.name,
    quantity: item.quantity,
    variant: {
      id: String(item?.id),
      sku: item?.id ?? '',
      name: item?.skuName,
      image: {
        url: item?.imageUrls?.at3x,
      },
      requiresShipping: item?.requiresShipping ?? false,
      price: item?.price,
      listPrice: item?.listPrice,
    },
    path: item?.detailUrl?.substring(1, item?.detailUrl?.length - 1),
    discounts: [],
    options: [
      {
        value: item.skuSpecifications
          .map((elem: any) => `${elem.fieldName}: ${elem.fieldValues}`)
          .join(' | '),
      },
    ],
  }
}
