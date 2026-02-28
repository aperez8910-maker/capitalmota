import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setHasInteracted(true);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/Capital_Mota_anthem.mp3" loop preload="none" />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-card/90 backdrop-blur-md border border-border rounded-full shadow-lg hover:border-primary/50 transition-colors group"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div key="on" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
              <Volume2 size={18} className="text-primary" />
              <div className="flex items-end gap-0.5 h-4">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 bg-primary rounded-full"
                    animate={{ height: ["4px", "16px", "4px"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key="off" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
              <VolumeX size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              {!hasInteracted && (
                <span className="font-body text-xs uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                  Play
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default MusicPlayer;
