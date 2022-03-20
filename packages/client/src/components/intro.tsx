export default () => {
  return (
    <div id="intro">
      <h1 id="logo">
        <span id="logosparks"> </span>
      </h1>
      <article id="portrait">
        <p>Please rotate your device to landscape mode</p>
        <div id="tilt"></div>
      </article>
      <section id="parchment" className="createcharacter">
        <div className="parchment-left"></div>
        <div className="parchment-middle">
          <article id="createcharacter">
            <h1>
              <span className="left-ornament"></span>A Massively Multiplayer
              Adventure
              <span className="right-ornament"></span>
            </h1>
            <div id="character" className="disabled">
              <div></div>
            </div>
            <form action="none" method="get" acceptCharset="utf-8">
              <input
                type="text"
                id="nameinput"
                className="stroke"
                name="player-name"
                placeholder="Name your character"
                maxLength={15}
              />
            </form>
            <div className="play button disabled">
              <div></div>
              <img src="img/common/spinner.gif" alt="" />
            </div>
            <div className="ribbon">
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
          </article>
          <article id="loadcharacter">
            <h1>
              <span className="left-ornament"></span>
              Load your character
              <span className="right-ornament"></span>
            </h1>
            <div className="ribbon">
              <div className="top"></div>
              <div className="bottom"></div>
            </div>
            <img id="playerimage" src="" />
            <div id="playername" className="stroke"></div>
            <div className="play button">
              <div></div>
              <img src="img/common/spinner.gif" alt="" />
            </div>
            <div id="create-new">
              <span>
                <span>or</span> create a new character
              </span>
            </div>
          </article>
          <article id="confirmation">
            <h1>
              <span className="left-ornament"></span>
              Delete your character?
              <span className="right-ornament"></span>
            </h1>
            <p>
              All your items and achievements will be lost.
              <br />
              Are you sure you wish to continue?
            </p>
            <div className="delete button"></div>
            <div id="cancel">
              <span>cancel</span>
            </div>
          </article>
          <article id="credits">
            <h1>
              <span className="left-ornament"></span>
              <span className="title">
                Made for Mozilla by
                <a
                  target="_blank"
                  className="stroke clickable"
                  href="http://www.littleworkshop.fr/"
                >
                  Little Workshop
                </a>
              </span>
              <span className="right-ornament"></span>
            </h1>
            <div id="authors">
              <div id="guillaume">
                <div className="avatar"></div>
                Pixels by
                <a
                  className="stroke clickable"
                  target="_blank"
                  href="http://twitter.com/glecollinet"
                >
                  Guillaume Lecollinet
                </a>
              </div>
              <div id="franck">
                <div className="avatar"></div>
                Code by
                <a
                  className="stroke clickable"
                  target="_blank"
                  href="http://twitter.com/whatthefranck"
                >
                  Franck Lecollinet
                </a>
              </div>
            </div>
            <div id="seb">
              <span id="note"></span>
              Music by
              <a
                className="clickable"
                target="_blank"
                href="http://soundcloud.com/gyrowolf/sets/gyrowolfs-rpg-maker-music-pack/"
              >
                Gyrowolf
              </a>
              ,
              <a
                className="clickable"
                target="_blank"
                href="http://bconsole.dayjo.org/?p=335"
              >
                Dayjo
              </a>
              ,
              <a
                className="clickable"
                target="_blank"
                href="http://soundcloud.com/freakified/what-dangers-await-campus-map"
              >
                Freakified
              </a>
              , &amp;
              <a
                target="_blank"
                className="clickable"
                href="http://www.newgrounds.com/audio/listen/349734"
              >
                Camoshark
              </a>
            </div>
            <div id="close-credits">
              <span>- click anywhere to close -</span>
            </div>
          </article>
          <article id="about">
            <h1>
              <span className="left-ornament"></span>
              <span className="title">What is BrowserQuest?</span>
              <span className="right-ornament"></span>
            </h1>
            <p id="game-desc">
              BrowserQuest is a multiplayer game inviting you to explore a world
              of adventure from your Web browser.
            </p>
            <div className="left">
              <div className="img"></div>
              <p>
                This demo is powered by HTML5 and WebSockets, which allow for
                real-time gaming and apps on the Web.
              </p>
              <span className="link">
                <span className="ext-link"></span>
                <a
                  target="_blank"
                  className="clickable"
                  href="http://hacks.mozilla.org/2012/03/browserquest/"
                >
                  Learn more
                </a>
                about the technology
              </span>
            </div>
            <div className="right">
              <div className="img"></div>
              <p>
                BrowserQuest is available on Firefox, Chrome, Safari as well as
                iOS devices and Firefox for Android.
              </p>
              <span className="link">
                <span className="ext-link"></span>
                <a
                  target="_blank"
                  className="clickable"
                  href="http://github.com/mozilla/BrowserQuest"
                >
                  Grab the source
                </a>
                on Github
              </span>
            </div>
            <div id="close-about">
              <span>- click anywhere to close -</span>
            </div>
          </article>
          <article id="death">
            <p>You are dead...</p>
            <div id="respawn" className="button"></div>
          </article>
          <article id="error">
            <h1>
              <span className="left-ornament"></span>
              Your browser cannot run BrowserQuest!
              <span className="right-ornament"></span>
            </h1>
            <p>
              We're sorry, but your browser does not support WebSockets.
              <br />
              In order to play, we recommend using the latest version of
              Firefox, Chrome or Safari.
            </p>
          </article>
        </div>
        <div className="parchment-right"></div>
      </section>
    </div>
  );
};
