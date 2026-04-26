import Admin from "./components/Admin";
import Employee from "./components/Employee";
import { useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("admin");

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Review App</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setActivePage("admin")}>Admin Page</button>{" "}
        <button onClick={() => setActivePage("employee")}>Employee Page</button>
      </div>

      {activePage === "admin" ? <Admin /> : <Employee />}
    </div>
  );
}

export default App;