"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Logo from "@/assets/logosaas.png";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import emailjs from '@emailjs/browser';

export default function Footer() {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get EmailJS credentials from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      
      // Validate that credentials exist
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service configuration is missing");
      }
      
      // Send email using emailjs.send with template parameters
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        },
        publicKey
      );
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err) {
      console.error("Email sending error:", err);
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-white py-12" id="contact">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-2 rounded bg-gray-800 text-white"
                  rows={3}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
              {success && (
                <p className="text-green-500 text-sm">Message sent successfully!</p>
              )}
            </form>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <p className="text-gray-400 flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-400" />
                123 Certification Street, City, Country
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <FaPhone className="text-blue-400" />
                +1 234 567 890
              </p>
              <p className="text-gray-400 flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                info@certifications.com
              </p>
            </div>
            
            <h3 className="text-xl font-bold mt-6 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaFacebook />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <Image
                src={Logo}
                alt="Company Logo"
                width={50}
                height={50}
              />
            </div>
            <div className="flex space-x-4">
              <a href="/services" className="text-gray-400 hover:text-white">
                Services
              </a>
              <a href="/#about" className="text-gray-400 hover:text-white">
                About
              </a>
              <a href="/#contact" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Certification Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
