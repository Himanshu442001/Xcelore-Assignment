import React from 'react';

import {BrowserRouter as Router, Routes,Route } from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import UserCRUD from './components/UserCRUD';
import Logout from './components/Logout';

function App() {

  return <Router>
  <Routes>

               <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/admin/users" component={UserCRUD} />
                <Route path="/" exact component={() => <h1>Welcome to the MERN App</h1>} />

  </Routes>
          

  </Router>
}

export default App
