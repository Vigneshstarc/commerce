export const getPageQuery = /* GraphQL */ `
  query($id: ID!) {
    node(id: $id) @context(provider: "vtex.next-commerce-graphql") {
      id
      ... on Page {
        title
        handle
        body
        bodySummary
      }
    }
  }
`
export default getPageQuery
