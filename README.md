# Next Chakra Starter

Starter project built with Next.js App Router, TypeScript, and Chakra UI.

This repo is set up for a theme-first workflow:

- Design tokens and component variants live in Chakra `extendTheme`
- Base UI wrappers live under `src/components/ui`
- Shared layout pieces like Header and Footer live under `src/components/layout`
- Personal promotion links are centralized in `src/config/profile.ts`

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in the browser.

Useful commands:

```bash
npm run dev
npm run lint
npm run build
```

## Project Structure

```text
src/
	app/
		layout.tsx              # Root layout
		page.tsx                # Starter homepage
	components/
		layout/                 # Header, Footer, app shell
		ui/                     # Base Chakra wrapper components
	config/
		profile.ts              # LinkedIn / GitHub links
	providers/
		chakra-provider.tsx     # ChakraProvider setup
	theme/
		index.ts                # extendTheme and UI guidelines
```

## Where To Change UI Guidelines

If you want to change the overall UI direction, start here:

`src/theme/index.ts`

This file is the main UI guideline source for the starter. It currently controls:

- colors like `brand` and `ink`
- fonts for `heading` and `body`
- global page styles in `styles.global`
- Chakra component variants for `Button`, `Box`, `Text`, `Heading`, and `Link`

### Common Theme Edits

Change brand colors:

- Update the `brand` color scale in `src/theme/index.ts`

Change the page background or default text color:

- Update `styles.global`

Change heading scale:

- Update `components.Heading.variants`
- Current heading variants use semantic names: `h1` to `h6`

Change button look and feel:

- Update `components.Button.baseStyle`
- Update `components.Button.variants.solid`, `outline`, or `subtle`

Change content surface/card look:

- Update `components.Box.variants.surface`, `outline`, or `accent`

## How To Use The Base UI Components

Base wrappers are exported from:

`src/components/ui/index.ts`

Available components:

- `Button`
- `Box`
- `Text`
- `Heading`
- `Link`

These wrappers are intentionally thin. The styling is supposed to come from the Chakra theme, not from ad hoc per-page overrides.

Example:

```tsx
import { Box, Button, Heading, Text } from "@/components/ui";

export function ExampleCard() {
  return (
    <Box variant="surface" p={6}>
      <Heading as="h2" variant="h3">
        Example title
      </Heading>
      <Text variant="muted">Example description</Text>
      <Button mt={4}>Read more</Button>
    </Box>
  );
}
```

## Where To Edit Header And Footer

Shared site shell files:

- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`
- `src/components/layout/app-shell.tsx`

Use these files when you want to:

- change the nav items
- change the CTA button in the header
- add social links
- update footer copy

## Where To Edit Your Personal Links

Edit:

`src/config/profile.ts`

This file controls the links used to promote yourself in the layout.

Current setup:

- Header CTA uses `linkedIn`
- Footer includes `github`

Example:

```ts
export const profileLinks = {
  linkedIn: {
    href: "https://www.linkedin.com/in/your-handle/",
    label: "Connect on LinkedIn",
  },
  github: {
    href: "https://github.com/your-handle",
    label: "GitHub",
  },
};
```

## Recommended Workflow

When making UI changes, use this order:

1. Update tokens and variants in `src/theme/index.ts`
2. Reuse the base UI wrappers from `src/components/ui`
3. Only add one-off page styles when the theme variant really should not be shared

This keeps the starter scalable and prevents every page from inventing its own styling rules.

## Notes

- Chakra UI is wired through `src/providers/chakra-provider.tsx`
- The app uses Next.js App Router
- Fonts are loaded in `src/app/layout.tsx`
- The homepage in `src/app/page.tsx` is meant to be a starter showcase, not a final landing page

## References

- Next.js docs: https://nextjs.org/docs
- Chakra UI docs: https://chakra-ui.com/docs
- Chakra theme customization: https://chakra-ui.com/docs/styled-system/customize-theme
