# Blog images

Images for the UrShop blog (`/blog`). Generate them, name them exactly as below, drop them into
`public/images/blog/`, and rebuild. No code changes are needed: the site checks for each file at
build time and uses it once it exists. Until then, pages show the branded category artwork and
nothing (social previews, structured data) claims an image.

Code: `src/lib/blog-images.ts` (names, sizes, lookup) · alt text lives in each article file in
`src/data/blog/` (`heroAlt`, and `alt` on `figure` blocks).

## Summary

| What                      | Per article        | Total | Required?   |
| ------------------------- | ------------------ | ----- | ----------- |
| Hero (`hero.webp`)        | 1                  | 5     | Yes         |
| Social preview (`og.jpg`) | 1                  | 5     | Recommended |
| Square (`square.jpg`)     | 1                  | 5     | Optional    |
| 4:3 (`four-three.jpg`)    | 1                  | 5     | Recommended |
| In-article figures        | 1–2                | 6     | Yes         |
| Blog index preview        | `og-blog.jpg` once | 1     | Optional    |

Minimum useful set: **11 images** (5 heroes + 6 figures). Full set: 27.

## File layout

```
public/images/blog/
  og-blog.jpg                                   optional, /blog social preview
  how-to-start-online-store-bangladesh/
    hero.webp
    og.jpg
    square.jpg
    four-three.jpg
    product-photo-setup.webp
    packing-station.webp
  facebook-page-vs-ecommerce-website-bangladesh/
    hero.webp
    og.jpg
    square.jpg
    four-three.jpg
    inbox-vs-checkout.webp
  bkash-cash-on-delivery-ecommerce-bangladesh/
    hero.webp
    og.jpg
    square.jpg
    four-three.jpg
    two-statuses.webp
  pathao-vs-redx-vs-steadfast-ecommerce-courier/
    hero.webp
    og.jpg
    square.jpg
    four-three.jpg
    courier-test-log.webp
  ecommerce-seo-bangladesh/
    hero.webp
    og.jpg
    square.jpg
    four-three.jpg
    search-intent-map.webp
```

Folder names are the article slugs. Names are lowercase, hyphenated, and must match exactly.

## Technical specs

| File             | Size (px)   | Ratio  | Format | Target weight | Where it shows                                                              |
| ---------------- | ----------- | ------ | ------ | ------------- | --------------------------------------------------------------------------- |
| `hero.webp`      | 1600 × 900  | 16:9   | WebP   | ≤ 250 KB      | Top of the article, article cards (cropped to 2:1), fallback social preview |
| `og.jpg`         | 1200 × 630  | 1.91:1 | JPEG   | ≤ 300 KB      | Facebook, WhatsApp, LinkedIn, X link previews                               |
| `square.jpg`     | 1200 × 1200 | 1:1    | JPEG   | ≤ 300 KB      | Structured data only (Google can pick it for some results)                  |
| `four-three.jpg` | 1200 × 900  | 4:3    | JPEG   | ≤ 300 KB      | Structured data only (representative article image)                         |
| `<figure>.webp`  | 1600 × 900  | 16:9   | WebP   | ≤ 200 KB      | Inside the article, with a caption                                          |
| `og-blog.jpg`    | 1200 × 630  | 1.91:1 | JPEG   | ≤ 300 KB      | Social preview of `/blog`                                                   |

- Export in **sRGB**, strip metadata (EXIF/GPS).
- Social crawlers handle JPEG most reliably, so `og.jpg` stays JPEG. `square.jpg` and
  `four-three.jpg` also use JPEG.
- Compress before adding. For example, with [Squoosh](https://squoosh.app) (WebP quality ~80, JPEG
  quality ~82), or from the command line:

  ```bash
  cwebp -q 80 hero.png -o hero.webp
  ```

### Safe zones

- **Hero:** cards crop it to 2:1 (a band through the middle), so keep the subject inside the
  **central 1600 × 800** area and away from the left/right 8%.
- **OG:** previews may crop the edges slightly; keep the subject inside the **central 1080 × 520**.
- **Square:** centre the subject; it is shown whole.
- **4:3:** reframe the same hero/master artwork to 1200 × 900 without cutting important subjects.
  Existing square master adaptations can be cropped when they preserve the complete hero scene.

## Visual style (all images)

One consistent look across the blog, matching the site (bright, airy, cyan/blue accents):

- **Style:** soft 3D illustration, clay-like matte materials, rounded friendly shapes, gentle
  three-quarter/isometric view, soft studio light with subtle shadows.
- **Background:** off-white `#FAFBFD` fading to very light sky blue `#E0F2FE`. No busy scenes.
- **Palette:** cyan `#08C0D8`, deep blue `#0369A1`, light blue `#E0F2FE`, dark slate `#0F172A`
  for small details; warm neutrals (kraft brown for parcels) are fine.
- **Composition:** one clear idea per image, plenty of negative space.
- **People:** optional and stylised (clay figures), never realistic faces or a lookalike of a real
  person.

Base prompt to prepend to every subject below:

