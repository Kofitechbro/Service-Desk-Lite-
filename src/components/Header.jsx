function Header({ onCreateClick }) {
  return (
    <header>
      <h1>ServiceDesk Lite</h1>
      <button type="button" onClick={onCreateClick}>Create New Ticket</button>
    </header>
  );
}

export default Header;
