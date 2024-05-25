import express from 'express';
import Movies from '../controllers/movies.controllers.js';
import auth from '../middlewares/authenticaton.js';

const moviesRoutes = express.Router();

moviesRoutes.get('/movies', auth, Movies.getAll);
moviesRoutes.get('/moviespagi', auth, Movies.getpagi);
moviesRoutes.post('/moviesregis', auth, Movies.register);
moviesRoutes.put('/moviesedit/:id', auth, Movies.put);
moviesRoutes.delete('/moviesdel/:id', auth, Movies.delete);

// moviesRoutes.get('/movies', Movies.getAll);
// moviesRoutes.get('/moviespagi', Movies.getpagi);
// moviesRoutes.post('/moviesregis', Movies.register);
// moviesRoutes.put('/moviesedit/:id', Movies.put);
// moviesRoutes.delete('/moviesdel/:id', Movies.delete);


export default moviesRoutes;