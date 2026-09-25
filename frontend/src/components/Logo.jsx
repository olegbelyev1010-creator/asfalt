import React from 'react';

const Logo = ({ className = "w-40 h-12" }) => {
  return (
    <svg 
      viewBox="0 0 200 50" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shape with road stripes */}
      <defs>
        <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
        </linearGradient>
        
        <linearGradient id="darkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0f172a', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Icon background - rounded square */}
      <rect 
        x="2" 
        y="2" 
        width="46" 
        height="46" 
        rx="12" 
        fill="url(#orangeGradient)"
        className="drop-shadow-lg"
      />
      
      {/* Letter A with road stripes effect */}
      <g>
        {/* Main A letter */}
        <path 
          d="M 15 38 L 25 12 L 35 38 M 20 30 L 30 30" 
          stroke="white" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Road stripe decorations */}
        <rect x="12" y="42" width="6" height="2" rx="1" fill="white" opacity="0.8" />
        <rect x="20" y="42" width="6" height="2" rx="1" fill="white" opacity="0.8" />
        <rect x="28" y="42" width="6" height="2" rx="1" fill="white" opacity="0.8" />
      </g>
      
      {/* Company name */}
      <text 
        x="56" 
        y="25" 
        fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" 
        fontSize="18" 
        fontWeight="800" 
        fill="#ffffff"
        letterSpacing="-0.5"
      >
        Asphalt
      </text>
      
      <text 
        x="56" 
        y="41" 
        fontFamily="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" 
        fontSize="16" 
        fontWeight="700" 
        fill="url(#orangeGradient)"
        letterSpacing="0"
      >
        Moscow
      </text>
      
      {/* Small tagline/decoration */}
      <circle cx="182" cy="25" r="1.5" fill="#f97316" />
      <circle cx="190" cy="25" r="1.5" fill="#f97316" />
      <circle cx="198" cy="25" r="1.5" fill="#f97316" />
    </svg>
  );
};

export default Logo;
