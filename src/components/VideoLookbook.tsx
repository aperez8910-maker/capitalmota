import { motion } from "framer-motion";

const videos = [
  { src: "/videos/lookbook-1.mp4", title: "THE VISION" },
  { src: "/videos/lookbook-2.mp4", title: "THE CULTURE" },
  { src: "/videos/lookbook-3.mp4", title: "THE CRAFT" },
  { src: "/videos/lookbook-4.mp4", title: "THE MOVEMENT" },
  { src: "/videos/lookbook-5.mp4", title: "THE LEGACY" },
  { src: "/videos/lookbook-6.mp4", title: "THE STANDARD" },
];

const VideoLookbook = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Behind The Brand
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            LOOKBOOK
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative group"
            >
              <div className="relative overflow-hidden aspect-[9/16]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-display text-2xl tracking-wider text-foreground drop-shadow-lg">
                    {video.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoLookbook;
