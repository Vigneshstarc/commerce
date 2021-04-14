export const getCustomerQuery = /* GraphQL */ `
  query getCustomerId($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken)
      @context(provider: "vtex.next-commerce-graphql") {
      id
    }
  }
`
export default getCustomerQuery
