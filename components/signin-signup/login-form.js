import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import Loading from "../ui/loading";

async function createUser(email, password) {
  const response = await fetch("/api/authSignup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();

  if (!response.ok)
    throw new Error(data.message || "error in creating account");
  return data;
}

function SigninSignupForm({ mode }) {
  const router = useRouter();
  const refEmail = useRef();
  const refPassword = useRef();
  // console.log(useSession());

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "authenticated") return null;

  async function submitHandler(e) {
    e.preventDefault();
    const email = refEmail.current.value;
    const password = refPassword.current.value;
    if (mode === "signup") {
      try {
        const data = await createUser(email, password);
        console.log(data);
        toast.success(data.message);
        router.push("/");
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    } else {
      //if mode=login

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      // console.log(result);

      if (!result.ok) {
        toast.error(result.error);
      } else {
        toast.success("welcome");
        router.replace("/");
      }
    }
  }
  return (
    <div className="w-full py-15 px-2 ">
      <form
        onSubmit={submitHandler}
        className="w-full md:max-w-lg mx-auto p-6 rounded-2xl bg-amber-100 dark:bg-mauve-700 shadow-xl"
      >
        <p className="text-center text-3xl font-serif font-bold dark:text-amber-300">
          {mode === "signup" ? "SignUp Form" : "Login Form"}
        </p>
        <div className="space-y-6 pt-5 pb-2">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 "
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              // type="email"
              ref={refEmail}
              required
              className="w-full px-2 py-0.5 rounded-lg dark:text-white focus:outline-none ring-1 ring-amber-300 focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 "
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              ref={refPassword}
              required
              className="w-full px-2 py-0.5 dark:text-white rounded-lg focus:outline-none ring-1 ring-amber-300 focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            type="submit"
            className="font-semibold bg-amber-600 text-amber-50 hover:bg-amber-800 py-2 cursor-pointer rounded-xl w-full transition"
          >
            {mode === "signup" ? "register account" : "login"}
          </button>
        </div>
        <div className="text-center dark:text-gray-300">
          {mode === "signin" && (
            <Link href="?mode=signup">
              Don't have account? click here for create new account.
            </Link>
          )}
          {mode === "signup" && (
            <Link href="?mode=signin">
              Do you have account? click here for login.
            </Link>
          )}
        </div>
      </form>
    </div>
  );
}

export default SigninSignupForm;
