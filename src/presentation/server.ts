import express, {Express, Router} from 'express';
import http from 'http';
import cors from 'cors';

interface Options {
    public_path?: string;
    port: number;
    routes: Router;
    frontedUrl: string;
}

export class Server {

    public readonly app: Express = express();
    private serverListener?: http.Server;
    private readonly publicPath: string;
    private readonly port: number;
    private readonly routes: Router;
    private readonly frontedUrl: string;

    constructor(options: Options){
        const {public_path = 'public', port, routes, frontedUrl } = options;
        this.publicPath = public_path
        this.port = port;
        this.routes = routes;
        this.frontedUrl = frontedUrl;

        this.configureApp();
    }

    private configureApp() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        this.app.use(cors({
            origin: this.frontedUrl,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));

        this.app.use(this.routes);
        this.app.use(express.static(this.publicPath));
    }
    
    public start(){
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port} 😎`);
        });

        return this.serverListener;
    }

    public close() {
        this.serverListener?.close();
    }

}