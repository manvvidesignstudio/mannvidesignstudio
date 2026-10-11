import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: '-80px' }}
    transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

interface ParallaxImageProps extends Omit<React.ComponentProps<typeof motion.img>, 'children'> {
  amount?: number;
  wrapperClassName?: string;
  children?: React.ReactNode;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  amount = 10,
  wrapperClassName = '',
  children,
  className = '',
  ...imageProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount / 2}%`, `${amount / 2}%`]);

  return (
    <div ref={ref} className={`overflow-hidden ${wrapperClassName}`}>
      <motion.img
        {...imageProps}
        style={{ y }}
        className={`w-full h-full object-cover ${className}`}
      />
      {children}
    </div>
  );
};
