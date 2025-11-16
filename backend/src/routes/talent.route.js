import {Router} from "express";

import { addTalent,getAllTalents } from "../controllers/talent.controller.js";

const router = Router();

router.post("/", addTalent); //for add talent
router.get("/", getAllTalents); //for get all talent and search talent

export default router;
