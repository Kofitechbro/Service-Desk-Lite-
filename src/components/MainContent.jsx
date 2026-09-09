import { useState } from 'react';
import initialTickets from '../data/tickets';
import Dashboard from './Dashboard';

function MainContent({
  isFormOpen,
  onCloseForm,
  onSelectTicket,
  selectedTicket,
}) {
  // State to manage the list of tickets
  const [ticketList, setTicketList] = useState(initialTickets);

  // State to manage search term and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  // State to manage the ticket being edited
  const [editingTicket, setEditingTicket] = useState(null);

  // State to manage form data for creating or editing a ticket
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requester: '',
    category: 'Hardware',
    priority: 'Low',
  });

  // State to manage form validation errors
  const [error, setError] = useState('');

  // Function to handle form input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Function to handle form submission for creating or editing a ticket
  function handleSubmit(e) {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.requester.trim()
    ) {
      setError('Title, description, and requester are all required.');
      return;
    }

    setError('');

    if (editingTicket) {
      const updatedTickets = ticketList.map((ticket) => {
        if (ticket.id === editingTicket.id) {
          return { ...ticket, ...formData };
        }
        return ticket;
      });
      setTicketList(updatedTickets);
      setEditingTicket(null);
    } else {
      const nextNumber = ticketList.length + 1;
      const newId = `SD-${String(nextNumber).padStart(3, '0')}`;
      const today = new Date().toISOString().split('T')[0];

      const newTicket = {
        ...formData,
        id: newId,
        createdAt: today,
        status: 'Open',
      };

      setTicketList([...ticketList, newTicket]);
    }

    setFormData({
      title: '',
      description: '',
      requester: '',
      category: 'Hardware',
      priority: 'Low',
    });

    onCloseForm();
  }

  // Filter tickets based on search term, status, and priority
  const filteredTickets = ticketList.filter((ticket) => {
    const matchesSearch = ticket.title
      .toLowerCase()
      .replace('-', '')
      .includes(searchTerm.toLowerCase().replace('-', ''));

    const matchesStatus =
      statusFilter === 'All' || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'All' || ticket.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Function to handle status change
  function handleStatusChange(ticketId, newStatus) {
    const updatedTickets = ticketList.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTicketList(updatedTickets);
  }

  // Function to handle priority change
  function handlePriorityChange(ticketId, newPriority) {
    const updatedTickets = ticketList.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, priority: newPriority };
      }
      return ticket;
    });
    setTicketList(updatedTickets);
  }

  // Function to handle ticket deletion with confirmation
  function handleDeleteTicket(ticketId) {
    const isConfirmed = confirm('Are you sure you want to delete this ticket?'); // Show confirmation dialog

    if (isConfirmed) {
      // If the user confirms, proceed with deletion
      const updatedTickets = ticketList.filter(
        (ticket) => ticket.id !== ticketId,
      ); // Filter out the ticket to be deleted
      setTicketList(updatedTickets); // Update the state with the new ticket list
      return true; // Indicate that the ticket was deleted
    }
    return false; // Indicate that the ticket was not deleted
  }

  // Function to handle ticket editing
  function handleEditTicket(ticket) {
    setEditingTicket(ticket); // Set the ticket to be edited

    // Pre-fill the form with the ticket's current data
    setFormData({
      title: ticket.title,
      description: ticket.description,
      requester: ticket.requester,
      category: ticket.category,
      priority: ticket.priority,
    });
  }

  function handleViewTicket(ticket) {
    onSelectTicket(ticket);
  }

  return (
    <main>
      {/* Render the Dashboard component and pass the ticketList as a prop */}
      <Dashboard tickets={ticketList} />

      {/* Render the ticket creation/editing form if isFormOpen or editingTicket
      is true */}
      {(isFormOpen || editingTicket) && (
        <section className="create-ticket-form">
          <div className="form-header">
            <h2>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</h2>
            <button
              type="button"
              onClick={() => {
                setEditingTicket(null);
                onCloseForm();
              }}
              className="close-btn"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <label>
              Title
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </label>

            <label>
              Requester
              <input
                type="text"
                name="requester"
                value={formData.requester}
                onChange={handleChange}
              />
            </label>

            <label>
              Category
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Hardware">Hardware</option>
                <option value="Network">Network</option>
                <option value="Account">Account</option>
                <option value="Application">Application</option>
              </select>
            </label>

            <label>
              Priority
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </label>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="submit-btn">
              {editingTicket ? 'Update Ticket' : 'Create Ticket'}
            </button>
          </form>
        </section>
      )}

      {/* Render the ticket details view if a ticket is selected */}
      {selectedTicket ? (
        <section className="ticket-details">
          <button
            type="button"
            onClick={() => onSelectTicket(null)}
            className="back-btn"
          >
            ← Back to Tickets
          </button>

          <div className="ticket-details-header">
            <h2>{selectedTicket.title}</h2>
            <span
              className={`priority-badge priority-${selectedTicket.priority.toLowerCase()}`}
            >
              {selectedTicket.priority}
            </span>
          </div>

          <span
            className={`status-badge status-${selectedTicket.status.toLowerCase().replace(' ', '-')}`}
          >
            <strong>Status:</strong> {selectedTicket.status}
          </span>

          <p className="ticket-details-description">
            {selectedTicket.description}
          </p>

          <div className="ticket-details-meta">
            <span>
              <strong>ID:</strong> {selectedTicket.id}
            </span>
            <span>
              <strong>Requester:</strong> {selectedTicket.requester}
            </span>
            <span>
              <strong>Category:</strong> {selectedTicket.category}
            </span>
            <span>
              <strong>Created:</strong> {selectedTicket.createdAt}
            </span>
          </div>
        </section>
      ) : (
        <>
          <section className="filters-bar">
            <input
              type="search"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ticket"
              className="search-input"
            />

            <select
              value={statusFilter}
              name='status'
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>

            <select
              value={priorityFilter}
              name='priority'
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="All">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </section>

          <h2 className="ticket-title">All Tickets</h2>

          {/* Render the list of filtered tickets or a message if no results are found */}
          {filteredTickets.length === 0 ? (
            <p className="no-results">No results found</p>
          ) : (
            <section className="ticket-list">
              {filteredTickets.map((ticket) => (
                <div className="ticket-card" key={ticket.id}>
                  <div className="ticket-card-header">
                    <h3
                      className="ticket-title-link"
                      onClick={() => handleViewTicket(ticket)}
                    >
                      {ticket.title}
                    </h3>
                    <select
                      className={`priority-badge priority-${ticket.priority.toLowerCase()}`}
                      value={ticket.priority}
                      onChange={(e) =>
                        handlePriorityChange(ticket.id, e.target.value)
                      }
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  <p className="ticket-description">{ticket.description}</p>
                  <div className="ticket-meta">
                    <span>ID: {ticket.id}</span>
                    <span>Requester: {ticket.requester}</span>
                    <span>Category: {ticket.category}</span>
                    <span>Created: {ticket.createdAt}</span>
                  </div>
                  <div className="ticket-actions">
                    <select
                      className={`status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}
                      value={ticket.status}
                      onChange={(e) =>
                        handleStatusChange(ticket.id, e.target.value)
                      }
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>

                    <div className="ticket-cta">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditTicket(ticket)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteTicket(ticket.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default MainContent;
