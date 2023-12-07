import { useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import {
  useGetCoursesQuery,
  useAssignCourseMutation,
} from "../slices/coursesApiSlice";
import { useGetTeachersQuery } from "../slices/teachersApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../common/Loader";
import { assignCourseToTeacher } from "../slices/courseSlice";

const AssignCourse = () => {
  const [assignCourseFormData, setAssignCourseFormData] = useState({
    courseId: "",
    teacherId: "",
  });

  const { data: getTeachers }: any = useGetTeachersQuery();
  const { data: getCourses }: any = useGetCoursesQuery();
  const [assignCourse, { isLoading }] = useAssignCourseMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAssignCourse = async (e: any) => {
    e.preventDefault();
    if (!assignCourseFormData.courseId || !assignCourseFormData.teacherId) {
      toast.error("No data selected please select the Course and Teacher");
      return;
    }

    try {
      const response: any = await assignCourse(assignCourseFormData).unwrap();
      console.log(response);
      dispatch(assignCourseToTeacher(response));
      toast.success("Course has been assigned successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Error occurred while Assigning Course to the Teacher", err);
    }
  };

  const handleInputChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    setAssignCourseFormData({
      ...assignCourseFormData,
      [name]: value,
    });
  };

  return (
    <>
      <Breadcrumb pageName="Assign Course" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex sm:flex-col gap-9">
          {/* <!-- Teachers & Courses Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Assign courses to the Teacher
              </h3>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <form onSubmit={handleAssignCourse}>
                  <div className="p-6.5">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Course <span className="text-meta-1">*</span>
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          name={"courseId"}
                          value={assignCourseFormData.courseId}
                          onChange={handleInputChange}
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option>Select Course</option>
                          {getCourses?.map((course: any, index: any) => {
                            return (
                              <option key={index} value={course.id}>
                                {course?.title ? course?.title : "Course title"}
                              </option>
                            );
                          })}
                        </select>
                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Teacher <span className="text-meta-1">*</span>
                      </label>
                      <div className="relative z-20 bg-transparent dark:bg-form-input">
                        <select
                          name={"teacherId"}
                          value={assignCourseFormData.teacherId}
                          onChange={handleInputChange}
                          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        >
                          <option>Select Teachers</option>
                          {getTeachers?.teachers?.map(
                            (teacher: any, index: any) => {
                              return (
                                <option key={index} value={teacher.id}>
                                  {teacher?.name
                                    ? teacher?.name
                                    : "Teacher name"}
                                </option>
                              );
                            },
                          )}
                        </select>
                        <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                          <svg
                            className="fill-current"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                fill=""
                              ></path>
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                      Assign Course & Submit
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignCourse;
