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
    id: "zed-certification",
    title: "ZED Certification",
    description: "Zero Defect Zero Effect certification for MSMEs.",
    details: `ZED Certification is a quality standard developed for Micro, Small & Medium Enterprises (MSMEs) in India that focuses on zero defects in production and zero effect on the environment.

Why ZED Certification Matters:
- Improves quality and competitiveness
- Enhances environmental sustainability
- Supports national manufacturing standards

Core Focus Areas:
- Quality management
- Environmental impact reduction
- Process optimization
- Continuous improvement

Who Should Use ZED Certification:
- Manufacturing MSMEs
- Export-oriented small businesses
- Companies seeking quality excellence

Key Outcomes:
- Improved product quality
- Reduced environmental footprint
- Enhanced market credibility`
  },
  {
    id: "sedex-certification",
    title: "Sedex Certification",
    description: "Supplier Ethical Data Exchange certification for ethical supply chains.",
    details: `Sedex is one of the world's leading ethical trade service providers, working to improve working conditions in global supply chains.

Why Sedex Certification Matters:
- Demonstrates ethical business practices
- Improves supply chain transparency
- Enhances brand reputation

Core Focus Areas:
- Labor standards
- Health and safety
- Environmental practices
- Business ethics

Who Should Use Sedex Certification:
- Global suppliers and manufacturers
- Retailers and brands
- Companies with complex supply chains

Key Outcomes:
- Improved supply chain visibility
- Enhanced ethical compliance
- Reduced reputational risks`
  },
  {
    id: "green-campus",
    title: "Green Campus",
    description: "Certification for environmentally sustainable educational institutions.",
    details: `Green Campus certification recognizes educational institutions that implement environmentally sustainable practices and promote ecological awareness.

Why Green Campus Matters:
- Reduces environmental footprint
- Promotes sustainability education
- Demonstrates environmental leadership

Core Focus Areas:
- Energy efficiency
- Waste management
- Water conservation
- Sustainable transportation
- Environmental education

Who Should Use Green Campus:
- Schools and colleges
- Universities
- Educational campuses

Key Outcomes:
- Reduced resource consumption
- Enhanced environmental awareness
- Cost savings through efficiency`
  },
  {
    id: "green-co",
    title: "Green CO.",
    description: "Certification for environmentally responsible companies.",
    details: `Green CO. certification recognizes companies that implement environmentally sustainable business practices and demonstrate commitment to reducing their ecological footprint.

Why Green CO. Matters:
- Validates environmental commitments
- Enhances corporate reputation
- Supports sustainable business practices

Core Focus Areas:
- Carbon footprint reduction
- Resource efficiency
- Sustainable procurement
- Environmental management systems

Who Should Use Green CO.:
- Businesses seeking environmental recognition
- Companies with sustainability goals
- Organizations reducing environmental impact

Key Outcomes:
- Improved environmental performance
- Enhanced stakeholder trust
- Competitive differentiation`
  },
  {
    id: "lean-six-sigma",
    title: "Lean Six Sigma Consulting",
    description: "Process improvement methodology combining Lean and Six Sigma principles.",
    details: `Lean Six Sigma is a methodology that combines Lean manufacturing/service principles and Six Sigma to improve performance by systematically removing waste and reducing variation.

Why Lean Six Sigma Matters:
- Improves process efficiency
- Reduces defects and errors
- Enhances customer satisfaction

Core Focus Areas:
- Process mapping and analysis
- Waste elimination
- Defect reduction
- Data-driven decision making
- Continuous improvement

Who Should Use Lean Six Sigma:
- Manufacturing companies
- Service organizations
- Healthcare providers
- Financial institutions

Key Outcomes:
- Streamlined processes
- Reduced operational costs
- Improved quality and consistency`
  }
];

export default function ComplianceCertificationsOther() {
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
        <h1 className="text-3xl font-bold mb-8">Compliance Certifications & Other</h1>
        <p className="mb-6">
          Comprehensive compliance certifications and related services.
        </p>
        
        <ServiceSearch 
          onSearch={handleSearch} 
          placeholder="Search compliance certifications..." 
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
                buttonText="Request Information" 
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
