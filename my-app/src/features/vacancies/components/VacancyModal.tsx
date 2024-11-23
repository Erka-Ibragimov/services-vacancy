import { Modal } from "@mantine/core";
import { Vacancy, VacancyModalMode } from "../types";
import AddVacancy from "./AddVacancy";
import UpdateVacancy from "./UpdateVacancy";

type Props = {
  opened: boolean;
  close: () => void;
  setVacanciesList: (vacanciesList: Vacancy[]) => void;
  mode?: VacancyModalMode;
  selectedVacancy?: Vacancy | null;
};

export default function VacancyModal({
  opened,
  close,
  mode,
  setVacanciesList,
  selectedVacancy,
}: Props) {
  if (mode === VacancyModalMode.Create) {
    return (
      <Modal
        opened={opened}
        onClose={close}
        title="Добавить"
        styles={{
          title: {
            fontWeight: "700",
          },
        }}
      >
        <AddVacancy close={close} setVacanciesList={setVacanciesList} />
      </Modal>
    );
  }

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Редактировать"
      styles={{
        title: {
          fontWeight: "700",
        },
      }}
    >
      <UpdateVacancy
        close={close}
        setVacanciesList={setVacanciesList}
        selectedVacancy={selectedVacancy}
      />
    </Modal>
  );
}
