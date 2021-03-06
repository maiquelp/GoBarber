import { Router } from 'express';
import multer from 'multer';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';

import UsersAvatarController from '../controllers/UsersAvatarController';


const usersRouter = Router();
const upload = multer(uploadConfig);

const usersAvatarController = new UsersAvatarController();

const usersController = new UsersController();

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);
export default usersRouter;
