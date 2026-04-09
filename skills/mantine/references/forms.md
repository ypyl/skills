# Mantine Forms Reference

## @mantine/form — useForm

### Basic Usage

```tsx
import { useForm } from '@mantine/form';
import { TextInput, Button, Group } from '@mantine/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      name: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      name: (value) => (value.trim().length > 0 ? null : 'Name is required'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        key={form.key('email')}
        {...form.getInputProps('email')}
        label="Email"
      />
      <TextInput
        key={form.key('name')}
        {...form.getInputProps('name')}
        label="Name"
        mt="md"
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
```

### Controlled vs Uncontrolled Mode

Prefer **uncontrolled** mode (default) for better performance. Controlled mode re-renders on every keystroke.

```tsx
// Uncontrolled (recommended)
const form = useForm({
  mode: 'uncontrolled',
  initialValues: { name: '' },
});
// Use key={form.key('name')} + {...form.getInputProps('name')}

// Controlled (use when you need to read values on every change)
const form = useForm({
  mode: 'controlled',
  initialValues: { name: '' },
});
// Just use {...form.getInputProps('name')} — no key needed
```

### Form API

#### Values
```tsx
form.getValues()                    // Get all current values
form.setValues({ name: 'John' })    // Set multiple values
form.setFieldValue('name', 'John')  // Set a single value
form.reset()                        // Reset to initialValues, clear errors
form.resetField('name')             // Reset single field
form.setInitialValues({ ... })      // Change initial values
```

#### Validation
```tsx
// Simple validation functions
const form = useForm({
  validate: {
    email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    name: (value) => (value.length < 2 ? 'Too short' : null),
  },
});

// Nested validation
const form = useForm({
  validate: {
    user: {
      firstName: (value) => (value.length < 2 ? 'Too short' : null),
      lastName: (value) => (value.length < 2 ? 'Too short' : null),
    },
  },
});

// Programmatic validation
await form.validate()             // Validate all, set errors
await form.validateField('email') // Validate single field
await form.isValid()              // Check if valid (no side effects)
await form.isValid('email')       // Check single field
```

#### Errors
```tsx
form.errors                        // Current errors object
form.setErrors({ email: 'Invalid' })
form.setFieldError('email', 'Invalid')
form.clearErrors()
form.clearFieldError('email')
```

#### Touched & Dirty
```tsx
form.isTouched()                  // Any field touched?
form.isTouched('email')          // Specific field touched?
form.isDirty()                    // Values differ from initial?
form.isDirty('email')            // Specific field dirty?
form.setTouched({ email: true })
form.setDirty({ email: true })
form.resetTouched()
form.resetDirty()                 // Save current values as clean state
```

#### Submit Handler
```tsx
<form onSubmit={form.onSubmit((values) => {
  // Called only if validation passes
  fetch('/api', { body: JSON.stringify(values) });
})} />

// Handle validation errors explicitly
<form onSubmit={form.onSubmit(
  (values) => { /* called on success */ },
  (errors, values) => { /* called on validation failure */ },
)} />
```

### Nested Fields

```tsx
const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    user: {
      firstName: '',
      lastName: '',
      address: {
        city: '',
        zip: '',
      },
    },
  },
});

// Access nested fields with dot notation
<TextInput key={form.key('user.firstName')} {...form.getInputProps('user.firstName')} />
<TextInput key={form.key('user.address.city')} {...form.getInputProps('user.address.city')} />
```

### List Fields

```tsx
const form = useForm({
  mode: 'uncontrolled',
  initialValues: {
    employees: [{ name: '', role: '' }],
  },
});

// Add
form.insertListItem('employees', { name: '', role: '' });
// Insert at index
form.insertListItem('employees', { name: '', role: '' }, 0);
// Remove
form.removeListItem('employees', 1);
// Replace
form.replaceListItem('employees', 1, { name: 'New', role: 'Dev' });
// Reorder
form.reorderListItem('employees', { from: 0, to: 2 });
```

Rendering list fields:

```tsx
form.values.employees.map((employee, index) => (
  <Group key={index}>
    <TextInput
      key={form.key(`employees.${index}.name`)}
      {...form.getInputProps(`employees.${index}.name`)}
    />
    <ActionIcon
      color="red"
      onClick={() => form.removeListItem('employees', index)}
    >
      <IconTrash />
    </ActionIcon>
  </Group>
))
```

