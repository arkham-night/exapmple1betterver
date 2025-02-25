
import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (hovering: boolean) => {
      setIsHovering(hovering);
    };

    document.addEventListener('mousemove', updatePosition);
    
    const hoverElements = document.querySelectorAll('a, button, input, textarea');
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => updateHoverState(true));
      element.addEventListener('mouseleave', () => updateHoverState(false));
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      hoverElements.forEach(element => {
        element.removeEventListener('mouseenter', () => updateHoverState(true));
        element.removeEventListener('mouseleave', () => updateHoverState(false));
      });
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        transform: `translate(${position.x - (isHovering ? 24 : 12)}px, ${
          position.y - (isHovering ? 24 : 12)
        }px)`,
      }}
    />
  );
};

export default CustomCursor;
