import NavigationBar from "./components/NavigationBar";

const RestaurantLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <div className="max-w-[600px] md:max-w-none md:w-full mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="w-full md:w-[30%]">
            <NavigationBar />
          </div>
          <div className="w-full md:w-[68%]">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default RestaurantLayout;
