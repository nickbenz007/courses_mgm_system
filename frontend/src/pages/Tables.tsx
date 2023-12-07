import Breadcrumb from "../components/Breadcrumb";
import TableOne from "../components/TableOne";
import TableTwo from "../components/TableTwo";
import TableThree from "../components/TableThree";

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Tables;
