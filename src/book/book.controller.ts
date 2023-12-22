import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    UnauthorizedException,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookWithoutSelect } from "./dto/createBookWithoutSelect.dto";
import { CreateBookWithSelect } from "./dto/createBookWithSelect.dto";
import { accessTokenGuard } from "src/auth/guard/access-token.guard";
import { UserId } from "src/auth/decorators/userId.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("book")
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("without-select")
    bookWithoutSelect(
        @UserId() userId: number,
        @Body() createBookDto: CreateBookWithoutSelect,
    ) {
        if (!userId) {
            throw new UnauthorizedException("로그인 오류입니다.");
        }

        return this.bookService.bookWithoutSelect(+userId, createBookDto);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Post("with-select")
    bookWithSelect(
        @UserId() userId: number,
        @Body() createBookDto: CreateBookWithSelect,
    ) {
        if (!userId) {
            throw new UnauthorizedException("로그인 오류입니다.");
        }

        return this.bookService.bookWithSelect(+userId, createBookDto);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Get("myBooks")
    findMyBooks(@UserId() userId: number) {
        return this.bookService.findMyBooks(+userId);
    }

    @ApiBearerAuth("accessToken")
    @UseGuards(accessTokenGuard)
    @Delete(":id")
    cancleBook(@Param("id") bookId: number, @UserId() userId: number) {
        return this.bookService.cancleBook(+bookId, +userId);
    }
}
