import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsString()
    @MinLength(2, {message: 'Minimum 2 characters!'})
    @MaxLength(30, {message: 'Maximum 30 characters!'})
    categoryName: string
}
