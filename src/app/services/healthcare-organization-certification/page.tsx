"use client";
import { useState } from "react";
import { Header } from "@/sections/Header";
import Footer from "@/sections/Footer";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { ServiceSearch } from "@/components/ServiceSearch";
import { ContactForm } from "@/components/ContactForm";

interface Certification {
  id: string;
  title: string;
  description: string;
  details: string;
}

const certifications: Certification[] = [
  {
    id: "nabh-accreditation",
    title: "NABH Accreditation",
    description: "National Accreditation Board for Hospitals & Healthcare Providers.",
    details: `NABH Accreditation is a benchmark for the quality and safety of healthcare organizations in India.

Why NABH Accreditation Matters:
- Ensures high standards of patient care
- Enhances hospital reputation
- Improves operational efficiency

Core Focus Areas:
- Patient rights and education
- Infection control
- Facility management
- Continuous quality improvement

Who Should Use NABH Accreditation:
- Hospitals and healthcare providers
- Diagnostic centers
- Healthcare organizations seeking quality certification

Key Outcomes:
- Improved patient safety
- Enhanced trust and credibility
- Compliance with national standards`
  },
  {
    id: "waste-management",
    title: "Waste Management",
    description: "Certification for healthcare waste management practices.",
    details: `Healthcare Waste Management certification ensures safe and compliant handling of medical waste.

Why Waste Management Matters:
- Protects public health and environment
- Ensures regulatory compliance
- Reduces risk of contamination

Core Focus Areas:
- Waste segregation and disposal
- Staff training and safety
- Monitoring and documentation
- Environmental protection

Who Should Use Waste Management Certification:
- Hospitals and clinics
- Laboratories
- Healthcare waste handlers

Key Outcomes:
- Safer waste handling
- Reduced environmental impact
- Compliance with regulations`
  },
  {
    id: "wellness-certifications",
    title: "Wellness Certifications",
    description: "Certifications for wellness centers and services.",
    details: `Wellness Certifications validate the quality and safety of wellness services and centers.

Why Wellness Certifications Matter:
- Enhances client trust
- Ensures service quality
- Promotes health and well-being

Core Focus Areas:
- Service standards
- Hygiene and safety
- Staff qualifications
- Client satisfaction

Who Should Use Wellness Certifications:
- Wellness centers
- Spas and fitness centers
- Health service providers

Key Outcomes:
- Improved service quality
- Increased client confidence
- Competitive advantage`
  },
  {
    id: "ayush-certification",
    title: "Ayush Certification",
    description: "Certification for Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy services.",
    details: `Ayush Certification ensures compliance with standards for traditional Indian medicine and wellness practices.

Why Ayush Certification Matters:
- Validates authenticity and quality
- Supports regulatory compliance
- Promotes traditional healthcare systems

Core Focus Areas:
- Treatment protocols
- Practitioner qualifications
- Facility standards
- Patient safety

Who Should Use Ayush Certification:
- Ayush clinics and hospitals
- Practitioners of traditional medicine
- Wellness centers offering Ayush services

Key Outcomes:
- Enhanced credibility
- Improved patient trust
- Compliance with regulatory standards`
  }
];

export default function HealthcareOrganizationCertification() {
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
  const [filteredCertifications, setFilteredCertifications] = useState<Certification[]>(certifications);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredCertifications(certifications);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = certifications.filter(
      certification => 
        certification.title.toLowerCase().includes(lowercaseQuery) || 
        certification.description.toLowerCase().includes(lowercaseQuery) ||
        certification.details.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredCertifications(filtered);
  };

  const openModal = (certification: Certification) => {
    setSelectedCertification(certification);
  };

  const closeModal = () => {
    setSelectedCertification(null);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Healthcare Organization Certification</h1>
        
        <ServiceSearch 
          onSearch={handleSearch} 
          placeholder="Search healthcare certifications..." 
          className="mb-8"
        />
        
        {filteredCertifications.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No certifications found matching your search.</p>
            <button 
              onClick={() => handleSearch("")}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              View all certifications
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCertifications.map((certification) => (
              <div
                key={certification.id}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openModal(certification)}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  {certification.title}
                </h2>
                <p className="text-gray-600 mt-2">{certification.description}</p>
              </div>
            ))}
          </div>
        )}
        
        {/* Modal */}
        {selectedCertification && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg max-w-4xl w-full p-8 relative shadow-lg max-h-[95vh] flex flex-col overflow-y-auto">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <FaTimes size={24} />
              </button>
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                <FaCheckCircle className="text-blue-600" />
                {selectedCertification.title}
              </h2>
              <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200 text-gray-700 whitespace-pre-wrap flex-grow">
                {selectedCertification.details}
              </div>
              
              {/* Replace the form with our new ContactForm component */}
              <ContactForm 
                serviceName={selectedCertification.title} 
                buttonText="Apply for Certification" 
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
