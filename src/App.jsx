import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';

function App() {
  // State to manage the visibility of the ticket creation form
  const [isFormOpen, setIsFormOpen] = useState(false);

  // State to manage the selected ticket for viewing details
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Function to handle opening the ticket creation form
  function handleOpenCreateForm() {
    setIsFormOpen(true);
    setSelectedTicket(null); // Clear selected ticket when opening the create form
  }

  // Function to handle selecting a ticket from the list
  function handleSelectTicket(ticket) {
    setSelectedTicket(ticket);
    setIsFormOpen(false); // Close the form when a ticket is selected
  }

  return (
    <div className="app">
      <Header onCreateClick={handleOpenCreateForm} />
      <div className="app-body">
        <Sidebar />
        <MainContent
          isFormOpen={isFormOpen}
          onCloseForm={() => setIsFormOpen(false)}
          selectedTicket={selectedTicket}
          onSelectTicket={handleSelectTicket}
        />
      </div>
    </div>
  );
}

export default App;
