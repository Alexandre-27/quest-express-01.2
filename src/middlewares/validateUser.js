/*
const validateUser = (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (firstname == null) {
    errors.push({ field: "firstname", message: "The field is required" });
  }
  if (lastname == null) {
    errors.push({ field: "lastname", message: "The field is required" });
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (errors.length) {
    res.status(422).json({ validateErrors: errors });
  } else {
    next();
  }
};
*/

const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  city: Joi.string().max(255),
  language: Joi.string().max(255),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validateError: error.details });
  } else {
    next();
  }
};

module.exports = validateUser;
