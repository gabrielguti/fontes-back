require("dotenv").config();
import cors from "cors";
import express, { Application, Router } from "express";
import path from "path";
import ValidationError from "./exceptions/ValidationError";
import * as routes from "./routes/_index";


class App {
  public app: Application;
  public router: Router;
  public _stats: any;

  constructor() {
    this.app = express();
    this.router = express.Router();

    this.setConfig();

    this.initRoutes(this.router);

    this.app.use("/", this.router);

    this.app.use("/public/", express.static(path.join(__dirname, "../public")));

    // 404
    this.app.use(function (req, res, next) {
      console.log("ROUTE NOT FOUND: ", req.url);
      if (!req.route)
        return res.status(404).json({ message: "Not Found: " + req.url });
      next();
    });

    // error
    this.app.use(function (err, req, res, next) {
      const status = err.name === ValidationError.name ? 400 : 500;
      res.status(status).send({ message: err.message });
    });
  }

  private setConfig() {
    //Allows us to receive requests with data in json format
    this.app.use(express.json({ limit: "50mb" }));

    //Allows us to receive requests with data in x-www-form-urlencoded format
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));

    //Enables cors
    this.app.use(cors({
      origin: "http://localhost:5173"
    }));

  }

  private initRoutes(app: Router) {
    routes.initRoutes(app);
  }
}

export default new App().app;
