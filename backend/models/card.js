/* eslint-disable comma-dangle */
/* eslint-disable no-useless-escape */
/*
Поля схемы карточки:

    name — имя карточки, строка от 2 до 30 символов, обязательное поле;
    link — ссылка на картинку, строка, обязательно поле.
    Для проверки данных используйте регулярное выражение из предыдущей схемы;
    owner — ссылка на модель автора карточки, тип ObjectId, обязательное поле;
    likes — список лайкнувших пост пользователей, массив ObjectId,
    по умолчанию — пустой массив (поле default);
    createdAt — дата создания, тип Date, значение по умолчанию Date.now.

Модель пользователя назовите user, карточки — card.
Для этого передайте имена моделей первым аргументом методу mongoose.model:
*/

const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(uri) {
        return validator.isURL(uri);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: []
  }],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now()
  },
});

module.exports = mongoose.model('card', cardSchema);
