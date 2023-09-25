const { verify } = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  console.log(req.header)
  console.log(req.headers.authorization);
  const bearerToken = req.headers.authorization.split(' ')[1];
  console.log(bearerToken, 'bearerToken')

  if (!bearerToken) {
    return res.json({ error: "Usuario nao logado!" });
  }
  try {
    const validToken = verify(bearerToken, "importantsecret");
    console.log(validToken, 'validToken')
    req.user = {validToken};
    if (validToken) {
      return next();
    }
  } catch (error) {
    return res.json({error: error});
  }

};

module.exports = {validateToken};