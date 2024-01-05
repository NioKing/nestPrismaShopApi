import { User } from "./user.entity"

export class Address {
    id: String
    user: User
    userId: String
    address_line1: String
    address_line2?: String
    city: String
    region?: String
    postal_code?: String
    country: String
}