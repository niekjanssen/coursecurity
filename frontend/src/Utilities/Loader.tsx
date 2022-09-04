import { memo } from "react";

import { Spinner } from "react-bootstrap"

import "./Loader.css";

/**
 * Loader Wrapper Component
 * Wraps any children, and only displays them if the loadedState == True
 * Else, displays a spinner
 * 
 * Wrapped by memo on export, to avoid re-renders when irrelevant parts of the children are updated
 * @param props.loadedState state of loading everything required by children
 * @returns JSX of either loading spinner, or the children components
 */
const Loader = (props:{loadedState:boolean, children:any}) => {
    if(props.loadedState && props.loadedState === true){
        return(props.children);
    }
    return(<div className="grow"><Spinner animation={"border"} variant="primary"/></div>);
}
export default memo(Loader);