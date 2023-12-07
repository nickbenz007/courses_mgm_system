const ViewCourseModal = ({ closeViewCourseModal, selectedCourse }: any) => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-9998 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white dark:bg-boxdark-2 rounded-lg shadow dark:bg-gray-700 p-4.5">
            <div className={"flex w-full items-center justify-between"}>
              <button
                onClick={() => closeViewCourseModal(false)}
                className={
                  "px-3 py-1 rounded-full items-center justify-center bg-whiten hover:bg-danger text-gray-1 font-bold dark:hover:text-gray-3 hover:text-gray-3"
                }
              >
                X
              </button>
              <h2 className={"text-gray-1 font-bold text-xl"}>View Course</h2>
            </div>

            <div
              className={
                "flex flex-col bg-gray-1 items-center justify-center my-4"
              }
            >
              <span className={"text-lg font-normal text-gray-1 py-2"}>
                Title: {selectedCourse ? selectedCourse.title : "Title"}
              </span>
              <span className={"text-lg font-normal text-gray-1 py-2"}>
                Description:{" "}
                {selectedCourse ? selectedCourse.description : "Description"}
              </span>
            </div>
            <div className={"flex w-full items-center justify-center"}>
              <button
                onClick={() => closeViewCourseModal(false)}
                className={
                  "px-4 py-3 mx-1 my-4 rounded-lg items-center justify-center bg-whiten hover:bg-danger text-meta-4 font-bold dark:hover:text-gray-3 hover:text-gray-3"
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCourseModal;
