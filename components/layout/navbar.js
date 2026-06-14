import Link from "next/link";
import Logo from "./logo";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useDarkMode } from "../darkMode/darkModeContext";

function Navbar() {
  const { theme, setTheme } = useDarkMode();
  const [openMenu, setOpenMenu] = useState(false);
  const { data: session, status } = useSession();
  // const router = useRouter();
  // console.log(session);
  // console.log(status);

  function darkModeHandler() {
    theme === "light" ? setTheme("dark") : setTheme("light");
  }

  function menuOpening() {
    setOpenMenu((item) => !item);
    // console.log(openMenu);
  }

  function logout() {
    // router.replace("/");
    signOut();
  }
  return (
    <div>
      <div className="flex w-full h-16 p-4 sticky top-0 bg-neutral-700 text-mist-300 justify-between items-center ">
        <Link href="/" className="flex items-center w-3/8">
          <Logo />
        </Link>

        <ul className="lg:flex hidden md:w-full justify-end gap-4 md:gap-10 lg:gap-7 xl:gap-15 items-center">
          <li className="hover:text-pink-300 cursor-pointer transition">
            <Link href="/posts">Posts</Link>
          </li>
          <li className="hover:text-pink-300 cursor-pointer transition">
            <Link href="/upload-post"> Upload post</Link>
          </li>
          <li className="hover:text-pink-300 cursor-pointer transition">
            <Link href="/contact-us">Contact us</Link>
          </li>
          {session && (
            <li className="hover:text-pink-300 cursor-pointer transition">
              <Link href="/profile">Complete profile</Link>
            </li>
          )}
          {session && (
            <li className="hover:text-pink-300 cursor-pointer transition">
              <Link href="/change-password">Change password</Link>
            </li>
          )}
          {!session && (
            <li className="hover:text-pink-300 cursor-pointer transition">
              <Link href="/authentication">Signin / Signup</Link>
            </li>
          )}
        </ul>
        <div className="flex w-1/2 md:w-3/8 justify-end gap-3 ">
          {session && (
            <div className=" px-2 hidden xl:inline text-purple-100 bg-red-900 rounded font-semibold ">
              {`Hi ${session.user.name || "User"}`}
            </div>
          )}
          {session && (
            <div>
              <button
                className="cursor-pointer hidden lg:inline transition hover:text-pink-400"
                onClick={logout}
              >
                signout
              </button>
            </div>
          )}
          <button
            onClick={menuOpening}
            className="lg:hidden cursor-pointer hover:text-red-300"
          >
            Menu
          </button>
          <button
            onClick={() => darkModeHandler()}
            className="bg-gray-200 rounded px-2 text-blue-900 cursor-pointer"
          >
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
      {openMenu && (
        <div className="bg-neutral-600 p-4 lg:hidden">
          <ul className="flex flex-col gap-y-3 text-white">
            <div className="flex justify-between">
              {session && (
                <span className="bg-red-200 text-gray-700 rounded py-1 px-2">
                  {`hi ${session.user.name || session.user.email}`}
                </span>
              )}

              <button
                onClick={menuOpening}
                className="text-red-500 text-right cursor-pointer"
              >
                close
              </button>
            </div>

            <Link
              href="/posts"
              onClick={menuOpening}
              className="hover:bg-gray-500 rounded-xl p-1 hover:ps-8 cursor-pointer transition"
            >
              Posts
            </Link>

            <Link
              href="/upload-post"
              onClick={menuOpening}
              className="hover:bg-gray-500 rounded-xl p-1 hover:ps-8 cursor-pointer transition"
            >
              {" "}
              Upload post
            </Link>

            <Link
              href="/contact-us"
              onClick={menuOpening}
              className="hover:bg-gray-500 rounded-xl p-1 hover:ps-8 cursor-pointer transition"
            >
              {" "}
              Contact us
            </Link>

            {session && (
              <Link
                href="/profile"
                onClick={menuOpening}
                className="hover:bg-gray-500 rounded-xl p-1 hover:ps-8 cursor-pointer transition"
              >
                Complete profile
              </Link>
            )}
            {session && (
              <Link
                href="/change-password"
                onClick={menuOpening}
                className="hover:bg-gray-500 rounded-xl p-1 hover:ps-8 cursor-pointer transition"
              >
                Change password
              </Link>
            )}
            {!session && (
              <Link
                href="/authentication"
                onClick={menuOpening}
                className="hover:bg-gray-500 rounded-xl p-1 hover:ps-8 cursor-pointer transition"
              >
                Signin / Signup
              </Link>
            )}
            {session && (
              <Link
                href="/"
                onClick={logout}
                className="hover:bg-gray-500 rounded-xl p-1 hover:ps-8 cursor-pointer transition"
              >
                Signout
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