### Schema Validation

#### Zod
```tsx
import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  age: z.number().min(18, 'Must be at least 18'),
});

const form = useForm({
  validate: zodResolver(schema),
  initialValues: { name: '', email: '', age: 0 },
});
```

Install: `npm install mantine-form-zod-resolver zod`

#### Yup
```tsx
import { yupResolver } from 'mantine-form-yup-resolver';
import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().min(6, 'At least 6 characters'),
});

const form = useForm({
  validate: yupResolver(schema),
  initialValues: { email: '', password: '' },
});
```

Install: `npm install mantine-form-yup-resolver yup`

#### Joi
```tsx
import { joiResolver } from 'mantine-form-joi-resolver';
import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email({ tlds: false }).required(),
});

const form = useForm({
  validate: joiResolver(schema),
  initialValues: { name: '', email: '' },
});
```

Install: `npm install mantine-form-joi-resolver joi`

### Connecting Custom Inputs

```tsx
function CustomInput({ form, fieldPath }: { form: UseFormReturnType<FormValues>; fieldPath: string }) {
  return (
    <input
      key={form.key(fieldPath)}
      {...form.getInputProps(fieldPath, { type: 'checkbox' })}
    />
  );
}
```

### Form Context

Create a form context to pass form to deeply nested components:

```tsx
import { createFormContext } from '@mantine/form';

const [FormProvider, useFormContext, useFormInputContext] = createFormContext<FormValues>();

function DeepComponent() {
  const form = useFormContext();
  return <TextInput {...form.getInputProps('name')} />;
}

function App() {
  const form = useForm<FormValues>({ mode: 'uncontrolled', initialValues: { name: '' } });
  return (
    <FormProvider form={form}>
      <DeepComponent />
    </FormProvider>
  );
}
```

### TypeScript

```tsx
interface FormValues {
  name: string;
  email: string;
  age: number;
}

const form = useForm<FormValues>({
  mode: 'uncontrolled',
  initialValues: { name: '', email: '', age: 0 },
});

// UseFormReturnType for component props
import { UseFormReturnType } from '@mantine/form';

interface Props {
  form: UseFormReturnType<FormValues>;
}

function MyComponent({ form }: Props) {
  return <TextInput {...form.getInputProps('name')} />;
}
```

### useField Hook

For single field management:

```tsx
import { useField } from '@mantine/form';

function EmailInput() {
  const field = useField({
    initialValue: '',
    validate: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
  });

  return <TextInput {...field.getInputProps()} label="Email" />;
}
```

## Common Input Components

### TextInput, NumberInput, PasswordInput, Textarea

```tsx
<TextInput label="Name" placeholder="Enter name" />
<NumberInput label="Age" placeholder="Enter age" min={0} max={150} />
<PasswordInput label="Password" placeholder="Enter password" />
<Textarea label="Description" placeholder="Enter description" autosize minRows={3} />
```

### Select, MultiSelect, Autocomplete

```tsx
<Select
  label="Country"
  data={['USA', 'Canada', 'UK']}
  searchable
  clearable
/>

<MultiSelect
  label="Tags"
  data={['React', 'Angular', 'Vue', 'Svelte']}
  searchable
  clearable
/>

<Autocomplete
  label="Search"
  data={['React', 'Angular', 'Vue']}
/>
```

### Checkbox, Switch, Radio

```tsx
<Checkbox label="I agree to terms" />
<Switch label="Dark mode" onLabel="On" offLabel="Off" />

<RadioGroup name="plan" label="Plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
</RadioGroup>
```

### FileInput / FileButton

```tsx
<FileInput label="Upload file" placeholder="Pick file" clearable />
<FileButton onChange={handleFile}>
  {(props) => <Button {...props}>Upload</Button>}
</FileButton>
```

### Connecting to useForm

All Mantine input components work with `form.getInputProps()`. For uncontrolled mode, add `key={form.key('fieldName')}`:

```tsx
<TextInput
  key={form.key('email')}
  {...form.getInputProps('email')}
  label="Email"
/>

<Checkbox
  key={form.key('terms')}
  {...form.getInputProps('terms', { type: 'checkbox' })}
  label="I agree"
/>
```