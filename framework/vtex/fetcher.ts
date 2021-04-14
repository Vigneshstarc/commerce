import { Fetcher } from '@commerce/utils/types'
import { INTERNAL_API_URL } from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({ method = 'POST', variables, query }) => {
  return handleFetchResponse(
    await fetch(INTERNAL_API_URL, {
      method,
      body: JSON.stringify({ query, variables }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  )
}

export default fetcher
