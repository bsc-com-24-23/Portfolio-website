import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden">
      {/* TEXT CONTENT */}
      <div
        className={`absolute inset-0 top-[80px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
      >
        {/* LEFT LINE */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* TEXT */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="text-[#915EFF]">Robert</span>
          </h1>

          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I do{" "}
            <Typewriter
              options={{
                strings: [
                  "CyberSecurity",
                  "Software Development",
                  "UI/UX Design",
                  "Data Analysis",
                ],
                autoStart: true,
                loop: true,
                pauseFor: 1000,
                deleteSpeed: "natural",
              }}
            />
          </p>
        </div>
      </div>

      {/* 3D CANVAS (DESKTOP ONLY) */}
      <div className="hidden sm:block absolute inset-0 z-0">
        <ComputersCanvas />
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute xs:bottom-10 bottom-24 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
