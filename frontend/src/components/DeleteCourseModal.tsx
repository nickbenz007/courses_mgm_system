import { useDeleteCourseMutation } from "../slices/coursesApiSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCoursesData } from "../slices/courseSlice";

const DeleteCourseModal = ({ setDeleteCourseModal, selectedCourse }: any) => {
  const [deleteCourse] = useDeleteCourseMutation();
  const dispatch = useDispatch();

  const handleDeleteCourse = async () => {
    try {
      const response = await deleteCourse(selectedCourse?._id);
      dispatch(setCoursesData(response));
      toast.success("Course has been deleted successfully");
      setDeleteCourseModal(false);
    } catch (error: any) {
      toast.error("Error deleting course:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-9998 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white dark:bg-boxdark-2 rounded-lg shadow dark:bg-gray-700 p-4.5">
          <div className={"flex w-full items-center justify-between"}>
            <button
              onClick={() => setDeleteCourseModal(false)}
              className={
                "h-8 w-8 rounded-full items-center justify-center bg-whiten hover:bg-danger text-gray-1 font-bold dark:hover:text-gray-3 hover:text-gray-3"
              }
            >
              X
            </button>
            <h2 className={"text-gray-1 font-bold text-xl"}>Delete Course</h2>
          </div>
          <p className={"text-lg font-medium text"}>
            Are you sure you want to delete this Course?
          </p>
          <div className={"flex w-full items-center justify-center"}>
            <button
              onClick={() => setDeleteCourseModal(false)}
              className={
                "px-4 py-3 mx-1 my-4 rounded-lg items-center justify-center bg-whiten hover:bg-danger text-meta-4 font-bold dark:hover:text-gray-3 hover:text-gray-3"
              }
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCourse}
              className={
                "px-4 py-3 mx-1 my-4 rounded-lg items-center justify-center bg-whiten hover:bg-danger text-meta-4 font-bold dark:hover:text-gray-3 hover:text-gray-3"
              }
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourseModal;
