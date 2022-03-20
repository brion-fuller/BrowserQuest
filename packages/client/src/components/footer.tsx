export default () => {
  return (
    <footer>
      <div id="sharing" className="clickable">
        Share this on
        <a
          href="http://twitter.com/share?url=http%3A%2F%2Fbrowserquest.mozilla.org&amp;text=Mozilla%27s%20BrowserQuest%3A%20HTML5%20massively%20multiplayer%20adventure%20game%20%23demo%20%23websockets&amp;related=glecollinet:Creators%20of%20BrowserQuest%2Cwhatthefranck"
          className="twitter"
        ></a>
        <a
          href="http://www.facebook.com/share.php?u=http://browserquest.mozilla.org/"
          className="facebook"
        ></a>
      </div>
      <div id="credits-link" className="clickable">
        – <span id="toggle-credits">Credits</span>
      </div>
    </footer>
  );
};
