import { describe, it, expect, expectTypeOf } from "vitest";
import renderer from "react-test-renderer";

import { page } from ".";

import type { FC } from "react";

import type { NextPageProps } from "./page.action";
import type { ParamsValue } from "~/shared";

describe("page", () => {
  it("Just a basic page component", () => {
    const { Component } = page({
      Component: ({ params, searchParams }) => {
        expect(params).toBeDefined();
        expect(params).toBe({});
        expectTypeOf(searchParams).toMatchTypeOf<
          Record<string, ParamsValue> | undefined
        >();
        expect(searchParams).toBeDefined();
        expect(searchParams).toBe({});
        expectTypeOf(searchParams).toMatchTypeOf<
          Record<string, ParamsValue> | undefined
        >();

        return (
          <>
            <h1>Page</h1>
            <p>Params: {JSON.stringify(params)}</p>
            <p>Search params: {JSON.stringify(searchParams)}</p>
          </>
        );
      },
    });

    const ComponentJson = renderer
      .create(<Component params={{}} searchParams={{}} />)
      .toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).not.toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextPageProps>>();
  });

  it("Just a basic page component with typed parameters", () => {
    interface Params {
      foo: string;
    }

    interface SearchParams {
      bar: string;
    }

    const params = {
      foo: "bar",
    } satisfies Params;

    const searchParams = {
      bar: "baz",
    } satisfies SearchParams;

    const { Component } = page<Params>({
      Component: ({ params, searchParams }) => {
        expect(params).toBeDefined();
        expect(params).toBe({});
        expectTypeOf(searchParams).toMatchTypeOf<
          Record<string, ParamsValue> | undefined
        >();
        expect(searchParams).toBeDefined();
        expect(searchParams).toBe({});
        expectTypeOf(searchParams).toMatchTypeOf<
          Record<string, ParamsValue> | undefined
        >();

        return (
          <>
            <h1>Page</h1>
            <p>Params: {JSON.stringify(params)}</p>
            <p>Search params: {JSON.stringify(searchParams)}</p>
          </>
        );
      },
    });

    const ComponentJson = renderer
      .create(<Component params={params} searchParams={searchParams} />)
      .toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).not.toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextPageProps<Params>>>();
  });
});
