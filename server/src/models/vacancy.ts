import mongoose, { Schema, Document } from "mongoose";

export interface IVacancyApplication extends Document {
  company: string;
  position: string;
  salaryRange: string;
  status: string;
  notes?: string;
}

const Vacancy: Schema = new Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    salaryRange: { type: String },
    status: {
      type: String,
      enum: ["Новый", "Отказано", "Одобрено"],
      required: true,
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IVacancyApplication>("Vacancy", Vacancy);
