const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const userByEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (userByEmail) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashPassword = await bcrypt.hash(
      req.body.password,
      Number(process.env.SALT_ROUND)
    );

    const data = { ...req.body, password: hashPassword };

    const createUser = await User.create(data);

    const newUser = {
      id: createUser.id,
      fullname: createUser.fullname,
      email: createUser.email,
      role: createUser.role,
    };

    return res.json({
      success: true,
      message: "Success register",
      result: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const email = req.body.email;

    if (email) {
      const userByEmail = await User.findOne({ where: { email } });

      if (!userByEmail) {
        return res.status(404).json({
          success: false,
          message: "Email not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userByEmail.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Password not valid",
        });
      }

      return res.json({
        success: true,
        result: {
          id: userByEmail.id,
          fullname: userByEmail.fullname,
          email: userByEmail.email,
          role: userByEmail.role,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Email cant be empty",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userById = await User.findByPk(id);

    if (!userById) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userByEmail = await User.findOne({
      where: { email: req.body.email },
    });
    //userByEmail =>  {id: 2, fullname: Budi, email: irsyaad@email.com}
    // req.body => {id: 1, fullname: Irsyaad, email: irsyaad@email.com}

    if (userByEmail && Number(userByEmail.id) !== Number(id)) {
      return res.status(400).json({
        success: false,
        message: "Email already exist",
      });
    }

    let updateData = req.body;

    if (req.body.password) {
      const hashPassword = await bcryp.hash(
        req.body.password,
        Number(process.env.SALT_ROUND)
      );

      updateData.password = hashPassword;
    }

    await userById.update(updateData);

    return res.json({
      success: true,
      message: "Success update profile",
      result: {
        id: userById.id,
        fullname: userById.fullname,
        email: userById.email,
        role: userById.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "User found",
      result: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserAll = async (req, res) => {
  try {
    const user = await User.findAll();

    return res.json({
      success: true,
      result: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await User.destroy({ where: { id: req.params.id } });

    return res.json({
      success: true,
      message: "Success delete user",
      result: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
