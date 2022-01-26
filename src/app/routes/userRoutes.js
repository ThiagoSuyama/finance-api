import { Router } from 'express';
import UserController from '../controllers/UserController';

const routes = new Router();

routes.get('/users/', UserController.list);
routes.post('/users', UserController.create);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;