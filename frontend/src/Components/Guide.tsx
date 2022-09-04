import { useState, useContext, useEffect } from "react";

import useInterval from "../Utilities/useInterval";
import Loader from "../Utilities/Loader";
import {TaskListArray, FetchTasks, AppContext, GuideContext} from "../Interfaces";

import Header from "./Guide/Header";
import Tasks from "./Guide/Tasks";
import IntroOutro from "./IntroOutro";

import "./css/Guide.css";



/**
 * Main Guide Component
 * Rendering the Progress, Tasks/Steps/Dialogs
 * Responsible for Guide Context, rendering of Intro/Outro and fetching Tasks/Steps from API
 * @returns Complete Guide Component
 */
function Guide(props: any) {
  const APIUrl = "http://localhost:9069/api/";  //Variable to point to API. "/api/" for cloud, "http://localhost:xxxx/api/" for local testing
  const appContext = useContext(AppContext); //Hook to Application State Context for Global State

  //Guide State containing relevant States for all Guide subcomponents
  const [guideState, setGuideState] = useState<FetchTasks<any, TaskListArray>>({
    loaded: false,
    data: {},
    tasks: [],
    progress: 0,
    fetch: fetchTasks,
  });

  function next() {
    //If (current) challenge(s) are defined
    if (appContext.data.challenges !== undefined &&  appContext.data.currentChallenge !== undefined) {
      //If there are challenge(s) after the current challenge
      if (appContext.data.challenges.length - 1 > appContext.data.currentChallenge) {
        //Define new state (increase current index)
        let updatedState = {
          index: appContext.data.currentChallenge + 1,
          ids: appContext.data.challenges,
        };
        //Update the Application State through the context
        //Set globalLoadedState to false, to trigger application update
        appContext.setData({
          ...appContext.data,
          globalLoadedState: false,
        });

        //Update the API to match the new state
        fetch(`${APIUrl}setActiveChallenge`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedState),
        })
          .then((response: Response) => {
            appContext.setData({
              ...appContext.data,
              currentChallenge: updatedState.index,
            });
          })
          .catch((ERROR: any) => console.log(ERROR));
      } else {
        //If there are no challenges left, redirect user to queuing system to release the current sandbox
        window.location.replace(`https://BDXTMaGTVLOWQZmWEQme:LdxpoUiTYrbbpzIZSooe@coursecurity.com/leave.php?token=${window.location.hostname.substring(0, 1)}`);
      }
    }
  }

  //Update the tasks every 15 seconds from the API to avoid state discrepancies
  useInterval(fetchTasks, 15000);

  /**
   * Retrieve the tasks for the current challenge from the API
   * Updates the Guide State with the retrieved tasks
   */
  function fetchTasks() {
    //Build API Endpoint based on current challenge in Application State
    const fetchURL = appContext.data.challenges && appContext.data.currentChallenge !== undefined
        ? `${APIUrl}challenge/${appContext.data.challenges[appContext.data.currentChallenge]}`
        : "";


    fetch(fetchURL)
      .then((response) => response.json())
      .then((json) => {
        setGuideState({
          ...guideState,
          loaded: true,
          data: json,
          tasks: Object.entries(json.tasks),
        });
      })
      .catch((ERROR) => console.error(`API challenge ERROR (${ERROR})`));
  }

  /**
   * Updates the progress of the current challenge by counting finished Tasks v. All Tasks
   * If the progress reaches 100%, update the Application State to display the outro
   */
  function updateProgressbar() {
    let completed = guideState.tasks.reduce((completed, element) => {
      if (element[1].complete) return completed + 1;
      return completed;
    }, 0);
    let total = guideState.tasks.length;

    let progress = Math.round((completed / total) * 100);
    if (!progress) progress = 0;
    if (progress === 100 && guideState.progress !== 100)
      appContext.setData({ ...appContext.data, overlay: "outro" });
    setGuideState({ ...guideState, progress: progress });
  }

  // When the Application State's Challenges change, set the nextChallenge function again (WorkAround)
  useEffect(() => {
    appContext.setData({ ...appContext.data, nextChallenge: next });
  }, [appContext.data.challenges]);

  // On CurrentChallenge updates in the Application State, fetch the new tasks
  useEffect(fetchTasks, [appContext.data.currentChallenge]);
  // Whenever the tasks change (e.g. one gets checked off or all get replaced) update progress
  useEffect(updateProgressbar, [guideState.tasks]);

  //Uses the Loader Wrapper Component to handle loadedState
  //Renders IntroOutro component when relevant based on Application State
  return (
    <GuideContext.Provider value={{ data: guideState, setData: setGuideState }}>
      <div className="guide">
        <Loader loadedState={guideState.loaded}>
          <Header progress={guideState.progress}>
            {guideState.data.title}
          </Header>
          <Tasks />
        </Loader>
      </div>
      {appContext.data.overlay !== "none" && <IntroOutro />}
    </GuideContext.Provider>
  );
}

export default Guide;
