import express from 'express'
import { emailVerification } from '../controllers/mailer.controller'

const router = express.Router()

router.get("/veryficationMailer/:token",emailVerification)

export default router