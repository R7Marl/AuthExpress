import crypto from 'crypto';
const encryptPassword = (password) => {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return hash;
}
const comparePassword = (password, hash) => {
    const newHash = crypto.createHash('sha256').update(password).digest('hex');
    return newHash === hash;
}

export { encryptPassword, comparePassword };