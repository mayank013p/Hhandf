"use client";
import { useState } from "react";
import { Header } from "@/sections/Header";
import Footer from "@/sections/Footer";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { ServiceSearch } from "@/components/ServiceSearch";
import { ContactForm } from "@/components/ContactForm";

interface TrainingService {
  id: string;
  title: string;
  description: string;
  details: string;
}

const trainingServices: TrainingService[] = [
  {
    id: "iso-internal-auditor",
    title: "ISO Internal Auditor Training",
    description: "Comprehensive training for conducting internal audits of ISO management systems.",
    details: `ISO Internal Auditor Training provides participants with the knowledge and skills needed to conduct effective internal audits of ISO management systems.

Why ISO Internal Auditor Training Matters:
- Ensures compliance with ISO standards
- Identifies improvement opportunities
- Prepares organizations for external audits
- Builds internal competence

Core Focus Areas:
- Audit principles and methodology
- Planning and conducting audits
- Reporting and follow-up
- Continuous improvement techniques

Who Should Attend:
- Quality managers and team members
- Internal audit team members
- Management system representatives
- Process owners and supervisors

Key Outcomes:
- Qualified internal auditors
- Improved management system effectiveness
- Enhanced organizational performance
- Preparation for certification audits`
  },
  {
    id: "awareness-competency",
    title: "Awareness and Competency Training",
    description: "Training programs to build awareness and competency in various management systems.",
    details: `Awareness and Competency Training provides employees with essential knowledge about management systems and develops the skills needed to implement them effectively.

Why Awareness and Competency Training Matters:
- Creates organization-wide understanding
- Ensures consistent implementation
- Develops necessary skills and capabilities
- Supports cultural transformation

Core Focus Areas:
- Management system fundamentals
- Role-specific responsibilities
- Process implementation
- Documentation and record-keeping

Who Should Attend:
- All employees (awareness level)
- Department heads and supervisors
- Implementation team members
- New employees during onboarding

Key Outcomes:
- Increased employee engagement
- Improved system implementation
- Enhanced organizational capability
- Reduced resistance to change`
  },
  {
    id: "fire-safety",
    title: "Fire and Safety Training",
    description: "Comprehensive training on fire prevention, protection, and emergency response.",
    details: `Fire and Safety Training equips participants with essential knowledge and skills to prevent fires, respond effectively to emergencies, and maintain workplace safety.

Why Fire and Safety Training Matters:
- Prevents workplace accidents and injuries
- Ensures regulatory compliance
- Prepares staff for emergency situations
- Creates a safety-conscious culture

Core Focus Areas:
- Fire prevention techniques
- Emergency response procedures
- Evacuation planning and drills
- First aid and basic life support
- Hazard identification and risk assessment

Who Should Attend:
- Safety officers and committee members
- Emergency response team members
- Department supervisors
- All employees (basic level)

Key Outcomes:
- Reduced workplace incidents
- Improved emergency preparedness
- Enhanced safety awareness
- Compliance with safety regulations`
  }
];

export default function TrainingDevelopmentServices() {
  const [selectedService, setSelectedService] = useState<TrainingService | null>(null);
  const [filteredServices, setFilteredServices] = useState<TrainingService[]>(trainingServices);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredServices(trainingServices);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = trainingServices.filter(
      service => 
        service.title.toLowerCase().includes(lowercaseQuery) || 
        service.description.toLowerCase().includes(lowercaseQuery) ||
        service.details.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredServices(filtered);
  };

  const openModal = (service: TrainingService) => {
    setSelectedService(service);
  };

  const closeModal = () => {
    setSelectedService(null);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Training & Development Services</h1>
        <p className="mb-6">
          Professional training and development programs to enhance skills and capabilities.
        </p>
        
        <ServiceSearch 
          onSearch={handleSearch} 
          placeholder="Search training services..." 
          className="mb-8"
        />
        
        {filteredServices.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No training services found matching your search.</p>
            <button 
              onClick={() => handleSearch("")}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              View all training services
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => openModal(service)}
              >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  {service.title}
                </h2>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {selectedService && (
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
              {selectedService.title}
            </h2>
            <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200 text-gray-700 whitespace-pre-wrap flex-grow">
              {selectedService.details}
            </div>
            <ContactForm 
              serviceName={selectedService.title} 
              buttonText="Inquire Now" 
            />
          </div>
        </div>
      )}
    </>
  );
}
