import { useState } from "react";
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCredential, updateUserData } from "../slices/authSlice";

const UpdateUserModal = ({ closeUpdateModal, selectedUser }: any) => {
  const [formData, setFormData] = useState({
    name: selectedUser?.name || "",
    email: selectedUser?.email || "",
    password: selectedUser?.password || "",
    role: selectedUser?.role || "",
  });

  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    if (!selectedUser?._id) {
      toast.error("Invalid user ID");
      return;
    }
    try {
      const response: any = await updateUser({
        userId: selectedUser?._id,
        data: formData,
      });
      dispatch(setCredential(response?.data));
      dispatch(updateUserData(response?.data));
      toast.success("User updated successfully", { duration: 5000 });
      closeUpdateModal(false);
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-9998 bg-meta-4 bg-opacity-50 flex items-center justify-center">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white dark:bg-boxdark-2 rounded-lg shadow dark:bg-gray-700 p-4.5">
            <div className={"flex w-full items-center justify-between"}>
              <button
                onClick={() => closeUpdateModal(false)}
                className={
                  "h-8 w-8 rounded-full items-center justify-center bg-whiten hover:bg-danger text-gray-1 font-bold dark:hover:text-gray-3 hover:text-gray-3"
                }
              >
                X
              </button>
              <h2 className={"text-gray-1 font-bold text-xl"}>Update User</h2>
            </div>
            <form>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Name <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name={"name"}
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Email <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name={"email"}
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password <span className="text-meta-1">*</span>
                  </label>
                  <input
                    name={"password"}
                    type="text"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Role <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      name={"role"}
                      value={formData.role}
                      onChange={handleInputChange}
                      className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option>Select Role</option>
                      <option>Teacher</option>
                      <option>Student</option>
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

                <button
                  onClick={handleUpdateUser}
                  className="flex w-full justify-center rounded bg-success p-3 font-medium text-gray"
                >
                  Update
                </button>
              </div>
            </form>
            <div className={"flex w-full items-center justify-center"}>
              <button
                onClick={() => closeUpdateModal(false)}
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

export default UpdateUserModal;
