import { describe, it, expect, expectTypeOf } from "vitest";
import renderer from "react-test-renderer";

import { defineError } from ".";

import type { FC } from "react";

import type { NextErrorPageProps } from "./error.action";

describe("error", () => {
  it("Create a basic error page component", () => {
    const Component = defineError(({ error, reset }) => {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(Error);
      expect(reset).toBeDefined();
      expect(reset).toBeInstanceOf(Function);
      expectTypeOf(reset).toMatchTypeOf<() => void>();

      return (
        <>
          <h1>Error Page</h1>
          <p>{error.message}</p>
          <button onClick={reset} type="button">
            Retry
          </button>
        </>
      );
    });

    const ComponentJson = renderer
      .create(<Component error={new Error()} reset={() => {}} />)
      .toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextErrorPageProps>>();
  });
});
