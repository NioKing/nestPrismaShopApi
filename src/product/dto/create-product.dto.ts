import { IsString, MaxLength, MinLength, IsUrl, IsInt } from "class-validator"

export class CreateProductDto {
    @IsString()
    @MaxLength(150, {message: 'Maximum 150 characters'})
    @MinLength(5, {message: 'Title cannot be empty!'})
    title: string

    @IsString()
    price: string

    @IsString()
    @MinLength(5, {message: 'Description cannot be emprty!'})
    @MaxLength(400, {message: 'Maximum 400 characters'})
    description: string
    
    @IsUrl()
    image: string

    @IsInt()
    categoryId?:number

    @IsString()
    cartId?: string
}
