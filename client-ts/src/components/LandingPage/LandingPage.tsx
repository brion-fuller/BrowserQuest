import { createSignal, Show } from "solid-js";
import Parchment from "../Parchment/Parchment";
import "./LandingPage.css";

interface SavedPlayer {
    name: string;
    image: string;
    armor: string;
    weapon: string;
}

function getSavedPlayer(): SavedPlayer | null {
    try {
        const raw = localStorage.getItem("data");
        if (!raw) return null;
        const data: { hasAlreadyPlayed?: boolean; player?: SavedPlayer } = JSON.parse(raw);
        if (!data.hasAlreadyPlayed) return null;
        return data.player ?? null;
    } catch {
        return null;
    }
}

export default function LandingPage() {
    const [name, setName] = createSignal("");
    const [savedPlayer, setSavedPlayer] = createSignal<SavedPlayer | null>(getSavedPlayer());

    const isNewPlayer = () => savedPlayer() === null;
    const isDisabled = () => isNewPlayer() && name().trim().length < 3;

    return (
        <>
        <h1 id="logo"><span id="logosparks"> </span></h1>
        <Parchment>
          <article id="loadcharacter">
            <h1>
              <span class="left-ornament"></span>
              {isNewPlayer() ? "A Massively Multiplayer Adventure" : "Load your character"}
              <span class="right-ornament"></span>
            </h1>
            <div class="ribbon">
              <div class="top"></div>
              <div class="bottom"></div>
            </div>

            <Show
              when={!isNewPlayer()}
              fallback={
                <>
                  <div id="character" class={isDisabled() ? "disabled" : ""}><div></div></div>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input
                      id="nameinput"
                      class="stroke"
                      type="text"
                      placeholder="Name your character"
                      maxLength={15}
                      value={name()}
                      onInput={(e) => setName(e.currentTarget.value)}
                    />
                  </form>
                </>
              }
            >
              <img
                id="playerimage"
                src={savedPlayer()?.image || "/img/2/item-clotharmor.png"}
                alt="Player armor"
              />
              <div id="playername" class="stroke">{savedPlayer()?.name}</div>
            </Show>

            <div class={`play button${isDisabled() ? " disabled" : ""}`}>
              <div></div>
              <img src="/img/common/spinner.gif" alt="" />
            </div>

            <Show when={!isNewPlayer()}>
              <div id="create-new">
                <span onClick={() => setSavedPlayer(null)}>
                  <span>or</span> create a new character
                </span>
              </div>
            </Show>
          </article>
        </Parchment>
        <footer>
            <div id="sharing">
                Share this on
                <a
                    href="https://twitter.com/intent/tweet?text=BrowserQuest%3A%20an%20HTML5%20multiplayer%20adventure&url="
                    class="twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                ></a>
                <a
                    href="https://www.facebook.com/sharer/sharer.php?u="
                    class="facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                ></a>
            </div>
        </footer>
        </>
    );
}