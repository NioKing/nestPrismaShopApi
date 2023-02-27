import * as bcrypt from 'bcrypt'

export default function hashData(data: string, salt: number) {
    return bcrypt.hash(data, salt)
}