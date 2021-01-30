/*
GET /cards — возвращает все карточки
POST /cards — создаёт карточку
DELETE /cards/:cardId — удаляет карточку по идентификатору

PUT /cards/:cardId/likes — поставить лайк карточке
DELETE /cards/:cardId/likes — убрать лайк с карточки
*/
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const cardsController = require('../controllers/cards');

router.get('/cards/', cardsController.getCards);
router.post('/cards/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), cardsController.createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), cardsController.deleteCard);
// router.delete('/cards/:cardId', cardsController.deleteCard);

router.put('/cards/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), cardsController.likeCard);

router.delete('/cards/likes/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required().length(24),
  }),
}), cardsController.dislikeCard);

module.exports = router;
