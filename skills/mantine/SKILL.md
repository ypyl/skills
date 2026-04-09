---
name: mantine
description: Build React UIs with Mantine component library. Use this skill whenever the user is working on a project that uses Mantine, or asks about Mantine components, hooks, forms, theming, or styling. Also use this skill when the user is building a React/Next.js UI and could benefit from using an existing Mantine component instead of building from scratch — even if they don't explicitly mention Mantine by name. Covers all @mantine/* packages including core, hooks, form, dates, charts, and extensions (notifications, modals, spotlight, etc.).
---

You are working in a project that uses the Mantine React component library. Your job is to write code that leverages Mantine's existing components, hooks, and utilities rather than recreating functionality from scratch.

## Core Principle: Use Mantine First

Before writing any custom UI code, check whether Mantine already provides what you need. Mantine is comprehensive — it includes 100+ components, 50+ hooks, a form library, a charting library, date/time pickers, and extensions for notifications, modals, spotlight, and more. Recreating what Mantine already provides wastes time and introduces inconsistencies.

When you recognize a common UI pattern, map it to the right Mantine component rather than writing it yourself:

| Need | Mantine component |
|------|-------------------|
| Layout | Container, Group, Stack, Flex, Grid, SimpleGrid, AppShell, AspectRatio |
| Typography | Text, Title, Highlight, Mark, Code, Blockquote, Kbd, List |
| Buttons & Actions | Button, ActionIcon, CloseButton, CopyButton, FileButton |
| Inputs | TextInput, NumberInput, PasswordInput, Textarea, Select, MultiSelect, Checkbox, Switch, Radio, Slider, RangeSlider, Rating, ColorInput, FileInput, PinInput, TagsInput |
| Overlays & Modals | Modal, Drawer, Dialog, Popover, Tooltip, HoverCard, Menu |
| Navigation | Tabs, NavLink, Breadcrumbs, Pagination, Stepper, Burger |
| Feedback | Alert, Notification, Progress, RingProgress, LoadingOverlay, Skeleton, Loader |
| Data Display | Table, Card, Badge, Avatar, Timeline, Accordion, Spoiler, Tree, Indicator |
| Forms | useForm hook from @mantine/form |
| Charts | AreaChart, BarChart, LineChart, PieChart, DonutChart, etc. from @mantine/charts |
| Dates | DatePickerInput, DateTimePicker, TimeInput, Calendar, etc. from @mantine/dates |
| Color scheme | useMantineColorScheme, useComputedColorScheme, ColorSchemeScript |
| Responsive | hiddenFrom/visibleFrom props, useMediaQuery, useMatches, Container queries |

This is not exhaustive — read the reference files or fetch docs from `https://mantine.dev/llms/<component-name>.md` when you need details.

## Project Setup

Mantine requires PostCSS and a provider wrapper. The setup varies by framework:

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
```

### Vite / Other Setup

```tsx
import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({ /* overrides */ });

function App() {
  return (
    <MantineProvider theme={theme}>
      <MyApp />
    </MantineProvider>
  );
}
```

PostCSS config (required for all setups):

```js
// postcss.config.cjs
module.exports = {
  plugins: {
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-xs': '36em',
        'mantine-breakpoint-sm': '48em',
        'mantine-breakpoint-md': '62em',
        'mantine-breakpoint-lg': '75em',
        'mantine-breakpoint-xl': '88em',
      },
    },
  },
};
```

## Key Patterns

### Forms with @mantine/form

Always use `useForm` from `@mantine/form` for form state management. It handles values, validation, errors, dirty/touched state, and list manipulation.

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';

const form = useForm({
  mode: 'uncontrolled',
  initialValues: { email: '', name: '' },
  validate: {
    email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
  },
});

// Bind inputs with form.getInputProps('fieldName')
// For uncontrolled mode, add key={form.key('fieldName')}
<TextInput
  key={form.key('email')}
  {...form.getInputProps('email')}
  label="Email"
/>
```

For schema validation (Zod, Yup, etc.), read `references/forms.md`.

### Styling

Prefer CSS modules (`.module.css`) for component styling. Use Mantine's CSS variables and PostCSS functions (`rem`, `em`, `lighten`, `darken`, `rgba`, etc.) inside `.css` files:

