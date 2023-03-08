import * as bcrypt from 'bcryptjs'

export default function hashData(data: string, salt: number) {
    return bcrypt.hash(data, salt)
}