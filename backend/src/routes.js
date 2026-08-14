import { Router } from "express";
import { postWord, getWord } from "./controller.js";

const routes = Router();

routes.get("/words", getWord);

routes.post("/words", postWord);

export default routes;