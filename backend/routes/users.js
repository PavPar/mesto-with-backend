/* eslint-disable arrow-parens */
/*
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя

PATCH /users/me — обновляет профиль
PATCH /users/me/avatar — обновляет аватар
*/
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const usersController = require('../controllers/users');

router.get('/users', usersController.getUsers);
router.get('/users/me', usersController.getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), usersController.updateUserInfo);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
}), usersController.updateUserAvatar);

module.exports = router;
