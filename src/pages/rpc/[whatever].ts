import type { APIRoute } from 'astro'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { initTRPC } from '@trpc/server'

const { router: router_, procedure } = initTRPC.context<{}>().create()

let count = 0

const router = router_({
    increment: procedure.mutation(() => ++count),
    decrement: procedure.mutation(() => --count),
})

export type AppRouter = typeof router

export const all: APIRoute = ({ request: req }) => {
    return fetchRequestHandler({ endpoint: '/rpc', req, router, createContext: () => ({}) })
}
