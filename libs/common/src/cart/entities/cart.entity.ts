import { Product } from "@app/common/product/entities/product.entity"

export class Cart {
    id: string
    date: Date
    userId: string
    products?: Product[]
}
