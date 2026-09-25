import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

export type ShopGridTile = {
  /** Column, counted in cells from the horizontal centre (negative = left). */
  x: number;
  /** Row, counted in cells from the top. */
  y: number;
  /** Seconds; negative values start the tile mid-cycle so some are lit on first paint. */
  delay: number;
  className?: string;
};

export type ShopGridBeam = {
  /** "x" runs left→right along row `at`; "y" runs top→bottom along column `at`. */
  axis: "x" | "y";
  at: number;
  delay: number;
  duration: number;
  className?: string;
};

/**
 * Decorative grid of storefront tiles: tiles light up like shops going live and beams run along
 * the lines like orders moving through the platform. CSS-only (see "Shop grid" in globals.css);
 * position it with utilities and pick a mask class (`shop-grid-hero`, `shop-grid-cta`).
 */
export function ShopGrid({
  tiles,
  beams,
  className,
}: {
  tiles: ReadonlyArray<ShopGridTile>;
  beams: ReadonlyArray<ShopGridBeam>;
  className?: string;
}) {
  return (
    <div className={cn("shop-grid", className)} aria-hidden="true">
      {tiles.map((tile) => (
        <span
          key={`${tile.x}:${tile.y}`}
          className={cn("shop-grid-tile", tile.className)}
          style={{ "--x": tile.x, "--y": tile.y, "--delay": `${tile.delay}s` } as CSSProperties}
        />
      ))}
      {beams.map((beam) => (
        <span
          key={`${beam.axis}:${beam.at}`}
          className={cn(
            beam.axis === "x" ? "shop-grid-beam-x" : "shop-grid-beam-y",
            beam.className,
          )}
          style={
            {
              "--at": beam.at,
              "--delay": `${beam.delay}s`,
              "--duration": `${beam.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
