import { useRef } from 'react';

export default function WideButton({ children, onClick, voiceText, className = '', ...props }) {
  const synthRef = useRef(null);

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && voiceText) {
      if (!synthRef.current) synthRef.current = window.speechSynthesis;
      const utter = new window.SpeechSynthesisUtterance(voiceText);
      utter.lang = 'pt-BR';
      synthRef.current.cancel();
      synthRef.current.speak(utter);
    }
  };

  const handleFocus = handleMouseEnter;
  const handleCancel = () => {
    if (typeof window !== 'undefined' && synthRef.current) {
      synthRef.current.cancel();
    }
  };

  return (
    <button
      className={`w-full py-4 px-6 rounded-lg bg-pastelOrange text-white font-bold text-lg shadow transition-transform duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-pastelOrange-dark ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onFocus={handleFocus}
      onMouseLeave={handleCancel}
      onBlur={handleCancel}
      tabIndex={0}
      aria-label={voiceText || (typeof children === 'string' ? children : undefined)}
      {...props}
    >
      {children}
    </button>
  );
}
