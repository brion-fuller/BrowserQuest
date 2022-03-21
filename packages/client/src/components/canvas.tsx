import { useState } from "react";
import Achievements from "./achievements";
import Instructions from "./instructions";

export default () => {
  const [showInstructions, setShowInstructions] = useState(false);
  return (
    <div id="container">
      <div id="canvasborder">
        <Instructions></Instructions>
        <Achievements></Achievements>
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
          <form action="none" method="get" acceptCharset="utf-8">
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
