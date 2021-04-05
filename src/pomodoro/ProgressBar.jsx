import React from 'react';
import {secondsToDuration} from '../utils/duration';

function ProgressBar({ session, percentageComplete, timeRemaining }) {

if (!session.stopped) {
return (
    <div>
    <p className="lead" data-testid="session-sub-title">
    {secondsToDuration(timeRemaining)} remaining
  </p>
<div className="row mb-2">
<div className="col">
  <div className="progress" style={{ height: "20px" }}>
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuenow={percentageComplete} 
      style={{ width: `${percentageComplete}%` }}
    />
   </div>
  </div>
 </div>
</div>
)} else
return null; 
}

export default ProgressBar;