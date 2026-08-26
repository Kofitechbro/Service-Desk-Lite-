import tickets from '../data/tickets';

function MainContent() {
  return (
    <main>
      <h2>All Tickets</h2>

      <div className="ticket-list">
        {tickets.map((ticket) => (
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
    </main>
  );
}

export default MainContent;
