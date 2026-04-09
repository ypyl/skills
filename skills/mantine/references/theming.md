# Mantine Theming & Styling Reference

## MantineProvider

Wrap your app with `MantineProvider` at the root. It provides theme context and manages color scheme.

```tsx
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  // theme overrides here
});

function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <MyApp />
    </MantineProvider>
  );
}
```

Key props:
- `theme` — Theme override object (merged with defaults)
- `defaultColorScheme` — `'light'` (default), `'dark'`, or `'auto'`
- `forceColorScheme` — Force a color scheme, ignores user preference
- `colorSchemeManager` — Custom storage for color scheme (default: localStorage)
- `cssVariablesSelector` — CSS selector for variables (default: `:root` and `:host`)
- `withCssVariables` — Whether to inject CSS variables (default: `true`)
- `classNamesPrefix` — Prefix for static classes (default: `'mantine'`)
- `env` — Set to `'test'` to disable transitions/portals in tests

## Theme Object

Create with `createTheme()`. Key properties:

```tsx
const theme = createTheme({
  fontFamily: 'Inter, sans-serif',
  fontFamilyMonospace: 'Fira Code, monospace',
  headings: { fontFamily: 'Inter, sans-serif' },
  primaryColor: 'blue',
  defaultRadius: 'md', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  white: '#fff',
  black: '#000',
  colors: {
    // Override existing (10 shades each): 'dark' -> ['color1', ..., 'color10']
    // Or add custom colors
    brand: ['#ffe0ec', '#fcc2d2', ...],
  },
  spacing: { xs: '0.625rem', sm: '0.75rem', ... },
  fontSizes: { xs: '0.6875rem', sm: '0.75rem', ... },
  lineHeights: { xs: 1.4, sm: 1.45, ... },
  radius: { xs: '0.125rem', sm: '0.25rem', ... },
  shadows: { xs: '0 1px 3px 0 rgba(0,0,0,0.05)', ... },
  breakpoints: { xs: '36em', sm: '48em', md: '62em', lg: '75em', xl: '88em' },
  cursorType: 'pointer', // or 'default'
  components: {
    Button: Button.extend({
      defaultProps: { size: 'sm' },
      classNames: { root: classes.myButton },
    }),
  },
});
```

## Color Schemes

Mantine supports `light`, `dark`, and `auto` color schemes.

```tsx
import { useMantineColorScheme, useComputedColorScheme } from '@mantine/core';

function MyComponent() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');
  // colorScheme can be 'light' | 'dark' | 'auto'
  // computedColorScheme resolves 'auto' to actual value
}
```

For Next.js, add `ColorSchemeScript` to `<head>` and `mantineHtmlProps` to `<html>`:

```tsx
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

<html lang="en" {...mantineHtmlProps}>
  <head><ColorSchemeScript defaultColorScheme="auto" /></head>
</html>
```

## CSS Variables

Mantine generates CSS variables from the theme. Access them in CSS:

```css
/* Color variables */
var(--mantine-color-blue-7)
var(--mantine-color-red-filled)
var(--mantine-color-body)
var(--mantine-color-text)

/* Spacing */
var(--mantine-spacing-md)
var(--mantine-spacing-xl)

/* Font sizes */
var(--mantine-font-size-md)
var(--mantine-font-size-xl)

/* Radius */
var(--mantine-radius-md)
var(--mantine-radius-xl)

/* Breakpoints (use in JS, not CSS) */
/* In CSS modules, use $mantine-breakpoint-xs etc. */
```

## Custom CSS Variables Resolver

Add custom CSS variables based on theme or color scheme:

```tsx
const theme = createTheme({
  cssVariablesResolver: (theme) => ({
    variables: {
      '--app-border-radius': theme.defaultRadius as string,
    },
    light: {
      '--app-background': '#f8f9fa',
    },
    dark: {
      '--app-background': '#1a1b1e',
    },
  }),
});
```

## Style Props

All Mantine components accept style props for common CSS properties:

```tsx
<Text
  c="blue.7"           // color
  bg="var(--mantine-color-blue-0)" // background
  fz="xl"             // fontSize
  fw={700}            // fontWeight
  ta="center"         // textAlign (ta, not textAlign)
  lh="md"             // lineHeight
  m="md"              // margin
  p="lg"              // padding
  mt="xs"             // marginTop
  py="sm"             // paddingY
  mx="auto"           // marginX
  w={200}             // width
  h={100}             // height
  miw={300}           // minWidth
  maw={500}           // maxWidth
  pos="relative"      // position
  top={10}            // top
  display="flex"      // display (also: hiddenFrom, visibleFrom)
  ff="monospace"      // fontFamily
  fs="italic"         // fontStyle
  td="underline"      // textDecoration
/>
```

