"use client";
import { useState } from "react";
import { Header } from "@/sections/Header";
import Footer from "@/sections/Footer";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { ServiceSearch } from "@/components/ServiceSearch";
import { ContactForm } from "@/components/ContactForm";

// Keep the original interface and all standards
interface IsoStandard {
  id: string;
  title: string;
  description: string;
  details: string;
}

// Maintain all the original ISO standards
const isoStandards: IsoStandard[] = [
  // All standards from the original file
  {
    id: "iso9001",
    title: "ISO 9001 (QMS) - Quality",
    description: "Quality management system standard ensuring consistent quality.",
    details: `ISO 9001:2015 is the internationally recognized standard for designing and maintaining a Quality Management System (QMS). It helps organizations ensure consistent quality in their products and services, meet customer and regulatory requirements, and improve overall performance through continual process optimization.

It is designed to be flexible and applicable to any organization — regardless of its size, sector, or product/service.

Why ISO 9001 Matters:
- Builds trust and credibility with customers and stakeholders
- Enhances operational efficiency and productivity
- Reduces errors, rework, and waste
- Ensures regulatory and statutory compliance
- Drives continual improvement and innovation

Core Focus Areas:
- Customer satisfaction at the center of quality objectives
- Leadership accountability and strategic direction
- Employee engagement and responsibility across departments
- Process-based approach to streamline workflows
- Evidence-based decision making to drive better outcomes
- Strong supplier and stakeholder relationships

Who Should Use ISO 9001:
- Businesses seeking to improve consistency and performance
- Organizations entering new markets or industries
- Companies bidding for contracts requiring certified systems
- Enterprises looking to improve internal processes and governance

Key Outcomes:
- Improved customer experience
- Better risk management
- Stronger brand reputation
- Structured documentation and quality control
- Readiness for growth and scalability`
  },
  {
    id: "iso14001",
    title: "ISO 14001 (EMS) - Environment",
    description: "Environmental management system standard for sustainability.",
    details: `ISO 14001 is the international standard for Environmental Management Systems (EMS). It provides a framework for organizations to protect the environment, respond to changing environmental conditions, and integrate environmental management into business operations.

Why ISO 14001 Matters:
- Demonstrates environmental responsibility
- Helps comply with legal and regulatory requirements
- Reduces waste and energy consumption
- Enhances corporate image and stakeholder trust

Core Focus Areas:
- Environmental policy and planning
- Implementation and operation of EMS
- Checking and corrective actions
- Management review and continual improvement

Who Should Use ISO 14001:
- Organizations committed to environmental stewardship
- Companies seeking to reduce environmental impact
- Businesses aiming to improve sustainability practices

Key Outcomes:
- Reduced environmental footprint
- Compliance with environmental laws
- Improved resource efficiency
- Enhanced stakeholder confidence`
  },
  {
    id: "iso45001",
    title: "ISO 45001 (OHSMS) - Health & Safety",
    description: "Occupational health and safety management system standard.",
    details: `ISO 45001 is the international standard for Occupational Health and Safety Management Systems (OHSMS). It helps organizations provide safe and healthy workplaces by preventing work-related injuries and illnesses.

Why ISO 45001 Matters:
- Reduces workplace accidents and illnesses
- Improves employee morale and productivity
- Ensures compliance with health and safety regulations
- Demonstrates commitment to employee well-being

Core Focus Areas:
- Hazard identification and risk assessment
- Legal and other requirements compliance
- Operational controls and emergency preparedness
- Performance evaluation and continual improvement

Who Should Use ISO 45001:
- Organizations prioritizing workplace safety
- Companies aiming to reduce occupational risks
- Businesses seeking to improve health and safety culture

Key Outcomes:
- Safer work environments
- Reduced absenteeism and costs
- Enhanced reputation and legal compliance`
  },
  {
    id: "iso50001",
    title: "ISO 50001 (EnMS) - Energy",
    description: "Energy management system standard for efficient energy use.",
    details: `ISO 50001 is the international standard for Energy Management Systems (EnMS). It provides a framework for organizations to manage energy performance, increase energy efficiency, and reduce environmental impact.

Why ISO 50001 Matters:
- Lowers energy costs
- Reduces greenhouse gas emissions
- Supports sustainable energy use
- Enhances corporate social responsibility

Core Focus Areas:
- Energy policy and planning
- Energy performance monitoring
- Implementation of energy-saving measures
- Management review and continual improvement

Who Should Use ISO 50001:
- Organizations seeking energy efficiency
- Companies aiming to reduce carbon footprint
- Businesses committed to sustainability

Key Outcomes:
- Improved energy performance
- Cost savings
- Environmental benefits`
  },
  {
    id: "iso20000",
    title: "ISO 20000 (IT-SMS) - IT - Service",
    description: "IT service management system standard for quality IT services.",
    details: `ISO 20000 is the international standard for IT Service Management Systems (IT-SMS). It helps organizations deliver effective and efficient IT services that meet business and customer requirements.

Why ISO 20000 Matters:
- Improves IT service quality
- Enhances customer satisfaction
- Aligns IT services with business needs
- Supports continual service improvement

Core Focus Areas:
- Service delivery and relationship management
- Resolution and control processes
- Planning and implementation of IT services
- Performance measurement and reporting

Who Should Use ISO 20000:
- IT service providers
- Organizations managing internal IT services
- Businesses seeking IT service excellence

Key Outcomes:
- Higher service reliability
- Better customer relationships
- Optimized IT operations`
  },
  {
    id: "iso21001",
    title: "ISO 21001 (EOMS) - Educational Org.",
    description: "Educational organization management system standard.",
    details: `ISO 21001 provides a management system framework for educational organizations to enhance the satisfaction of learners and other beneficiaries. It helps improve educational processes and outcomes through effective management practices.

Why ISO 21001 Matters:
- Enhances learner satisfaction and engagement
- Improves educational service quality
- Supports continual improvement in education

Core Focus Areas:
- Educational service delivery
- Learner-centered approach
- Stakeholder engagement
- Process management and improvement

Who Should Use ISO 21001:
- Educational institutions
- Training organizations
- Learning service providers

Key Outcomes:
- Improved educational outcomes
- Enhanced organizational effectiveness
- Increased stakeholder confidence`
  },
  {
    id: "iso37001",
    title: "ISO 37001 - Anti-Bribery",
    description: "Anti-bribery management system standard.",
    details: `ISO 37001 specifies requirements and provides guidance for establishing, implementing, maintaining, and improving an anti-bribery management system.

Why ISO 37001 Matters:
- Helps prevent bribery and corruption
- Enhances organizational integrity
- Supports compliance with legal requirements

Core Focus Areas:
- Anti-bribery policies and procedures
- Risk assessment and due diligence
- Training and communication
- Monitoring and review

Who Should Use ISO 37001:
- Organizations committed to anti-bribery
- Compliance officers
- Risk management teams

Key Outcomes:
- Reduced bribery risks
- Improved reputation
- Enhanced stakeholder trust`
  },
  {
    id: "iso55001",
    title: "ISO 55001 - Asset Management",
    description: "Asset management system standard.",
    details: `ISO 55001 specifies requirements for establishing, implementing, maintaining, and improving an asset management system to optimize asset value and performance.

Why ISO 55001 Matters:
- Enhances asset lifecycle management
- Improves risk management
- Supports organizational objectives

Core Focus Areas:
- Asset management policy and strategy
- Asset lifecycle management
- Risk and opportunity management
- Performance evaluation and improvement

Who Should Use ISO 55001:
- Organizations managing physical assets
- Asset managers and engineers
- Maintenance and operations teams

Key Outcomes:
- Optimized asset performance
- Reduced operational costs
- Improved decision making`
  },
  {
    id: "iso26000",
    title: "ISO 26000 - Corporate Social Responsibility",
    description: "Guidance on social responsibility.",
    details: `ISO 26000 provides guidance on how organizations can operate in a socially responsible way, contributing to sustainable development.

Why ISO 26000 Matters:
- Enhances organizational reputation
- Supports ethical behavior
- Promotes sustainable development

Core Focus Areas:
- Organizational governance
- Human rights
- Labor practices
- Environment
- Fair operating practices
- Consumer issues
- Community involvement and development

Who Should Use ISO 26000:
- Organizations seeking social responsibility guidance
- Corporate social responsibility teams
- Sustainability officers

Key Outcomes:
- Improved stakeholder relationships
- Enhanced social and environmental performance
- Increased transparency`
  },
  {
    id: "iso28000",
    title: "ISO 28000 - Supply Chain Security Management",
    description: "Supply chain security management system standard.",
    details: `ISO 28000 specifies requirements for a security management system, including aspects critical to the security assurance of the supply chain.

Why ISO 28000 Matters:
- Enhances supply chain security
- Supports risk management
- Improves stakeholder confidence

Core Focus Areas:
- Security management system
- Risk assessment and treatment
- Incident management
- Continual improvement

Who Should Use ISO 28000:
- Organizations managing supply chains
- Security managers
- Risk management teams

Key Outcomes:
- Improved supply chain resilience
- Reduced security incidents
- Enhanced compliance`
  },
  {
    id: "sa8000",
    title: "SA 8000 - Social Accountability",
    description: "Social accountability standard.",
    details: `SA 8000 is a global social accountability standard for decent working conditions, developed by Social Accountability International (SAI).

Why SA 8000 Matters:
- Promotes fair treatment of workers
- Ensures safe working conditions
- Supports ethical business practices

Core Focus Areas:
- Child labor
- Forced labor
- Health and safety
- Freedom of association
- Discrimination
- Disciplinary practices
- Working hours and compensation

Who Should Use SA 8000:
- Employers and suppliers
- Social auditors
- Corporate social responsibility teams

Key Outcomes:
- Improved labor conditions
- Enhanced corporate reputation
- Compliance with international labor standards`
  },
  {
    id: "iso17025",
    title: "ISO 17025 - Testing & Calibration Lab",
    description: "Testing and calibration laboratory management system standard.",
    details: `ISO 17025 specifies requirements for the competence of testing and calibration laboratories to ensure valid results.

Why ISO 17025 Matters:
- Ensures laboratory competence
- Supports accurate and reliable results
- Enhances customer confidence

Core Focus Areas:
- Laboratory management
- Technical requirements
- Quality assurance
- Continuous improvement

Who Should Use ISO 17025:
- Testing and calibration laboratories
- Quality managers
- Laboratory personnel

Key Outcomes:
- Valid and reliable test results
- Improved laboratory performance
- Compliance with international standards`
  },
  {
    id: "iso31000",
    title: "ISO 31000 - Risk Management",
    description: "Risk management system standard.",
    details: `ISO 31000 provides principles and guidelines for effective risk management to improve decision making and organizational resilience.

Why ISO 31000 Matters:
- Enhances risk awareness
- Supports proactive risk management
- Improves organizational resilience

Core Focus Areas:
- Risk assessment and treatment
- Risk governance
- Communication and consultation
- Monitoring and review

Who Should Use ISO 31000:
- Risk managers
- Organizational leaders
- Compliance officers

Key Outcomes:
- Improved risk management processes
- Reduced negative impacts
- Enhanced decision making`
  },
  {
    id: "iso22301",
    title: "ISO 22301 - Business Continuity",
    description: "Business continuity management system standard.",
    details: `ISO 22301 specifies requirements to plan, establish, implement, operate, monitor, review, maintain, and continually improve a business continuity management system.

Why ISO 22301 Matters:
- Enhances organizational resilience
- Supports risk management
- Ensures continuity of critical operations

Core Focus Areas:
- Business impact analysis
- Risk assessment
- Business continuity strategies
- Incident response and recovery

Who Should Use ISO 22301:
- Business continuity managers
- Risk management teams
- Organizational leaders

Key Outcomes:
- Improved preparedness
- Reduced downtime
- Enhanced stakeholder confidence`
  },
  {
    id: "iso27701",
    title: "ISO 27701 - Privacy Information",
    description: "Privacy information management system standard.",
    details: `ISO 27701 extends ISO 27001 to provide requirements for establishing, implementing, maintaining, and continually improving a privacy information management system (PIMS).

Why ISO 27701 Matters:
- Enhances privacy protection
- Supports compliance with privacy regulations
- Builds customer trust

Core Focus Areas:
- Privacy risk management
- Data subject rights
- Privacy controls implementation
- Monitoring and continual improvement

Who Should Use ISO 27701:
- Organizations processing personal data
- Privacy officers and compliance teams
- Businesses aiming for privacy excellence

Key Outcomes:
- Improved privacy management
- Reduced privacy risks
- Enhanced regulatory compliance`
  },
  {
    id: "iso13485",
    title: "ISO 13485 (MD-QMS) - Medical Devices",
    description: "Medical device quality management system standard.",
    details: `ISO 13485 specifies requirements for a quality management system for medical device manufacturers and related service providers to ensure product safety and effectiveness.

Why ISO 13485 Matters:
- Ensures medical device safety and quality
- Complies with regulatory requirements
- Supports risk management and traceability

Core Focus Areas:
- Design and development controls
- Production and process controls
- Risk management
- Regulatory compliance

Who Should Use ISO 13485:
- Medical device manufacturers
- Suppliers and service providers
- Regulatory bodies

Key Outcomes:
- Improved product safety
- Enhanced regulatory compliance
- Increased customer confidence`
  }
];

export default function ManagementSystemCertification() {
  const [selectedStandard, setSelectedStandard] = useState<IsoStandard | null>(null);
  const [filteredStandards, setFilteredStandards] = useState<IsoStandard[]>(isoStandards);

  // Add search functionality
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
        <h1 className="text-3xl font-bold mb-8">Management System Certification</h1>
        <p className="mb-6">
          Ensuring your management systems meet international standards.
        </p>
        
        <ServiceSearch 
          onSearch={handleSearch} 
          placeholder="Search ISO standards..." 
          className="mb-8"
        />
        
        {filteredStandards.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">No standards found matching your search.</p>
            <button 
              onClick={() => handleSearch("")}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              View all standards
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
