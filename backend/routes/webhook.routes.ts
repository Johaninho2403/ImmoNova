import { Router } from "express";
import { bookingWebhook } from "../controllers/webhook.controller";

const webhookRouter = Router()

webhookRouter.get('/booking-webhook', bookingWebhook)

export default webhookRouter