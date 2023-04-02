import { describe, it, expect, expectTypeOf } from "vitest";
import { NextResponse } from "next/server";

import { api } from ".";

import type { NextApiHandler } from "next";
import type { NextFetchEvent, NextRequest } from "next/server";

import type { NextApiConfig } from "~/shared";

describe("api", () => {
  it("Node.js - Next.js API with default export", () => {
    const handler = api((_req, res) =>
      res.status(200).json({
        message: "Hello World",
      })
    );

    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(Function);
    expectTypeOf(handler).toMatchTypeOf<NextApiHandler<Record<string, any>>>();
  });

  it("Node.js - Next.js API with default export & typed parameters", () => {
    interface Params {
      message: string;
    }

    const handler = api<Params>((_req, res) =>
      res.status(200).json({
        message: "Hello World",
      })
    );

    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(Function);
    expectTypeOf(handler).toMatchTypeOf<NextApiHandler<Params>>();
  });

  it("Node.js - Next.js API with options", () => {
    const options = {
      runtime: "nodejs",
    } satisfies NextApiConfig;

    const { config, handler } = api(
      (_req, res) =>
        res.status(200).json({
          message: "Hello World",
        }),
      options
    );

    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(Function);
    expectTypeOf(handler).toMatchTypeOf<NextApiHandler<Record<string, any>>>();

    expect(config).toBeDefined();
    expect(config).toBeInstanceOf(Object);
    expect(config).toEqual(options);
    expectTypeOf(config).toMatchTypeOf<NextApiConfig>();
  });

  it("Edge - Basic `Response`", () => {
    const options = {
      runtime: "edge",
    } satisfies NextApiConfig;

    const { config, handler } = api(
      (_req, _ctx) =>
        NextResponse.json({
          message: "Hello World",
        }),
      options
    );

    expect(handler).toBeDefined();
    expect(handler).toBeInstanceOf(Function);
    expectTypeOf(handler).toMatchTypeOf<
      (_req: NextRequest, _ctx: NextFetchEvent) => NextResponse
    >();

    expect(config).toBeDefined();
    expect(config).toBeInstanceOf(Object);
    expect(config).toEqual(options);
    expectTypeOf(config).toMatchTypeOf<NextApiConfig>();
  });
});
