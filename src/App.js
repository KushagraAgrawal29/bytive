import "./App.css";
import { Home, Navbar, Sidebar } from "./components";

function App() {
  return (
    <div className="flex flex-col">
      <div className="">
        <Navbar />
      </div>
      <div className="flex">
        <Sidebar />
        <Home />
      </div>
    </div>
  );
}

export default App;
