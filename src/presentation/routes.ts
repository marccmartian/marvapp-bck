import { Router } from "express";

export class AppRoutes {

    static getRoutes(userRoutes: Router, projectRoutes: Router): Router {
        const router = Router();

        router.use('/api/user', userRoutes);
        router.use('/api/project', projectRoutes);

        return router;
    }

}