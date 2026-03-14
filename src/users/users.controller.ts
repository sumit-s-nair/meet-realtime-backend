import { Controller, Post, Body, Get, Param } from "@nestjs/common"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post("guest")
  async createGuest(@Body("name") name: string) {
    return this.usersService.createGuest(name)
  }

  @Get(":id")
  async getUser(@Param("id") id: string) {
    return this.usersService.findById(id)
  }
}