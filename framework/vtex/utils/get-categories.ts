import { VtexConfig } from '../api'
import { CollectionEdge } from '../schema'
import getSiteCollectionsQuery from './queries/get-all-collections-query'

export type Category = {
  entityId: string
  name: string
  path: string
}

const getCategories = async (config: VtexConfig): Promise<Category[]> => {
  const { data } = await config.fetch(getSiteCollectionsQuery, {
    variables: {
      first: 250,
    },
  })

  return (
    data.collections?.edges?.map(
      ({ node: { id: entityId, title: name, handle } }: CollectionEdge) => ({
        entityId,
        name,
        path: `/${handle}`,
      })
    ) ?? []
  )
}

export default getCategories
