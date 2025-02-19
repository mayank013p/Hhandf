"use client";

interface ServiceHeroProps {
  title: string;
  description: string;
}

export default function ServiceHero({ title, description }: ServiceHeroProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
      <div className="space-y-8">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight">
          {title}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {description}
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all">
            Get Certified Now
          </button>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium border border-blue-600 hover:bg-blue-50 transition-all">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
