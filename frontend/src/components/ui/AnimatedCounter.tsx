"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  textClassName?: string;
  label?: string;
  labelClassName?: string;
  decimals?: number;
  separator?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  // duration = 2,
  delay = 0,
  suffix = "",
  prefix = "",
  className = "",
  textClassName = "",
  label,
  labelClassName = "",
  decimals = 0,
  separator = ",",
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });

  const [displayValue, setDisplayValue] = useState("0");

  const formatNumber = (num: number): string => {
    const rounded = Number(num.toFixed(decimals));
    const parts = rounded.toString().split(".");

    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

    return parts.join(".");
  };

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(formatNumber(latest));
    });

    return unsubscribe;
  }, [springValue, decimals, separator]);

  return (
    <motion.div
      ref={ref}
      className={`text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay }}
    >
      <motion.div
        className={`font-bold ${textClassName}`}
        initial={{ scale: 0.5 }}
        animate={isInView ? { scale: 1 } : { scale: 0.5 }}
        transition={{
          duration: 0.8,
          delay: delay + 0.2,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
      >
        {prefix}
        <motion.span className="inline-block">{displayValue}</motion.span>
        {suffix}
      </motion.div>

      {label && (
        <motion.p
          className={`mt-1 ${labelClassName}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.8 }}
        >
          {label}
        </motion.p>
      )}
    </motion.div>
  );
};

export default AnimatedCounter;
