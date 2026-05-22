import React, { useEffect, useRef, useState } from "react";

const Reveal = ({ children, animation = "fade-in-up", delay = "0ms", className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cuando el elemento es visible (al menos un 10%)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); // Dejar de observar para que no se repita
        }
      },
      { threshold: 0.1 } // 0.1 significa 10% de visibilidad
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ animationDelay: isVisible ? delay : "0ms" }}
      className={`${className} ${
        isVisible ? animation : "opacity-0" // Si es visible aplica la animación, si no, ocúltalo
      }`}
    >
      {children}
    </div>
  );
};

export default Reveal;