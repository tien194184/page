const siteRouter = require('./site');

function route(app) {
    // app.use('/admin', adminRouter);
    app.use('/', siteRouter);
}

module.exports = route;
