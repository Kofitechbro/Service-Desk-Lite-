import { useState } from 'react';
import tickets from '../data/tickets';
import Dashboard from './Dashboard';

function MainContent() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets =
    tickets.filter((ticket) =>
      ticket.title
        .toLowerCase()
        .replace('-', '')
        .includes(searchTerm.toLowerCase().replace('-', '')),
    ) ||
    tickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <main>
      <Dashboard />

      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search ticket title"
        className="search-input"
      />

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
