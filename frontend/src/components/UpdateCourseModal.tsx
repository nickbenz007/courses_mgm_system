import { useState } from "react";
import { useUpdateCourseMutation } from "../slices/coursesApiSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCoursesData, updateCoursesData } from "../slices/courseSlice";

const UpdateCourseModal = ({ closeUpdateCourseModal, selectedCourse }: any) => {
  const [updateFormData, setUpdateFormData] = useState({
    title: selectedCourse?.title || "",
    description: selectedCourse?.description || "",
  });

  const [updateCourse] = useUpdateCourseMutation();
  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateCourse = async (e: any) => {
    e.preventDefault();
    if (!selectedCourse?._id) {
      toast.error("Invalid user ID");
      return;
    }
    try {
      const response = await updateCourse({
        courseId: selectedCourse?._id,
        data: updateFormData,
      });
      dispatch(setCoursesData(response));
      dispatch(updateCoursesData(response));
      toast.success("Course updated successfully", { duration: 5000 });
      closeUpdateCourseModal(false);
    } catch (err: any) {
      console.log(err);
      toast.error("Course could not updated. Please try again");
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-9998 bg-meta-4 bg-opacity-50 flex items-center justify-center">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white dark:bg-boxdark-2 rounded-lg shadow dark:bg-gray-700 p-4.5">
            <div className={"flex w-full items-center justify-between"}>
              <button
                onClick={() => closeUpdateCourseModal(false)}
                className={
                  "h-8 w-8 rounded-full items-center justify-center bg-whiten hover:bg-danger text-gray-1 font-bold dark:hover:text-gray-3 hover:text-gray-3"
                }
              >
                X
              </button>
              <h2 className={"text-gray-1 font-bold text-xl"}>Update Course</h2>
            </div>
            <form>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Title <span className="text-meta-1">*</span>
                  </label>
                  <input
                    value={updateFormData.title}
                    name={"title"}
                    type="text"
                    onChange={handleInputChange}
                    placeholder="Update title"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Description <span className="text-meta-1">*</span>
                  </label>
                  <textarea
                    value={updateFormData.description}
                    name={"description"}
                    onChange={handleInputChange}
                    placeholder="Update description"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <button
                  onClick={handleUpdateCourse}
                  className="flex w-full justify-center rounded bg-success p-3 font-medium text-gray"
                >
                  Update Course
                </button>
              </div>
            </form>
            <div className={"flex w-full items-center justify-center"}>
              <button
                onClick={() => closeUpdateCourseModal(false)}
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

export default UpdateCourseModal;
