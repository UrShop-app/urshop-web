import type { IconName } from "@/components/ui/icon";

/**
 * What a visitor can write to us about. Shown as guidance next to the form and as the form's
 * "What's this about?" choice. `id` is the submitted value, so keep it stable once a backend
 * reads it.
 */
export const CONTACT_TOPICS = [
  {
    id: "sales",
    label: "Sales & getting started",
    icon: "storefront",
    guidance:
      "Thinking about UrShop for your shop? Tell us what you sell and how you take orders today, and we'll help you work out whether it fits.",
  },
  {
    id: "support",
    label: "Merchant support",
    icon: "contact_support",
    guidance:
      "Already selling on UrShop? Include your store name or web address. When you're signed in, you can also open a support ticket from your dashboard.",
  },
  {
    id: "partnership",
    label: "Partnerships & business",
    icon: "handshake",
    guidance:
      "Proposing an integration, a collaboration or another business arrangement? Tell us who you are and what you have in mind.",
  },
  {
    id: "general",
    label: "Something else",
    icon: "forum",
    guidance: "Questions about the company, the platform or anything not covered above.",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  label: string;
  icon: IconName;
  guidance: string;
}>;

export type ContactTopicId = (typeof CONTACT_TOPICS)[number]["id"];
