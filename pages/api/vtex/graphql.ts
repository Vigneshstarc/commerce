import fetch from '@framework/api/utils/fetch'
import { NextApiRequest, NextApiResponse } from 'next'
import { API_URL } from '../../../framework/vtex/const'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(API_URL, {
    method: req.method,
    body: JSON.stringify(req.body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  res.status(response.status).json(await response.json())
}
