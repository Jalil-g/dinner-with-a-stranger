import { motion } from "framer-motion";

// Polar placement so chairs are evenly spaced from the table edge
const CX = 350; // table center x
const CY = 250; // table center y
const R = 150; // table radius
const GAP = 60; // distance from table edge to chair center
const D = R + GAP; // distance from table center to chair center

export function TableIllustration({ onStart }: { onStart: () => void }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className="relative w-full max-w-[640px] mx-auto"
    >
      <svg viewBox="0 0 700 520" className="w-full drop-shadow-xl">
        <defs>
          <radialGradient id="g1" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopOpacity="1" stopColor="#ffffff" />
            <stop offset="100%" stopOpacity="1" stopColor="#f9e6d6" />
          </radialGradient>
        </defs>

        <g
          onClick={onStart}
          role="button"
          tabIndex={0}
          aria-label="Start signup"
          className="cursor-pointer"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onStart();
            }
          }}
        >
          {/* invisible hit circle (bigger target for taps) */}
          <circle cx={CX} cy={CY} r={R * 0.85} fill="transparent" />

          {/* table */}
          <circle cx={CX} cy={CY} r={R} fill="url(#g1)" stroke="#e2c2a8" strokeWidth="6" />

          {/* plates */}
          <circle cx={CX} cy={CY - 80} r="30" fill="#fff" stroke="#e5e7eb" />
          <circle cx={CX + 80} cy={CY} r="30" fill="#fff" stroke="#e5e7eb" />
          <circle cx={CX} cy={CY + 80} r="30" fill="#fff" stroke="#e5e7eb" />
          <circle cx={CX - 80} cy={CY} r="30" fill="#fff" stroke="#e5e7eb" />

          {/* chairs at N, E, S, W with equal distance */}
          <Chair x={CX} y={CY - D} angle={0} />
          <Chair x={CX + D} y={CY} angle={90} />
          <Chair x={CX} y={CY + D} angle={180} />
          <Chair x={CX - D} y={CY} angle={270} />

          <text x={CX} y={CY + 5} textAnchor="middle" fontSize="22" fill="#5c4033" fontWeight="600">
            Tap to start →
          </text>
        </g>
      </svg>
    </motion.div>
  );
}

function Chair({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${angle}) translate(-50, -35)`}>
      <rect x="10" y="10" width="80" height="50" rx="12" fill="#ffe4d6" stroke="#e2c2a8" />
      <rect x="0" y="0" width="100" height="14" rx="5" fill="#f7caa7" stroke="#e2c2a8" />
    </g>
  );
}
