import { ApiProperty } from "@nestjs/swagger"

export class Product {
    @ApiProperty()
    id: number

    @ApiProperty()
    title: string

    @ApiProperty()
    price: string

    @ApiProperty()
    description: string
    
    @ApiProperty()
    image: string
}
