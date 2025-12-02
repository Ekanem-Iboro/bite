import React, { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
// Button is intentionally not used here because CarouselNext/Previous wrap Button
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import slide1 from "@/assets/slide 3@300x-100.jpg";
import slide2 from "@/assets/slide 4@300x-100.jpg";
import slide3 from "@/assets/welcome@300x-100.jpg";

type AdCarouselProps = {
  images?: string[];
  title?: string;
};

const AdCarousel: React.FC<AdCarouselProps> = ({
  images,
  title = "Promotions",
}) => {
  const defaultImages = [slide1, slide2, slide3];
  const imgs = images && images.length > 0 ? images : defaultImages;
  const imgRefs = useRef<HTMLImageElement[]>([]);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const refsSnapshot = imgRefs.current.slice();
    // Add a subtle float animation to all images using GSAP
    refsSnapshot.forEach((img) => {
      if (!img) return;
      gsap.to(img, {
        y: -6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        opacity: 0.98,
      });
    });

    return () => {
      gsap.killTweensOf(refsSnapshot);
    };
  }, [imgs]);

  useEffect(() => {
    // auto-advance carousel every 4 seconds
    if (!api || isPaused) return;
    const id = setInterval(() => {
      try {
        api.scrollNext();
      } catch (e) {
        // ignore errors if not ready
      }
    }, 4000);
    return () => clearInterval(id);
  }, [api, isPaused]);

  return (
    <div className="rounded-3xl border border-border bg-card card-elevated p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading text-base font-semibold">{title}</h3>
        <div className="flex items-center gap-2" />
      </div>

      <Carousel
        className="relative"
        setApi={setApi}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <CarouselContent className="flex items-center">
          {imgs.map((src, i) => (
            <CarouselItem
              key={i}
              className="rounded-xl overflow-hidden shadow-sm"
            >
              <motion.img
                ref={(el) => (imgRefs.current[i] = el as HTMLImageElement)}
                src={src}
                alt={`slide-${i}`}
                className="w-full h-40 sm:h-48 object-cover"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden sm:block">
          <CarouselPrevious className="h-9 w-9" variant="outline" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </CarouselPrevious>
        </div>
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 hidden sm:block">
          <CarouselNext className="h-9 w-9" variant="outline" size="icon">
            <ArrowRight className="w-4 h-4" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
};

export default AdCarousel;
