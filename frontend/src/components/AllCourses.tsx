import { useGetCoursesQuery } from "../slices/coursesApiSlice";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
// import toast from "react-hot-toast";
import UpdateCourseModal from "./UpdateCourseModal";
import ViewCourseModal from "./ViewCourseModal";
import DeleteCourseModal from "./DeleteCourseModal";

const AllCourses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [updateCourseModal, setUpdateCourseModal] = useState<boolean>(false);
  const [viewCourseModal, setViewCourseModal] = useState<boolean>(false);
  const [deleteCourseModal, setDeleteCourseModal] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const { data: getCourses, isLoading }: any = useGetCoursesQuery(coursesData);
  const handleUpdateClick = (course: any) => {
    setSelectedCourse(course);
    setUpdateCourseModal(true);
  };
  const handleViewClick = (course: any) => {
    setSelectedCourse(course);
    setViewCourseModal(true);
  };
  const handleDeleteClick = (course: any) => {
    setSelectedCourse(course);
    setDeleteCourseModal(true);
  };

  useEffect(() => {
    setCoursesData(getCourses);
  }, [getCourses]);

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Courses
        </h4>
        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 lg:grid-cols-4 sm:grid-cols-6">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-medium text-gray-1 dark:text-gray-3 font-bold capitalize tracking-wider xsm:text-base">
                S.No
              </h5>
            </div>
            <div className="p-2.5 xl:p-5">
              <h5 className="text-medium text-gray-1 dark:text-gray-3 font-bold capitalize tracking-wider xsm:text-base">
                Course Title
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-medium text-gray-1 dark:text-gray-3 font-bold capitalize tracking-wider xsm:text-base">
                Course Description
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-medium text-gray-1 dark:text-gray-3 font-bold capitalize tracking-wider xsm:text-base">
                Actions
              </h5>
            </div>
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {coursesData?.map((course: any, index: any) => {
                return (
                  <div key={index}>
                    <div className="grid grid-cols-3 transition delay-25 delay-25 border-b border-stroke dark:border-strokedark lg:grid-cols-4 sm:grid-cols-5">
                      <div className="flex items-center gap-3 p-2.5 xl:p-5">
                        <p className="hidden text-black dark:text-white sm:block">
                          {index + 1}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-2.5 xl:p-5">
                        <p className="hidden text-black dark:text-white sm:block">
                          {course?.title ? course?.title : "Course Title"}
                        </p>
                      </div>
                      <div className="flex items-center justify-start p-2.5 xl:p-5">
                        <p className="text-black dark:text-white">
                          {course?.description
                            ? course?.description
                            : "Course Description"}
                        </p>
                      </div>
                      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                        <button
                          onClick={() => handleUpdateClick(course)}
                          className={
                            "flex flex-row hover:bg-meta-2 dark:hover:bg-meta-4 rounded-lg px-2 py-2 mx-1"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-edit"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#09CEF1"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                            <path d="M16 5l3 3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleViewClick(course)}
                          className={
                            "flex flex-row hover:bg-meta-2 dark:hover:bg-meta-4 rounded-lg px-2 py-2 mx-1"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-eye-check"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#CECEFF"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                            <path d="M11.102 17.957c-3.204 -.307 -5.904 -2.294 -8.102 -5.957c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6a19.5 19.5 0 0 1 -.663 1.032" />
                            <path d="M15 19l2 2l4 -4" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(course)}
                          className={
                            "flex flex-row hover:bg-meta-1 rounded-lg px-2 py-2 mx-1"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-trash"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#CCC012"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 7l16 0" />
                            <path d="M10 11l0 6" />
                            <path d="M14 11l0 6" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
        {updateCourseModal && (
          <UpdateCourseModal
            selectedCourse={selectedCourse}
            closeUpdateCourseModal={setUpdateCourseModal}
          />
        )}
        {viewCourseModal && (
          <ViewCourseModal
            selectedCourse={selectedCourse}
            closeViewCourseModal={setViewCourseModal}
          />
        )}
        {deleteCourseModal && (
          <DeleteCourseModal
            selectedCourse={selectedCourse}
            setDeleteCourseModal={setDeleteCourseModal}
          />
        )}
      </div>
    </>
  );
};

export default AllCourses;
