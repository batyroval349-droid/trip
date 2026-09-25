import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MobileCarouselProps {
  children: React.ReactNode;
  desktopClassName?: string;
  desktopStyle?: React.CSSProperties;
  initialIndex?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showCounter?: boolean;
  ariaLabel?: string;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  children,
  desktopClassName = 'grid-4',
  desktopStyle,
  initialIndex = 0,
  showArrows = true,
  showDots = true,
  showCounter = true,
  ariaLabel = 'Карусель карточек'
}) => {
  const items = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);

  // Check if viewport is mobile (<= 768px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sync scroll position to active index
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i] as HTMLElement;
      if (!child) continue;
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const diff = Math.abs(containerCenter - childCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    setActiveIndex(closestIndex);
  }, []);

  const scrollToIndex = (index: number, smooth: boolean = true) => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const target = Math.max(0, Math.min(items.length - 1, index));
    const child = container.children[target] as HTMLElement;
    if (child) {
      child.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', inline: 'center', block: 'nearest' });
      setActiveIndex(target);
    }
  };

  // Scroll to initial index on mount if non-zero
  useEffect(() => {
    if (isMobile && initialIndex > 0) {
      const timer = setTimeout(() => {
        scrollToIndex(initialIndex, false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isMobile, initialIndex]);

  return (
    <div className="mobile-carousel-wrapper" role="region" aria-label={ariaLabel}>
      {/* Desktop view: standard grid layout */}
      <div className={`desktop-carousel-grid ${desktopClassName}`} style={desktopStyle}>
        {children}
      </div>

      {/* Mobile view: smooth touch swipeable carousel */}
      <div className="mobile-carousel-viewport">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="mobile-carousel-track"
          tabIndex={0}
          role="feed"
          aria-busy="false"
        >
          {items.map((child, idx) => (
            <div
              key={idx}
              className={`mobile-carousel-slide ${idx === activeIndex ? 'active' : ''}`}
              role="article"
              aria-label={`Элемент ${idx + 1} из ${items.length}`}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Carousel controls: Dots & Arrows */}
        <div className="mobile-carousel-controls-bar">
          {showArrows && (
            <button
              type="button"
              className="mobile-carousel-btn"
              onClick={() => scrollToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {showDots && (
            <div className="mobile-carousel-dots" role="tablist" aria-label="Слайды карусели">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Перейти к слайду ${idx + 1}`}
                  className={`mobile-carousel-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => scrollToIndex(idx)}
                />
              ))}
            </div>
          )}

          {showCounter && !showDots && (
            <span className="mobile-carousel-counter">
              {activeIndex + 1} / {items.length}
            </span>
          )}

          {showArrows && (
            <button
              type="button"
              className="mobile-carousel-btn"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex === items.length - 1}
              aria-label="Следующий слайд"
            >
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
