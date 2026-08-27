import { useState } from 'react';
import tickets from '../data/tickets';
import Dashboard from './Dashboard';

function MainContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

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

      <div className="filters-bar">
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
      </div>

      <h2>All Tickets</h2>

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