> Soft 3D clay-style illustration, gentle isometric three-quarter view, rounded friendly shapes,
> matte materials, soft studio lighting with subtle shadows, off-white background fading to very
> light sky blue, accent colors cyan #08C0D8 and deep blue #0369A1 with dark slate #0F172A
> details, minimal composition, generous negative space, no text, no letters, no numbers, no
> logos, no brand marks, no watermark.

## Rules (best practices)

1. **The image must match its alt text.** Alt text is already written (below) and is what screen
   readers and search engines read. If the image comes out differently, regenerate it, or change
   the alt text in the article file to describe what the image really shows.
2. **No text in images.** AI tools garble lettering, text can't be translated or read by screen
   readers, and it's unreadable at card size. If an image contains stray letters, regenerate it or
   paint them out.
3. **No logos or brand colors of real companies** (bKash, Pathao, RedX, Steadfast, Facebook,
   Google, WhatsApp). Logos are trademarks, and the articles don't endorse or rank anyone. Use
   generic shapes: a plain phone, a plain scooter, an unbranded parcel.
4. **No fake product screenshots.** Don't depict the UrShop dashboard or storefront as if it were
   real UI. Abstract blocks and simple shapes only.
5. **No invented evidence:** no star ratings, review counts, prices, currency amounts, charts with
   numbers, or "#1" badges.
6. **Decorative vs. informative:** heroes and figures support the text; the article must read
   completely without them (it does today).
7. **Keep weight down.** Images over the target weight slow the page on mobile data and hurt Core
   Web Vitals. The hero loads first, so it matters most.
8. **Don't reuse one image across articles.** Each article's images should be unique.

## Per-article briefs

Alt text below is copied from the article files; keep the two in sync.

### 1. How to Start an Online Store in Bangladesh

Folder: `how-to-start-online-store-bangladesh/`

**`hero.webp`** (also `og.jpg`, `square.jpg`, `four-three.jpg` as re-crops of the same scene)

- Subject: a phone standing upright showing an abstract online storefront (colored product tiles,
  no text), surrounded by a few kraft parcels, a shopping bag and a small delivery scooter.
- Prompt: _base prompt_ + "a smartphone standing upright in the center showing an abstract online
  store with colored product tiles, surrounded by kraft paper parcels, a shopping bag and a small
  delivery scooter".
- Alt: "Illustration of a phone showing a simple online storefront, surrounded by packed parcels,
  a shopping bag and a delivery scooter"

**`product-photo-setup.webp`** (section "Build your product catalog")

- Subject: a product (e.g. a folded scarf or a bottle) on a plain curved paper backdrop next to a
  bright window, a phone on a small tripod photographing it.
- Prompt: _base prompt_ + "a single product on a plain curved paper backdrop beside a bright
  window, a smartphone on a small tripod pointed at it, simple home photo setup".
- Alt: "Illustration of a product on a plain backdrop beside a bright window, photographed with a
  phone on a small tripod"
- Caption (in code): "Daylight, a plain background and a steady phone are enough for clear product
  photos."

**`packing-station.webp`** (section "Set up delivery and couriers")

- Subject: a tidy packing table with boxes, poly mailers, a tape dispenser and blank labels.
- Prompt: _base prompt_ + "a tidy packing table with cardboard boxes, poly mailer bags, a tape
  dispenser and blank shipping labels, parcels stacked ready for pickup".
- Alt: "Illustration of a packing table with boxes, poly mailers, tape and blank shipping labels
  ready for courier pickup"
- Caption: "Decide how each product is packed before launch, so every parcel survives the trip."

### 2. Facebook Page vs Ecommerce Website

Folder: `facebook-page-vs-ecommerce-website-bangladesh/`

**`hero.webp`** (+ `og.jpg`, `square.jpg`, `four-three.jpg`)

- Subject: two phones side by side. Left: a generic social feed with image posts and chat bubbles.
  Right: a clean product page with a large product image and a cyan buy button. No platform logos.
- Prompt: _base prompt_ + "two smartphones side by side, the left one showing a generic social
  media feed with photo posts and chat bubbles, the right one showing a clean product page with a
  large product image and a cyan buy button, no platform logos".
- Alt: "Illustration of two phones side by side: one showing a social media feed with chat
  bubbles, the other a product page with a buy button"

**`inbox-vs-checkout.webp`** (section "Where selling only in the inbox gets hard")

- Subject: left, a messy pile of overlapping chat bubbles; right, a neat stack of order cards in a
  list. A subtle arrow or flow from left to right.
- Prompt: _base prompt_ + "on the left a cluttered pile of overlapping chat message bubbles, on the
  right a neat organized list of order cards, a soft flow from chaos to order".
- Alt: "Illustration contrasting a cluttered chat inbox full of order messages with a tidy,
  structured order list"
- Caption: "Inbox orders arrive in pieces; a checkout collects them in one structured form."

### 3. bKash and Cash on Delivery

Folder: `bkash-cash-on-delivery-ecommerce-bangladesh/`

**`hero.webp`** (+ `og.jpg`, `square.jpg`, `four-three.jpg`)

