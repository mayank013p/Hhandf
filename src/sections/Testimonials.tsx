"use client";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";
import avatar7 from "@/assets/avatar-7.png";
import avatar8 from "@/assets/avatar-8.png";
import avatar9 from "@/assets/avatar-9.png";
import { Link, Element } from "react-scroll";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import React from "react";

const testimonials = [
  {
    text: " We bring in-depth knowledge and experience across diverse sectors, including manufacturing, healthcare, IT, and more.",
    imageSrc: avatar1,
    name: " Expertise Across Industries",
    username: "@experiencethatworks",
  },
  {
    text: " From consultancy and documentation to audits, certification, and training, we provide end-to-end services under one roof. ",
    imageSrc: avatar1,
    name: "Comprehensive Solutions:",
    username: "@all-in-oneservices",
  },
  {
    text: "Every business is unique. We deliver customized solutions aligned with your specific goals and requirements.",
    imageSrc: avatar1,
    name: " Tailored Approach",
    username: "@madeforyou",
  },
  {
    text: "Trusted by numerous clients, we have successfully helped organizations achieve certifications and compliance with global standards.",
    imageSrc: avatar1,
    name: " Proven Track Record",
    username: "@trustedsuccess",
  },
  {
    text: "We ensure your organization meets international benchmarks while addressing local regulatory needs.",
    imageSrc: avatar1,
    name: " Global Standards, Local Insights",
    username: "@globalmeetslocal",
  },
  {
    text: "The customizability and integration capabilities of this app are top-notch.",
    imageSrc: avatar1,
    name: "Riley Smith",
    username: "@yourgrowth,ourgoal",
  },
  {
    text: "Your growth is our priority. We work closely with you to enhance operational efficiency, reduce risks, and drive sustainable results.",
    imageSrc: avatar1,
    name: "Client-Centric Focus",
    username: "@forward-thinkingsolutions",
  },
  {
    text: "We leverage the latest methodologies and technologies to keep your business competitive and future-ready",
    imageSrc: avatar1,
    name: "Innovative Strategies",
    username: "@dawsontechtips",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => (
  <div className={props.className}>
    <motion.div
      animate={{
        translateY: "-50%",
      }}
      transition={{
        duration: props.duration || 10,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }}
      className="flex flex-col gap-6 pb-6"
    >
          {[...new Array(2)].fill(0).map((_, outerIndex) => (
            <React.Fragment key={outerIndex}>
              {props.testimonials.map(({ text, imageSrc, name, username }, innerIndex) => (
                <div className="card" key={`${outerIndex}-${innerIndex}-${username}`}>
              <div>{text}</div>
              <div className="flex items-center gap-2 mt-5">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <div className="flex flex-col">
                  <div className="font-medium tracking-tight leading-5">
                    {name}
                  </div>
                  <div className="leading-5 tracking-tight">{username}</div>
                </div>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const Testimonials = () => {
  return (
    <Element
        name="chooseus"
        style={{ background: "lightblue" }}
      >
    <section id="test" className="bg-white">
      <div className="container">
        <div className="section-heading">
          <div className="flex justify-center">
            <div className="tag">Doubte that:</div>
          </div>
          <h2 className="section-title mt-5">Why choose us</h2>
          <p className="section-description mt-5">
          Discover the benefits of partnering with us
          </p>
        </div>
        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[738px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
    </Element>
  );
};
