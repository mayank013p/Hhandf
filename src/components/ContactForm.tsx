"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { FaCheckCircle, FaTimesCircle, FaUser, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";
import emailjs from '@emailjs/browser';

interface ContactFormProps {
  serviceName?: string;
  buttonText?: string;
}

export const ContactForm = ({ serviceName = "", buttonText = "Inquire Now" }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [formStatus, setFormStatus] = useState({ loading: false, error: null as string | null, success: false });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus({ loading: true, error: null, success: false });

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
          message: `${serviceName ? `Service: ${serviceName}\n\n` : ''}${formData.message}`,
          service: serviceName || "General Inquiry"
        },
        publicKey
      );
      
      setFormStatus({ loading: false, error: null, success: true });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("Email sending error:", error);
      setFormStatus({ 
        loading: false, 
        error: error instanceof Error ? error.message : "Failed to submit form", 
        success: false 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="relative">
        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="relative">
        <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="relative">
        <FaCommentDots className="absolute left-3 top-3 text-gray-400" />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full pl-10 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={formStatus.loading}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors font-semibold flex justify-center items-center gap-2"
      >
        {formStatus.loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Sending...
          </>
        ) : (
          buttonText
        )}
      </button>
      {formStatus.error && (
        <p className="text-red-600 mt-2 flex items-center gap-2">
          <FaTimesCircle />
          {formStatus.error}
        </p>
      )}
      {formStatus.success && (
        <p className="text-green-600 mt-2 flex items-center gap-2">
          <FaCheckCircle />
          Inquiry submitted successfully!
        </p>
      )}
    </form>
  );
};