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
  "api",
  "apps",
  "arrow_back",
  "arrow_downward",
  "arrow_forward",
  "arrow_upward",
  "auto_awesome",
  "autorenew",
  "badge",
  "block",
  "bug_report",
  "call_split",
  "campaign",
  "check",
  "check_circle",
  "close",
  "code",
  "construction",
  "contact_support",
  "content_copy",
  "dashboard_customize",
  "database",
  "desktop_windows",
  "devices",
  "dns",
  "domain_verification",
  "drag_indicator",
  "edit",
  "fact_check",
  "favorite",
  "forum",
  "group",
  "groups",
  "handshake",
  "help",
  "history",
  "https",
  "hub",
  "info",
  "insights",
  "inventory_2",
  "key",
  "keyboard",
  "language",
  "layers",
  "lightbulb",
  "link",
  "local_fire_department",
  "local_shipping",
  "location_on",
  "lock",
  "mail",
  "manage_accounts",
  "menu_book",
  "monitoring",
  "palette",
  "password",
  "pause",
  "payments",
  "person_add",
  "person_off",
  "play_arrow",
  "privacy_tip",
  "progress_activity",
  "public",
  "publish",
  "qr_code_2",
  "rate_review",
  "receipt_long",
  "restore",
  "rocket_launch",
  "route",
  "save",
  "schedule",
  "search",
  "sell",
  "send",
  "settings",
  "share",
  "shopping_bag",
  "shopping_cart_checkout",
  "smart_toy",
  "smartphone",
  "stars",
  "storefront",
  "support_agent",
  "tablet_mac",
  "terminal",
  "translate",
  "travel_explore",
  "trending_up",
  "tune",
  "unsubscribe",
  "verified_user",
  "visibility",
  "visibility_off",
  "web",
  "work",
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
