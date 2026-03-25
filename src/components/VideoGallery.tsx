import { Play } from "lucide-react";
import { useRef, useState } from "react";
import snakePlant from "@/assets/snake-plant.jpg";
import zzPlant from "@/assets/zz-plant.jpg";

const videos = [
  {
    src: "/videos/ecobloom-work-3.mp4",
    title: "Indoor Plant Styling",
    desc: "Watch how we transform indoor spaces with expert green décor.",
  },
  {
    src: "/videos/ecobloom-work-4.mp4",
    title: "Plant Care in Action",
    desc: "Our team ensuring every plant gets the attention it deserves.",
  },
  {
    src: "/videos/ecobloom-work-5.mp4",
    title: "Green Space Setup",
    desc: "From delivery to placement — see how we bring life to your spaces.",
  },
];

const galleryImages = [
  { src: snakePlant, alt: "Snake plant in office space" },
  { src: zzPlant, alt: "ZZ plant on desk" },
];

const VideoCard = ({ src, title, desc }: { src: string; title: string; desc: string }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
    } else {
      ref.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="group rounded-2xl overflow-hidden bg-card border border-border shadow-[0_4px_24px_-6px_hsl(var(--foreground)/0.08)] hover:shadow-[0_12px_40px_-8px_hsl(var(--foreground)/0.18)] transition-all duration-500">
      <div className="relative aspect-[9/16] sm:aspect-[3/4] cursor-pointer" onClick={toggle}>
        <video
          ref={ref}
          src={src}
          className="w-full h-full object-cover"
          loop
          muted
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 transition-opacity">
            <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-primary-foreground ml-0.5" fill="currentColor" />
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-base font-bold text-foreground uppercase tracking-wide mb-1.5">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
};

const VideoGallery = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-brand-blue mb-2">See Us In Action</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-[0.15em]">
            Our Work — Live
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-4xl mx-auto">
          {videos.map((v) => (
            <VideoCard key={v.src} {...v} />
          ))}
        </div>

        {/* Photo gallery */}
        <div className="grid grid-cols-2 gap-5 mt-10 max-w-2xl mx-auto">
          {galleryImages.map((img) => (
            <div key={img.alt} className="rounded-2xl overflow-hidden border border-border shadow-sm">
              <img src={img.src} alt={img.alt} className="w-full h-64 object-cover object-center" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
