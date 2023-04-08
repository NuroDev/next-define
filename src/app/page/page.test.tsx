import { describe, it, expect, expectTypeOf } from "vitest";
import renderer from "react-test-renderer";

import { definePage } from ".";

import type { NextPageProps } from "./page.action";
import type { FC, ParamsValue } from "~/shared";

describe("page", () => {
  it("Create a basic page component", () => {
    const { Component } = definePage({
      Component: ({ params, searchParams }) => {
        expect(params).toBeDefined();
        expect(params).toBeInstanceOf(Object);
        expectTypeOf(searchParams).toMatchTypeOf<
          Record<string, ParamsValue> | undefined
        >();
        expect(searchParams).toBeDefined();
        expect(searchParams).toBeInstanceOf(Object);
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
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextPageProps>>();
  });

  it("Create a basic page component with typed parameters", () => {
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

    const { Component } = definePage<Params>({
      Component: ({ params, searchParams }) => {
        expect(params).toBeDefined();
        expect(params).toBe(params);
        expectTypeOf(searchParams).toMatchTypeOf<
          Record<string, ParamsValue> | undefined
        >();
        expect(searchParams).toBeDefined();
        expect(searchParams).toBe(searchParams);
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
      .create(
        // @ts-expect-error Typed props means this always returns as a `FC` type & this function, like most, still don't support async components yet
        <Component params={params} searchParams={searchParams} />
      )
      .toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextPageProps<Params>>>();
  });
});
