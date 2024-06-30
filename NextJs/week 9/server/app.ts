import express, { Express, Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';

const app: Express = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors:{
        origin:"*",
        allowedHeaders:"true"
    }
  });

io.on('connection', (socket:Socket) => {
    console.log('A user connected', socket.conn);
});

httpServer.listen(4000, () => {
    console.log('[*] Listening on port 4000');
});