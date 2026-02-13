
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Status from './components/Status';

function App() {

  return (
    <>
       <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/status" element={<Status />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
    </>
  )
}

export default App
