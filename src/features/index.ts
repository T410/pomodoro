import Timer from "features/timer/Timer";
import TimeControls from "features/control/TimeControls";
import StateControls from "features/control/StateControls";
import ModBubbles from "./control/ModBubbles";

import configReducer from "features/config/configSlice";
import controlReducer from "features/control/controlSlice";
import timerReducer from "features/timer/timerSlice";

export { Timer, StateControls, TimeControls, ModBubbles };
export { timerReducer, configReducer, controlReducer };
