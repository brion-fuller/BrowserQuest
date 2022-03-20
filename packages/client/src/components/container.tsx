export default () => {
  return (
    <div id="container">
      <div id="canvasborder">
        <article id="instructions" className="clickable">
          <div className="close"></div>
          <h1>
            <span className="left-ornament"></span>
            How to play
            <span className="right-ornament"></span>
          </h1>
          <ul>
            <li>
              <span className="icon"></span>Left click or tap to move, attack
              and pick up items.
            </li>
            <li>
              <span className="icon"></span>Press ENTER to chat.
            </li>
            <li>
              <span className="icon"></span>Your character is automatically
              saved as you play.
            </li>
          </ul>
          <p>- click anywhere to close -</p>
        </article>
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
        <div id="canvas">
          <canvas id="background"></canvas>
          <canvas id="entities"></canvas>
          <canvas id="foreground" className="clickable"></canvas>
        </div>
        <div id="bubbles"></div>
        <div id="achievement-notification">
          <div className="coin">
            <div id="coinsparks"></div>
          </div>
          <div id="achievement-info">
            <div className="title">New Achievement Unlocked!</div>
            <div className="name"></div>
          </div>
        </div>
        <div id="bar-container">
          <div id="healthbar"></div>
          <div id="hitpoints"></div>
          <div id="weapon"></div>
          <div id="armor"></div>
          <div id="notifications">
            <div>
              <span id="message1"></span>
              <span id="message2"></span>
            </div>
          </div>
          <div id="playercount" className="clickable">
            <span className="count">0</span> <span>players</span>
          </div>
          <div id="barbuttons">
            <div id="chatbutton" className="barbutton clickable"></div>
            <div id="achievementsbutton" className="barbutton clickable"></div>
            <div id="helpbutton" className="barbutton clickable"></div>
            <div id="mutebutton" className="barbutton clickable active"></div>
          </div>
        </div>
        <div id="chatbox">
          <form action="none" method="get" accept-charset="utf-8">
            <input id="chatinput" className="gp" type="text" maxLength={60} />
          </form>
        </div>
        <div id="population">
          <div id="instance-population" className="">
            <span>0</span> <span>players</span> in your instance
          </div>
          <div id="world-population" className="">
            <span>0</span> <span>players</span> total
          </div>
        </div>
      </div>
    </div>
  );
};
