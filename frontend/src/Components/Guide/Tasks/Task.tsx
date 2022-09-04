
import Accordion from "react-bootstrap/Accordion";

import { Task as TaskItem } from "../../../Interfaces";

import Checked from "../../../Utilities/icons/checked.svg";
import Unchecked from "../../../Utilities/icons/unchecked.svg";
import Step from "./Step";

/**
 * Component to display 1 task (containing multiple steps)
 * Foldable as part of the guide accordion
 * Dynamic checkbox automatically toggles as soon as all steps of the tasks are completed
 * @param props.taskDetails tuple containg TaskID and data with details of the task's contents
 * @param props.callback optional callback to handle clicks on the accordion header (to implement alternative folding logic)
 * @returns JSX element containing a single task
 */
function Task(props:{taskDetails:[string, TaskItem], key?:any, callback?: () => void}){
  return(<Accordion.Item eventKey={props.taskDetails[0]}>
    <Accordion.Header className="task" onClick={props.callback && props.callback}>
      {props.taskDetails[1].complete ? (
          <img src={Checked} alt="Task Complete" className="icon" />
        ) : (
          <img src={Unchecked} alt="Task Incomplete" className="icon" />
        )}
      {props.taskDetails[1].title}
    </Accordion.Header>
    <Accordion.Body>
      <p><em>{props.taskDetails[1].description}</em></p>
      {Object.entries(props.taskDetails[1].steps).map(
        (stepDetails) => <Step key={stepDetails[0]} data={stepDetails}/>)}
    </Accordion.Body>
  </Accordion.Item>
)
}
    
export default Task;