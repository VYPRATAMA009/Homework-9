import express from 'express';
import Users from "../controllers/users_controllers.js";
import auth from '../middlewares/authenticaton.js';

const userRoutes = express.Router();

userRoutes.get('/users', auth, Users.getAll);
userRoutes.post('/usersregister', Users.register);
userRoutes.post('/login', Users.login);
userRoutes.put('/usersedit/:id',auth, Users.put);
userRoutes.delete('/usersdel/:id',auth, Users.delete);
userRoutes.get('/userspagi',auth, Users.getpagi);

// userRoutes.get('/users',Users.getAll);
// userRoutes.post('/usersregister', Users.register);
// userRoutes.post('/login', Users.login);
// userRoutes.put('/usersedit/:id', Users.put);
// userRoutes.delete('/usersdel/:id', Users.delete);
// userRoutes.get('/userspagi', Users.getpagi);

export default userRoutes;