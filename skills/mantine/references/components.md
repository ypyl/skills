# Mantine Components Reference

## @mantine/core Components

### Layout
- **AppShell** — Responsive shell with header, navbar, aside, footer
- **AspectRatio** — Maintain responsive consistent width/height ratio
- **Box** — Base component, polymorphic via `component` prop
- **Center** — Centers content vertically and horizontally
- **Container** — Center content with padding and max-width
- **Flex** — Compose elements in a flex container
- **Grid** — Responsive 12-column grid system
- **Group** — Compose elements in a horizontal flex container
- **SimpleGrid** — Responsive grid with equal-width items
- **Space** — Add horizontal or vertical spacing from theme
- **Stack** — Compose elements in a vertical flex container

### Typography
- **Blockquote** — Blockquote with optional cite
- **Code** — Inline and block code
- **Highlight** — Highlight part of a string with mark
- **Kbd** — Display keyboard key
- **List** — Display ordered or unordered list
- **Mark** — Highlight part of text
- **Text** — Display text with theme styles
- **Title** — h1-h6 heading
- **TypographyStylesProvider** — Styles provider for HTML content

### Buttons & Actions
- **ActionIcon** — Icon button
- **Button** — Button component to render button or link (polymorphic)
- **CloseButton** — Button with close icon
- **CopyButton** — Copies given text to clipboard
- **FileButton** — Open file picker with a button click
- **UnstyledButton** — Unstyled polymorphic button

### Inputs
- **Autocomplete** — Autocomplete user input with suggestions
- **Checkbox** — Capture boolean input
- **Chip** — Pick one or multiple values with inline controls
- **ColorInput** — Capture color from user
- **ColorPicker** — Pick colors in hex(a), rgb(a), hsl(a), hsv(a) formats
- **FileInput** — Capture files from user
- **Input** — Base component to create custom inputs
- **JsonInput** — Capture JSON data from user
- **MultiSelect** — Custom searchable multi-select
- **NativeSelect** — Native select element based on Input
- **NumberInput** — Capture number from user
- **PasswordInput** — Capture password data from user
- **PinInput** — Capture pin code or one-time password
- **PillsInput** — Base component for custom tags inputs and multi-selects
- **Radio** — Wrapper for input type radio
- **Rating** — Pick and display rating
- **Select** — Custom searchable select
- **Slider** — Slider component
- **RangeSlider** — Range slider component
- **Switch** — Capture boolean input (toggle)
- **TagsInput** — Capture a list of values with free input and suggestions
- **Textarea** — Autosize or regular textarea
- **TextInput** — Capture string input from user

### Overlays & Modals
- **Dialog** — Fixed overlay dialog at any side of the screen
- **Drawer** — Overlay area at any side of the screen
- **Modal** — Accessible overlay dialog
- **Popover** — Display popover relative to target element
- **Tooltip** — Renders tooltip on mouse over or other event
- **HoverCard** — Display popover section when target element is hovered

### Navigation
- **Accordion** — Divide content into collapsible sections
- **Anchor** — Display link with theme styles
- **Breadcrumbs** — Separates list of react nodes with given separator
- **Burger** — Open/close navigation button
- **NavLink** — Navigation link
- **Pagination** — Display active page and navigate between pages
- **Stepper** — Display content divided into a steps sequence
- **Tabs** — Switch between different views

### Feedback
- **Alert** — Attract user attention with important static message
- **Indicator** — Display element at the corner of another element
- **Loader** — Indicate loading state
- **LoadingOverlay** — Overlay with centered loader
- **Notification** — Show dynamic notifications and alerts (part of notifications system)
- **Progress** — Give user feedback for status of the task
- **RingProgress** — Give user feedback with circle diagram
- **SemiCircleProgress** — Represent progress with semi circle diagram
- **Skeleton** — Indicate content loading state

### Data Display
- **Avatar** — Display user profile image, initials or fallback icon
- **Badge** — Display badge, pill, or tag
- **Card** — Card with sections
- **Divider** — Horizontal line with optional label or vertical divider
- **Image** — Image with optional fallback
- **Table** — Render table with theme styles
- **TableOfContents** — List of headings, tracks current heading visible in viewport
- **Timeline** — Display list of events in chronological order
- **Tree** — Display a tree structure

### Miscellaneous
- **Affix** — Renders children inside portal at fixed position
- **BackgroundImage** — Displays image as background
- **Collapse** — Animate presence with slide down/up transition
- **Fieldset** — Group related elements in a form
- **FloatingIndicator** — Display a floating indicator over a group of elements
- **FloatingWindow** — Draggable floating area
- **FocusTrap** — Trap focus at child node
- **Marquee** — Create continuous scrolling animation
- **Menu** — Combine secondary actions into single interactive area
- **Overlay** — Overlay parent element with div
- **Paper** — Renders white or dark background depending on color scheme
- **Pill** — Removable and non-removable tags
- **Portal** — Renders component outside parent element tree
- **ScrollArea** — Area with custom scrollbars
- **Scroller** — Horizontal scroll container with navigation controls
- **SegmentedControl** — A linear set of two or more segments
- **Spoiler** — Hide long sections of content
- **ThemeIcon** — Render icon inside element with theme colors
- **Transition** — Animate presence of component with pre-made animations
- **VisuallyHidden** — Hide element visually but keep accessible for screen readers
- **NumberFormatter** — Format number with thousands/decimal separators

### Color Pickers (Sub-components)
- **AlphaSlider** — Slider for selecting alpha channel (0–1)
- **AngleSlider** — Pick angle value between 0 and 360
- **ColorSwatch** — Displays color
- **HueSlider** — Slider for selecting hue channel

