const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validators");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    console.log(req.body);
    const value = validateRegister(req.body);
    console.log(value, "jjjjj");

    const user = await User.findOne({
      where: { email: value.email },
    });
    if (user) {
      createError("email is already in use", 400);
    }

    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);

    res
      .status(201)
      .json({ message: "register success. please log in to continue." });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: value.email || "" }],
      },
    });
    if (!user) {
      createError("invalid email or mobile or password", 400);
    }

    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("invalid email or mobile or password", 400);
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        fullName: user.fullName,

        email: user.email,

        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  // const user = User.findOne({where})
  console.log("userrrr ->>>>> ", req.user);
  res.status(200).json({ user: req.user });
};

exports.updateUser = async (req, res, next) => {
  try {
    console.log(req.body, "ddddddd");
    console.log(req.user);
    await User.update(req.body, { where: { id: req.user.id } });
  } catch (err) {
    next(err);
  }
};

exports.note = async (req, res, next) => {
  try {
    await User.update(req.body, { where: { id: req.user.id } });
  } catch (err) {
    next(err);
    res.status(200).json({ User });
  }
};
