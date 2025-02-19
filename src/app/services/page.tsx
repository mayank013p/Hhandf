"use client";
import Footer from "../../sections/Footer";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CertificationDetails {
  id: string;
  title: string;
  description: string;
  details: string;
}

const certifications = [
  {
    category: "Quality Management",
    icon: "🏭",
    hoverEffect: "hover:scale-105 hover:shadow-lg hover:bg-gray-50",
    items: [
      {
        code: "ISO 9001",
        title: "Quality Management System",
        description: "Improve efficiency and customer satisfaction",
      },
      {
        code: "ISO 13485",
        title: "Medical Devices Quality Management",
        description: "Ensure quality in medical device manufacturing",
      },
      {
        code: "ISO 45001",
        title: "Occupational Health and Safety Management",
        description: "Ensure workplace safety and health standards",
      },
      {
        code: "ISO 22000",
        title: "Food Safety Management",
        description: "Manage food safety risks in the supply chain",
      }
    ]
  },
  {
    category: "Environmental Management",
    icon: "🌿",
    hoverEffect: "hover:bg-green-50 hover:border-green-200",
    items: [
      {
        code: "ISO 14001",
        title: "Environmental Management System",
        description: "Reduce environmental impact",
      },
      {
        code: "ISO 50001",
        title: "Energy Management System",
        description: "Improve energy performance and efficiency",
      }
    ]
  },
  {
    category: "Information Security",
    icon: "🔒",
    hoverEffect: "hover:bg-blue-50 hover:border-blue-200",
    items: [
      {
        code: "ISO 27001",
        title: "Information Security Management",
        description: "Protect sensitive information",
      }
    ]
  },
  {
    category: "Information Technology",
    icon: "💻",
    hoverEffect: "hover:bg-purple-50 hover:border-purple-200",
    items: [
      {
        code: "ISO 20000",
        title: "IT Service Management",
        description: "Deliver effective IT services",
      },
      {
        code: "ISO 22301",
        title: "Business Continuity Management",
        description: "Ensure business continuity during disruptions",
      }
    ]
  },
  {
    category: "Risk Management",
    icon: "📊",
    hoverEffect: "hover:bg-orange-50 hover:border-orange-200",
    items: [
      {
        code: "ISO 31000",
        title: "Risk Management Guidelines",
        description: "Manage organizational risks effectively",
      },
      {
        code: "ISO 14971",
        title: "Medical Device Risk Management",
        description: "Manage risks in medical device development",
      },
      {
        code: "ISO 45005",
        title: "Occupational Health and Safety Risk Management",
        description: "Manage workplace health and safety risks",
      }
    ]
  }
];

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const filteredCertifications = certifications
    .filter(category =>
      selectedCategory ? category.category === selectedCategory : true
    )
    .map(category => ({
      ...category,
      items: category.items.filter(item =>
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(category => category.items.length > 0);

  const handleCertificationClick = (id: string) => {
    if (!id || typeof id !== 'string') {
      setError('Invalid certification ID');
      return;
    }

    // Normalize the ID to match the backend format
    const normalizedId = id.toLowerCase().replace(" ", "-");
    router.push(`/services/${normalizedId}`);
  };

  return (
    <main className="min-h-screen">
      <div className="fixed top-0 left-0 p-4 z-50">
        <Link href="/" className="bg-black text-white px-4 py-2 rounded-lg">
          ← Back
        </Link>
      </div>

      <div className="container mx-auto px-4 py-20 mt-16 animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-black to-black bg-clip-text text-transparent">
          Professional Certification Services
        </h1>

        <div className="mb-8 space-y-4 max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search certifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === ""
                  ? "bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {[...new Set(certifications.map((c) => c.category))].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {filteredCertifications.map((category) => (
            <section key={category.category} className="w-full">
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-50 to-white flex items-center justify-center shadow-sm">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((certification) => (
                  <div
                    key={certification.code}
                    className={`group min-w-[280px] p-6 rounded-xl border border-gray-100 bg-white transition-all duration-300 hover:shadow-lg hover:border-transparent hover:-translate-y-1`}
                  >
                    <button
                      onClick={() => handleCertificationClick(certification.code.toLowerCase())}
                      className="w-full text-left"
                      disabled={loading}
                      aria-label={`View details for ${certification.code} - ${certification.title}`}
                    >
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-blue-50 to-white flex items-center justify-center shadow-sm">
                          <span className="text-2xl">{category.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {certification.code} - {certification.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {certification.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {loading && (
          <div className="mt-8 p-4 border rounded-lg">
            <p>Loading certification details...</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-4 border rounded-lg bg-red-50 border-red-200">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}
      </div>
        <div className="bg-gradient-to-r from-gray-900 to-black py-8 mt-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-white/90">
            © 2023 Certification Services. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
