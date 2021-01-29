/*
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя

PATCH /users/me — обновляет профиль
PATCH /users/me/avatar — обновляет аватар

*/
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler/ErrorHandler');

const handleError = (err) => {
  if (err.name === 'ValidationError') {
    throw (new ErrorHandler.BadRequestError('Данные пользователя неверные'));
  }

  if (err.name === 'CastError') {
    throw new ErrorHandler.NotFoundError('Такого пользователя нет');
  }

  throw (err);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(Object.values(users)))
    .catch((err) => handleError(err))
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new ErrorHandler.NotFoundError('Такого пользователя нет'); })
    .then((userData) => res.send(userData))
    .catch((err) => handleError(err))
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => { throw new ErrorHandler.NotFoundError('Такого пользователя нет'); })
    .then((users) => res.send(Object.values(users)))
    .catch((err) => handleError(err))
    .catch((err) => next(err));
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => { throw new ErrorHandler.NotFoundError('Такого пользователя нет'); })
    .then((users) => res.send(Object.values(users)))
    .catch((err) => handleError(err))
    .catch((err) => next(err));
};
