import { useContext } from "react";

import Button from "react-bootstrap/Button"

import { AppContext } from "../Interfaces";

import "./css/InformationSection.css";

/**
 * InformationSection Component
 * Rendering individual pages as part of an Intro or Outro
 * @returns Single page/slide of Intro Outro
 */
function InformationSection(props: any) {
  const appContext = useContext(AppContext);
  function DataSection(props: any) {
    return (
      <>
        <div className="infoSectionTop">
          <h3>{props.title}</h3>
        </div>
        <div
          className="infoSection"
          dangerouslySetInnerHTML={{ __html: props.paragraph }}
        />
      </>
    );
  }
  if (props.splash) {
    return (
      <div>
        <Button variant="secondary" className="switch" onClick={props.close}>
          Return to current challenge
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button onClick={appContext.data.nextChallenge} className="switch">
          {appContext.data.currentChallenge === 1
            ? "Go to final survey!"
            : "Start next challenge!"}
        </Button>
      </div>
    );
  } else {
    return (
      <div className="informationContainer">
        <DataSection
          title={props.data[props.page - 1].title}
          paragraph={props.data[props.page - 1].paragraph}
          img={props.data[props.page - 1].img}
        />
      </div>
    );
  }
}

export default InformationSection;
