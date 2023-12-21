import bcrypt from 'bcrypt'

export const hashPassword = async (userPass: string) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(userPass, salt)
        return hashedPass
    } catch (error) {
        return error
    }
}