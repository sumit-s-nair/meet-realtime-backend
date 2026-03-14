import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./user.entity"
import { v4 as uuid } from "uuid"

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) {}

  async createGuest(name: string) {

    const user = this.usersRepo.create({
      id: uuid(),
      name
    })

    return this.usersRepo.save(user)
  }

  async findById(id: string) {
    return this.usersRepo.findOne({ where: { id } })
  }
}