import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class CreateBookWithSelect {
    @IsNumber()
    @ApiProperty({ description: "공연 id" })
    showId: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ description: "좌석 번호" })
    seatNumber: number;
}
