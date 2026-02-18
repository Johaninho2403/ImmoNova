import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'
import prisma from '../lib/prisma'

export const getUserInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {user} = req

    res.status(200).json({
        success: true,
        user
    })
})