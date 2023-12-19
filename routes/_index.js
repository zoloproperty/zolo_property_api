const userRoutes = require('./user.routes');


module.exports = (app) => {
  app.use('/api/user', userRoutes);

};

