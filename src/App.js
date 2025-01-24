// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import Loginpage from "./pages/Loginpage"; // Your login component

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/Dashboard" element={<Dashboard />}>
          <Route path="Students" element={<StudentsPage />} />
        </Route>
      </Routes>
  );
};

export default App;
