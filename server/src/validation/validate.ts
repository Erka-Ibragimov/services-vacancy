import Joi from "joi";

export const jobApplicationSchema = Joi.object({
  company: Joi.string().required().messages({
    "string.empty": 'Поле "Компания" не должно быть пустым.',
    "any.required": 'Поле "Компания" является обязательным.',
  }),
  position: Joi.string().required().messages({
    "string.empty": 'Поле "Вакансия" не должно быть пустым.',
    "any.required": 'Поле "Вакансия" является обязательным.',
  }),
  salaryRange: Joi.string().optional().allow("").messages({
    "string.empty": 'Поле "Зарплатная вилка" должно быть строкой.',
  }),
  status: Joi.string()
    .valid("Новый", "Отказано", "Одобрено")
    .required()
    .messages({
      "any.only":
        'Поле "Статус отклика" должно быть одним из: Pending, Interviewing, Rejected, Accepted.',
      "any.required": 'Поле "Статус отклика" является обязательным.',
    }),
  notes: Joi.string().optional().allow("").messages({
    "string.empty": 'Поле "Заметка" должно быть строкой.',
  }),
});
