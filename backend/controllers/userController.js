const User = require("../modals/userModal");

const sendToken = async (user, statusCode, res) => {
  const token = await user.getJWTToken();
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

exports.registerUser = async (req, res, next) => {
  try {
    const { name, mob_no, dob, email, password, confirmPassword, userName } =
      req.body;
    if (password != confirmPassword) {
      return res
        .status(500)
        .json({ success: false, message: "password mismatched" });
    }
    const user = await User.create({
      name,
      mobileNumber: mob_no,
      password,
      email,
      dateOfBirth: dob,
      userName,
    });
    sendToken(user, 201, res);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* exports.loginUser = async function (req, res, next) {
    try {
        const { mob_no, password } = req.body;
        const user = await User.findOne({
            mobileNumber: mob_no
        }).select("+password");
        if (!user ) {
            return res.status(500).json({ success: false, message: "User Not Found"});
        }
        const validPassword = await user.comparePassword(password);

        if (!validPassword ) {
            return res.status(500).json({ success: false, message: "Invalid Password"});
        }
        sendToken(user, 200, res);
    } catch (err) {
        return res.status(500).json({ success: false, message: err.message});
    }
} */

exports.loginUser = async function (req, res, next) {
  try {
    const { user_email, password } = req.body;
    const userNameCheck = await User.findOne({
      userName: user_email,
    }).select("+password");
    const emailCheck = await User.findOne({
      email: user_email,
    }).select("+password");
    if (!emailCheck && !userNameCheck) {
      return res
        .status(500)
        .json({ success: false, message: "User Not Found" });
    }
    const validPassword = userNameCheck
      ? await userNameCheck.comparePassword(password)
      : emailCheck.comparePassword(password);

    if (!validPassword) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Password" });
    }
    console.log(userNameCheck , emailCheck);
    sendToken(userNameCheck ?? emailCheck, 200, res);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.listUser = async function (req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async function ( req, res, next) {
  try {
      const user = await User.findOneAndRemove(req.params.id);

      // if (!user) {
      //   return res.status(500).json({ success: false, message: "User Not Found" });
      // }

      console.log(user);
      return res.status(200).json({ success: true, message: "User Deleted SuccessFully!" });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

exports.updateUser = async function ( req, res, next) {
  try {
      const { name, mobileNumber, dateOfBirth, email, password, confirmPassword, userName } =
      req.body;
      const user = await User.findByIdAndUpdate(req.params.id, {
        name,
        mobileNumber,
        password,
        email,
        dateOfBirth,
        userName,
      } , {
        // new: true,
        runValidators: true,
        useFindAndModify: false
      });

      return res.status(200).json({ success: true, message: "User Updated SuccessFully!", user });

  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}