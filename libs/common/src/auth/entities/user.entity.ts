import { ApiProperty } from "@nestjs/swagger";

export class User {
    @ApiProperty()
    id: string;
    
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password?: string;
    
    @ApiProperty()
    harshedRt?: string | null;
}