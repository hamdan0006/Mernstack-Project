


const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin-controllers');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware = require('../middleware/admin-middleware');

// Route to get all users
router.route('/users')
  .get(authMiddleware, adminMiddleware, adminControllers.getAllUsers);

// Route to get a user by ID
router.route('/users/:id')
  .get(authMiddleware, adminMiddleware, adminControllers.getUserById);

  // Route to update a user by ID
  router.route('/users/update/:id')
  .patch(authMiddleware, adminMiddleware, adminControllers.updateUserById);

// Route to delete a user by ID
router.route('/users/delete/:id')
  .delete(authMiddleware, adminMiddleware, adminControllers.deleteUser);

  // Route to delete a contact
router.route('/contacts/delete/:id')
.delete(authMiddleware, adminMiddleware, adminControllers.deleteContact);


// Route to get all contacts
router.route('/contacts')
  .get(authMiddleware, adminControllers.getContacts);

module.exports = router;
