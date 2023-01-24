import { NextFunction, Request, Response } from "express";
import { ProjectService } from "../services/project.service";
import { VIA_CEP_API } from "../utils/viaCepApi";


const axios = require('axios');

export class ProjectController {
  constructor(private projectService = new ProjectService()) {}

  createProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.headers;
      const project = await this.projectService.createProject({
        ...req.body, username, done: false
      });

      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  };

  getProjectsByUsername = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const {username} = req.headers;

      if(username){
        const existantUserProjects =  await this.projectService.getProjectsByUsername(
          username
        )
        return res.status(200).json({projects: existantUserProjects})

      }else {
        return res.status(404).json({message: "Username is required."})
      }
    } catch (error){
next(error)
    }
  }
  getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try{
      const {project_id} = req.headers;
      if(!project_id){
        return res.status(404).json({message: "project_id is required."})
      }
      const projectById = await this.projectService.getProjectById(project_id)

      if(!projectById) return res.status(404).json({message: 'project not found.'})

      const cepResult = await axios.get(`${VIA_CEP_API.URL}${projectById.zip_code}/json`)
      
      if(cepResult.data){
        const formattedProject = {...projectById, zip_code: `${cepResult.data.localidade}/${cepResult.data.uf}`}
        return res.status(200).json({project:formattedProject})
        
      }
      
    } catch (error) {
      next(error)
    }
    
  }

  deleteProjectById = async (req: Request, res: Response, next:NextFunction) => {
    try{
      const {username} = req.headers
      if(!username){
        return res.status(404).json({error: "Username is required."})
      }
      const {id} = req.params;
      if(!id){
        return res.status(404).json({error: "Id is required."})
      }
      const project = await this.projectService.deleteProjectById({username:username, id:id})

      if(project.count === 0){
        return res.status(404).json({error: 'No project to delete.'})
      }
      
      return res.status(200).json({message: 'Project deleted.'})
    } catch (error){
      next(error)
    }
  }

  editProjectFields = async (req: Request, res: Response, next:NextFunction) => {
    try{
      const {username} = req.headers
      const {title, zip_code, cost, deadline} = req.body
      const {id} = req.params

      if(!username){
        return res.status(404).json({message: "Username is required."})
      }
  
      const projectToEdit = await this.projectService.editProjectFields({
        id:id,
        username:username,
        title:title,
        zip_code:zip_code,
        cost:cost,
        deadline:deadline
      })

      if(projectToEdit.count === 0){
        return res.status(404).json({error: "Not possible to update."})
      }

      return  res.status(200).json({message: 'Project updated.'})
    } catch(error){
      next(error)
    }
  }

  editStatusProject = async  (req:Request, res:Response, next:NextFunction) => {
    try{
      const {username} = req.headers
      const {id} = req.params

      if(!username){
        return res.status(404).json({message: 'Username is required.'})
      }
      if(!id){
        return res.status(404).json({message: 'Id is required.'})
      }

      const projectToEditStatus = await this.projectService.editStatusProject({id:id, username:username})

      if(projectToEditStatus.count === 0){
        return res.status(404).json({message: "Not possible to update."})
      }
      return res.status(200).json({message: 'Project updated.'})

    } catch (error) {
      next(error)
    }
  }
}

export default ProjectController;
