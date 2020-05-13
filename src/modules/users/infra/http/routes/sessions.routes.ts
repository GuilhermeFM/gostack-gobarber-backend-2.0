import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const SessionRouter = Router();
const sessionsController = new SessionsController();

SessionRouter.post('/', sessionsController.create);

export default SessionRouter;
