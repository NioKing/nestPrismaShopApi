import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsString()
    @IsOptional()
    id?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @MinLength(6, { message: 'Minimum 6 characters' })
    @MaxLength(40, { message: 'Maximum 40 characters' })
    password?: string
}
