import { Group, Text } from "@mantine/core";

function Header() {
    return (
        <Group p='xs' bg='#000' justify="center">
          <Text c="#fff" fw={900} size="30px">Список вакансии</Text>
        </Group>
    );
  }
  
export default Header;
  