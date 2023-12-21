import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from "@nestjs/common";
import { ShowService } from "./show.service";
import { CreateShowDto } from "./dto/create-show.dto";
import { UpdateShowDto } from "./dto/update-show.dto";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { ApiBearerAuth, ApiQuery } from "@nestjs/swagger";
import { UserRoleGuard } from "src/auth/guard/user-role.guard";

@Controller("show")
export class ShowController {
    constructor(private readonly showService: ShowService) {}

    @ApiBearerAuth("accessToken")
    @Roles(["admin"])
    @UseGuards(accessTokenGuard, UserRoleGuard)
    @Post()
    createShow(@Body() createShowDto: CreateShowDto) {
        return this.showService.createShow(createShowDto);
    }

    @ApiQuery({ name: "onlyName" })
    @Get()
    findAllShow(@Query("onlyName") onlyName: boolean) {
        return this.showService.findAllShow(onlyName);
    }

    @Get(":id")
    findShowDetail(@Param("id") id: string) {
        return this.showService.findShowDetail(+id);
    }

    @Get("search/:name")
    findShowByName(@Param("name") name: string) {
      return this.showService.findShowByName(name);
  }

    // @Patch(":id")
    // update(@Param("id") id: string, @Body() updateShowDto: UpdateShowDto) {
    //     return this.showService.update(+id, updateShowDto);
    // }

    // @Delete(":id")
    // remove(@Param("id") id: string) {
    //     return this.showService.remove(+id);
    // }
}
