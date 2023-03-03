import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/auth'
import Login from './pages/Login'
import AuthRoute from './utils/AuthRoute'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/authenticate' element={<Login/>}/>
            <Route path='/employees' element={<AuthRoute/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
