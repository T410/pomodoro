import Timer from "./timer/Timer";
import TimeControls from "./control/TimeControls";
import StateControls from "./control/StateControls";

import configReducer from "./config/configSlice";
import controlReducer from "./control/controlSlice";
import timerReducer from "./timer/timerSlice";

export { Timer, StateControls, TimeControls };
export { timerReducer, configReducer, controlReducer };
