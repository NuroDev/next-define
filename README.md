<div align="center">
  <h1>
    <br/>
    <br/>
    ❗
    <br />
    next-define
    <br />
    <br />
    <br />
    <br />
  </h1>
  <sup>
    <br />
    Fully typed `define` functions for Next.js</em>
    <br />
    <br />
  
[![Package Version](https://img.shields.io/npm/v/next-define?label=%20&style=for-the-badge)](https://www.npmjs.com/package/next-define)
[![Package Monthly Downloads](https://img.shields.io/npm/dm/next-define?color=blue&label=%20&style=for-the-badge)](https://www.npmjs.com/package/next-define)
[![Docs](https://img.shields.io/badge/-Docs-blue.svg?style=for-the-badge)](https://github.com/nurodev/next-define)

  </sup>
  <br />
  <br />
</div>

## 🚀 Install

Install it locally in your project

```bash
# npm
npm install next-define

# yarn
yarn add next-define

# pnpm
pnpm install next-define
```

## 🦄 Usage

To get started using `next-define`, you can import the `page` function from the package and use it to define your page.

```typescript
// pages/index.tsx
import { page } from "next-define";

export const { Component } = page({
  Component: () => <>Hello World</>,
});

export default Component;
```

```typescript
// pages/index.tsx
import { page } from "next-define";

export const { Component, getStaticProps } = page({
  getStaticProps: () => ({ props: { name: "John" } }),
  Component: ({ name }) => <>Hello {name}</>,
});

export default Component;
```

```typescript
// pages/index.tsx
import { page } from "next-define";

export const { Component, getServerSideProps } = page({
  getServerSideProps: () => ({ props: { name: "John" } }),
  Component: ({ name }) => <>Hello {name}</>,
});

export default Component;
```

Or you can import `api` to define a new API route

```typescript
// pages/api/hello.ts
import { api } from "next-define";

export default api((req, res) =>
  res.status(200).json({
    name: "John",
  })
);
```

```typescript
// pages/api/hello.ts
import { api } from "next-define";

export const { config, handler } = api(
  (req, res) =>
    res.status(200).json({
      name: "John",
    }),
  {
    runtime: "nodejs",
  }
);

export default handler;
```

We even offer support for the new app directory beta by importing from the `/app` export

```typescript
// app/page.tsx
import { page } from "next-define/app";

export default page({
  Component: ({ params, searchParams }) => <>Hello World</>,
});
```

```typescript
// app/layout.tsx
import { layout } from "next-define/app";

export default layout(({ children, params }) => <>{children}</>);
```

```typescript
// app/error.tsx
import { error } from "next-define/app";

export default error(({ error, reset }) => <></>);
```

```typescript
// app/hello/router.ts
import { route } from "next-define/app";

export const { get, runtime } = route({
  runtime: "edge",
  GET: (req, { params }) =>
    new Response(
      JSON.stringify({
        message: "Hello World",
      })
    ),
});
```
