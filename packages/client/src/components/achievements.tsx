export default () => (
  <article id="achievements" className="page1 clickable">
    <div className="close"></div>
    <div id="achievements-wrapper">
      <div id="lists"></div>
    </div>
    <div id="achievements-count" className="stroke">
      Completed
      <div>
        <span id="unlocked-achievements">0</span>/
        <span id="total-achievements"></span>
      </div>
    </div>
    <nav className="clickable">
      <div id="previous"></div>
      <div id="next"></div>
    </nav>
  </article>
);
