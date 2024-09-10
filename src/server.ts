import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import equipmentRoutes from './routes/equipmentRoutes';

export class Server {
    private app: Express;
    private port: number;

    constructor() {
        this.app = express();
        this.port = 5000;
        this.configuration();
        this.middlewares();
        this.routes();
    }

    configuration() {
        dotenv.config();
    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api', authRoutes);
        this.app.use('/api', equipmentRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server está corriendo en el puerto ${this.port}`);
        });
    }
}
