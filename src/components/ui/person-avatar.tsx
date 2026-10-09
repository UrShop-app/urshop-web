import Image from "next/image";

import jamdani from "@/assets/people/merchant-woman-jamdani.webp";
import panjabi from "@/assets/people/merchant-man-panjabi.webp";
import hijab from "@/assets/people/merchant-woman-hijab.webp";
import creator from "@/assets/people/merchant-man-creator.webp";
import founder from "@/assets/people/merchant-woman-founder.webp";
import glasses from "@/assets/people/merchant-man-glasses.webp";
import { cn } from "@/lib/utils";

// Fictional, AI-generated Bangladeshi adults for illustrative merchant and customer UI.
const portraits = { jamdani, panjabi, hijab, creator, founder, glasses };

export type PersonPortrait = keyof typeof portraits;

/** Decorative portrait: the adjacent copy supplies the example person's name or role. */
export function PersonAvatar({
  portrait,
  size = 32,
  className,
}: {
  portrait: PersonPortrait;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={portraits[portrait]}
      alt=""
      width={size}
      height={size}
      sizes={`${size}px`}
      className={cn("shrink-0 rounded-full object-cover", className)}
    />
  );
}
