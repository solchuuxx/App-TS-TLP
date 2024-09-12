import { Server } from './src/server';
import connectDB from './src/database/connectDB';

const server = new Server();

connectDB();

server.listen();
