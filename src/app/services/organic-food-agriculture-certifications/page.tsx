"use client";
import { useState } from "react";
import { Header } from "@/sections/Header";
import Footer from "@/sections/Footer";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { ServiceSearch } from "@/components/ServiceSearch";
import { ContactForm } from "@/components/ContactForm";

interface IsoStandard {
  id: string;
  title: string;
  description: string;
  details: string;
}

const isoStandards: IsoStandard[] = [
  {
    id: "organic-certification",
    title: "Organic Certification (EU Organic, NOP, NPOP)",
    description: "Certification for organic agricultural products.",
    details: `Organic Certification ensures that agricultural products meet organic farming standards set by regulatory bodies such as EU Organic, NOP (USDA), and NPOP (India).

Why Organic Certification Matters:
- Guarantees organic integrity
- Enhances market access
- Builds consumer trust

Core Focus Areas:
- Organic farming practices
- Prohibition of synthetic chemicals
- Soil and water conservation
- Traceability and labeling

Who Should Use Organic Certification:
- Organic farmers and producers
- Exporters and importers
- Retailers and distributors

Key Outcomes:
- Access to organic markets
- Compliance with organic standards
- Increased consumer confidence`
  },
  {
    id: "haccp-certification",
    title: "HACCP Certification",
    description: "Hazard Analysis and Critical Control Points certification.",
    details: `HACCP Certification is a systematic preventive approach to food safety that identifies physical, chemical, and biological hazards in production processes.

Why HACCP Certification Matters:
- Ensures food safety
- Reduces risk of contamination
- Complies with regulatory requirements

Core Focus Areas:
- Hazard analysis
- Critical control points identification
- Monitoring procedures
- Corrective actions

Who Should Use HACCP Certification:
- Food manufacturers
- Processors and packagers
- Food service providers

Key Outcomes:
- Improved food safety management
- Reduced foodborne illnesses
- Regulatory compliance`
  },
  {
    id: "fssai-licensing",
    title: "FSSAI Licensing & Certification",
    description: "Food Safety and Standards Authority of India licensing.",
    details: `FSSAI Licensing & Certification ensures compliance with food safety standards in India, regulating food businesses to protect consumer health.

Why FSSAI Licensing Matters:
- Legal compliance in India
- Ensures food quality and safety
- Builds consumer confidence

Core Focus Areas:
- Food safety management
- Hygiene and sanitation
- Labeling and packaging
- Traceability

Who Should Use FSSAI Licensing:
- Food manufacturers and retailers in India
- Importers and exporters
- Food service providers

Key Outcomes:
- Legal operation in India
- Enhanced food safety
- Consumer trust`
  },
  {
    id: "halal-kosher-certification",
    title: "Halal & Kosher Certification",
    description: "Certification for Halal and Kosher food products.",
    details: `Halal & Kosher Certification ensures that food products comply with Islamic and Jewish dietary laws respectively, catering to specific consumer groups.

Why Halal & Kosher Certification Matters:
- Access to niche markets
- Compliance with religious dietary laws
- Builds consumer trust

Core Focus Areas:
- Ingredient sourcing
- Processing and handling
- Packaging and labeling
- Certification audits

Who Should Use Halal & Kosher Certification:
- Food manufacturers and processors
- Exporters and importers
- Retailers targeting specific communities

Key Outcomes:
- Market expansion
- Regulatory compliance
- Increased consumer confidence`
  },
  {
    id: "gmp-certification",
    title: "GMP Certification",
    description: "Good Manufacturing Practice certification.",
    details: `GMP Certification ensures that products are consistently produced and controlled according to quality standards, minimizing risks involved in pharmaceutical production and food manufacturing.

Why GMP Certification Matters:
- Ensures product quality and safety
- Complies with regulatory requirements
- Reduces risks of contamination and errors

Core Focus Areas:
- Manufacturing process control
- Quality management systems
- Documentation and record keeping
- Personnel training and hygiene

Who Should Use GMP Certification:
- Pharmaceutical manufacturers
- Food producers
- Quality assurance teams

Key Outcomes:
- Improved product consistency
- Enhanced regulatory compliance
- Increased consumer trust`
  }
];

export default function OrganicFoodAgricultureCertifications() {
  const [selectedStandard, setSelectedStandard] = useState<IsoStandard | null>(null);
  const [filteredStandards, setFilteredStandards] = useState<IsoStandard[]>(isoStandards);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredStandards(isoStandards);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = isoStandards.filter(
      standard => 
        standard.title.toLowerCase().includes(lowercaseQuery) || 
        standard.description.toLowerCase().includes(lowercaseQuery) ||
        standard.details.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredStandards(filtered);
  };

  const openModal = (standard: IsoStandard) => {
    setSelectedStandard(standard);
  };

  const closeModal = () => {
    setSelectedStandard(null);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Organic, Food & Agriculture Certifications</h1>
        <p className="mb-6">
          Certifications for organic products, food safety, and agricultural practices.
        </p>
        
        <ServiceSearch 
          onSearch={handleSearch} 
          placeholder="Search food & agriculture certifications..." 
          className="mb-8"
        />
        
        {filteredStandards.length === 0 ? (
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
            {filteredStandards.map((standard) => (
              <div
                key={standard.id}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openModal(standard)}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  {standard.title}
                </h2>
                <p className="text-gray-600 mt-2">{standard.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {selectedStandard && (
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
              {selectedStandard.title}
            </h2>
            <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200 text-gray-700 whitespace-pre-wrap flex-grow">
              {selectedStandard.details}
            </div>
            <ContactForm 
              serviceName={selectedStandard.title} 
              buttonText="Apply" 
            />
          </div>
        </div>
      )}
    </>
  );
}

