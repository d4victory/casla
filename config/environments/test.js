module.exports = {
  github: {
    clientID: process.env.GITHUB_CLIENTID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://localhost:8080/auth/github/callback'
  }
};
