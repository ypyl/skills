import { Avatar, Button, Card, Group, Text } from '@mantine/core';
import classes from './UserProfileCard.module.css';

interface UserProfileCardProps {
  name: string;
  role: string;
  avatarSrc?: string | null;
  onFollow?: () => void;
  following?: boolean;
}

export function UserProfileCard({
  name,
  role,
  avatarSrc,
  onFollow,
  following = false,
}: UserProfileCardProps) {
  return (
    <Card shadow="sm" padding="md" radius="lg" withBorder classNames={{ root: classes.card }}>
      <Group justify="space-between" wrap="nowrap" align="center">
        <Group gap="sm" wrap="nowrap" align="center">
          <Avatar
            src={avatarSrc}
            alt={name}
            name={name}
            color="initials"
            size="lg"
            radius="xl"
            classNames={{ root: classes.avatar }}
          />
          <div className={classes.info}>
            <Text fw={600} size="sm" className={classes.name}>
              {name}
            </Text>
            <Text size="xs" c="dimmed" className={classes.role}>
              {role}
            </Text>
          </div>
        </Group>
        <Button size="xs" variant={following ? 'outline' : 'filled'} onClick={onFollow}>
          {following ? 'Following' : 'Follow'}
        </Button>
      </Group>
    </Card>
  );
}