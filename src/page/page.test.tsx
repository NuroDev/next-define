import { describe, it, expect } from "vitest";
import renderer from "react-test-renderer";

import { page } from ".";

describe("page", () => {
  it("Just a basic page component", () => {
    const { Component } = page({
      Component: () => <>Hello World</>,
    });

    const ComponentJson = renderer.create(<Component />).toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).not.toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
  });

  it("Just a basic page component with typed props", () => {
    interface Props {
      foo: string;
    }

    const { Component } = page<Props>({
      Component: () => <>Hello World</>,
    });

    const props = {
      foo: "bar",
    } satisfies Props;

    const ComponentJson = renderer.create(<Component {...props} />).toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).not.toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
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

    expect(getServerSideProps).toBeDefined();
    expect(getServerSideProps).toBeInstanceOf(Function);
    expect(getServerSideProps).toMatchSnapshot(() => ({ props }));
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

    expect(getStaticProps).toBeDefined();
    expect(getStaticProps).toBeInstanceOf(Function);
    expect(getStaticProps).toMatchSnapshot(() => ({ props }));
  });
});
