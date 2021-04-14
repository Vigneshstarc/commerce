export const getCustomerQuery = /* GraphQL */ `
  query getCustomer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken)
      @context(provider: "vtex.next-commerce-graphql") {
      id
      firstName
      lastName
      displayName
      email
      phone
      tags
      acceptsMarketing
      createdAt
    }
  }
`
export default getCustomerQuery
