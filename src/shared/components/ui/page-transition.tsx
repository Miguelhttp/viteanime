import { motion } from "motion/react";
import { type ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({
  children,
  className = "",
}: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1], // Custom apple-like ease
      }}
      className={`min-h-[inherit] w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
