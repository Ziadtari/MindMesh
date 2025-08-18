const express = require('express');
const { getUsers, getUsersByID, createUser, updateUsers, deleteUsers, registerUser, loginUser } = require('../controllers/UserController');
const { protect } = require('../middleware/AuthMiddleware');
 
//router objects
const router = express.Router();
 
router.post('/register', registerUser);
router.post('/login', loginUser);
 
//user routes
router.get('/', protect, getUsers);
router.get('/:id', protect, getUsersByID);
router.post('/', protect, createUser);
router.put('/:id', protect, updateUsers);
router.delete('/:id', protect, deleteUsers);
 
module.exports = router;