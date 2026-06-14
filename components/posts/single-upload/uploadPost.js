import Loading from "@/components/ui/loading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

function UploadPost() {
  const { data: session, status } = useSession();
  const [imagePreview, setImagePreview] = useState();
  const [file, setFile] = useState();
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated")
    return (
      <div className="w-full px-3 flex flex-col items-center space-y-5">
        <div className="pt-20  text-2xl font-semibold text-blue-800 dark:text-blue-300">
          For Uploading Post, please login to site
        </div>
        <Link
          href={"/authentication"}
          className=" rounded bg-orange-500 py-1 px-2 text-xl text-gray-100 shadow-xl transition hover:bg-orange-700 "
        >
          Login
        </Link>
      </div>
    );

  function selectImageHandler(e) {
    // e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    // console.log(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // console.log(previewUrl);
    }
  }
  async function uploadCloudinary() {
    try {
      if (!file) {
        return toast.error("select your image");
      }
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
      );
      // console.log("middle");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );
      // console.log("middle2");

      const data = await response.json();
      // console.log(data.secure_url);
      return data.secure_url;
    } catch (error) {
      toast.error(error.message || "error in upload image");
    }
  }
  // async function formSubmitHandler(e) {
  //   e.preventDefault();
  //   console.log("first");
  //   const imageUrl = await uploadCloudinary();
  //   console.log("last");
  // }
  async function formSubmitHandler(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // console.log("pre");

    try {
      setIsloading(true);
      // console.log("first");
      const imageFileUrl = await uploadCloudinary();

      // console.log("last");

      // const formData = new FormData();
      // formData.append("title", e.target.title.value);
      // formData.append("shortDescription", e.target.shortDescription.value);
      // formData.append("longDescription", e.target.longDescription.value);
      // formData.append("author_user_email", session.user.email);
      // formData.append("createdAt", new Date());
      // formData.append("imageFile", file);
      // console.log(formData);

      const title = formData.get("title");
      const shortDescription = formData.get("shortDescription");
      const longDescription = formData.get("longDescription");
      const imageUrl = imageFileUrl;
      const author_user_email = session.user.email;
      const createdAt = new Date().toISOString();

      // uploadCloudinary();
      const response = await fetch("/api/uploadPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          shortDescription,
          longDescription,
          imageUrl,
          author_user_email,
          createdAt,
        }),
      });
      const data = await response.json();
      // console.log(response);

      // console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "error in upload!");
      }
      toast.success(data.message || "successfully uploaded");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  }

  return (
    <div className="w-full px-3 pt-10 pb-2 dark:bg-stone-600">
      <form
        onSubmit={formSubmitHandler}
        className=" w-full max-w-xl mx-auto rounded shadow-xl bg-purple-200 dark:bg-mauve-700 p-4"
      >
        <p className="text-center text-3xl font-bold text-red-900 dark:text-red-300">
          Upload Your Post!
        </p>
        <p className="text-center pt-1 mb-8 text-xl dark:text-red-100">
          "Fill the blanks and upload image"
        </p>
        <div className="space-y-2 ">
          <div className="flex flex-col space-y-1 mx-2">
            <label className="font-semibold dark:text-fuchsia-100">
              Title of photo
            </label>
            <input
              required
              name="title"
              className="bg-gray-200 dark:bg-gray-500 dark:text-rose-200 px-2 py-1 rounded-lg focus:outline-none ring-1 ring-blue-500 focus:ring-blue-700 focus:ring-2 transition"
            />
          </div>
          <div className="flex flex-col space-y-1 mx-2">
            <label className="font-semibold dark:text-fuchsia-100">
              Short Description
            </label>
            <input
              required
              name="shortDescription"
              className="bg-gray-200 dark:bg-gray-500 dark:text-rose-200 px-2 py-1 rounded-lg focus:outline-none ring-1 ring-blue-500 focus:ring-blue-700 focus:ring-2 transition"
            />
          </div>
          <div className="flex flex-col space-y-1 mx-2">
            <label className="font-semibold dark:text-fuchsia-100">
              Full description
            </label>
            <textarea
              required
              name="longDescription"
              rows={3}
              className="bg-gray-200 dark:bg-gray-500 dark:text-rose-200 px-2 py-1 rounded-lg focus:outline-none ring-1 ring-blue-500 focus:ring-blue-700 focus:ring-2 transition"
            />
          </div>
          <div className="flex flex-row justify-between mx-2 pe-10">
            <div className="flex flex-col space-y-1 w-1/3">
              <label className="font-semibold dark:text-fuchsia-100">
                Select Image
              </label>
              <input
                required
                name="imageFile"
                onChange={selectImageHandler}
                type="file"
                className="hover:bg-pink-700 cursor-pointer bg-gray-200 dark:bg-gray-500 dark:text-rose-200 px-2 py-1 rounded-lg focus:outline-none ring-1 ring-blue-500 focus:ring-blue-700 focus:ring-2 transition"
              />
            </div>

            <div className="">
              <img
                src={imagePreview}
                className="w-30 h-30 rounded-2xl dark:text-fuchsia-100"
                alt="prev image"
              />
            </div>
          </div>
          {isloading ? (
            <button
              disabled
              // type="submit"
              className=" w-full px-2 py-1 rounded-lg bg-orange-600 transition text-gray-100 "
            >
              Submitting ...
            </button>
          ) : (
            <button
              type="submit"
              className=" w-full px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-gray-100 cursor-pointer"
            >
              Submit post
            </button>
          )}
          {/* <button
            type="submit"
            className=" w-full px-2 py-1 rounded-lg bg-purple-600 hover:bg-purple-700 transition text-gray-100 cursor-pointer"
          >
            submit post
          </button> */}
        </div>
      </form>
    </div>
  );
}

export default UploadPost;
