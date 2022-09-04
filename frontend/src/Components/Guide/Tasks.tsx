import { useContext, useEffect, useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";

import Task from "./Tasks/Task";
import { AppContext, GuideContext } from "../../Interfaces";

/**
 * Tasks Component
 * Bootstrap Accordion displaying all Tasks
 * with their respective steps, each task can be folded
 * open or closed, with logic to do this automatically
 * for the next unfinished task
 * @returns All the tasks in a Bootstrap Accordion
 */
function Tasks() {

  //Current Task State maintaining the next unfinished task ID
  const [currentTask, setCurrentTask] = useState<string>("");

  //ActiveKeys State, keeping track of open/closed state of each task
  const [activeKeys, setActiveKeys] = useState<{
    human: string[];  //Tasks folded open by human intent
    opened: string[]; //Tasks folded open by logic
    locked: string[]; //Tasks that cannot be opened
    state: string[];  //All open tasks
  }>({ human: [], opened: ["last"], locked: [], state: ["last"] });
  
  //Intro/Outro visibility state
  const [show, setShow] = useState<boolean>(false);


  const appContext = useContext(AppContext);     //Hook to Application State Context for Global State
  const guideContext = useContext(GuideContext); //Hook to Guide State Context for Guide State
  
  // When the Guide's State changes, update the currently open tasks
  useEffect(updateOpenTasks, [guideContext.data]);

  /**
   * updateOpenTasks()
   * Logic to determine what tasks should be folded open/closed based on the current state
   */
  function updateOpenTasks() {
    // Only execute if the guideContext is initialized
    if (guideContext.data !== undefined) {
      // Find the ID for the next (first in sequence) unfinished task
      let firstUnfinished = guideContext.data.tasks.find(
        (task) => task[1].complete === false
      );

      // Initialize Array of Open Tasks
      let tasks: { key: string; state?: number }[] = [];

      // If there is any unfinished task
      if (firstUnfinished) {
        // Store the ID of the task in a variable
        let openTask = firstUnfinished[0];
        // If that variable is set succesfully, and not undefined
        if (openTask) {
          // Add the taskID to the array of open tasks
          if (openTask !== undefined) tasks.push({ key: openTask, state: 1 });
          // If the previously opened task is not the new upen task update the state of that task
          // And update the current task
          if (currentTask && currentTask !== openTask)
            tasks.push({ key: currentTask, state: 3 });
          toggleTask(tasks);
          setCurrentTask(openTask);
        }
      }
    }
  }

  /**
   * Function to toggle a the state of an array of tasks
   * and update the task list state
   * @param tasks 
   */
  function toggleTask(tasks: { key: string; state?: number }[]) {
    let humanSet = new Set(activeKeys.human);
    let openSet = new Set(activeKeys.opened);
    let lockSet = new Set(activeKeys.locked);

    tasks.forEach((task) => {
      if (task.state === 1) {       // If the state is 1, (force) open the task
        lockSet.delete(task.key);
        openSet.add(task.key);
      } else if (task.state === 0) { // If the state is 0, lock the task
        openSet.delete(task.key);
        lockSet.add(task.key);
      } else if (task.state === 3) { // If the state is 3, close & unlock the task
        openSet.delete(task.key);
        lockSet.delete(task.key);
      } else {                       // If no state 1, 0 or 3, toggle state based on human intent
        humanSet.has(task.key)
          ? humanSet.delete(task.key)
          : humanSet.add(task.key);
      }
    });

    let stateSet = new Set(humanSet);                 // Create a new task state, based on tasks opened by human intent
    openSet.forEach((key) => stateSet.add(key));      // Add any tasks that must be open because of logic
    lockSet.forEach((key) => stateSet.delete(key));   // Remove any tasks that can't be open because they're locked
    setActiveKeys({                                   // Update the state
      human: Array.from(humanSet),
      opened: Array.from(openSet),
      locked: Array.from(lockSet),
      state: Array.from(stateSet),
    });
  }

  /**
   * Function to finish the challenge and display the outro
   */
  function moveToOutro() {
    setShow(false);
    appContext.setData({
      ...appContext.data,
      overlay: "outro",
    });
  }

  /**
   * Function to finish the challenge
   */
  function finishChallenge() {
    if (guideContext.data.data.isCompleted) {
      moveToOutro();
    } else {
      setShow(true);
    }
  }

  return (
    <div className="tasks">
      <Accordion activeKey={activeKeys.state} alwaysOpen>
        {guideContext.data.tasks &&
          guideContext.data.tasks.map((task) => (
            <Task
              taskDetails={task}
              key={task[0]}
              callback={() => toggleTask([{ key: task[0] }])}
            />
          ))}
        <Accordion.Item eventKey="last">
          <Accordion.Body>
            <span>
              <Button
                variant="secondary"
                onClick={() => {
                  appContext.setData({
                    ...appContext.data,
                    overlay: "intro",
                  });
                }}
              >
                Show Introduction
              </Button>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <Button onClick={() => finishChallenge()}>
                Finish Challenge
              </Button>
              <Modal
                show={show}
                onHide={() => setShow(false)}
                size="xl"
                aria-labelledby="example-custom-modal-styling-title"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Missing some tasks?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h6>
                    It seems like you haven't completed every tasks yet or have
                    forgotten to check a check box off.
                  </h6>
                  <h6>
                    Are you sure you want to finish the current incomplete
                    challenge and move on?
                  </h6>
                  <span>
                    <Button variant="primary" onClick={() => setShow(false)}>
                      No
                    </Button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button
                      variant="secondary"
                      onClick={() => {
                        moveToOutro();
                      }}
                    >
                      Yes{" "}
                    </Button>
                  </span>
                </Modal.Body>
              </Modal>
            </span>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default Tasks;
