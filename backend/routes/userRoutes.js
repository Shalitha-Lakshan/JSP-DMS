const express = require('express');
const router = express.Router();
const { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    updateProfile,
    updatePassword,
    deactivateAccount
} = require('../controllers/users');

const { protect, authorize } = require('../middleware/auth');

// All routes protected
router.use(protect);

// Admin only routes
router.use(authorize('admin'));
router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// User profile routes
router.route('/profile/update').put(updateProfile);
router.route('/profile/update-password').put(updatePassword);
router.route('/profile/deactivate').put(deactivateAccount);

module.exports = router;
