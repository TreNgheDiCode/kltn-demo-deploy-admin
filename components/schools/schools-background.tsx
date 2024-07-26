"use client";

import SchoolsSelectWrapper from "@/components/schools/schools-select-wrapper";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SchoolCard } from "@/data/schools";
import { motion } from "framer-motion";

type Props = {
  schools: SchoolCard[] | null;
};
export const SchoolsBackground = ({ schools }: Props) => {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <SchoolsSelectWrapper schools={schools} />
      </motion.div>
    </AuroraBackground>
  );
};
