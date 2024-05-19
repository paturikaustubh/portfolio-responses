import { useState } from "react";
import Responses from "./components/Responses";
import Login from "./components/Login";

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  if (authenticated) return <Responses setAuthenticated={setAuthenticated} />;
  return <Login setAuthenticated={setAuthenticated} />;
}

export default App;
