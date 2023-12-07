import AllUsers from "../../components/AllUsers";

const MainLayout = () => {
  return (
    <>
      <div className="mt-4 grid grid-cols-12 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          <AllUsers />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
