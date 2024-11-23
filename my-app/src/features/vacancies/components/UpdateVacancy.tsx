import { Button, Group, TextInput } from "@mantine/core";
import { Vacancy } from "../types";
import { useForm } from "@mantine/form";
import axios from "axios";

type Props = {
  close: () => void;
  setVacanciesList: (vacanciesList: Vacancy[]) => void;
  selectedVacancy?: Vacancy | null;
};

type FormValues = {
  company: string;
  position: string;
  status: string;
  notes: string;
  salaryRange: string;
};

export default function UpdateVacancy({
  close,
  setVacanciesList,
  selectedVacancy,
}: Props) {
  const form = useForm<FormValues>({
    initialValues: {
      company: selectedVacancy ? selectedVacancy.company : "",
      position: selectedVacancy ? selectedVacancy.position : "",
      status: selectedVacancy ? selectedVacancy.status : "",
      notes: selectedVacancy ? (selectedVacancy.notes as string) : "",
      salaryRange: selectedVacancy ? selectedVacancy.salaryRange : "",
    },
  });

  const handleUpdateSubmit = async (values: FormValues) => {
    try {
      await axios.put(
        `http://localhost:3001/api/${selectedVacancy?._id}`,
        values
      );

      const responseVacancies = await axios.get("http://localhost:3001/api");
      setVacanciesList(responseVacancies.data);
      form.reset();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdateSubmit)}>
      <TextInput
        withAsterisk
        label="Название компании"
        placeholder="Название компании"
        key={form.key("company")}
        {...form.getInputProps("company")}
      />
      <TextInput
        withAsterisk
        label="Зарплатная вилка"
        placeholder="Зарплатная вилка"
        key={form.key("salaryRange")}
        {...form.getInputProps("salaryRange")}
      />
      <TextInput
        withAsterisk
        label="Вакансия"
        placeholder="Вакансия"
        key={form.key("position")}
        {...form.getInputProps("position")}
      />
      <TextInput
        withAsterisk
        label="Статус отклика"
        placeholder="Статус отклика"
        key={form.key("status")}
        {...form.getInputProps("status")}
      />
      <TextInput
        withAsterisk
        label="Заметка"
        placeholder="Заметка"
        key={form.key("notes")}
        {...form.getInputProps("notes")}
      />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Редактивровать</Button>
      </Group>
    </form>
  );
}
