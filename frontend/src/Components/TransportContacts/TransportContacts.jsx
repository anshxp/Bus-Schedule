import { useState, useEffect } from 'react';
import './TransportContacts.css';

function TransportContacts({ isAdmin }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editNumber, setEditNumber] = useState('');
  const [editLabel, setEditLabel] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newNumber, setNewNumber] = useState('');
  const [newLabel, setNewLabel] = useState('');

  // Fetch contacts from API
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/contacts');
      const data = await response.json();
      if (data.success) {
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  const handleEdit = (contact) => {
    setEditingId(contact._id);
    setEditNumber(contact.number);
    setEditLabel(contact.label);
  };

  const handleSaveEdit = async (id) => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify({ 
          number: editNumber, 
          label: editLabel 
        })
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchContacts();
        setEditingId(null);
        setEditNumber('');
        setEditLabel('');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditNumber('');
    setEditLabel('');
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('admintoken');
      const response = await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        await fetchContacts();
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleAdd = async () => {
    if (newNumber && newLabel) {
      try {
        const token = localStorage.getItem('admintoken');
        const response = await fetch('http://localhost:3000/api/contacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include',
          body: JSON.stringify({ 
            number: newNumber, 
            label: newLabel 
          })
        });

        const data = await response.json();
        
        if (data.success) {
          await fetchContacts();
          setNewNumber('');
          setNewLabel('');
          setIsAdding(false);
        }
      } catch (error) {
        console.error('Error adding contact:', error);
      }
    }
  };

  const handleCancelAdd = () => {
    setNewNumber('');
    setNewLabel('');
    setIsAdding(false);
  };

  return (
    <div className="transport-contacts-wrapper">
      <button 
        className="transport-dial-btn"
        onClick={() => setShowDropdown(!showDropdown)}
        title="Transport Department Contacts"
      >
        <i className="fas dial fa-phone-alt"></i>
        <span className="dial-label">Transport</span>
      </button>

      {showDropdown && (
        <>
          <div 
            className="transport-backdrop" 
            onClick={() => setShowDropdown(false)}
          ></div>
          <div className="transport-dropdown">
            <div className="transport-dropdown-header">
              <h4>Transport Contacts</h4>
              <button 
                className="close-btn"
                onClick={() => setShowDropdown(false)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="transport-contacts-list">
              {loading ? (
                <div className="loading-contacts">Loading...</div>
              ) : contacts.length === 0 ? (
                <div className="no-contacts">No contacts available</div>
              ) : (
                contacts.map(contact => (
                  <div key={contact._id} className="contact-item">
                    {editingId === contact._id ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          value={editLabel}
                          onChange={(e) => setEditLabel(e.target.value)}
                          placeholder="Label"
                          className="edit-input"
                        />
                        <input
                          type="tel"
                          value={editNumber}
                          onChange={(e) => setEditNumber(e.target.value)}
                          placeholder="Number"
                          className="edit-input"
                        />
                        <div className="edit-actions">
                          <button 
                            className="save-btn"
                            onClick={() => handleSaveEdit(contact._id)}
                          >
                            <i className="fas fa-check"></i>
                          </button>
                          <button 
                            className="cancel-btn"
                            onClick={handleCancelEdit}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="contact-info">
                          <span className="contact-label">{contact.label}</span>
                          <span className="contact-number">{contact.number}</span>
                        </div>
                        <div className="contact-actions">
                          <button 
                            className="call-btn"
                            onClick={() => handleCall(contact.number)}
                            title="Call"
                          >
                            <i className="fas fa-phone"></i>
                          </button>
                          {isAdmin && (
                            <>
                              <button 
                                className="edit-action-btn"
                                onClick={() => handleEdit(contact)}
                                title="Edit"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button 
                                className="delete-btn"
                                onClick={() => handleDelete(contact._id)}
                                title="Delete"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}

              {isAdmin && (
                <>
                  {isAdding ? (
                    <div className="add-form">
                      <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        placeholder="Label (e.g., Transport Office 3)"
                        className="add-input"
                      />
                      <input
                        type="tel"
                        value={newNumber}
                        onChange={(e) => setNewNumber(e.target.value)}
                        placeholder="Number"
                        className="add-input"
                      />
                      <div className="add-actions">
                        <button 
                          className="save-btn"
                          onClick={handleAdd}
                        >
                          <i className="fas fa-check"></i> Add
                        </button>
                        <button 
                          className="cancel-btn"
                          onClick={handleCancelAdd}
                        >
                          <i className="fas fa-times"></i> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      className="add-new-btn"
                      onClick={() => setIsAdding(true)}
                    >
                      <i className="fas fa-plus"></i> Add New Contact
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TransportContacts;
