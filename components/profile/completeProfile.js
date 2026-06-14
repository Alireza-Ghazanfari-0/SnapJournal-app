// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../ui/loading";

function CompleteProfile() {
  // used server side gaurd in parant component
  //------
  const router = useRouter();
  // const { data: session } = useSession();
  const [receivedData, setReceivedData] = useState();
  const [gender, setGender] = useState();
  const [isloading, setIsloading] = useState(true);

  useEffect(() => {
    async function fetchInfo() {
      try {
        setIsloading(true);
        // console.log(isloading);

        const response = await fetch("/api/completeProfile", { method: "GET" });
        // console.log(response);

        const receivedInfoData = await response.json();

        if (!response.ok) {
          throw new Error(receivedData.message || "data do not received-error");
        }
        // console.log("aaAA");
        setReceivedData(receivedInfoData);

        // console.log(receivedInfoData?.message);

        // toast.success(
        //   receivedInfoData?.message || "data received successfully",
        // );
      } catch (error) {
        // console.error(error);
        toast.error(error.message);
      } finally {
        setIsloading(false);
      }
    }
    fetchInfo();
  }, []);

  if (isloading || !receivedData) {
    return <Loading />;
  }
  // console.log(receivedData);
  async function profileCompletionHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const lastname = formData.get("lastname");
    const phoneNumber = formData.get("phoneNumber");
    const gender = formData.get("gender");
    const age = formData.get("age");
    const nationality = formData.get("nationality");

    try {
      const response = await fetch("/api/completeProfile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastname,
          phoneNumber,
          gender,
          age,
          nationality,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "error in edit information");
      }
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="w-full px-3 ">
      <form
        onSubmit={profileCompletionHandler}
        className="pt-7 mx-auto md:max-w-md"
      >
        <p className="  text-center text-2xl font-bold font-serif text-mauve-800 dark:text-mauve-300 ">
          My profile information
        </p>
        <div className="p-4 mt-5 space-y-3.5 w-full mx-auto">
          <div className="flex items-center w-full gap-x-3">
            <label className="w-[25%] text-end text-sm text-gray-700 dark:text-gray-200">
              First name:
            </label>
            <input
              name="name"
              defaultValue={receivedData.data.firstname}
              className="w-[75%] border border-gray-300 rounded bg-white dark:bg-mauve-400  px-4 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex items-center w-full gap-x-3">
            <label className="w-[25%] text-end text-sm text-gray-700 dark:text-gray-200">
              Last name:
            </label>
            <input
              name="lastname"
              defaultValue={receivedData.data.lastname}
              className="w-[75%] border border-gray-300 rounded bg-white dark:bg-mauve-400  px-4 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex items-center w-full gap-x-3">
            <label className="w-[25%] text-end text-sm text-gray-700 dark:text-gray-200">
              Email address:
            </label>
            <input
              disabled
              defaultValue={receivedData.data.email}
              className="w-[75%] border border-gray-300 rounded bg-white dark:bg-mauve-400  px-4 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex items-center w-full gap-x-3">
            <label className="w-[25%] text-end text-sm text-gray-700 dark:text-gray-200">
              Phone Number:
            </label>
            <input
              name="phoneNumber"
              defaultValue={receivedData.data.phoneNumber}
              type="tel"
              className="w-[75%] border border-gray-300 rounded bg-white dark:bg-mauve-400  px-4 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex items-center w-full gap-x-3">
            <label className="w-[25%] text-end text-sm text-gray-700 dark:text-gray-200">
              Gender:
            </label>
            <select
              name="gender"
              defaultValue={receivedData.data.gender}
              // value={receivedData.data.gender}
              // value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-[75%] border border-gray-300 rounded bg-white dark:bg-mauve-400  px-4 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            {/* <input className="w-[75%] border border-gray-300 rounded bg-white px-4 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition" /> */}
          </div>
          <div className="flex items-center w-full gap-x-3">
            <label className="w-[25%] text-end text-sm text-gray-700 dark:text-gray-200">
              Age:
            </label>
            <input
              name="age"
              defaultValue={receivedData.data.age}
              className="w-[75%] border border-gray-300 rounded bg-white dark:bg-mauve-400  px-4 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>
          <div className="flex items-center w-full gap-x-3">
            <label className="w-[25%] text-end text-sm text-gray-700 dark:text-gray-200">
              Nationality:
            </label>
            <input
              name="nationality"
              defaultValue={receivedData.data.nationality}
              className="w-[75%] border border-gray-300 rounded bg-white dark:bg-mauve-400  px-4 py-0.5 focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            className="w-[70%] ms-[15%] bg-cyan-600 hover:bg-cyan-700 transition text-blue-50 font-semibold mt-2 py-1 cursor-pointer rounded-lg"
          >
            Apply edits
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompleteProfile;
