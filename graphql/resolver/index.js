const userResolver = require('./user');
const assResolver = require('./assignment');

const rvalues = {
    ...userResolver,
    ...assResolver,
};

module.exports = rvalues;