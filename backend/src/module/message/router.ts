import { Router } from "express";
import {  getMessagesController } from "./controller";
import { validateJwt } from "../../middleware/validate-jwt";

const router =  Router()

/**
 * @swagger
 *   /api/v1/messages/:
 *   get:
 *     responses: #@important to see response in ui.
 *       200:
 *         description: success
 */
router.get("/",validateJwt, getMessagesController )
   
export { router }