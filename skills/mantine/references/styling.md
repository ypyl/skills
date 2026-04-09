# Mantine Styling Reference

## CSS Modules (Recommended Approach)

Mantine recommends CSS Modules as the primary styling approach. Use `.module.css` files with the `classNames` prop.

```tsx
import classes from './MyComponent.module.css';
import { Button } from '@mantine/core';

<Button classNames={{ root: classes.customButton }} />
```

### Using Mantine CSS Variables in CSS Modules

```css
.card {
  background-color: var(--mantine-color-body);
  border: 1px solid var(--mantine-color-default);
  border-radius: var(--mantine-radius-md);
  padding: var(--mantine-spacing-md);
}

.title {
  font-size: var(--mantine-font-size-xl);
  font-weight: 700;
  color: var(--mantine-color-text);
}

.subtitle {
  color: var(--mantine-color-dimmed);
  margin-top: var(--mantine-spacing-xs);
}
```

### PostCSS Functions in CSS Modules

```css
.element {
  /* These are processed by postcss-preset-mantine at build time */
  font-size: rem(16px);           /* Converted to rem units */
  padding: rem(12px) rem(24px);
  margin-bottom: em(32px);       /* Converted to em units */

  background: lighten(var(--mantine-color-blue-7), 0.1);
  border: 1px solid rgba(var(--mantine-color-blue-7-rgb), 0.3);
}

.element:hover {
  background: darken(var(--mantine-color-blue-7), 0.05);
}

.element h2 {
  font-size: rem(24px);
}
```

### PostCSS Mixins

```css
.hoverable {
  /* Respects prefers-reduced-motion */
  @mixin hover {
    background-color: var(--mantine-color-blue-8);
  }
}

.light-mode-only {
  @mixin light {
    background-color: var(--mantine-color-white);
  }
}

.dark-mode-only {
  @mixin dark {
    background-color: var(--mantine-color-dark-7);
  }
}

.rtl-aware {
  padding-left: var(--mantine-spacing-md);

  @mixin rtl {
    padding-left: 0;
    padding-right: var(--mantine-spacing-md);
  }
}
```

### Media Queries in CSS Modules

Use `$mantine-breakpoint-*` variables (requires `postcss-simple-vars`):

```css
.responsive {
  font-size: var(--mantine-font-size-sm);

  @media (min-width: $mantine-breakpoint-md) {
    font-size: var(--mantine-font-size-lg);
  }

  /* Alternative: use em() function */
  @media (min-width: em(768px)) {
    padding: var(--mantine-spacing-lg);
  }
}
```

## Styles API

Every Mantine component that supports Styles API has named selectors for its internal elements.

### classNames (Preferred)

Apply CSS module classes to component internals:

```tsx
<TextInput
  classNames={{
    root: classes.root,
    input: classes.input,
    label: classes.label,
    description: classes.description,
    error: classes.error,
    required: classes.required,
  }}
/>
```

### styles (Inline, Use Sparingly)

Apply inline styles to component internals. Higher specificity, less performant:

```tsx
<TextInput
  styles={{
    root: { marginBottom: '1rem' },
    input: { borderColor: 'red' },
  }}
/>
```

### Dynamic classNames/styles Based on Props

```tsx
const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: (_theme, props) => ({
        label: cx({ [classes.required]: props.required }),
      }),
    }),
  },
});
```

## Component CSS Variables

Most Mantine components define CSS variables for their internal styling. Override them via `vars` prop or theme:

```tsx
// Inline
<Button vars={{
  root: {
    '--button-height': '60px',
    '--button-padding-x': '30px',
    '--button-fz': '24px',
  },
}}>
  Custom size button
</Button>

// Theme-level
const theme = createTheme({
  components: {
    Button: Button.extend({
      vars: (theme, props) => {
        if (props.size === 'xxl') {
          return {
            root: {
              '--button-height': '60px',
              '--button-padding-x': '30px',
              '--button-fz': '24px',
            },
          };
        }
        return { root: {} };
      },
    }),
  },
});
```

## Style Props

All Mantine components accept style props:

### Spacing
`m` `mt` `mb` `ml` `mr` `mx` `my` `p` `pt` `pb` `pl` `pr` `px` `py`

### Sizing
`w` `h` `miw` `mih` `maw` `mah` `pos` `top` `bottom` `left` `right` `inset`

### Typography
`c` `bg` `fz` `fw` `ff` `fs` `ta` `lh` `td` `lts` `fst` `ttu`

### Layout
`display` `flex` `fd` `fw` `ai` `jc` `ac` `ag` `gap`

### Other
`bdrz` `opacity` `bd` `bds` `bdw` `overflow` `z` `visibleFrom` `hiddenFrom`

## Responsive Values

Use object syntax with `base` + breakpoint keys:

```tsx
<Box w={{ base: 200, sm: 400, lg: 600 }} />
<Text fz={{ base: 'sm', md: 'lg' }} />
<Stack gap={{ base: 'xs', sm: 'md' }}>
```

`base` = no breakpoint applied. `xs`/`sm`/`md`/`lg`/`xl` = `min-width` media queries.

## Global CSS Variables Available

### Colors
`--mantine-color-{name}-{shade}` — e.g., `--mantine-color-blue-7`
`--mantine-color-{name}-filled` — filled variant color
`--mantine-color-{name}-light` — light variant color
`--mantine-color-body` — body background
`--mantine-color-text` — text color
`--mantine-color-dimmed` — dimmed text
`--mantine-color-default` — default border color

### Spacing
`--mantine-spacing-{xs|sm|md|lg|xl}`

### Font
`--mantine-font-size-{xs|sm|md|lg|xl}`
`--mantine-font-family`
`--mantine-font-family-monospace`
`--mantine-line-height-{xs|sm|md|lg|xl}`

### Radius
`--mantine-radius-{xs|sm|md|lg|xl}`

### Shadows
`--mantine-shadow-{xs|sm|md|lg|xl}`

## Common Mantine CSS Variables for Components

Each component defines its own CSS variables. Check component docs for specifics. Common patterns:

```css
/* Button */
--button-height
--button-padding-x
--button-fz
--button-radius
--button-bg
--button-color
--button-bd

/* Input */
--input-height
--input-radius
--input-fz
--input-padding-x

/* Card */
--card-radius

/* Modal */
--modal-radius
--modal-size
```

## Performance Notes

- CSS modules (`.module.css`) are more performant than inline `styles` prop
- `classNames` prop is preferred over `styles` prop for styling
- `hiddenFrom`/`visibleFrom` props use global CSS classes (efficient)
- Responsive style props generate individual styles (less efficient for lists)
- Container queries are more efficient than `useMediaQuery` for SSR