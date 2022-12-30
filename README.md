# use-cardano Blockfrost Next Proxy API

A next.js API route that is designed to be used with [use-cardano](https://www.github.com/use-cardano/use-cardano) for the `blockfrost-proxy` node provider.

## Installation

_this package can only be used in the context of a next.js project_

- `npm i http-proxy`
- `npm i use-cardano-blockfrost-proxy`

## Usage

### 1. Add env variables to your .env file

```env filename=".env" copy
BLOCKFROST_PROJECT_ID_TESTNET=testnetMySecretBlockFrostProjectId
BLOCKFROST_PROJECT_ID_PREVIEW=previewMySecretBlockFrostProjectId
BLOCKFROST_PROJECT_ID_PREPROD=preprodMySecretBlockFrostProjectId
BLOCKFROST_PROJECT_ID_MAINNET=mainnetMySecretBlockFrostProjectId
```

### 2. Create an API route under **pages/api/blockfrost/[[...all]].ts**

```ts filename="pages/api/[[...all]].ts" copy
export { blockfrostProxy as default } from "use-cardano-blockfrost-proxy"
```

Or, f you which to execute some additional logic before proxying the request to blockfrost

```ts filename="pages/api/[[...all]].ts" copy
import { blockfrostProxy } from "use-cardano-blockfrost-proxy"

export default async (req, res) => {
  // do something before proxying the request to blockfrost
  return await blockfrostProxy(req, res)
}
```

### 3. Configure `use-cardano` to use the proxy

```tsx filename="pages/index.tsx" copy
import { CardanoProvider, UseCardanoOptions } from "use-cardano"

const options: UseCardanoOptions = {
  node: {
    provider: "blockfrost-proxy",
    proxyUrl: "/api/blockfrost",
  },
}

const App = () => {
  return (
    <CardanoProvider options={options}>
      <div>...</div>
    </CardanoProvider>
  )
}
```

## Why not use a middleware?

While I think it would be technically possible to implement this as a middleware, and that it potentially could be done more elegantly, I don't think it's logically sound to do so, since a middleware is executed for _every_ request in the application, while this approach allows us to only handle the blockfrost requests specifically, at the small cost of the user having to add the file `pages/api/blockfrost/[[...all]].ts`.

## Attribution

This package is based on (read copied) from https://www.npmjs.com/package/next-http-proxy-middleware. I chose to copy the code instead of using the package directly, since I wanted to be able to package the code as an es module and I had issues with typescript that I wanted to avoid.

## LICENSE

MIT, see [LICENSE](/LICENSE) for more information.
