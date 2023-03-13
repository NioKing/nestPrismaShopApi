import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({message: 'Category name cannot be empty!'})
    @MaxLength(40, {message: 'Maximum length is 40 characters!'})
    categoryName: string

    @IsNumber()
    @IsOptional()
    productId?: number
}
