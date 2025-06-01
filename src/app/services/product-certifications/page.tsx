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
    id: "ce-marking",
    title: "CE Marking",
    description: "European conformity marking for products sold in the European Economic Area.",
    details: `CE Marking indicates that a product has been assessed by the manufacturer and deemed to meet EU safety, health, and environmental protection requirements.

Why CE Marking Matters:
- Enables product access to European markets
- Demonstrates regulatory compliance
- Enhances consumer confidence

Core Focus Areas:
- Product safety assessment
- Technical documentation
- Conformity declaration
- Risk analysis and mitigation

Who Should Use CE Marking:
- Manufacturers exporting to Europe
- Importers of products to the EU
- Distributors of regulated products

Key Outcomes:
- Legal market access in the EU
- Reduced liability risks
- Enhanced product credibility`
  },
  {
    id: "e-mark",
    title: "E Mark",
    description: "Type approval mark for automotive components in the European Union.",
    details: `E Mark is a type approval mark for vehicle parts and systems that indicates compliance with EU safety and environmental standards.

Why E Mark Matters:
- Ensures automotive component compliance
- Facilitates vehicle type approval
- Supports international trade

Core Focus Areas:
- Component performance testing
- Technical specifications
- Production consistency
- Quality control systems

Who Should Use E Mark:
- Automotive component manufacturers
- Vehicle manufacturers
- Aftermarket parts suppliers

Key Outcomes:
- Legal compliance for automotive parts
- Market access across Europe
- Standardized quality assurance`
  },
  {
    id: "isi-marking",
    title: "ISI Marking",
    description: "Indian Standards Institute certification mark for product quality.",
    details: `ISI Marking is a certification mark for products that conform to the Indian Standards established by the Bureau of Indian Standards (BIS).

Why ISI Marking Matters:
- Ensures product quality and safety
- Builds consumer trust in Indian markets
- Demonstrates compliance with national standards

Core Focus Areas:
- Product testing and evaluation
- Manufacturing process assessment
- Quality control systems
- Regular surveillance audits

Who Should Use ISI Marking:
- Manufacturers selling in India
- Products under mandatory certification
- Companies seeking quality differentiation

Key Outcomes:
- Legal compliance in Indian market
- Enhanced consumer confidence
- Competitive advantage`
  },
  {
    id: "bis-certification",
    title: "BIS Certification",
    description: "Bureau of Indian Standards certification for product quality and safety.",
    details: `BIS Certification is a comprehensive quality certification scheme operated by the Bureau of Indian Standards, India's national standards body.

Why BIS Certification Matters:
- Ensures compliance with Indian standards
- Mandatory for many product categories
- Enhances product marketability

Core Focus Areas:
- Product testing against standards
- Factory production control
- Quality management systems
- Market surveillance

Who Should Use BIS Certification:
- Manufacturers of regulated products
- Importers to Indian markets
- Companies focused on quality assurance

Key Outcomes:
- Legal market access in India
- Quality recognition
- Consumer protection compliance`
  },
  {
    id: "green-pro",
    title: "Green Pro",
    description: "Certification for environmentally sustainable products.",
    details: `Green Pro certification recognizes products that meet environmental sustainability criteria throughout their lifecycle, from raw material sourcing to disposal.

Why Green Pro Matters:
- Validates environmental product claims
- Differentiates sustainable products
- Supports green procurement policies

Core Focus Areas:
- Life cycle assessment
- Resource efficiency
- Reduced environmental impact
- Sustainable materials

Who Should Use Green Pro:
- Manufacturers of eco-friendly products
- Companies with sustainability goals
- Businesses targeting green consumers

Key Outcomes:
- Environmental credibility
- Market differentiation
- Support for circular economy`
  }
];

export default function ProductCertifications() {
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
        <h1 className="text-3xl font-bold mb-8">Product Certifications</h1>
        <p className="mb-6">
          Certifications for various products ensuring quality and compliance.
        </p>
        
        <ServiceSearch 
          onSearch={handleSearch} 
          placeholder="Search product certifications..." 
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
              
              <ContactForm 
                serviceName={selectedCertification.title} 
                buttonText="Get Certified" 
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}


