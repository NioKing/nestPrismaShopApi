import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, MinLength, IsNotEmpty, IsOptional } from "class-validator"

export class CreateUserDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    id?: string
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty({message: 'Email is required!'})
    email: string
    
    @ApiProperty({
        minLength: 6,
        maxLength: 40
    })
    @IsString()
    @MinLength(6, {message: 'Minimum 6 characters'})
    @MaxLength(40, {message: 'Maximum 40 characters'})
    @IsNotEmpty({ message: 'Password is required!' })
    password: string
}
