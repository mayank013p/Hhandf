import { Header } from "@/sections/Header";
import Footer from "@/sections/Footer";
import { ServicesContent } from "@/components/ServicesContent";
import { ServiceSearch } from "@/components/ServiceSearch";
import { useState } from "react";

export default function ServicesPage() {
  // const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    // setSearchQuery(query);
    // Implement search filtering logic if needed
  };

  return (
    <>
      <Header />
      {/* <ServiceSearch onSearch={handleSearch} /> */}
      <ServicesContent />
      <Footer />
    </>
  );
}
