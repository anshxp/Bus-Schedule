const express = require('express');
const router = express.Router();
const { 
  getAllContacts, 
  addContact, 
  updateContact, 
  deleteContact 
} = require('../controllers/contactControllers');
const verifyAdmin = require('../middlewares/verifyadmin');

// Public route - anyone can view contacts
router.get('/contacts', getAllContacts);

// Admin only routes
router.post('/contacts', verifyAdmin, addContact);
router.put('/contacts/:id', verifyAdmin, updateContact);
router.delete('/contacts/:id', verifyAdmin, deleteContact);

module.exports = router;
