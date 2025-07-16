export default {
  jwt: {
    secret: process.env.JWT_SECRET || 'default-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '1d'
  },
  refreshToken: {
    secret: process.env.REFRESH_SECRET,
    expiresIn: process.env.REFRESH_EXPIRES_IN,
    duration: +process.env.REFRESH_DURATION
  }
}
