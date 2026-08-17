import React, { useState } from 'react'
import Home from './Pages/Home'
import MainPage from './Pages/MainPage';
import { Routes, Route } from 'react-router-dom';
import BuildForm from './Component/BuildForm';

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <Routes>
      <Route
        path="/"
        element={loading ? <Home setLoading={setLoading} /> : <MainPage />}
      />
      <Route path="/build" element={<BuildForm />} />
    </Routes>
  );
};

export default App;