```css
/* Component.module.css */
.title {
  font-size: rem(24px);
  color: var(--mantine-color-blue-7);
  margin-bottom: var(--mantine-spacing-md);
}

.title:hover {
  background-color: var(--mantine-color-blue-light);
}
```

Use the `classNames` prop (not `styles`) for per-instance customization of Mantine components. The `styles` prop has higher specificity and worse performance:

```tsx
<Button classNames={{ root: classes.myButton, label: classes.myLabel }}>
  Styled button
</Button>
```

### Theming

Customize via `createTheme` and `MantineProvider`:

```tsx
const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  primaryColor: 'blue',
  defaultRadius: 'md',
  components: {
    Button: Button.extend({
      defaultProps: { size: 'sm' },
    }),
  },
});
```

### Server Components (Next.js App Router)

All Mantine components need client context. They render on both server and client, but compound components (`Popover.Target`) don't work in server components. Use flat imports instead:

```tsx
// Prefer this in server components:
import { Popover, PopoverTarget, PopoverDropdown } from '@mantine/core';

// Or add 'use client' at the top of the file:
'use client';
import { Popover } from '@mantine/core';
```

### Responsive Design

Use `hiddenFrom` and `visibleFrom` props on any Mantine component for breakpoint-based visibility:

```tsx
<Button hiddenFrom="sm">Hidden on sm+</Button>
<Button visibleFrom="md">Visible on md+</Button>
```

For responsive style values, use object syntax with `base` + breakpoint keys:

```tsx
<Box w={{ base: 200, sm: 400, lg: 600 }} py={{ base: 'xs', sm: 'md' }} />
```

## Reference Files

The following reference files provide deeper detail. Read them when the task involves these areas:

- **`references/theming.md`** — Theme object, MantineProvider, color schemes, CSS variables, default props, extending components
- **`references/styling.md`** — Styles API, CSS modules, PostCSS preset, responsive styles, style props, CSS variables list, data attributes
- **`references/forms.md`** — useForm API, validation, schema validation, nested fields, list manipulation, form context
- **`references/components.md`** — Full list of all Mantine components with one-line descriptions, organized by package

## Fetching Additional Docs

Each Mantine component has a dedicated doc page at `https://mantine.dev/llms/<component-name>.md`. For example:
- `https://mantine.dev/llms/core-button.md` for Button
- `https://mantine.dev/llms/hooks-use-form.md` for useForm
- `https://mantine.dev/llms/charts-area-chart.md` for AreaChart

When you need detailed API documentation for a specific component or hook that isn't in the bundled references, fetch it from these URLs. A full index of all available pages is at `https://mantine.dev/llms.txt`.

## Common Mistakes to Avoid

1. **Don't forget the PostCSS config.** Mantine's CSS functions (`rem`, `lighten`, etc.) won't work without `postcss-preset-mantine` configured. This is the single most common setup issue.

2. **Don't forget style imports.** Each `@mantine/*` package (except `@mantine/hooks`) needs its CSS imported: `import '@mantine/core/styles.css'`, `import '@mantine/dates/styles.css'`, etc.

3. **Don't build form state from scratch.** Use `useForm` from `@mantine/form`. It handles values, validation, errors, touched/dirty state, and has built-in support for Zod, Yup, and other schemas.

4. **Don't use `styles` prop as primary styling method.** Use `classNames` with CSS modules instead. The `styles` prop uses inline styles which have higher specificity and worse performance.

5. **Don't forget `ColorSchemeScript`** in Next.js `_document.tsx` (pages router) or `layout.tsx` (app router) — even if you only use one color scheme.

6. **Don't forget `mantineHtmlProps`** on the `<html>` element in Next.js to avoid hydration warnings.

7. **Don't use compound component syntax** (`Popover.Target`) in server components — use flat imports (`PopoverTarget`) or add `'use client'`.

8. **Don't bypass Mantine's layout components.** Need a horizontal row? Use `<Group>`. Vertical stack? `<Stack>`. Grid? `<Grid>` or `<SimpleGrid>`. Centered content? `<Center>`. Don't reinvent these with raw flexbox CSS.