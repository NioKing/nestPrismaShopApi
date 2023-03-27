import { ApiProperty, ApiPropertyOptional, ApiTags } from "@nestjs/swagger"
import { IsString, MaxLength, MinLength, IsUrl, IsInt, IsOptional } from "class-validator"

export class CreateProductDto {
    @ApiProperty({
        minLength: 5,
        maxLength: 150,
        description: 'Title of a product'
    })
    @IsString()
    @MaxLength(150, {message: 'Maximum 150 characters'})
    @MinLength(5, {message: 'Title cannot be empty!'})
    title: string

    @ApiProperty()
    @IsString()
    price: string

    @ApiProperty()
    @IsString()
    @MinLength(5, {message: 'Description cannot be emprty!'})
    @MaxLength(400, {message: 'Maximum 400 characters'})
    description: string
    
    @ApiProperty()
    @IsUrl()
    image: string

    @ApiPropertyOptional({
        type: Number
    })
    @IsInt()
    @IsOptional()
    categoryId?:number

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    cartId?: string
}
