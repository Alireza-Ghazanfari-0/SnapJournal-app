import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Loading from "../ui/loading";
import toast from "react-hot-toast";

function ChangePass() {
  const { status } = useSession();
  const router = useRouter();
  // const data2 = getSession();
  // console.log(data2);
  // console.log(status);

  useEffect(() => {
    if (status === "unauthenticated") {
      // window.location.href("/");
      // console.log(status);

      router.push("/authentication");
    }
  }, [status, router]);

  if (status === "loading") {
    // console.log(status);

    return <Loading />;
  }
  if (status === "unauthenticated") return null;

  async function passwordChangeHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPass");
    const newPassword = formData.get("newPass");
    // console.log(currentPassword, newPassword);
    try {
      const response = await fetch("/api/changePassword", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      // console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "error in changing password");
      }
      toast.success(data.message || " successfully");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
      // console.log(error.message);
    }
  }

  return (
    <div className="w-full bg-gray-100 dark:bg-stone-600 py-10 px-4">
      <form
        onSubmit={passwordChangeHandler}
        className="bg-amber-50 dark:bg-stone-400 w-full max-w-lg mx-auto rounded-xl shadow-lg p-6 md:p-8 transition-all duration-300"
      >
        <p className="text-center text-2xl md:text-3xl font-bold text-pink-800 font-sans">
          Do You Want Change Your Password?
        </p>

        <div className="flex flex-col gap-y-6 mt-6">
          <div className="flex flex-col gap-4">
            <div className="">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your Current Password
              </label>
              <input
                type="password"
                name="currentPass"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
            </div>

            <div className="">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Your New Password
              </label>
              <input
                type="password"
                name="newPass"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-pink-600 dark:bg-pink-800 hover:bg-pink-700 hover:dark:dark:bg-pink-900 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Apply Change
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