Responsive values with object syntax:

```tsx
<Box w={{ base: 200, sm: 400, lg: 600 }} />
```

## Styles API

Every Mantine component supports `classNames`, `styles`, and `vars` props for customization.

### classNames (recommended)

```tsx
import classes from './Button.module.css';

<Button classNames={{ root: classes.root, label: classes.label }} />
```

### styles (inline, higher specificity, less performant)

```tsx
<Button styles={{ root: { backgroundColor: 'red' }, label: { color: 'blue' } }} />
```

### vars (component CSS variables)

```tsx
<Button vars={{ root: { '--button-height': '60px' } }} />
```

### Theme-level customization

```tsx
const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: { root: classes.myButton },
      defaultProps: { size: 'sm' },
      vars: (theme, props) => ({
        root: {
          '--button-height': props.size === 'xxl' ? '60px' : undefined,
        },
      }),
    }),
  },
});
```

## CSS Modules with Mantine

Style Mantine components using CSS modules. Import the module and apply to `classNames`:

```tsx
import classes from './MyComponent.module.css';
import { Button } from '@mantine/core';

<Button classNames={{ root: classes.customButton }} />
```

In your `.module.css`, use Mantine's PostCSS functions and CSS variables:

```css
.customButton {
  background: var(--mantine-color-blue-7);
  border-radius: var(--mantine-radius-md);
  padding: rem(12px) rem(24px);
  font-size: var(--mantine-font-size-md);

  &:hover {
    background: lighten(var(--mantine-color-blue-7), 0.1);
  }

  @mixin hover {
    background: var(--mantine-color-blue-8);
  }
}
```

## PostCSS Functions

Available in `.css` files when `postcss-preset-mantine` is configured:

- `rem(value)` — Convert px to rem: `rem(16px)` → `1rem`
- `em(value)` — Convert px to em: `em(16px)` → `1em`
- `lighten(color, amount)` — Lighten a color
- `darken(color, amount)` — Darken a color
- `rgba(color, alpha)` — Add alpha to a color
- `size(value)` — Apply size in rem with min-height
- `font-size(value)` — Apply font-size with line-height

## PostCSS Mixins

- `@mixin hover` — Apply styles on hover (respects reduced motion)
- `@mixin light { ... }` — Apply styles in light color scheme
- `@mixin dark { ... }` — Apply styles in dark color scheme
- `@mixin not-rtl { ... }` — Apply styles when not in RTL mode
- `@mixin rtl { ... }` — Apply styles when in RTL mode

## Responsive Styles

### Props
```tsx
<Button hiddenFrom="sm">Hidden on sm+</Button>
<Button visibleFrom="md">Visible on md+</Button>
<Box w={{ base: 100, sm: 200, lg: 300 }} />
```

### CSS Modules
```css
.element {
  @media (max-width: $mantine-breakpoint-sm) {
    font-size: var(--mantine-font-size-sm);
  }
}
```

### Container Queries (CSS inline-size)
```css
.parent {
  container-type: inline-size;
}

.child {
  @container (max-width: 500px) {
    background-color: var(--mantine-color-blue-7);
  }
}
```

## Default Props

Set default props for all instances of a component:

```tsx
const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        size: 'sm',
        variant: 'filled',
      },
    }),
  },
});
```

Or set `defaultProps` for all components:

```tsx
const theme = createTheme({
  defaultRadius: 'md',
  cursorType: 'pointer',
});
```

## Dark Mode Specific Styles

### As CSS modules
```css
/* In .module.css */
.button {
  background-color: var(--mantine-color-blue-6);
}

:where([data-mantine-color-scheme='dark']) .button {
  background-color: var(--mantine-color-blue-8);
}
```

### As inline styles
```tsx
<Button
  styles={(theme) => ({
    root: {
      backgroundColor: theme.colors.blue[6],
      ...(theme.colorScheme === 'dark' && { backgroundColor: theme.colors.blue[8] }),
    },
  })}
/>
```

## Polymorphic Components

Most Mantine components accept a `component` prop to change the rendered element:

```tsx
import Link from 'next/link';

<Button component={Link} href="/about">About</Button>
<Text component="span" size="sm">Inline text</Text>
<Box component="a" href="https://mantine.dev">Link box</Box>
```