"use client";
import { Link, Element } from "react-scroll";
import acmeLogo from "@/assets/isologo/iso1.png";
import quantumLogo from "@/assets/isologo/iso2.png";
import echoLogo from "@/assets/isologo/iso3.png";
import celestialLogo from "@/assets/isologo/iso4.png";
import pulseLogo from "@/assets/isologo/iso5.png";
import apexLogo from "@/assets/logo-apex.png";
import Image from "next/image";
import { motion } from "framer-motion";

export const LogoTicker = () => {
  return (
    <Element
        name="about"
        style={{ background: "lightblue" }}
      >
<div className="py-4 md:py-16 bg-white ">
      <div className="container">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{
              translateX: "-50%",
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <Image
              src={acmeLogo}
              alt="Acme Logo"
              className="logo-ticker-image w-auto h-40"
            />
            <Image
              src={quantumLogo}
              alt="Quantum Logo"
              className="logo-ticker-image w-auto h-40"
            />
            <Image
              src={echoLogo}
              alt="Echo Logo"
              className="logo-ticker-image w-auto h-40"
            />
            <Image
              src={celestialLogo}
              alt="Celestial Logo"
              className="logo-ticker-image w-auto h-40"
            />
            <Image
              src={pulseLogo}
              alt="Pulse Logo"
              className="logo-ticker-image w-auto h-40"
            />
            

            {/* Second set of logos for animation */}
            <Image
              src={acmeLogo}
              alt="Acme Logo"
              className="logo-ticker-image w-auto h-40"
            />
            <Image
              src={quantumLogo}
              alt="Quantum Logo"
              className="logo-ticker-image w-auto h-40"
            />
            <Image
              src={echoLogo}
              alt="Echo Logo"
              className="logo-ticker-image w-auto h-40"
            />
            <Image
              src={celestialLogo}
              alt="Celestial Logo"
              className="logo-ticker-image w-auto h-40"
            />
            <Image
              src={pulseLogo}
              alt="Pulse Logo"
              className="logo-ticker-image w-auto h-40"
            />
            
          </motion.div>
        </div>
      </div>
    </div>
    </Element>
  );
};
