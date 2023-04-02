import { describe, it, expect, expectTypeOf } from "vitest";
import renderer from "react-test-renderer";

import { page } from ".";

import type { FC } from "react";

describe("page", () => {
  it("Just a basic page component", () => {
    const { Component } = page({
      Component: () => <>Hello World</>,
    });

    const ComponentJson = renderer.create(<Component />).toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).not.toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<Record<string, any>>>();
  });

  it("Just a basic page component with typed props", () => {
    interface Props {
      foo: string;
    }

    const props = {
      foo: "bar",
    } satisfies Props;

    const { Component } = page<Props>({
      Component: (p) => {
        expect(p).toEqual(props);
        expectTypeOf(p).toMatchTypeOf<Props>();
        return <>Hello World</>;
      },
    });

    const ComponentJson = renderer.create(<Component {...props} />).toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).not.toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<Props>>();
  });

  it("A page component with `getServerSideProps`", () => {
    interface Props {
      name: string;
    }

    const props = {
      name: "John Doe",
    } satisfies Props;

    const { Component, getServerSideProps } = page({
      Component: (p) => {
        expect(p).toEqual(props);
        expectTypeOf(p).toMatchTypeOf<Props>();
        return <>Hello {props.name}</>;
      },
      getServerSideProps: () => ({
        props,
      }),
    });

    const ComponentJson = renderer.create(<Component {...props} />).toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<Props>>();

    expect(getServerSideProps).toBeDefined();
    expect(getServerSideProps).toBeInstanceOf(Function);
    expect(getServerSideProps).toMatchSnapshot(() => ({ props }));

    // TODO: Add type tests
  });

  it("A page component with `getStaticProps`", () => {
    interface Props {
      name: string;
    }

    const props = {
      name: "John Doe",
    } satisfies Props;

    const { Component, getStaticProps } = page({
      Component: (p) => {
        expect(p).toEqual(props);
        expectTypeOf(p).toMatchTypeOf<Props>();
        return <>Hello {props.name}</>;
      },
      getStaticProps: () => ({
        props,
      }),
    });

    const ComponentJson = renderer.create(<Component {...props} />).toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<Props>>();

    expect(getStaticProps).toBeDefined();
    expect(getStaticProps).toBeInstanceOf(Function);
    expect(getStaticProps).toMatchSnapshot(() => ({ props }));

    // TODO: Add type tests
  });

  it("A page component with `getStaticProps` & `getStaticPaths`", () => {
    interface Props {
      slug: string;
    }

    const props = {
      slug: "John Doe",
    } satisfies Props;

    const { Component, getStaticProps, getStaticPaths } = page({
      getStaticPaths: () => ({
        paths: [
          {
            params: { slug: "foo" },
          },
          {
            params: { slug: "bar" },
          },
        ],
        fallback: false,
      }),
      getStaticProps: () => ({
        props,
      }),
      Component: (p) => {
        expect(p).toEqual(props);
        expectTypeOf(p).toMatchTypeOf<Props>();
        return <>Hello {props.slug}</>;
      },
    });

    const ComponentJson = renderer.create(<Component {...props} />).toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<Props>>();

    expect(getStaticProps).toBeDefined();
    expect(getStaticProps).toBeInstanceOf(Function);
    expect(getStaticProps).toMatchSnapshot(() => ({ props }));

    expect(getStaticPaths).toBeDefined();
    expect(getStaticPaths).toBeInstanceOf(Function);
    expect(getStaticPaths).toMatchSnapshot(() => ({ props }));

    // TODO: Add type tests
  });
});
