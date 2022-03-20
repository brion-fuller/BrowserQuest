import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Intro from "./components/intro";
import Container from "./components/container";
import Footer from "./components/footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <a
        id="moztab"
        className="clickable"
        target="_blank"
        href="http://www.mozilla.org/"
      ></a>
      <Intro></Intro>
      <Container></Container>
      <Footer></Footer>
    </div>
  );
}

export default App;
