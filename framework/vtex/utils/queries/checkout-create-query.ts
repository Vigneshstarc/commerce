import { checkoutDetailsFragment } from './get-checkout-query'

const checkoutCreateQuery = /* GraphQL */ `
  query CreateNewOrderForm($orderFormId: ID) {
    orderForm(orderFormId: $orderFormId) @context(provider: "vtex.checkout-graphql") {
		  ${checkoutDetailsFragment}
    }
  }
`
export default checkoutCreateQuery
