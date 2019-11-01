const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const LoginController = require('./controllers/LoginController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const RegisterController = require('./controllers/RegisterController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/login',LoginController.store);
routes.post('/register',RegisterController.store);

routes.post('/spots', LoginController.verifyJWT, upload.single('thumbnail'), SpotController.store);
routes.get('/spots', LoginController.verifyJWT, SpotController.index);

routes.get('/dashboard', LoginController.verifyJWT, DashboardController.show);

routes.post('/spots/:spot_id/bookings', LoginController.verifyJWT, BookingController.store);

module.exports = routes;