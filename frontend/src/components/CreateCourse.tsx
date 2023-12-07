import Breadcrumb from "./Breadcrumb";
import Loader from "../common/Loader";
import { useState } from "react";
import { useCreateCourseMutation } from "../slices/coursesApiSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCoursesData } from "../slices/courseSlice";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createCourse, { isLoading }]: any = useCreateCourseMutation();

  const handleCourseCreation = async (e: any) => {
    e.preventDefault();

    if (!courseData.title || !courseData.description) {
      toast.error(
        "Title and Description are required please fill the fields accordingly",
      );
      return;
    }

    try {
      const response = await createCourse(courseData).unwrap();
      console.log(response);
      dispatch(setCoursesData(response));
      setCourseData({
        title: "",
        description: "",
      });
      toast.success("Course has been created successfully");
      navigate("/courses");
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };

  const handleChange = (e: any) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Breadcrumb pageName="Create Course" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Course Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-row items-center justify-between border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create course
              </h3>
            </div>
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <form onSubmit={handleCourseCreation}>
                  <div className="p-6.5">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Title <span className="text-meta-1">*</span>
                      </label>
                      <input
                        name={"title"}
                        type="text"
                        value={courseData.title}
                        onChange={handleChange}
                        placeholder="Course title"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Description <span className="text-meta-1">*</span>
                      </label>
                      <textarea
                        name={"description"}
                        value={courseData.description}
                        onChange={handleChange}
                        placeholder="Course description"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    {/*<div className="mb-4.5">*/}
                    {/*  <label className="mb-2.5 block text-black dark:text-white">*/}
                    {/*    Role <span className="text-meta-1">*</span>*/}
                    {/*  </label>*/}
                    {/*  <div className="relative z-20 bg-transparent dark:bg-form-input">*/}
                    {/*    <select*/}
                    {/*      value={''}*/}
                    {/*      onChange={(e) => (e.target.value)}*/}
                    {/*      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"*/}
                    {/*    >*/}
                    {/*      <option>Select Role</option>*/}
                    {/*      <option>Teacher</option>*/}
                    {/*    </select>*/}
                    {/*    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">*/}
                    {/*      <svg*/}
                    {/*        className="fill-current"*/}
                    {/*        width="24"*/}
                    {/*        height="24"*/}
                    {/*        viewBox="0 0 24 24"*/}
                    {/*        fill="none"*/}
                    {/*        xmlns="http://www.w3.org/2000/svg"*/}
                    {/*      >*/}
                    {/*        <g opacity="0.8">*/}
                    {/*          <path*/}
                    {/*            fillRule="evenodd"*/}
                    {/*            clipRule="evenodd"*/}
                    {/*            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"*/}
                    {/*            fill=""*/}
                    {/*          ></path>*/}
                    {/*        </g>*/}
                    {/*      </svg>*/}
                    {/*    </span>*/}
                    {/*  </div>*/}
                    {/*</div>*/}

                    <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                      Create Course
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

export default CreateCourse;
