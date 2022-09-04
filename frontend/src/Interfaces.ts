import RFB from "react-vnc/dist/types/noVNC/core/rfb";
import React from "react";

interface ChallengeTasks {
  challenge: number;
  definition: string;
  isCompleted: boolean;
  tips: Task[];
}

interface Task {
  title: string;
  description: string;
  steps: { [key: string]: Step };
  dialog?: { title: string; body: string };
  complete: boolean;
}
export interface introSection {
  title: string;
  paragraph: string;
  img?: string;
}

export interface introExplanation {
  Introduction: introSection;
  Danger: introSection;
  Protection: introSection;

  Hackers: introSection;
  Who_are_you: introSection;
  Goal: introSection;
}

interface Step {
  instruction: string;
  explaination?: string;
  complete: boolean;
  description?: string;
}
export type TaskListObj = { [x: string]: Task };
export type TaskListArray = [string, Task][];

export interface FetchTasks<DataType, TaskType> {
  loaded: boolean;
  data: DataType;
  tasks: TaskType;
  progress: number;
  fetch: () => void;
}

interface Props {
  url: string;
  style?: object;
  className?: string;
  viewOnly?: boolean;
  rfbOptions?: Partial<RFBOptions>;
  focusOnClick?: boolean;
  clipViewport?: boolean;
  dragViewport?: boolean;
  scaleViewport?: boolean;
  resizeSession?: boolean;
  showDotCursor?: boolean;
  background?: string;
  qualityLevel?: number;
  compressionLevel?: number;
  autoConnect?: number; // defaults to true
  retryDuration?: number; // in milliseconds
  debug?: boolean; // show logs in the console
  loadingUI?: React.ReactNode; // custom component that is displayed when loading
  onConnect?: (rfb?: RFB) => void;
  onDisconnect?: (rfb?: RFB) => void;
  onCredentialsRequired?: (rfb?: RFB) => void;
  onSecurityFailure?: (e?: {
    detail: { status: number; reason: string };
  }) => void;
  onClipboard?: (e?: { detail: { text: string } }) => void;
  onBell?: () => void;
  onDesktopName?: (e?: { detail: { name: string } }) => void;
  onCapabilities?: (e?: {
    detail: { capabilities: RFB["capabilities"] };
  }) => void;
}

// The rfbOptions object in Props is of type Partial<RFBOptions>
interface RFBOptions {
  shared: boolean;
  credentials: {
    username?: string;
    password?: string;
    target?: string;
  };
  repeaterID: string;
  wsProtocols: string;
}
export interface challengeContext {
  index: number;
  ids: string[];
}

export interface AppStateType{
  challenges?: string[];
  currentChallenge?: number;
  globalLoadedState: boolean;
  overlay: "none"|"intro"|"outro";
  nextChallenge: ()=>void;
}
export let AppContext = React.createContext<{data: AppStateType, setData: any}>({data:{globalLoadedState:false, overlay:"none", nextChallenge: () => {}}, setData: ()=>{}});
export let GuideContext = React.createContext<{data: FetchTasks<any, TaskListArray>, setData: any}>({data:{loaded: false, data: {}, tasks: [], progress: 0, fetch: ()=>{}}, setData: ()=>{}});

export let ChallengeIdContext = React.createContext<any>({});

export type { Task, ChallengeTasks, Step, Props, RFBOptions };
