import { ApiProperty, ApiPropertyOptional, PickType } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { CreateBookWithSelect } from "./createBookWithSelect.dto";

export class CreateBookWithoutSelect extends PickType(CreateBookWithSelect, [
    "showId",
]) {}
