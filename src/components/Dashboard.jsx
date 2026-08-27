import tickets from '../data/tickets';

export function Dashboard() {
  const totalCount = tickets.length;
  const openCount = tickets.filter((ticket) => ticket.status === 'Open').length;
  const inprogressCount = tickets.filter(
    (ticket) => ticket.status === 'In Progress',
  ).length;
  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === 'Resolved',
  ).length;

  return (
    <section className="dashboard">
      <div className="stat-card">
        <span className="stat-number">{totalCount}</span>
        <span className="stat-label">Total Tickets</span>
      </div>

      <div className="stat-card">
        <span className="stat-number">{openCount}</span>
        <span className="stat-label">Open</span>
      </div>

      <div className="stat-card">
        <span className="stat-number">{inprogressCount}</span>
        <span className="stat-label">In Progress</span>
      </div>

      <div className="stat-card">
        <span className="stat-number">{resolvedCount}</span>
        <span className="stat-label">Resolved</span>
      </div>
    </section>
  );
}

export default Dashboard;
