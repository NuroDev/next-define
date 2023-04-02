import { describe, it, expect, expectTypeOf } from "vitest";
import renderer from "react-test-renderer";

import { layout } from ".";

import type { FC, ReactNode } from "react";

import type { NextLayoutProps } from "./layout.action";

describe("layout", () => {
  it("Just a basic layout wrapper component", () => {
    const Component = layout(({ children, params }) => {
      expect(params).toBeDefined();
      expect(params).toBe({});
      expectTypeOf(children).toMatchTypeOf<ReactNode>();

      return <>{children}</>;
    });

    const ComponentJson = renderer
      .create(<Component children={<></>} params={{}} />)
      .toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).not.toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextLayoutProps>>();
  });
});
