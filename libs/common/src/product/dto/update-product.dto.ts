import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiPropertyOptional(
        {
            minLength: 2,
            maxLength: 100,
        }
    )
    @IsString()
    @MinLength(2, { message: "Minimum 2 characters!" })
    @MaxLength(100, { message: 'Maximum 100 characters' })
    @IsOptional()
    title?: string

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty({ message: 'Price cannot be empty!' })
    @IsOptional()
    price?: string

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string

    @ApiPropertyOptional()
    @IsString()
    @IsUrl()
    @IsOptional()
    image?: string

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    categoryId?: number

}
