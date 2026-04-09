import {
  Avatar,
  Button,
  Card,
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

interface ProfileCardProps {
  name: string;
  role: string;
  avatarUrl: string;
  onFollow?: () => void;
  isFollowing?: boolean;
}

export function ProfileCard({
  name,
  role,
  avatarUrl,
  onFollow,
  isFollowing = false,
}: ProfileCardProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Card
      radius="lg"
      shadow={isDark ? "xl" : "sm"}
      p="lg"
      style={{
        backgroundColor: isDark
          ? theme.colors.dark[7]
          : theme.white,
        borderColor: isDark
          ? theme.colors.dark[5]
          : theme.colors.gray[3],
        borderWidth: 1,
        borderStyle: "solid",
      }}
    >
      <Group noWrap>
        <Avatar src={avatarUrl} size={72} radius="xl" />

        <Group
          direction="column"
          spacing={4}
          style={{ flex: 1, minWidth: 0 }}
        >
          <Text
            size="lg"
            weight={600}
            style={{ lineHeight: 1.2 }}
            lineClamp={1}
          >
            {name}
          </Text>

          <Text
            size="sm"
            color={isDark ? theme.colors.dark[3] : theme.colors.gray[6]}
            lineClamp={1}
          >
            {role}
          </Text>
        </Group>

        <Button
          variant={isFollowing ? "outline" : "filled"}
          color={isFollowing ? "gray" : "blue"}
          size="sm"
          radius="md"
          onClick={onFollow}
          style={{ flexShrink: 0 }}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </Group>
    </Card>
  );
}