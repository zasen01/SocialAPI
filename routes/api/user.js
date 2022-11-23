const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    addFriend,
    removeFriend,
    updateUser,
    deleteUser
} = require('../../controllers/user');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).put(removeFriend);



module.exports = router;