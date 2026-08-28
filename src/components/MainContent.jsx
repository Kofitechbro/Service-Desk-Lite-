import { useState } from 'react';
import tickets from '../data/tickets';
import Dashboard from './Dashboard';

function MainContent({ isFormOpen, onCloseForm }) {
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

  function handleChange(e) {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const filteredTickets = tickets.filter((ticket) => {
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

  return (
    <main>
      <Dashboard />

      {isFormOpen && (
        <div className="create-ticket-form">
          <div className="form-header">
            <h2>Create New Ticket</h2>
            <button type="button" onClick={onCloseForm} className="close-btn">
              ×
            </button>
          </div>

          <form>
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
                <option value="Networking">Networking</option>
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
                <span
                  className={`priority-badge priority-${ticket.priority.toLowerCase()}`}
                >
                  {ticket.priority}
                </span>
              </div>
              <p className="ticket-description">{ticket.description}</p>
              <div className="ticket-meta">
                <span>Requester: {ticket.requester}</span>
                <span>Category: {ticket.category}</span>
                <span>Created: {ticket.createdAt}</span>
              </div>
              <span
                className={`status-badge status-${ticket.status.toLowerCase().replace(' ', '-')}`}
              >
                {ticket.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default MainContent;
