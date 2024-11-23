import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../AppLayout";
import VacanciesPage from "../features/vacancies/pages/VacanciesPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout/>,
    children:[
        {
            path: '/',
            element: <VacanciesPage />
        },
    ]
  }
])