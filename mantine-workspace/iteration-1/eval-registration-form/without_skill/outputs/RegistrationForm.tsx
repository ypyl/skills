import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

interface RegistrationFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
}

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RegistrationFormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      agreeToTerms: false,
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
      firstName: (value) =>
        value.trim().length === 0 ? "First name is required" : null,
      lastName: (value) =>
        value.trim().length === 0 ? "Last name is required" : null,
      agreeToTerms: (value) =>
        value ? null : "You must agree to the terms",
    },
  });

  const handleSubmit = form.onSubmit((values) => {
    setSubmitted(true);
    console.log("Registration submitted:", values);
  });

  return (
    <Box maw={480} mx="auto" p="lg">
      <Title order={2} mb="md">
        Create an Account
      </Title>

      {submitted ? (
        <Box ta="center" py="xl">
          <Title order={3} c="green">
            Registration Successful!
          </Title>
          <p>Thank you for registering, {form.values.firstName}!</p>
          <Button mt="md" onClick={() => setSubmitted(false)}>
            Register Another
          </Button>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack gap="sm">
            <Group grow>
              <TextInput
                label="First Name"
                placeholder="John"
                required
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label="Last Name"
                placeholder="Doe"
                required
                {...form.getInputProps("lastName")}
              />
            </Group>

            <TextInput
              label="Email"
              placeholder="john@example.com"
              required
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="At least 6 characters"
              required
              {...form.getInputProps("password")}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              required
              {...form.getInputProps("confirmPassword")}
            />

            <Checkbox
              label="I agree to the terms and conditions"
              {...form.getInputProps("agreeToTerms", { type: "checkbox" })}
              error={form.errors.agreeToTerms}
            />

            <Button type="submit" mt="sm">
              Register
            </Button>
          </Stack>
        </form>
      )}
    </Box>
  );
}

export default RegistrationForm;