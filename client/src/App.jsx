import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CreateDecision from './pages/CreateDecision';
import DecisionWorkspace from './pages/DecisionWorkspace';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateDecision />} />
          <Route path="/decision/:id" element={<DecisionWorkspace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
