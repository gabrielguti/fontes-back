import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient()

export class UserController {
  constructor(private userService = new UserService()) {}

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      const {name, username, password} = req.body

      const isExistantUser = await prisma.user.findUnique({ where: { username }})
      if(isExistantUser) {
        return res.status(404).json({error: "Username already exists."})
      } 

      const hashedPassword = await bcrypt.hash(req.body.password, 10)
    
      const user = await this.userService.createUser({
        name: name,
        username: username,
        password: hashedPassword
      });

      const userWithoutPassowrd = {
        id:user.id,
        name:name,
        username:username
      }

      res.status(201).json(userWithoutPassowrd);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const {username, password} =  req.body;

      const isExistantUser = await this.userService.login({username:username})

      if(!isExistantUser) {
        return res.status(404).json({error: "Username not found."})
      }

      const match = await bcrypt.compare(password, isExistantUser.password);

      if(!match){
        return res.status(401).json({ message: "Wrong credentials" });
      }

      const config = {
        secret:'secret_key',
        expiresIn: '1h'
      }

      const token = jwt.sign(
        {
          username: username,
          password: password,
        },
        config.secret,
        { expiresIn: config.expiresIn}
      );
      

      return res.status(200).json({ accessToken: token, username: isExistantUser.username });

    } catch (error) {
      next(error)
    }
  }

}

export default UserController;
