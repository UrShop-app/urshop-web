import { cn } from "@/lib/utils";

/**
 * Material Symbols Outlined icons, the icon font used by the design.
 *
 * The root layout loads the font from Google Fonts subset to exactly these names, so add a
 * name here before using a new icon (browse them at https://fonts.google.com/icons).
 */
export const ICON_NAMES = [
  "account_balance_wallet",
  "admin_panel_settings",
  "ads_click",
  "apps",
  "arrow_back",
  "arrow_forward",
  "auto_awesome",
  "check_circle",
  "close",
  "contact_support",
  "content_copy",
  "dashboard_customize",
  "desktop_windows",
  "forum",
  "group",
  "handshake",
  "insights",
  "inventory_2",
  "language",
  "local_fire_department",
  "local_shipping",
  "location_on",
  "lock",
  "mail",
  "menu_book",
  "monitoring",
  "palette",
  "pause",
  "payments",
  "play_arrow",
  "privacy_tip",
  "receipt_long",
  "route",
  "schedule",
  "search",
  "sell",
  "settings",
  "shopping_bag",
  "shopping_cart_checkout",
  "smartphone",
  "stars",
  "storefront",
  "tablet_mac",
  "translate",
  "tune",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

// Google requires `icon_names` to be sorted. `display=block` hides the ligature text
// (e.g. "check_circle") until the font has loaded.
export const ICON_FONT_STYLESHEET = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=${[...ICON_NAMES].sort().join(",")}&display=block`;

/**
 * Google's `.material-symbols-outlined` rule is unlayered and fixes `font-size: 24px`, so
 * Tailwind text-size utilities do not resize icons (same as the approved build).
 */
export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <span aria-hidden="true" translate="no" className={cn("material-symbols-outlined", className)}>
      {name}
    </span>
  );
}
