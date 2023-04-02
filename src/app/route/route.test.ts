import { describe, it, expect, expectTypeOf } from "vitest";
import { NextResponse } from "next/server";

import { route } from ".";

import type { NextApiConfig } from "~/shared";
import type { NextRouteHandler } from "./route.action";

describe("route", () => {
  it("Node.js - A basic GET handler", () => {
    const { GET } = route({
      GET: (_req, _ctx) => NextResponse.json({ message: "Hello World" }),
    });

    expect(GET).toBeDefined();
    expect(GET).toBeInstanceOf(Function);
    expectTypeOf(GET).toMatchTypeOf<NextRouteHandler>();
  });

  it("Node.js - A basic GET handlerwith typed parameters", () => {
    interface Params {
      message: string;
    }

    const { GET } = route<Params>({
      GET: (_req, _ctx) => NextResponse.json({ message: "Hello World" }),
    });

    expect(GET).toBeDefined();
    expect(GET).toBeInstanceOf(Function);
    expectTypeOf(GET).toMatchTypeOf<
      NextRouteHandler<Params, Response> | undefined
    >();
  });

  it("Edge - A basic GET handler using the `edge` runtime", () => {
    const { GET, runtime } = route({
      runtime: "edge",
      GET: (_req, _ctx) => NextResponse.json({ message: "Hello World" }),
    });

    expect(GET).toBeDefined();
    expect(GET).toBeInstanceOf(Function);
    expectTypeOf(GET).toMatchTypeOf<NextRouteHandler>();

    expect(runtime).toBeDefined();
    expect(runtime).toBe("edge");
    expectTypeOf(runtime).toMatchTypeOf<NextApiConfig["runtime"]>();
  });
});
