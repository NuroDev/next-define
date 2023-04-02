import { describe, it, expect, expectTypeOf } from "vitest";
import renderer from "react-test-renderer";

import { error } from ".";

import type { FC } from "react";

import type { NextErrorPageProps } from "./error.action";

describe("error", () => {
  it("Just a basic error page component", () => {
    const Component = error(({ error, reset }) => (
      <>
        <h1>Error Page</h1>
        <p>{error.message}</p>
        <button onClick={reset} type="button">
          Retry
        </button>
      </>
    ));

    const ComponentJson = renderer
      .create(<Component error={new Error()} reset={() => {}} />)
      .toJSON();
    expect(ComponentJson).toBeDefined();
    expect(ComponentJson).not.toBeInstanceOf(Array);
    expect(ComponentJson).toMatchSnapshot();
    expectTypeOf(Component).toMatchTypeOf<FC<NextErrorPageProps>>();
  });
});
