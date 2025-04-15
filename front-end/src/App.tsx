import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import "./App.css";
import ProductManager from "./components/ProductManager/ProductManager";
import { store } from "./state/store";
import InventoryManager from "./components/ProductManager/InventoryManager/InventoryManager";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>
            Products
          </Link>
          <Link to="/inventory">Inventory</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ProductManager />} />
          <Route path="/inventory" element={<InventoryManager />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
