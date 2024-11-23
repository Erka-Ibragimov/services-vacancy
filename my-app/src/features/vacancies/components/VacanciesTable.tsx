import { Button, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { Vacancy, VacancyModalMode } from "../types";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import VacancyModal from "./VacancyModal";

type Props = {
  search: string;
};

export default function VacanciesTable({ search }: Props) {
  const [vacanciesList, setVacanciesList] = useState<Vacancy[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [vacancyModalMode, setVacancyModelMode] = useState<VacancyModalMode>();
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  const getVacancies = async () => {
    const response = await axios.get(`http://localhost:3001/api?value=${search}`);

    return response.data;
  };

  const deleteVacancy = async (id: string): Promise<void> => {
    try {
      await axios.delete(`http://localhost:3001/api/${id}`);
      const response = await axios.get("http://localhost:3001/api");
      setVacanciesList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVacancies().then((data) => setVacanciesList(data));
  }, [search]);

  const rows = vacanciesList.map((vacancy) => (
    <Table.Tr key={vacancy._id}>
      <Table.Td>{vacancy.company}</Table.Td>
      <Table.Td>{vacancy.salaryRange}</Table.Td>
      <Table.Td>{vacancy.position}</Table.Td>
      <Table.Td>{vacancy.status}</Table.Td>
      <Table.Td>{vacancy.notes}</Table.Td>
      <Table.Td>
        <Button
          onClick={async () => {
            const responseVacancy = await axios.get(
              `http://localhost:3001/api/${vacancy._id}`
            );
            const dataVacancy = responseVacancy.data;

            setSelectedVacancy(dataVacancy);
            setVacancyModelMode(VacancyModalMode.Edit);
            open();
          }}
        >
          Изменить
        </Button>
      </Table.Td>
      <Table.Td>
        <Button onClick={() => deleteVacancy(vacancy._id)}>Удалить</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Button
        onClick={() => {
          setVacancyModelMode(VacancyModalMode.Create);
          open();
        }}
      >
        Добавить вакансию
      </Button>

      <VacancyModal
        opened={opened}
        close={close}
        mode={vacancyModalMode}
        setVacanciesList={setVacanciesList}
        selectedVacancy={selectedVacancy}
      />

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Название компании</Table.Th>
            <Table.Th>Зарплатная вилка</Table.Th>
            <Table.Th>Вакансия</Table.Th>
            <Table.Th>Статус</Table.Th>
            <Table.Th>Замечание</Table.Th>
            <Table.Th></Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
