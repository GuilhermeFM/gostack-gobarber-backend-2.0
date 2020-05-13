import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarControlle from '@modules/users/infra/http/controllers/UserAvatarControlle';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userAvatarControlle = new UserAvatarControlle();

usersRouter.post('/', usersController.create);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarControlle.update);

export default usersRouter;
