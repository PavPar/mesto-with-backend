/*
GET /cards — возвращает все карточки
POST /cards — создаёт карточку
DELETE /cards/:cardId — удаляет карточку по идентификатору

PUT /cards/:cardId/likes — поставить лайк карточке
DELETE /cards/:cardId/likes — убрать лайк с карточки
*/
const Card = require('../models/card');
const ErrorHandler = require('../utils/errorHandler/ErrorHandler');

const handleError = (err) => {
  if (err.name === 'CastError') {
    throw new ErrorHandler.BadRequestError('Карточка не найдена');
  }

  if (err.name === 'ValidationError') {
    throw new ErrorHandler.BadRequestError('Данные карточки неправильные');
  }

  if (err.name === 'OwnershipError') {
    throw new ErrorHandler.BadRequestError('Вы не являетесь владельцем карточки');
  }

  throw (err);
};

module.exports.getCards = (req, res, next) => Card.find({})
  .then((cards) => {
    res.send(cards);
  })
  .catch((err) => next(err));

module.exports.deleteCard = (req, res, next) => {
  Card.findById({ _id: req.params.cardId })
    .then((card) => {
      if (card.owner !== req.user._id) {
        throw (new ErrorHandler.BadRequestError('Вы не являетесь владельцем карточки'));
      }
      Card.deleteOne({ _id: req.params.cardId })
        .then((cards) => {
          if (cards.deletedCount === 0) {
            throw (new ErrorHandler.NotFoundError('Карточка не найдена'));
          }

          res.send({ message: 'Карточка удалена' });
        });
    })
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cards) => res.send(cards))
    .catch((err) => handleError(err))
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => { throw (new ErrorHandler.NotFoundError('Карточка не найдена')); })
  .then((cards) => res.send(cards))
  .catch((err) => handleError(err))
  .catch((err) => next(err));

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => { throw (new ErrorHandler.NotFoundError('Карточка не найдена')); })
  .then((cards) => res.send(cards))
  .catch((err) => handleError(err))
  .catch((err) => next(err));
