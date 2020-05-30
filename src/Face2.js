import React, { useRef, useEffect } from "react";

// Hook
function useEventListener(eventName, handler, element = window) {
  // Create a ref that stores handler
  const savedHandler = useRef();

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      element.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
}

function editEyes(e) {
  const eyes = document.querySelectorAll(".eye-roll");

  eyes.forEach((eye) => {
    const x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
    const y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
    const radian = Math.atan2(e.pageX - x, e.pageY - y);
    const rot = radian * (180 / Math.PI) * -1 + 90;
    eye.style.transform = `rotate(${rot}deg)`;
    //   console.log(rot);
  });
}

function Face2() {
  useEventListener("mousemove", editEyes);

  return (
    <div className="panda2">
      <div className="eye left">
        <div className="eye-roll"></div>
      </div>
      <div className="eye right">
        <div className="eye-roll"></div>
      </div>

      <div className="mouth"></div>
    </div>
  );
}

export default Face2;
