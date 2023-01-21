import { Project, PrismaClient } from "@prisma/client";

export class ProjectService {
  constructor(private prisma = new PrismaClient()) {}

  async createProject(payload){
    const project = await this.prisma.project.create({ data: { ...payload } });

    return project;
  }

  async getProjectsByUsername(payload) {
    const project = await this.prisma.project.findMany({where:{
      username: payload
    }})
    return project
  }

  async getProjectById(payload) {
    const project = await this.prisma.project.findUnique({where:{
      id: payload
    }})
    return project
  }
  async deleteProjectById(payload){
    const project = await this.prisma.project.deleteMany({where:{
      username: payload.username as string,
      id: payload.id
    }})

    return project
  }
  async editProjectFields(payload){
    const project = await this.prisma.project.updateMany({where:{
      id:payload.id,
      username:payload.username as string
    }, data: {
      title: payload.title,
        zip_code: payload.zip_code,
        cost: payload.cost,
        deadline: payload.deadline,
        updated_at: new Date()
    }})

    return project
  }

  async editStatusProject(payload){
    const project = this.prisma.project.updateMany({where:{
      id: payload.id,
      username: payload.username as string
    }, data:{
      done: true
    }})

    return project
  }
}