- Subject: a parcel passing between two hands at a doorstep; on one side generic banknotes (no
  readable denominations), on the other a phone with a green check mark. No bKash pink or logo.
- Prompt: _base prompt_ + "a parcel being handed over at a doorstep between two clay hands,
  generic cash notes without numbers on one side, a smartphone showing a large check mark on the
  other side".
- Alt: "Illustration of a parcel being handed over at a doorstep, with cash on one side and a phone
  showing a payment confirmation on the other"

**`two-statuses.webp`** (section "Keep payment status and order status separate")

- Subject: a single order card with two separate horizontal progress tracks (dots and lines), one
  with a coin/wallet icon, one with a parcel/truck icon, at different stages.
- Prompt: _base prompt_ + "one large order card with two separate horizontal progress tracks made
  of dots and lines, the top track marked with a coin icon, the bottom track marked with a parcel
  icon, each at a different stage".
- Alt: "Illustration of an order card with two separate progress tracks, one for payment and one
  for delivery"
- Caption: "Paid or unpaid, and where the parcel is: two questions, tracked separately."

### 4. Pathao vs RedX vs Steadfast

Folder: `pathao-vs-redx-vs-steadfast-ecommerce-courier/`

**`hero.webp`** (+ `og.jpg`, `square.jpg`, `four-three.jpg`)

- Subject: a small shop building with three unbranded delivery scooters leaving along three
  different routes across a simple stylised map. Scooters in neutral/brand colors only, **not**
  in any courier's colors.
- Prompt: _base prompt_ + "a small shop building with three unbranded delivery scooters carrying
  parcels, each leaving along a different route across a simple stylized map, scooters in white,
  cyan and deep blue".
- Alt: "Illustration of three delivery scooters carrying parcels from one shop along different
  routes across a simple map"

**`courier-test-log.webp`** (section "Pathao, RedX and Steadfast: test with your own parcels")

- Subject: a clipboard with a grid of check marks and crosses (no numbers or words) beside three
  stacks of parcels.
- Prompt: _base prompt_ + "a clipboard with a simple grid of check marks and crosses, no words or
  numbers, beside three small stacks of kraft parcels".
- Alt: "Illustration of a clipboard log with rows of check marks and crosses, next to three stacks
  of parcels"
- Caption: "A simple log of your own parcels beats any ranking you read online."

### 5. Ecommerce SEO in Bangladesh

Folder: `ecommerce-seo-bangladesh/`

**`hero.webp`** (+ `og.jpg`, `square.jpg`, `four-three.jpg`)

- Subject: a large magnifying glass over an abstract search results page (bars instead of text),
  with product cards and a small category tree below. No Google colors or logo.
- Prompt: _base prompt_ + "a large magnifying glass hovering over an abstract search results page
  made of simple bars, with product cards and a small branching category tree below it".
- Alt: "Illustration of a magnifying glass over a search results page, with product cards and a
  small category tree beneath it"

**`search-intent-map.webp`** (section "Start with search intent")

- Subject: three search bars on the left, each flowing (soft curved lines) into a different page
  type on the right: a product page, a category grid, an article page.
- Prompt: _base prompt_ + "three abstract search bars on the left, each connected by soft curved
  lines to a different page on the right: a single product page, a grid of products, and an
  article page with an image and text lines".
- Alt: "Illustration of search queries flowing into three kinds of pages: a product page, a
  category page and an article"
- Caption: "Different searches need different pages; don't make one page do every job."

### Blog index (optional)

**`og-blog.jpg`**: a composition of small elements from the five heroes (phone storefront,
parcels, scooter, magnifying glass) arranged as a calm grid. Alt (in code): "UrShop Blog".

## OG and representative images

BlogPosting exposes available representative images in this order: `square.jpg` (1:1),
`four-three.jpg` (4:3), `hero.webp` (16:9). Only existing files are included. `og.jpg` is used only
for Open Graph/Twitter previews, never in the BlogPosting image array. This matches
[Google's Article image guidance](https://developers.google.com/search/docs/appearance/structured-data/article).

The simplest route is to re-crop the same hero/master scene to 1200 × 630, 1200 × 900 and
1200 × 1200 (extend the background if needed). Preserve all existing imagery when adding the
4:3 variant; use the existing lossless master where available. The current JPEG export settings
are quality 88, progressive MozJPEG, opaque sRGB with EXIF/GPS and other metadata stripped.

If you want the article title on the social preview, add it in a design
tool (not the AI generator): Plus Jakarta Sans ExtraBold, dark slate `#0F172A`, left-aligned inside
the safe zone, at most two lines.

## After adding images

1. Check names and sizes against the tables above.
2. Run `pnpm build`. Images are detected at build time; a running dev server may need a restart.
3. Open an article: the hero appears under the title, figures appear in their sections with
   captions, and cards on `/blog`, the home page and "Keep reading" show the hero.
4. Check a link preview with the
   [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and structured data
   with Google's [Rich Results Test](https://search.google.com/test/rich-results).
5. Adding a new figure later: add a `figure` block with `image`, `alt` and `caption` to the article
   file, then drop `<image>.webp` into the article's folder.
