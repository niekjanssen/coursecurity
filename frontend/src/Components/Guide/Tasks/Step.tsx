import { useContext } from "react";
import { GuideContext } from "../../../Interfaces";
import Checked from "../../../Utilities/icons/checked.svg";
import Unfinished from "../../../Utilities/icons/unfinished.svg";
import Dialog from "../../Dialog";

/**
 * Component to render individual step as part of a task
 * @param props.data StepDetails tuple containg StepID and data with details of the step's contents
 * @returns JSX containing the step
 */
function Step(props:any ){
  const APIUrl = "http://localhost:9069/api/";  //Variable to point to API. "/api/" for cloud, "http://localhost:xxxx/api/" for local testing
  const guideContext = useContext(GuideContext); //Hook to Guide State Context for parent state

  /**
   * Converts a StepID to the parent TaskID
   * @param stepID string, starting with Step Prefix (7837)
   * @returns TaskID that the StepID is part of
   */
  function stepToTask(stepID:string) {
    return stepID.replace(/7837(-[a-z0-9]{4}).*/, `8275$1`);
  }

  /**
   * Adjusts the guide state by toggling the completion state of the supplied id
   * Submits the toggle to the API as well to make it persistent
   * @param id StepID that should be toggled
   */
  function toggleFinished(id:string){
    let data = guideContext.data.data;
    data.tasks[stepToTask(id)].steps[id].complete = !data.tasks[stepToTask(id)].steps[id].complete;
    guideContext.setData({...guideContext.data, data:data, tasks: Object.entries(data.tasks)});
    fetch(`${APIUrl}toggle/${id}`).then(guideContext.data.fetch)
  }

  return(
    <p className="step">
    {props.data[1].description && <><span dangerouslySetInnerHTML={{__html:props.data[1].description}}/><br /></>}
    {props.data[1].complete ? (
      <img src={Checked} alt="Step Complete" onClick={()=> toggleFinished(props.data[0])} className="icon" />
    ) : (
      <img src={Unfinished} alt="Step Incomplete"  onClick={()=> toggleFinished(props.data[0])} className="icon" />
    )}<b dangerouslySetInnerHTML={{__html:props.data[1].instruction}}/>
    {props.data[1].explaination && <><br /><small dangerouslySetInnerHTML={{__html: props.data[1].explaination}}/></>}
    {props.data[1].dialog ? <><br/><Dialog title={props.data[1].dialog.title} body={props.data[1].dialog.body} size={"50"} /></> : <></>}
  </p>
  
  )}
export default Step;