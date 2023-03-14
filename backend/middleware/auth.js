const jwt = require("jsonwebtoken");
const user = require("../modals/userModal");

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        const decodedData = jwt.verify(token, "RajanMERNTask");
        req.user = await user.findById(decodedData?.id);
        next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "Invalid User"});
    }
}