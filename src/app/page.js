import Banner from "@/components/Banner";
import ContactUs from "@/components/ContactUs";
import FeaturedSection from "@/components/Featured";
import RecentBloodRequests from "@/components/RecentBloodRequest";
import Stats from "@/components/Stats";


export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <Stats></Stats>
      <RecentBloodRequests></RecentBloodRequests>
      <FeaturedSection></FeaturedSection>
      
      <ContactUs></ContactUs>
    </div>
  );
}
