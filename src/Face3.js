import React, { useRef, useEffect, useMemo, useState } from "react";
import useForceUpdate from './useForceUpdate';

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

function mouseFollow(svg, leftEye, rightEye) {
  if(!svg) return () => {}
  if(!leftEye) return () => {}
  if(!rightEye) return () => {}

  const mouse = svg.createSVGPoint();
  let requestId = null;

  function onFrame() {
    let point = mouse.matrixTransform(svg.getScreenCTM().inverse());

    leftEye.rotateTo(point);
    rightEye.rotateTo(point);

    requestId = null;
  }

  function onMouseMoveAction(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    if (!requestId) {
      requestId = requestAnimationFrame(onFrame);
    }
  }

  return onMouseMoveAction;
}

function createEye(selector) {
  let element = document.querySelector(selector);
  let bbox = element.getBBox();
  let centerX = bbox.x + bbox.width / 2;
  let centerY = bbox.y + bbox.height / 2;

  function rotateTo(point) {
    let dx = point.x - centerX;
    let dy = point.y - centerY;

    let angle = Math.atan2(dy, dx);
    element.style.transform = `rotate(${angle * (180 / Math.PI)}deg)`;
  }

  return {
    element: element,
    rotateTo: rotateTo,
  };
}

function Face3() {
  const [svg, setSvg] = useState(null);
  const [leftEye, setLeftEye] = useState(null);
  const [rightEye, setRightEye] = useState(null);

  const onMouseMove = useMemo(() => mouseFollow(svg, leftEye, rightEye), [
    svg,
    leftEye,
    rightEye,
  ]);

  useEventListener("mousemove", onMouseMove);

  useEffect(() => {
    setSvg(document.querySelector("#svg"));
    setLeftEye(createEye("#left-eye"));
    setRightEye(createEye("#right-eye"));
  }, []);

  return (
    <div className="panda3">
      <svg id="svg" viewBox="0 0 400 300">
        <g id="left-eye">
          <circle className="eye-outer" cx="28%" cy="50%" r="75" />
          <circle className="eye-inner" cx="36%" cy="50%" r="35" />
        </g>

        <g id="right-eye">
          <circle className="eye-outer" cx="72%" cy="50%" r="75" />
          <circle className="eye-inner" cx="80%" cy="50%" r="35" />
        </g>
      </svg>

      <div className="mouth"></div>
    </div>
  );
}

export default Face3;
