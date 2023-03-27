import { ApiProperty } from "@nestjs/swagger"

export class excludedUser {
    @ApiProperty()
    id: string
    
    @ApiProperty()
    email: string
}