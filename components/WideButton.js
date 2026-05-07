import useVoiceGuidance from '../hooks/useVoiceGuidance'; // Ajuste o caminho se necessário

export default function WideButton({ children, onClick, voiceText, className = '', ...props }) {
  const { speak, stop } = useVoiceGuidance();

  return (
    <button
      className={`w-full py-6 px-8 rounded-2xl bg-pastelOrange text-white font-bold text-2xl shadow-lg transition-all active:scale-95 hover:scale-105 ${className}`}
      onClick={onClick}
      // Aqui você usa as funções do seu hook:
      onMouseEnter={() => speak(voiceText)} 
      onFocus={() => speak(voiceText)}
      onMouseLeave={stop}
      onBlur={stop}
      {...props}
    >
      {children}
    </button>
  );
}