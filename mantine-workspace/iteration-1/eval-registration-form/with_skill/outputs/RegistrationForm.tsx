import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Stack,
  Paper,
  Title,
} from '@mantine/core';

interface RegistrationFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
}

export function RegistrationForm() {
  const form = useForm<RegistrationFormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      agreeToTerms: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email address'),
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
      firstName: (value) => (value.trim().length > 0 ? null : 'First name is required'),
      lastName: (value) => (value.trim().length > 0 ? null : 'Last name is required'),
      agreeToTerms: (value) => (value ? null : 'You must agree to the terms'),
    },
  });

  return (
    <Paper shadow="sm" radius="md" p="xl" maw={480} mx="auto">
      <Title order={2} mb="lg">
        Create an account
      </Title>

      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Stack gap="md">
          <Group grow>
            <TextInput
              key={form.key('firstName')}
              {...form.getInputProps('firstName')}
              label="First name"
              placeholder="John"
              required
            />
            <TextInput
              key={form.key('lastName')}
              {...form.getInputProps('lastName')}
              label="Last name"
              placeholder="Doe"
              required
            />
          </Group>

          <TextInput
            key={form.key('email')}
            {...form.getInputProps('email')}
            label="Email"
            placeholder="john@example.com"
            required
          />

          <PasswordInput
            key={form.key('password')}
            {...form.getInputProps('password')}
            label="Password"
            placeholder="At least 6 characters"
            required
          />

          <PasswordInput
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
            label="Confirm password"
            placeholder="Re-enter your password"
            required
          />

          <Checkbox
            key={form.key('agreeToTerms')}
            {...form.getInputProps('agreeToTerms', { type: 'checkbox' })}
            label="I agree to the terms and conditions"
            required
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Register</Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}