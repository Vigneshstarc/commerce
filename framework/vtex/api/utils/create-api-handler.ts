import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import { VtexConfig, getConfig } from '..'

export type VtexApiHandler<
  T = any,
  H extends VtexHandlers = {},
  Options extends {} = {}
> = (
  req: NextApiRequest,
  res: NextApiResponse<VtexApiResponse<T>>,
  config: VtexConfig,
  handlers: H,
  // Custom configs that may be used by a particular handler
  options: Options
) => void | Promise<void>

export type VtexHandler<T = any, Body = null> = (options: {
  req: NextApiRequest
  res: NextApiResponse<VtexApiResponse<T>>
  config: VtexConfig
  body: Body
}) => void | Promise<void>

export type VtexHandlers<T = any> = {
  [k: string]: VtexHandler<T, any>
}

export type VtexApiResponse<T> = {
  data: T | null
  errors?: { message: string; code?: string }[]
}

export default function createApiHandler<
  T = any,
  H extends VtexHandlers = {},
  Options extends {} = {}
>(
  handler: VtexApiHandler<T, H, Options>,
  handlers: H,
  defaultOptions: Options
) {
  return function getApiHandler({
    config,
    operations,
    options,
  }: {
    config?: VtexConfig
    operations?: Partial<H>
    options?: Options extends {} ? Partial<Options> : never
  } = {}): NextApiHandler {
    const ops = { ...operations, ...handlers }
    const opts = { ...defaultOptions, ...options }

    return function apiHandler(req, res) {
      return handler(req, res, getConfig(config), ops, opts)
    }
  }
}
