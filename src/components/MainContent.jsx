import tickets from '../data/tickets';

function MainContent() {
  return (
    <main>
      <h2>All Tickets</h2>

      <div className="ticket-list">
        {tickets.map((ticket) => (
          <div className="ticket-card" key={ticket.id}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>Requester: {ticket.requester}</p>
            <p>Status: {ticket.status}</p>
            <p>Priority: {ticket.priority}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MainContent;
