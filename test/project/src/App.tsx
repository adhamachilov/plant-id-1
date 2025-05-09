import React from 'react';
import ContactCard from './components/ContactCard';

function App() {
  return (
    <div className="min-h-screen bg-[#2A3B2F] flex items-center justify-center p-8">
      <div className="w-full max-w-[420px]">
        <ContactCard />
      </div>
    </div>
  );
}

export default App;