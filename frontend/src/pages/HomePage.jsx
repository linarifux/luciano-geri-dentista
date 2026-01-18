import { motion } from "framer-motion";
import Hero from "../components/home/Hero";
import ServicesGrid from "../components/home/ServicesGrid";
import InfoSection from "../components/home/InfoSection";
import BookingForm from "../components/home/BookingForm"; // Import the new form
import ReviewSection from "../components/home/ReviewSection";
import Timeline from "../components/home/Timeline";
import FounderSection from "../components/home/FounderSection";
import CaseStudies from "../components/home/CaseStudies";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <InfoSection />
      <ServicesGrid />
      <CaseStudies />
      <FounderSection />
      <Timeline />
      <ReviewSection />
      
    </motion.div>
  );
};

export default HomePage;
