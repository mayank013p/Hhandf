"use client";

import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { Link as ScrollLink, Element } from "react-scroll"; // ✅ Avoid import conflict

const pricingTiers = [
  {
    title: "Our Vission",
    buttonText: "Shaping the Future",
    popular: true,
    inverse: false,
    features: [
      "To be a global leader in consultancy and certification services",
      "To empower businesses to create a safer, greener, and more efficient world",
      "To promote social equity and ethical business practices",
      "To be recognized as a leading authority in our field on a global scale.",
    ],
  },
  {
    title: "Our Mission",
    buttonText: "Transforming Businesses",
    popular: true,
    inverse: true,
    features: [
      "To deliver reliable, efficient, and innovative consultancy services",
      "To help organizations meet global standards.",
      "To improve operational performance.",
      "To build sustainable business practices",
      "Delivering exceptional solutions for a sustainable future",
      "To enhance organizational productivity and profitability.",
    ],
  },
  {
    title: "Our Values",
    buttonText: "The Foundation of Our Success",
    popular: true,
    inverse: false,
    features: [
      "Integrity: We build trust through honesty and transparency.",
      "Excellence: Delivering top-quality services and continuous improvement",
      "Customer Focus: Tailored solutions to achieve client success",
      "Innovation: Embracing new methods to keep clients ahead",
      "Diversity: Valuing varied perspectives to foster creativity",
      "Adaptability: Responding to dynamic client needs and market changes",
      "Community Impact: Positively contributing to society and communities",
    ],
  },
];

export const Pricing = () => {
  return (
    <section id="ourgoals" className="py-24 bg-white">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">From beginning to @infinty</h2>
          <p className="section-description mt-5">
            Committed to Excellence. Empowering Businesses with Global Standards
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center mt-10 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(({ title, buttonText, popular, inverse, features }) => (
            <div key={title} // ✅ Added key prop
              className={twMerge(
                "card",
                inverse === true && "border-black bg-black text-white"
              )}
            >
              <div className="flex justify-between">
                <h3
                  className={twMerge(
                    "text-lg font-bold text-black/50",
                    inverse === true && "text-white/60"
                  )}
                >
                  {title}
                </h3>
                {popular === true && (
                  <div className="inline-flex text-sm px-4 py-1.5 rounded-xl border border-white/20">
                    <motion.span
                      animate={{
                        backgroundPositionX: "100%",
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                        repeatType: "loop",
                      }}
                      className="bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#BBCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] text-transparent bg-clip-text font-medium"
                    >
                      HH4I
                    </motion.span>
                  </div>
                )}
              </div>
              <button
                className={twMerge(
                  "btn btn-primary w-full mt-[30px]",
                  inverse === true && "bg-white text-black"
                )}
              >
                {buttonText}
              </button>
              <ul className="flex flex-col gap-5 mt-8">
                {features.map((feature, index) => (
                  <li key={`${title}-feature-${index}`} className="text-sm flex items-center gap-4">
                    {/* ✅ Use inline SVG instead of importing `CheckIcon` */}
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
