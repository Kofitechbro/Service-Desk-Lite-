import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="app">
      <Header onCreateClick={() => setIsFormOpen(true)} />
      <div className="app-body">
        <Sidebar />
        <MainContent
          isFormOpen={isFormOpen}
          onCloseForm={() => setIsFormOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
