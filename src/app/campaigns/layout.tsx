import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="pt-18 bg-gray-50 p-0 m-0">
        {children}
      </div>
      <Footer />
    </>
  );
}