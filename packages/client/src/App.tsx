// import "./App.css";
import Intro from "./components/intro";
import Canvas from "./components/canvas";
import Footer from "./components/footer";
import "./game/main";

function App() {
  return (
    <div className="App">
      <a
        id="moztab"
        className="clickable"
        target="_blank"
        href="http://www.mozilla.org/"
      ></a>
      <Intro></Intro>
      <Canvas></Canvas>
      <Footer></Footer>
      <ul id="page-tmpl" className="clickable" style={{ display: "none" }}></ul>
      <ul>
        <li id="achievement-tmpl" style={{ display: "none" }}>
          <div className="coin"></div>
          <span className="achievement-name">???</span>
          <span className="achievement-description">???</span>
          <div className="achievement-sharing">
            <a href="" className="twitter"></a>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
