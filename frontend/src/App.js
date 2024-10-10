import "./App.css";
import Landingpage from "./Pages/Landingpage";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App">
      <Route path="/" component={Landingpage} exact />
      <Route path="/homepage" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
