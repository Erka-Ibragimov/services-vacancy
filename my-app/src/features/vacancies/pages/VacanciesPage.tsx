import { Input, Stack } from "@mantine/core";
import { ChangeEventHandler, useState } from "react";
import VacanciesTable from "../components/VacanciesTable";

export default function VacanciesPage() {
  const [search, setSearch] = useState("");

  const handleSearchInputChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <Stack p="xs" gap="md">
      <Input onChange={handleSearchInputChange} placeholder="Поиск" />
      <VacanciesTable search={search} />
    </Stack>
  );
}
