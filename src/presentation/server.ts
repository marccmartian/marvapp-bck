import express, {Express, Router} from 'express';
import http from 'http';
import path from 'path';

interface Options {
    public_path?: string;
    port: number;
    routes: Router
}

export class Server {

    public readonly app: Express = express();
    private serverListener?: http.Server;
    private readonly publicPath: string;
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options){
        const {public_path = 'public', port, routes } = options;
        this.publicPath = public_path
        this.port = port;
        this.routes = routes;

        this.configureApp();
    }

    private configureApp() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(this.routes);
        this.app.use(express.static(this.publicPath));
        this.app.use('/assets', express.static(path.join(__dirname, '../..', 'assets')));
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