import { PrismaClient, User } from "@prisma/client";

export class UserService {
  constructor(private prisma = new PrismaClient()) {}

  async createUser(payload){
    const user = await this.prisma.user.create({ data: payload});
    return user;
  }

  async login(payload){
    const user = await this.prisma.user.findUnique({where:{
      username: payload.username
    }})

    return user
  }
}
