import { error } from "./error";
import { layout } from "./layout";
import { page } from "./page";
import { route } from "./route";

export { error, layout, page, route };

export default {
  error,
  layout,
  page,
  route,
} as const;
