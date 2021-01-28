/* eslint-disable arrow-parens */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const loginController = require('../controllers/login');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), loginController.createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), loginController.authUser);

module.exports = router;
