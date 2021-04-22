import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemAddMutation = /* GraphQL */ `
mutation AddItem($orderFormId: ID, $items: [ItemInput]) {
  addToCart(orderFormId: $orderFormId, items: $items) @context(provider: "vtex.checkout-graphql") {
      ${checkoutDetailsFragment}
    }
  }
`
export default checkoutLineItemAddMutation
