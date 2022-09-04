import { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import { VncScreen } from "react-vnc";

import { AppStateType, AppContext } from "./Interfaces";
import Loader from "./Utilities/Loader";

import Guide from "./Components/Guide";

import "./App.css";
import { ReactComponent as Logo } from "./Logo.svg";


/**
 * Main Component
 * Responsible for Context, VNC and Challenge Loading
 * @returns Coursecurity Application
 */
function App() {

  const APIUrl = "http://localhost:9069/api/"; //Variable to point to API. "/api/" for cloud, "http://localhost:xxxx/api/" for local testing

  //Application State containing relevant Global States
  const [appState, setAppState] = useState<AppStateType>({
    currentChallenge: 0,
    challenges: ["8738-37cc", "8738-38dd"],
    globalLoadedState: false,
    overlay: "intro",
    nextChallenge: () => { },
  });

  /**
   * Retrieve current (active) challenge from API 
   * and store in the Application State
   */
  function getActiveChallenge() {
    fetch(`${APIUrl}getActiveChallenge`)
      .then((response) => response.json())
      .then((json) => {
        setAppState({
          ...appState,
          challenges: json.ids,
          currentChallenge: json.index,
          globalLoadedState: true,
        });
      })
      .catch((ERROR) => {
        //On Error, Output Error To Console, and Retry in 5 seconds
        console.error(`API getActiveChallenge ERROR (${ERROR})`);
        setTimeout(getActiveChallenge, 5000);
      });
  }

  //Load active state on initial Render, and whenever the globalLoadedState changes
  useEffect(getActiveChallenge, []);
  useEffect(getActiveChallenge, [appState.globalLoadedState]);


  /**
   * Generates the WebSocket Path based on current protocol (https->wss/http->ws) and hostname
   * @param path WebSocket endpoint
   * @returns WebSocket URI
   */
  function genWebSocketURI(path: string) {
    let protocolPrefix = (window.location.protocol === 'https:') ? 'wss:' : 'ws:';
    return `${protocolPrefix}//${window.location.host}/${path}`;
  }

  return (
    <AppContext.Provider value={{ data: appState, setData: setAppState }}>
      <Loader loadedState={appState.globalLoadedState}>
        <Navbar className="bg-primary font-brand d-flex justify-content-center" variant="dark">
          <Navbar.Brand>
            <Logo name="Coursecurity" height="20px" />
          </Navbar.Brand>
        </Navbar>
        <VncScreen
          url={genWebSocketURI('websockify')}
          scaleViewport
          onClipboard={(copied) =>
            copied &&
            copied.detail &&
            copied.detail.text &&
            navigator.clipboard.writeText(copied.detail.text)
          } //Allow Copying from VNC -> User's Clipboard
          className="desktop" />
        <Guide />
      </Loader>
    </AppContext.Provider>
  );
}

export default App;
