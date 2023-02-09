import React from "react";
import HomeComponent from "./component/Home/HomeComponent";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
 

  React.useEffect(() => { 
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
    
  }, []);

  return ( 
    <div className="App">
      {!data ? <img src={logo} className="App-logo" alt="logo" /> : 
        <div className="App-container">
          <HomeComponent />
        </div>
      }
    </div>
  );
}

export default App;
