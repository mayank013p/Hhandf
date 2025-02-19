"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CertificationDetails {
  id: string;
  title: string;
  description: string;
  details: string;
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const [certificationDetails, setCertificationDetails] = useState<CertificationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    const fetchCertificationDetails = async () => {
      try {
        const response = await fetch(`https://hhandb.onrender.com/certifications/details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: params.id }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch certification details. Status: ${response.status}`);
        }

        const data = await response.json();
        setCertificationDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setCertificationDetails({
          id: 'fallback',
          title: 'Service Unavailable',
          description: 'The certification service is currently unavailable',
          details: 'Please try again later or contact support if the issue persists'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCertificationDetails();
  }, [params.id]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          certification: certificationDetails?.title
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      alert('Application submitted successfully!');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (err) {
      alert('Error submitting application. Please try again.');
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="fixed top-0 left-0 p-4 z-50">
        <Link href="/services" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          ← Back to Services
        </Link>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-10"></div>
        <div className="container mx-auto px-4 py-20 mt-16 max-w-6xl relative">
        {loading && (
          <div className="p-6 border rounded-lg bg-white shadow-sm animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="p-6 border rounded-lg bg-red-50 border-red-200 shadow-sm">
            <p className="text-red-600 font-medium">Error: {error}</p>
          </div>
        )}

        {certificationDetails && !loading && (
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">{certificationDetails.title}</h1>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">{certificationDetails.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Certified Quality</h3>
                      <p className="text-gray-600">Our certifications are recognized industry-wide</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Fast Processing</h3>
                      <p className="text-gray-600">Quick turnaround times for certification</p>
                    </div>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Certification Details</h2>
                  {certificationDetails.details}
                </div>
              </div>
            </div>

            <div className="mt-12 p-10 bg-white rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Apply for {certificationDetails.title}</h2>
              <form onSubmit={handleFormSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    rows={5}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
                  >
                    Submit Application
                  </button>
                  <p className="text-sm text-gray-500 ml-4">
                      We&apos;ll get back to you within 24 hours
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      </div>
      <div className="bg-black py-12 mt-20">
        <div className="container mx-auto px-4">
          <p className="text-center text-white text-sm">
            © 2023 Certification Services. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
