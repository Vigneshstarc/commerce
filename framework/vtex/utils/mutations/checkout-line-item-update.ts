import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemUpdateMutation = /* GraphQL */ `
  mutation UpdateItems($orderFormId: ID, $orderItems: [ItemInput]) {
    updateItems(orderFormId: $orderFormId, orderItems: $orderItems) @context(provider: "vtex.checkout-graphql") {
      ${checkoutDetailsFragment}
    }
  }
`
export default checkoutLineItemUpdateMutation
