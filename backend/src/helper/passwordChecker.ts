import bcrypt from 'bcrypt'

export const passwordChecker = (userInput: string, userPass: string) => {
    return bcrypt.compare(userInput, userPass)
}