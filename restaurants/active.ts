import { jummaGujjar } from "./jumma-gujjar";
import type { RestaurantConfig } from "./types";

/**
 * THE ONE LINE THAT SAYS WHICH RESTAURANT THIS SITE IS.
 *
 * Only /app and /lib import this. Shared components never do: they receive
 * what they render as props, so they cannot depend on a particular restaurant.
 *
 * It is a plain import (not a registry) on purpose: fonts and images are
 * resolved at build time, so only the active restaurant may enter the bundle.
 *
 * New restaurant:  npm run new-restaurant -- <slug> "<Name>"   (rewrites this file)
 * Switch manually: change the import and the assignment below.
 */
export const restaurant: RestaurantConfig = jummaGujjar;
