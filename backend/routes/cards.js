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
router.delete('/cards/:cardId', cardsController.deleteCard);

router.put('/cards/:cardId/likes', cardsController.likeCard);
router.delete('/cards/:cardId/likes', cardsController.dislikeCard);
module.exports = router;
