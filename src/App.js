import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from "./pages/Login.js";
import Orders from "./pages/Orders.js";
import Header from "./components/Header.js";
import './App.css';

function App() {
  return (
    <Router key='App__Router'>
      <div className="App" key="App">
      
      <Routes key='App__Routes'>
      <Route className="Route-1" key = "Route-1" path="/" element={[<Login />]} />
      <Route className="Route-2" key = "Route-2" path="/login" element={[<Login />]} />
      <Route className="Route-3" key = "Route-3" path = "/orders" element={[<Header />, <Orders />]} />;
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;
