import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsString()
    @MinLength(2, {message: "Minimum 2 characters!"})
    @MaxLength(100, {message: 'Maximum 100 characters'})
    @IsOptional()
    title?: string

    @IsString()
    @IsNotEmpty({message: 'Price cannot be empty!'})
    @IsOptional()
    price?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsUrl()
    @IsOptional()
    image?: string

    @IsNumber()
    @IsOptional()
    categoryId?: number

    @IsString()
    @IsOptional()
    cartId?: string
}
