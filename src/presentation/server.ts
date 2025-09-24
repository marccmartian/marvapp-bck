import express, {Express, Router} from 'express';

interface Options {
    public_path?: string;
    port: number;
    routes: Router
}

export class Server {

    public readonly app: Express = express();
    private readonly publicPath: string;
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options){
        const {public_path = 'public', port, routes } = options;
        this.publicPath = public_path
        this.port = port;
        this.routes = routes;
    }
    
    public start(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(this.routes);

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port} 😎`);
        });
    }

}