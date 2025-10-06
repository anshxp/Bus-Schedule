const Contact = require('../models/contactSchema');

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: 1 });
    return res.json({ success: true, contacts });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: "Error fetching contacts", 
      error: err.message 
    });
  }
};

// Add new contact (Admin only)
const addContact = async (req, res) => {
  try {
    const { number, label } = req.body;

    if (!number || !label) {
      return res.status(400).json({ 
        success: false, 
        message: "Number and label are required" 
      });
    }

    const newContact = new Contact({
      number,
      label
    });

    await newContact.save();
    
    return res.status(201).json({ 
      success: true, 
      message: "Contact added successfully", 
      contact: newContact 
    });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: "Error adding contact", 
      error: err.message 
    });
  }
};

// Update contact (Admin only)
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { number, label } = req.body;

    if (!number || !label) {
      return res.status(400).json({ 
        success: false, 
        message: "Number and label are required" 
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { number, label, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ 
        success: false, 
        message: "Contact not found" 
      });
    }

    return res.json({ 
      success: true, 
      message: "Contact updated successfully", 
      contact: updatedContact 
    });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: "Error updating contact", 
      error: err.message 
    });
  }
};

// Delete contact (Admin only)
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ 
        success: false, 
        message: "Contact not found" 
      });
    }

    return res.json({ 
      success: true, 
      message: "Contact deleted successfully", 
      contact: deletedContact 
    });
  } catch (err) {
    return res.status(500).json({ 
      success: false, 
      message: "Error deleting contact", 
      error: err.message 
    });
  }
};

module.exports = { 
  getAllContacts, 
  addContact, 
  updateContact, 
  deleteContact 
};
