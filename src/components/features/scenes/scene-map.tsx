import type { ReactNode } from "react";

import { CustomizerScene, PageBuilderScene, ThemesScene } from "./build";
import { AnalyticsScene, CustomersScene, PixelsScene } from "./grow";
import { BkashScene, CodScene, CourierScene, DeliveryRatesScene } from "./payments";
import { CouponScene, CheckoutScene, OrdersScene, ProductScene } from "./sell";
import { DomainScene, StaffScene } from "./run";

/** Demo scene for each showcased feature id (see `highlightIds` in ../areas.ts). */
export const featureScenes: Readonly<Record<string, ReactNode>> = {
  "preset-themes": <ThemesScene />,
  "theme-customizer": <CustomizerScene />,
  "page-builder": <PageBuilderScene />,
  "product-management": <ProductScene />,
  "guest-checkout": <CheckoutScene />,
  "order-management": <OrdersScene />,
  coupons: <CouponScene />,
  "cod-payment": <CodScene />,
  "bkash-payments": <BkashScene />,
  "courier-integrations": <CourierScene />,
  "delivery-rates": <DeliveryRatesScene />,
  "analytics-dashboard": <AnalyticsScene />,
  "ad-pixels": <PixelsScene />,
  "customer-crm": <CustomersScene />,
  "custom-domains": <DomainScene />,
  "staff-permissions": <StaffScene />,
};
