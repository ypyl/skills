import { useState } from 'react';
import {
  AppShell,
  Burger,
  Group,
  NavLink,
  ScrollArea,
  Title,
  Text,
  ActionIcon,
  Avatar,
  Badge,
  Divider,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconChartBar,
  IconFileText,
  IconBell,
  IconSun,
  IconMoon,
  IconLogout,
  IconCalendar,
} from '@tabler/icons-react';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const navItems = [
  { icon: IconDashboard, label: 'Dashboard' },
  { icon: IconChartBar, label: 'Analytics',
    children: [
      { label: 'Overview' },
      { label: 'Reports' },
    ],
  },
  { icon: IconUsers, label: 'Customers' },
  { icon: IconCalendar, label: 'Schedule' },
  { icon: IconFileText, label: 'Documents' },
  { icon: IconSettings, label: 'Settings' },
];

function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <ActionIcon
      variant="default"
      size="lg"
      onClick={toggleColorScheme}
      aria-label="Toggle color scheme"
    >
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
    </ActionIcon>
  );
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [active, setActive] = useState(0);

  const navLinks = navItems.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size={20} />}
      onClick={() => setActive(index)}
      defaultOpened={index === active}
    >
      {item.children?.map((child) => (
        <NavLink
          key={child.label}
          label={child.label}
          href="#"
          active={index === active}
        />
      ))}
    </NavLink>
  ));

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
              aria-label="Toggle navigation"
            />
            <Title order={3}>My SaaS</Title>
          </Group>

          <Group>
            <Badge variant="light" color="blue" visibleFrom="md">
              Pro Plan
            </Badge>
            <ActionIcon variant="default" size="lg" aria-label="Notifications">
              <IconBell size={18} />
            </ActionIcon>
            <ColorSchemeToggle />
            <Avatar color="blue" radius="xl" size="sm">
              JD
            </Avatar>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        <AppShell.Section grow component={ScrollArea} mt="xs">
          {navLinks}
        </AppShell.Section>

        <AppShell.Section>
          <Divider my="xs" />
          <NavLink
            label="Log out"
            leftSection={<IconLogout size={20} />}
            color="red"
          />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        {children ?? <DashboardContent />}
      </AppShell.Main>
    </AppShell>
  );
}

function DashboardContent() {
  return (
    <>
      <Title order={2} mb="sm">Welcome back</Title>
      <Text c="dimmed" mb="xl">
        Here&apos;s what&apos;s happening with your project today.
      </Text>
    </>
  );
}

export default DashboardLayout;