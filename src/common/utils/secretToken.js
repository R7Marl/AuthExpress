import jwt from 'jsonwebtoken';

export const createToken = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN, { expiresIn: '7d' });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_TOKEN);
}