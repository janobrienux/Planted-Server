const User = require('./user');
const Plants = require('./plants');
const Comments = require('./comments');

User.hasMany(Plants);
Plants.belongsTo(User);
User.hasMany(Comments);
Comments.belongsTo(User);
Plants.hasMany(Comments);
Comments.belongsTo(Plants);

module.exports = {User, Plants, Comments}