import { defineError } from "./error";
import { defineLayout } from "./layout";
import { definePage } from "./page";
import { defineRoute } from "./route";

export { defineError, defineLayout, definePage, defineRoute };

export default {
  defineError,
  defineLayout,
  definePage,
  defineRoute,
} as const;
