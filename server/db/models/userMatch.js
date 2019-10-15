// const Sequelize = require('sequelize');
// const db = require('../db');

// const UserMatches = db.define('UserMatches', {
//   isAccepted: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false
//   },
//   isRejected: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false
//   }

// });
//user sends request to match
//pending request: false, false (default)
//accepted request: true, false
//rejected request: false, true
//accepted, then rejected: true, true (perhaps for deleting/blocking purposes)

// module.exports = UserMatches;
