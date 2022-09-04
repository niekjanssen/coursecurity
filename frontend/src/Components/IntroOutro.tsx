import { useState, useEffect, memo, useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar"

import { ReactComponent as Logo } from "./../Logo.svg";
import "./css/IntroOutro.css";
import PageNumbers from "./PageNumbers";
import InformationSection from "./InformationSection";
import { AppContext } from "../Interfaces";
import Loader from "../Utilities/Loader";


/**
 * IntroOutro Component
 * Rendering the Intro/Outro, and providing Next or Finish buttons
 * @returns Intro/Outro overlay
 */
function IntroOutro(props: any) {
  const APIUrl = "http://localhost:9069/api/"; //Variable to point to API. "/api/" for cloud, "http://localhost:xxxx/api/" for local testing
  const appContext = useContext(AppContext); //Hook to Application State Context for Global State

  //Intro State containing the data and state for the current Intro/Outro
  const [introState, setIntroState] = useState({
    data: {},
    loaded: false,
    pageNumber: 1,
    pages: 0,
  });

  /**
   * CloseIntro updates the Application State in order to hide/close 
   * the Intro/Outro overlay
   */
  function closeIntro() {
    appContext.setData({ ...appContext.data, overlay: "none" });
  }

  /**
   * Navigate to next page of Intro/Outro if available (by updating Intro/Outro State)
   * If navigating back from first page close the Intro/Outro to return to the challenge
   * If navigating past the last page, close (if intro), or move to next challenge and show intro
   * @param pageNumber the requested page
   */
  function updatePageNumber(pageNumber: number) {
    if (0 < pageNumber && pageNumber <= introState.pages) {
      setIntroState({ ...introState, pageNumber: pageNumber });
    } else if (pageNumber < 0) {
      if (appContext.data.overlay === "outro") closeIntro();
    } else {
      if (!(appContext.data.overlay === "intro" && pageNumber <= 0))
        closeIntro();
      if (appContext.data.overlay === "outro") {
        appContext.data.nextChallenge();
      }
    }
  }

  /**
   * Retrieve the Intro/Outro content for the current challenge from the API
   * Updates the Intro State with the retrieved Intro/Outro Pages content
   */
  function updateIntro() {
    // Verify that current configuration is valid
    if (
      appContext.data.overlay !== "none" &&
      appContext.data.challenges !== undefined &&
      appContext.data.currentChallenge !== undefined &&
      appContext.data.challenges[appContext.data.currentChallenge] !== undefined
    ) {
      fetch(`${APIUrl}explanation/${appContext.data.overlay}`)
        .then((response) => response.json())
        .then((json) => {
          let ChallengeID =
            appContext.data.challenges &&
            appContext.data.currentChallenge !== undefined
              ? appContext.data.challenges[appContext.data.currentChallenge]
              : 0;
          //Updates IntroState and initializes to first page
          //Include 1 extra page in pagecount for Outro's to display the "Next Challenge" page
          setIntroState({
            ...introState,
            loaded: true,
            data: json[ChallengeID],
            pageNumber: 1,
            pages:
              Object.keys(json[ChallengeID]).length +
              (appContext.data.overlay === "outro" ? 1 : 0),
          });
        })
        .catch((ERROR) => {
          //On Error, Output Error To Console, and Retry in 5 seconds
          console.error(`API intro/outro ERROR (${ERROR})`);
          setTimeout(updateIntro, 5000);
        });
    }
  }

  //Update the Intro content whenever the currentchallenge, challenges, or overlayed intro changes
  useEffect(updateIntro, [
    appContext.data.currentChallenge,
    appContext.data.challenges,
    appContext.data.overlay,
  ]);

  //Show whenever the Application State overlay variable !== none
  //Always fullscreen, and hide by changing the Application State to overlay = none
  //Uses the Loader Wrapper Component to handle loadedState
  return (
    <Modal
      show={appContext.data.overlay !== "none"}
      fullscreen={true}
      onHide={() => {
        appContext.setData({
          ...appContext.data,
          overlay: "none",
        });
      }}
    >
      <Navbar
        className="bg-primary font-brand d-flex justify-content-center"
        variant="dark"
      >
        <Navbar.Brand>
          <Logo name="Coursecurity" height="20px" />
        </Navbar.Brand>
      </Navbar>
      <Modal.Body>
        <Loader loadedState={introState.loaded}>
          <InformationSection
            data={Object.values(introState.data)}
            page={introState.pageNumber}
            splash={
              appContext.data.overlay === "outro" &&
              introState.pageNumber === introState.pages
            }
            close={closeIntro}
          />
          <PageNumbers
            click={updatePageNumber}
            pages={introState.pages}
            currentPage={introState.pageNumber}
          />
        </Loader>
      </Modal.Body>
    </Modal>
  );
}
export default memo(IntroOutro);
