import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./css/Dialog.css";


/**
 * Dialog Component
 * Simple Wrapper for React.Bootstrap Modal
 * Intended for modals containing extra help, and a button to open it
 * @param props.title Title displayed in the Modal's header and on the button to open it
 * @param props.body HTML content of the modal
 * @returns (1) A button with the title, that opens the modal (2) The modal itself, initially hidden until button is clicked
 */
const Dialog = (props: any) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <Button onClick={() => setShow(true)}  dangerouslySetInnerHTML={{__html: props.title}}/>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        size="xl"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title dangerouslySetInnerHTML={{__html: props.title}}/>
        </Modal.Header>
        <Modal.Body dangerouslySetInnerHTML={{__html: props.body}}/>
      </Modal>
    </>
  );
};
export default Dialog;
