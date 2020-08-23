import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-09-15`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        // hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        // minutes: Math.floor((difference / 1000 / 60) % 60),
        // seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });


  return contents(timerComponents, getTimeBasedColour());
}

const getTimeBasedColour = () => {
  const localTime = new Date().toLocaleString("en-US", {timeZone: "Australia/Brisbane"}).split(',')[1].trim();
  const hour = localTime.split(':')[0];

  if (localTime === 'AM') {
    return hour < 9 ? 'black' : 'white';
  } else {
    return hour < 5 ? 'white' : 'black';
  };
}

const contents = (component, colour) => {
  const fontColour = colour === 'white' ? 'black' : 'white';
  return (
    <div className='background' style={{ backgroundColor: colour }}>
      <div className='parent-container'style={{ backgroundColor: colour }}>
        {houseImage[colour]}
      </div>
      <div className='container text-center' style={{ fontSize: 40 }}>
        {component.length ? (
          <h2 className='text-container' style={{
            color: fontColour,
            borderBottomColor: fontColour
            }}>
            {" "}
            Melbourne, we have <b>{component}</b> left in lockdown.
          </h2>
        ) : (
          <h2>Time's up!</h2>
        )}
      </div>
    </div>
  );
};

const houseImage = {
  white: (
    <svg
      width="157"
      height="135"
      viewBox="0 0 157 135"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xlinkHref="http://www.w3.org/1999/xlink"
    >
      <rect width="157" height="135" fill="url(#pattern0)" />
      <rect y="116.591" width="148.057" height="18.4091" fill="white" />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlinkHref="#image0"
            transform="translate(0 -0.0814815) scale(0.00142857 0.00166138)"
          />
        </pattern>
        <image
          id="image0"
          width="700"
          height="700"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  ),
  black: (
    <svg
      width="129"
      height="124"
      viewBox="0 0 129 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="5"
        y1="55.5"
        x2="124"
        y2="55.5"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="111.5"
        y1="123"
        x2="111.5"
        y2="57"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="106.5"
        y1="39"
        x2="106.5"
        y2="13"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="90"
        y1="14.5"
        x2="109"
        y2="14.5"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="92.5"
        y1="26"
        x2="92.5"
        y2="13"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="18.5"
        y1="124"
        x2="18.5"
        y2="58"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="55.5"
        y1="123"
        x2="55.5"
        y2="91"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="53"
        y1="90.5"
        x2="81"
        y2="90.5"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="78.5"
        y1="123"
        x2="78.5"
        y2="91"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="2.36823"
        y1="58.106"
        x2="67.3682"
        y2="2.10597"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <line
        x1="127.323"
        y1="58.8538"
        x2="64.3227"
        y2="1.85384"
        stroke="#E5E5E5"
        strokeWidth="5"
      />
      <circle cx="71" cy="107" r="2" fill="#E5E5E5" />
    </svg>
  ),
};

export default App;
