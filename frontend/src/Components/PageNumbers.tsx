import { Pagination } from "react-bootstrap";
import "./css/Pagination.css";

/**
 * Pagination Wrapper Genearting the page numbers and handling clicks
 * @param props.pages amount of pages to generate buttons for
 * @param props.currentPage currently visible page
 * @param props.click callback function to change the page
 * @returns 
 */
function PageNumbers(props:any){

  /**
   * Generate buttons for each page, based on props.pages
   * Highlight current page as active based on props.currentPage
   * @returns Array of JSX.Elements containing page navigation buttons
   */
  function GenerateItems(){
    let Items: JSX.Element[] = [];
    for(let page = 1; page <= props.pages; page++) Items.push(<Pagination.Item key={page} active={page===props.currentPage} onClick={() => props.click(page)}>{page}</Pagination.Item>);
    return Items;
  }
  
  return(
    <div className="page-nav">
      <Pagination size="lg">
        <Pagination.Prev onClick={()=>props.click(props.currentPage - 1)}/>
        {GenerateItems()}
        <Pagination.Next onClick={()=>props.click(props.currentPage + 1)}/>
      </Pagination>
    </div>    
  );

}

export default PageNumbers;
