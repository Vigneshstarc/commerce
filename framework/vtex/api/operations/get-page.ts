import { Page } from '../../schema'
import { VtexConfig, getConfig } from '..'

export type GetPageResult<T extends { page?: any } = { page?: Page }> = T

export type PageVariables = {
  id: string
}

async function getPage({
  url,
  variables,
  config,
  preview,
}: {
  url?: string
  variables: PageVariables
  config?: VtexConfig
  preview?: boolean
}): Promise<GetPageResult> {
  config = getConfig(config)
  return {}
}

export default getPage
