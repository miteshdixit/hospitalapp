import jwt from 'jsonwebtoken';

export const generateToken = (user, message, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  
  const cookieName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
  
  res
    .status(statusCode)
    .cookie(cookieName, token, {
      expires: new Date(Date.now() + parseInt(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message,
      user,
      token,
    });
  
  // console.log(token);
};
