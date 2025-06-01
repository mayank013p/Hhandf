"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ServiceSearch } from "./ServiceSearch";

interface Service {
  title: string;
  description: string;
  slug: string;
}

const services: Service[] = [
  {
    title: "Management System Certification",
    description: "ISO 9001, ISO 14001, ISO 45001, and other management system certifications.",
    slug: "management-system-certification"
  },
  {
    title: "Product Certifications",
    description: "CE Marking, E Mark, ISI Marking, BIS Certification, and more.",
    slug: "product-certifications"
  },
  {
    title: "Healthcare Organization Certification",
    description: "NABH, JCI, and other healthcare-specific certifications.",
    slug: "healthcare-organization-certification"
  },
  {
    title: "Organic, Food & Agriculture Certifications",
    description: "FSSAI, Organic, HACCP, and other food safety certifications.",
    slug: "organic-food-agriculture-certifications"
  },
  {
    title: "Compliance Certifications & Other",
    description: "ZED, Sedex, Green Campus, and other compliance certifications.",
    slug: "compliance-certifications-other"
  },
  {
    title: "Training & Development Services",
    description: "ISO Internal Auditor, Awareness & Competency, Fire & Safety training.",
    slug: "training-development-services"
  }
];

export const ServicesContent = () => {
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredServices(services);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = services.filter(
      service => 
        service.title.toLowerCase().includes(lowercaseQuery) || 
        service.description.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredServices(filtered);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Services</h1>
      
      <ServiceSearch 
        onSearch={handleSearch} 
        placeholder="Search for services..." 
        className="mb-10"
      />
      
      {filteredServices.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">No services found matching your search.</p>
          <button 
            onClick={() => handleSearch("")}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            View all services
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer block"
            >
              <h2 className="text-xl font-semibold mb-4">{service.title}</h2>
              <p className="text-gray-700">{service.description}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};