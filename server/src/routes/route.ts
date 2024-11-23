import { Router } from "express";
import Vacancy, { IVacancyApplication } from "../models/vacancy";
import { jobApplicationSchema } from "../validation/validate";
import { validateBody } from "../middleware";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { value } = req.query;

    const query = value
    ? {
        $or: [
          { company: { $regex: value, $options: "i" } },
          { position: { $regex: value, $options: "i" } },
        ],
      }
    : {};
    const applications = await Vacancy.find(query);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const applications = await Vacancy.findById(req.params.id);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching applications" });
  }
});

router.post("/", validateBody(jobApplicationSchema), async (req, res) => {
  try {
    const application: IVacancyApplication = new Vacancy(req.body);
    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ error: "Error creating application" });
  }
});

router.put("/:id", validateBody(jobApplicationSchema), async (req, res) => {
  try {
    const updatedApplication = await Vacancy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedApplication);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error updating application" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Vacancy.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Error deleting application" });
  }
});

export default router;
