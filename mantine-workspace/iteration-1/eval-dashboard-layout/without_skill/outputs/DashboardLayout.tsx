import { useState } from "react";
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Text,
  Title,
  useMantineColorScheme,
  ActionIcon,
  Divider,
} from "@mantine/core";
import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconChartBar,
  IconFileText,
  IconSun,
  IconMoon,
  IconLogout,
  IconBell,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const NAV_ITEMS = [
  { icon: IconDashboard, label: "Dashboard", active: true },
  { icon: IconChartBar, label: "Analytics" },
  { icon: IconUsers, label: "Users" },
  { icon: IconFileText, label: "Reports" },
  { icon: IconSettings, label: "Settings" },
];

function SidebarContent() {
  return (
    <ScrollArea style={{ height: "100%" }} offsetScrollbars>
      <Title order={4} p="md" fw={700}>
        SaaS App
      </Title>
      <Divider my="sm" />
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.label}
          label={item.label}
          leftSection={<item.icon size={20} stroke={1.5} />}
          active={item.active}
          style={{ borderRadius: 6 }}
          m="xs"
        />
      ))}
      <Divider my="sm" />
      <NavLink
        label="Logout"
        leftSection={<IconLogout size={20} stroke={1.5} />}
        color="red"
        m="xs"
        style={{ borderRadius: 6 }}
      />
    </ScrollArea>
  );
}

function HeaderContent({
  mobileOpened,
  desktopOpened,
  toggleMobile,
  toggleDesktop,
}: {
  mobileOpened: boolean;
  desktopOpened: boolean;
  toggleMobile: () => void;
  toggleDesktop: () => void;
}) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <Group h="100%" px="md" justify="space-between">
      <Group>
        <Burger
          opened={mobileOpened}
          onClick={toggleMobile}
          hiddenFrom="sm"
          size="sm"
          aria-label="Toggle mobile navigation"
        />
        <Burger
          opened={desktopOpened}
          onClick={toggleDesktop}
          visibleFrom="sm"
          size="sm"
          aria-label="Toggle desktop navigation"
        />
        <Title order={3} fw={600}>
          Dashboard
        </Title>
      </Group>
      <Group>
        <ActionIcon variant="subtle" size="lg" aria-label="Notifications">
          <IconBell size={20} stroke={1.5} />
        </ActionIcon>
        <ActionIcon
          variant="subtle"
          size="lg"
          onClick={toggleColorScheme}
          aria-label="Toggle color scheme"
        >
          {dark ? <IconSun size={20} stroke={1.5} /> : <IconMoon size={20} stroke={1.5} />}
        </ActionIcon>
      </Group>
    </Group>
  );
}

function MainContent() {
  return (
    <>
      <Title order={2} mb="md">
        Welcome back
      </Title>
      <Text size="lg" c="dimmed" mb="xl">
        Here is an overview of your dashboard content area. Replace this with your own components.
      </Text>

      <Group grow align="flex-start">
        {["Metric A", "Metric B", "Metric C"].map((label) => (
          <div
            key={label}
            style={{
              padding: "1.5rem",
              borderRadius: "var(--mantine-radius-md)",
              background: "var(--mantine-color-body)",
              border: "1px solid var(--mantine-color-default-border)",
            }}
          >
            <Text size="sm" c="dimmed" fw={500}>
              {label}
            </Text>
            <Title order={2} mt={4}>
              —
            </Title>
          </div>
        ))}
      </Group>
    </>
  );
}

export function DashboardLayout() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure(false);
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderContent
          mobileOpened={mobileOpened}
          desktopOpened={desktopOpened}
          toggleMobile={toggleMobile}
          toggleDesktop={toggleDesktop}
        />
      </AppShell.Header>

      <AppShell.Navbar>
        <SidebarContent />
      </AppShell.Navbar>

      <AppShell.Main>
        <MainContent />
      </AppShell.Main>
    </AppShell>
  );
}

export default DashboardLayout;