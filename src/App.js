// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './Signup/Registration'; // Assuming Form is a component in a file named 'Form.js'
import Login from './Signin/Login';
import Dashboard from './Signin/Dashboard';
// import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path='/Dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;