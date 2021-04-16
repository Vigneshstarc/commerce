export const checkoutDetailsFragment = `
  id
  value
  items {
    id
    productId
    name
    skuName
    detailUrl
    quantity
    price
    listPrice
    sellingPrice
    imageUrls {
      at3x
    }
    skuSpecifications {
      fieldName
      fieldValues
    }
  }
  storePreferencesData {
    countryCode
    currencyCode
    currencySymbol
  }
`

const getCheckoutQuery = /* GraphQL */ `
query GetOrderForm($orderFormId: ID) {
  orderForm(orderFormId: $orderFormId) @context(provider: "vtex.checkout-graphql") {
      ${checkoutDetailsFragment}
    }
  }
`
export default getCheckoutQuery
