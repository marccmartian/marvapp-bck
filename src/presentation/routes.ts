import { Router } from "express";
import { UserRoutes } from "./users/routes";

export class AppRoutes {

    static get router(): Router {
        const router = Router();

        router.use('/api/user', UserRoutes.routes);

        return router;
    }

}