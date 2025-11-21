import {Router} from "express";

import { addTalent,deleteTalent,getAllTalents, getTalentById, updateTalent } from "../controllers/talent.controller.js";

const router = Router();

router.post("/", addTalent); //for add talent
router.get("/:_id", getTalentById); //for get talent by id
router.get("/", getAllTalents); //for get all talent and search talent
router.put("/:id", updateTalent); //for Update  talent 
router.delete("/:id", deleteTalent);


export default router;
