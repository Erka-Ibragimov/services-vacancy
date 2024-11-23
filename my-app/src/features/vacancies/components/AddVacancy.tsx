import { Button, Group, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Status, Vacancy } from "../types";

type Props = {
  close: () => void;
  setVacanciesList: (vacanciesList: Vacancy[]) => void;
};

type FormValues = {
  company: string;
  position: string;
  status: Status;
  notes: string;
  salaryRange: string;
};

export default function AddVacancy({ close, setVacanciesList }: Props) {
  const form = useForm<FormValues>({
    initialValues: {
      company: "",
      position: "",
      status: Status.New,
      notes: "",
      salaryRange: "",
    },
  });

  const statusOptions = Object.values(Status).map((value) => ({
    value,
    label: value,
  }));

  const handleSubmit = async (values: FormValues) => {
    try {
      await axios.post("http://localhost:3001/api", values);
      const response = await axios.get("http://localhost:3001/api");
      setVacanciesList(response.data);
      form.reset();
      close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
     <Select
        withAsterisk
        label="Статус отклика"
        placeholder="Выберите статус"
        data={statusOptions}
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
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
