const mongoose = require('mongoose');
require('dotenv').config();
const Contact = require('../models/contactSchema');

const seedContacts = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      family: 4
    });

    console.log('Connected to MongoDB');

    // Check if contacts already exist
    const existingContacts = await Contact.find({});
    
    if (existingContacts.length > 0) {
      console.log('Contacts already exist. Skipping seed.');
      process.exit(0);
    }

    // Create initial contacts
    const initialContacts = [
      {
        number: '9893082246',
        label: 'Transport Office 1'
      },
      {
        number: '6262135550',
        label: 'Transport Office 2'
      }
    ];

    await Contact.insertMany(initialContacts);
    console.log('✅ Initial contacts seeded successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding contacts:', error);
    process.exit(1);
  }
};

seedContacts();
