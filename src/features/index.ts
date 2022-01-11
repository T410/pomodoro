import Timer from "features/timer/Timer";
import TimeControls from "features/control/TimeControls";
import StateControls from "features/control/StateControls";

import configReducer from "features/config/configSlice";
import controlReducer from "features/control/controlSlice";
import timerReducer from "features/timer/timerSlice";

export { Timer, StateControls, TimeControls };
export { timerReducer, configReducer, controlReducer };
