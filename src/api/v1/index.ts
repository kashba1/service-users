import { Express } from "express";
import usersRoute from "./users.api";
import addOnRoute from "./addOn.api";

const urlSegment = "/users/v1";

const registerRoutes = (app: Express, options: any) => {
    addOnRoute(app, options, urlSegment);
    usersRoute(app, options, urlSegment);
};

export default registerRoutes;
