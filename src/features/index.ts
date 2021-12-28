import Timer from "./timer/Timer";
import Controls from "./timeControl/TimeControls";
import StateControls from "./state/StateControls";

import counterReducer from "./counter/counterSlice";
import timerReducer from "./timer/timerSlice";
import timeControlReducer from "./timeControl/timeControlSlice";
import configReducer from "./config/configSlice";
import workStateReducer from "./state/workStateSlice";

export { Timer, StateControls, Controls };
export { counterReducer, timerReducer, timeControlReducer, workStateReducer, configReducer };
