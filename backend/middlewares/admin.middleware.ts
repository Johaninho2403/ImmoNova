import asyncHandler from 'express-async-handler'
import { Request, Response, NextFunction } from 'express'


const adminMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {user} = req
    
    if(user.role !== "ADMIN"){
        throw new Error("Unauthorized!")
    } 

    next()
})

export default adminMiddleware