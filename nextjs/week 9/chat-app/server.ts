import http, { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import next from 'next';
import { Socket, Server as SocketServer } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
 const server = http.createServer(async (req:IncomingMessage, res:ServerResponse) => {
    try {
      const parsedUrl = url.parse(req.url!, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/a') {
        await app.render(req, res, '/a', query);
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
 });

 const io = new SocketServer(server);

 io.on('connection', (socket:Socket) => {
    
    console.log('a user connected', socket.conn);

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
 });

 server
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});