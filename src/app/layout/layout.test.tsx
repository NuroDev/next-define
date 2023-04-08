import { describe, it, expect, expectTypeOf } from "vitest";
import renderer from "react-test-renderer";

import { defineLayout } from ".";

import type { ReactNode } from "react";

import type { FC } from "~/shared";
import type { NextLayoutProps } from "./layout.action";

describe("layout", () => {
  it("Create a basic layout wrapper component", () => {
    const { Component } = defineLayout({
      Component: ({ children, params }) => {
        expect(params).toBeDefined();
        expect(params).toBeInstanceOf(Object);
        expectTypeOf(children).toMatchTypeOf<ReactNode>();

        return <>{children}</>;
      },
    });

    const ComponentJson = renderer
      .create(<Component children={<></>} params={{}} />)
      .toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextLayoutProps>>();
  });

  it("Create a basic layout wrapper component with typed parameters", () => {
    interface Params {
      foo: string;
    }

    const params = {
      foo: "bar",
    } satisfies Params;

    const { Component } = defineLayout<Params>({
      Component: ({ children, params }) => {
        expect(params).toBeDefined();
        expect(params).toBe(params);
        expectTypeOf(children).toMatchTypeOf<ReactNode>();

        return <>{children}</>;
      },
    });

    const ComponentJson = renderer
      .create(
        // @ts-expect-error Typed props means this always returns as a `FC` type & this function, like most, still don't support async components yet
        <Component children={<></>} params={params} />
      )
      .toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextLayoutProps<Params>>>();
  });
});
