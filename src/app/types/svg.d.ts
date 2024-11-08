declare module '*.svg' {
  import React = require('react');

  const content: React.FC<React.SVGProps<SVGSVGElement> & { size?: number }>;
  export default content;
}
