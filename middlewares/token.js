const jwt = require("jsonwebtoken");


const genarateToken = async function ({ is_admin, email, class_number }) {
  return await jwt.sign({
    is_admin
  },
    process.env.SECRETKEY,
    // { expiresIn: "4d" } //time zone for this token
  );

};

//verifay token
function verifyToken(req, res, next) {
  const token = req.headers.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRETKEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "no Token provided" });
  }
}

function verifayTokenAndAuthorization(req, res, next) {
  const token = req.params.token;
  const email = req.params.email;
  const decoded = jwt.verify(token, process.env.SECRETKEY);
  if (token) {
    try {
      if (decoded.email === email) {
        next();

      } else {
        res.status(401).json({ message: "you are not allowed do this" });

      }
    } catch (error) {
      res.status(401).json({ message: "invalid token" });
    }
  } else {
    res.status(401).json({ message: "no Token provided" });
  }


}

function verifayTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    try {
      if (!req.user.is_admin) {
        return res
          .status(403)
          .json({ message: "you are not allowed to do this just admin" });
      } else {
        next();
      }
    } catch (error) {
      res.json(error)

    }
  });
}
module.exports = {
  verifayTokenAndAuthorization,
  verifayTokenAndAdmin,
  genarateToken,
};
