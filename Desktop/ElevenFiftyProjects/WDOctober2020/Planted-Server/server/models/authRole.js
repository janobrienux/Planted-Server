const AccessControl = require('accesscontrol');
const ac = new AccessControl();

const authRoles = function () {
  ac.grant('user')
    .readOwn('user')
    .updateOwn('user')
    .create('plants')
    .createOwn('images')
    .createOwn('comment')
    .updateOwn('plants')
    .updateOwn('images')
    .updateOwn('comments')
    .deleteOwn('plants')
    .delelteOwn('images')
    .deleteOwn('comments')

  ac.grant('admin')
    .extend('user')
    .deleteAny('user')  
    .deleteAny('plants')
    .deleteAny('comments')
    .delete('images')
}

module.exports = authRoles;