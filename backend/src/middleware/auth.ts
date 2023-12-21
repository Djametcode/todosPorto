import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

interface Idata extends JwtPayload {
    userId: string,
    username: string,
    email: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers.authorization

    if (!headers || !headers.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "Please login first" })
    }

    const token = headers.split(" ")[1]

    try {
        const data = await jwt.verify(token, process.env.JWT_SECRET) as Idata
        req.user = { userId: data.userId }

        next()
    } catch (error) {
        return res.status(501).json({ msg: "Internal server error" })
    }
}