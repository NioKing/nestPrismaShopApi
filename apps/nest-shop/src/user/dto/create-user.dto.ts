import { IsEmail, IsString, MaxLength, MinLength, IsNotEmpty, IsOptional } from "class-validator"

export class CreateUserDto {
    @IsString()
    @IsOptional()
    id?: string
    
    @IsEmail()
    @IsNotEmpty({message: 'Email is required!'})
    email: string
    
    @IsString()
    @MinLength(6, {message: 'Minimum 6 characters'})
    @MaxLength(40, {message: 'Maximum 40 characters'})
    @IsNotEmpty({ message: 'Password is required!' })
    password: string
}
