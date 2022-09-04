import ProgressBar from "react-bootstrap/ProgressBar";

/**
 * Formatting Header with title of challenge and progressbar
 * @param props.children Title of current challenge to display
 * @param props.progress Percentage of progress in current challenge
 * @returns 
 */
function Header(props:any){
    return(<div className="header">
        <h1 className="fs-3">
            {props.children}
        </h1>
        <ProgressBar now={props.progress} label={`${props.progress}%`} animated={true} striped />
    </div>)
}
export default Header;