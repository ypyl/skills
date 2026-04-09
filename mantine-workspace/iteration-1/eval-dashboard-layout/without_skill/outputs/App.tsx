import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import { DashboardLayout } from "./DashboardLayout";

const theme = createTheme({
  primaryColor: "blue",
});

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <DashboardLayout />
    </MantineProvider>
  );
}