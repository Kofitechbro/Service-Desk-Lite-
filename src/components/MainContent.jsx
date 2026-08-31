import { useState } from 'react';
import initialTickets from '../data/tickets';
import Dashboard from './Dashboard';

function MainContent({ isFormOpen, onCloseForm }) {
  const [ticketList, setTicketList] = useState(initialTickets);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requester: '',
    category: 'Hardware',
    priority: 'Low',
  });

  const [error, setError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

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

    setFormData({
      title: '',
      description: '',
      requester: '',
      category: 'Hardware',
      priority: 'Low',
    });

    onCloseForm();
  }

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

  function handleStatusChange(ticketId, newStatus) {
    const updatedTickets = ticketList.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, status: newStatus };
      }
      return ticket;
    });
    setTicketList(updatedTickets);
  }

  function handlePriorityChange(ticketId, newPriority) {
    const updatedTickets = ticketList.map((ticket) => {
      if (ticket.id === ticketId) {
        return { ...ticket, priority: newPriority };
      }
      return ticket;
    });
    setTicketList(updatedTickets);
  }

  return (
    <main>
      <Dashboard tickets={ticketList} />

      {isFormOpen && (
        <div className="create-ticket-form">
          <div className="form-header">
            <h2>Create New Ticket</h2>
            <button type="button" onClick={onCloseForm} className="close-btn">
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
              Create Ticket
            </button>
          </form>
        </div>
      )}

      <section className="filters-bar">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search ticket title"
          className="search-input"
        />

        <select
          value={statusFilter}
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

      {filteredTickets.length === 0 ? (
        <p className="no-results">No results found</p>
      ) : (
        <div className="ticket-list">
          {filteredTickets.map((ticket) => (
            <div className="ticket-card" key={ticket.id}>
              <div className="ticket-card-header">
                <h3>{ticket.title}</h3>
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
              <select
                className={`status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}
                value={ticket.status}
                onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MainContent;
