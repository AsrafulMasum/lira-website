import { Footer } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import CustomProvider from "@/lib/CustomProvider";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <CustomProvider>{children}</CustomProvider>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
