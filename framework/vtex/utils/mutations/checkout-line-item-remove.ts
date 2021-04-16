import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemRemoveMutation = /* GraphQL */ `
  mutation RemoveItems($orderFormId: ID, $orderItems: [ItemInput]) {
    updateItems(orderFormId: $orderFormId, orderItems: $orderItems) @context(provider: "vtex.checkout-graphql") {
      ${checkoutDetailsFragment}
    }
  }
`
export default checkoutLineItemRemoveMutation
