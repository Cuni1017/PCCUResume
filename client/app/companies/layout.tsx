import Footer from "../components/Footer/Footer";

const CompaniesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="md:max-w-[860px] lg:max-w-[1140px] m-auto">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default CompaniesLayout;
