const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSinglePost).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).put(removeFriend);

module.exports = router;