## @mantine/hooks

### DOM
- **useClickOutside** — Call callback on click outside element
- **useDisclosure** — Manage open/close state
- **useFocusTrap** — Trap focus at child node
- **useFocusWithin** — Determine if any element within has focus
- **useIntersection** — Observe intersection of element with viewport
- **useInViewport** — Determine if element is in viewport
- **useElementSize** — Get element width/height, observe changes with ResizeObserver
- **useResizeObserver** — Observe element size changes
- **useViewportSize** — Get viewport width/height

### State
- **useCounter** — Manage counter state
- **useDebouncedCallback** — Debounce callback
- **useDebouncedState** — Debounce state changes
- **useDebouncedValue** — Debounce value changes
- **useForm** — (in @mantine/form, see forms reference)
- **useIdle** — Detect user idle state
- **useInputState** — Manage input state
- **useListState** — Manage list state
- **useLocalClipboard** — Copy to clipboard
- **useMap** — Manage Map state
- **usePrevious** — Get previous value
- **useQueue** — Manage queue state
- **useSet** — Manage Set state
- **useSetState** — Manage partial state
- **useToggle** — Toggle between values
- **useUncontrolled** — Manage uncontrolled state
- **useValidatedState** — Manage validated state

### Events & UX
- **useDocumentTitle** — Set document title
- **useDocumentVisibility** — Track document visibility
- **useEventListener** — Add event listener to element
- **useFullscreen** — Toggle fullscreen mode
- **useHash** — Get/set URL hash
- **useHeadroom** — Hide/show header on scroll
- **useHotkeys** — Manage keyboard shortcuts
- **useHover** — Detect hover state
- **useLongPress** — Detect long press
- **useMediaQuery** — Match media query
- **useMouse** — Track mouse position
- **useMove** — Handle drag interactions
- **useNetwork** — Get network status
- **useOs** — Detect operating system
- **usePageLeave** — Call callback when user leaves page
- **useRadialMove** — Handle radial interactions
- **useScrollDirection** — Track scroll direction
- **useScrollIntoView** — Scroll element into view
- **useScrollSpy** — Track scroll position
- **useTextSelection** — Get selected text
- **useWindowEvent** — Add event listener to window
- **useWindowScroll** — Manage window scroll position

### Time
- **useInterval** — Run callback at interval
- **useTimeout** — Run callback after delay

### Misc
- **useClipboard** — Copy text to clipboard
- **useEyeDropper** — Pick colors from screen
- **useFavicon** — Set favicon
- **useFileDialog** — Open file dialog
- **useForceUpdate** — Force component re-render
- **useId** — Generate unique ID
- **useIsomorphicEffect** — UseEffect on client, useLayoutEffect on server
- **useLogger** — Log component lifecycle
- **useMergedRef** — Merge refs
- **useMounted** — Check if component is mounted
- **useMutationObserver** — Observe DOM mutations
- **useOrientation** — Get device orientation
- **useReducedMotion** — Detect reduced motion preference
- **useSearchParams** — Manage URL search params
- **useShallowEffect** — Run effect with shallow comparison
- **useStateHistory** — Manage state with history
- **useThrottledCallback** — Throttle callback
- **useThrottledState** — Throttle state changes
- **useThrottledValue** — Throttle value changes

## @mantine/form

See `references/forms.md` for full details.

- **useForm** — Manage form state, validation, errors, touched/dirty
- **createFormContext** — Add context support to forms
- **useField** — Manage single field state

## @mantine/dates

See individual component docs at `https://mantine.dev/llms/dates-<name>.md`.

- **Calendar** — Base calendar component
- **MiniCalendar** — Compact calendar display
- **DatePicker** — Inline date picker
- **DatePickerInput** — Date picker as input
- **DateInput** — Free-form date input
- **DateTimePicker** — Date and time picker
- **TimeInput** — Time input
- **TimePicker** — Time picker
- **TimeGrid** — Time selection grid
- **TimeValue** — Display formatted time
- **MonthPicker** / **MonthPickerInput** — Month selection
- **YearPicker** / **YearPickerInput** — Year selection

## @mantine/charts

See individual component docs at `https://mantine.dev/llms/charts-<name>.md`.

- **AreaChart** — Area chart with stacked/percent/split variants
- **BarChart** — Bar chart with stacked/percent variants
- **BubbleChart** — Bubble chart
- **CompositeChart** — Composed chart (Area + Bar + Line)
- **DonutChart** — Donut chart
- **FunnelChart** — Funnel chart
- **Heatmap** — Heatmap chart
- **LineChart** — Line chart
- **PieChart** — Pie chart
- **RadarChart** — Radar chart
- **RadialBarChart** — Radial bar chart
- **ScatterChart** — Scatter chart
- **Sparkline** — Simplified area chart for trends
- **BarsList** — Display bars with names and values

## @mantine/x (Extensions)

- **Carousel** (`@mantine/carousel`) — Embla-based carousel
- **CodeHighlight** (`@mantine/code-highlight`) — Code highlighting with shiki/highlight.js
- **Dropzone** (`@mantine/dropzone`) — Drag-and-drop file capture
- **Modals manager** (`@mantine/modals`) — Centralized modals manager
- **NavigationProgress** (`@mantine/nprogress`) — Navigation progress bar
- **Notifications** (`@mantine/notifications`) — Notification system
- **Rich text editor** (`@mantine/tiptap`) — Tiptap-based rich text editor
- **Spotlight** (`@mantine/spotlight`) — Command center for your application