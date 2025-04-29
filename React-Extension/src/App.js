import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ModalInput from './ExtensionUI-Components/ModalInput/ModalInput';
import MainUI from './ExtensionUI-Components/MainUI/MainUI';
import Dashboard from './ExtensionUI-Components/Pages/Dashboard';
import Analytics from './ExtensionUI-Components/Pages/Analytics';
import Settings from './ExtensionUI-Components/Pages/Settings';

/**
 * App Component
 * 
 * The root component of the applications.
 * Sets up client-side routing using React-Router-Dom.
 * 
 * @returns {JSX.Element} The rendered App component.
 * 
 * @see https://reactrouter.com/start/declarative/routing
 */
export default function App() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ModalInput
        open={modalOpen}
        onClose={() => setModalOpen(false)}/>} />
        <Route path="main-ui" element={<MainUI />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}