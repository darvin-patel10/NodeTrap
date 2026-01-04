import "./path.css";

function Paths() {
  return (
    <svg className="paths" 
      viewBox="-5 -5 600 600"
      preserveAspectRatio="xMidYMid meet">

      {/* Straight lines */}
      <line x1="300" y1="50" x2="300" y2="275" />   {/* Top Middle */}
      <line x1="40" y1="300" x2="275" y2="300" /> {/* Middle Left */}
      <line x1="275" y1="300" x2="550" y2="300" /> {/* Middle Right */}
      <line x1="300" y1="275" x2="300" y2="550" /> {/* Bottom Middle */}

      {/* Curved Paths */}

      {/* Top Right Curve */}
      <path
        d="M 300 50
           A 225 245 0 0 1 550 300"
      />

      {/* Bottom Left Curve */}
      <path
        d="M 40 300
           A 245 225 0 0 0 300 550"
      />

      {/* Bottom Right Curve */}
      <path
        d="M 550 300
           A 245 245 0 0 1 300 550"
      />

    </svg>
  );
}

export default Paths;
