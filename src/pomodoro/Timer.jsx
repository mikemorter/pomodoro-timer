import React from "react";
import {minutesToDuration} from '../utils/duration';

function ModifyTimer({ focusDuration, breakDuration, modifyDuration, session }) {
return (
<div>
    <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                name="decrease-focus"
                onClick={modifyDuration}
                disabled={!session.stopped}
              >
                <span className="oi oi-minus" name="decrease-focus"/>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                name="increase-focus"
                onClick={modifyDuration}
                disabled={!session.stopped}
              >
                <span className="oi oi-plus" name="increase-focus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  name="decrease-break"
                  onClick={modifyDuration}
                  disabled={!session.stopped}
                >
                  <span className="oi oi-minus" name="decrease-break" />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  name="increase-break"
                  onClick={modifyDuration}
                  disabled={!session.stopped}
                >
                  <span className="oi oi-plus" name="increase-break" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
)
 }
export default ModifyTimer;