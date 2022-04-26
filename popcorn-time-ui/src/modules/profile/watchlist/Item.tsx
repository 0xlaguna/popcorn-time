import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';

export interface ItemProps {
  cover: string;
  title: string;
}

const Item: React.FC<ItemProps> = ({ cover, title }) => {
  const theme = useMantineTheme();

  const secondaryColor = theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div style={{ width: 340, margin: 'auto' }}>
      <Card shadow="sm" p="lg">
        <Card.Section>
          <Image src={cover} height={160} alt="Norway" />
        </Card.Section>

        <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
          <Text weight={500}>{title}</Text>
        </Group>

        <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
          Watch now
        </Button>
      </Card>
    </div>
  );
};

export default Item;
