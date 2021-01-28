/* eslint-disable no-useless-escape */
/*
Поля схемы пользователя.

    name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
    about — **информация о пользователе, строка от 2 до 30 символов, обязательное поле;
    avatar — ссылка на аватарку, строка, обязательно поле.

Для проверки данных поля avatar используйте регулярное выражение.

*/

const mongoose = require('mongoose');
const validator = require('validator');

const urlRegexp = /https?:\/\/[a-z0-9-\._~:\/?#\[\]@!\$&'\(\)\*\+,;=]+#?/im;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(avatar) {
        return urlRegexp.test(avatar);
      },
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
