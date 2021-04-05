import React, { useState } from "react";

import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import ModifyTimer from "./Timer";
import SessionTitle from "./SessionTitle";
import StartStop from "./StartStop";
import ProgressBar from "./ProgressBar";

function Pomodoro() {
  //Define initial session state as stopped
  const initialSession = {
    active: false,
    paused: false,
    stopped: true,
  };

  //Define all states
  const [session, setSession] = useState(initialSession);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [breakSession, setBreakSession] = useState(false);
  const [sessionTitle, setSessionTitle] = useState({
    name: "Focusing",
    duration: focusDuration,
  });
  const [timeRemaining, setTimeRemaining] = useState(1500);
  const [percentageComplete, setPercentageComplete] = useState(0);

  const startSession = () =>
    setSession({
      active: true,
      paused: false,
      stopped: false,
    });

  const pauseSession = () => {
    setSession({
      active: false,
      paused: true,
      stopped: false,
    });
    setTimeRemaining(timeRemaining);
    setPercentageComplete(percentageComplete);
  };

  const stopSession = () => {
    setSession({
      active: false,
      paused: false,
      stopped: true,
    });
    setFocusDuration(25);
    setBreakDuration(5);
    setSessionTitle({
      name: "Focusing",
      duration: 25,
    });
    setTimeRemaining(minutesToDuration(25));
    setPercentageComplete(0);
  };

  const modifyDuration = ({ target }) => {
    if (
      target.name === "increase-focus" ||
      target.parentNode.name === "increase-focus"
    ) {
      setFocusDuration((currentDuration) => Math.min(currentDuration + 5, 60));
    } else if (
      target.name === "decrease-focus" ||
      target.parentNode.name === "decrease-focus"
    ) {
      setFocusDuration((currentDuration) => Math.max(currentDuration - 5, 5));
    } else if (
      target.name === "increase-break" ||
      target.parentNode.name === "increase-break"
    ) {
      setBreakDuration((currentDuration) => Math.min(currentDuration + 1, 15));
    } else if (
      target.name === "decrease-break" ||
      target.parentNode.name === "decrease-break"
    ) {
      setBreakDuration((currentDuration) => Math.max(currentDuration - 1, 1));
    }
  };

  const switchTitle = () => {
    if (!breakSession) {
      setSessionTitle({
        name: "On Break",
        duration: breakDuration,
      });
    } else {
      setSessionTitle({
        name: "Focusing",
        duration: focusDuration,
      });
    }
  };

  const calculatePercentageComplete = () => {
    let duration;
    if (breakSession) {
      duration = breakDuration * 60;
    } else {
      duration = focusDuration * 60;
    }
    setPercentageComplete(((duration - timeRemaining) / duration) * 100);
  };

  function playSound() {
    const audio = new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`);
    audio.play();
  }

  //Set initial time remaining and percentage when sessions switch
  //Toggle on Break and off Break state
  function switchSessions() {
    if (!breakSession) {
      setTimeRemaining(breakDuration * 60);
    } else {
      setTimeRemaining(focusDuration * 60);
    }
    setPercentageComplete(0);
    setBreakSession((prevState) => !prevState);
  }

  //Start and pause sessions
  function playPause() {
    if (session.active) {
      pauseSession();
    }
    if (session.paused) {
      setTimeRemaining(timeRemaining);
      setPercentageComplete(percentageComplete);
      startSession();
    }
    if (session.stopped) {
      startSession();
      setTimeRemaining(focusDuration * 60);
    }
  }

  useInterval(
    () => {
      if (timeRemaining === 0) {
        //Play the audio when time ends
        playSound();
        //Switch the session title
        switchTitle();
        //Switch the session duration
        switchSessions();
      } else {
        //While timer is running, count down time remaining by 1 second + increase progress bar by percent complete
        setTimeRemaining((timeRemaining) => timeRemaining - 1);
        calculatePercentageComplete();
      }
    },
    session.active ? 1000 : null
  );

  return (
    <div className="pomodoro">
      <ModifyTimer
        modifyDuration={modifyDuration}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        session={session}
      />
      <StartStop
        playPause={playPause}
        session={session}
        stopSession={stopSession}
      />
      <SessionTitle
        sessionTitle={sessionTitle}
        focusDuration={focusDuration}
        breakDuration={breakDuration}
        session={session}
      />
      <ProgressBar
        percentageComplete={percentageComplete}
        session={session}
        timeRemaining={timeRemaining}
      />
    </div>
  );
}

export default Pomodoro;
