import React from "react";
import {minutesToDuration} from '../utils/duration';

function SessionTitle( { sessionTitle, focusDuration, breakDuration, session }) {
  
return (
    <div>
        <div className="row mb-2">
          <div className="col">
          {/* Display session title and use ternary operator to display duration for each session */}
            <h2 data-testid="session-title"> {sessionTitle.name} for {sessionTitle.name==="Focusing" ? minutesToDuration(focusDuration) : minutesToDuration(breakDuration)} minutes</h2>
            {session.paused ? <p>PAUSED</p> : "" }
          </div>
        </div> 
    </div>
    )
}

export default SessionTitle;