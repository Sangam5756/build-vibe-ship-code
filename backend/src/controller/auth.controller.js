const { registerUser, loginUser } = require("../services/auth.service");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    req.session.user = {
      id: user._id,
      username: user.username,
    };

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully registered",
      error: {},
      data: user._id,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { user } = await loginUser(req.body); // 🛑 no token anymore

    req.session.user = {
      id: user._id,
      username: user.username,
    };

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully logged in",
      error: {},
      data: {
        userId: user._id,
        username: user.username,
      },
    });
  } catch (err) {
    next(err);
  }
};


const me = (req, res) => {
  console.log(req.sessionID)
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.status(401).json({ loggedIn: false, message: "Not authenticated" });
  }
};

module.exports = { register, login, me };

