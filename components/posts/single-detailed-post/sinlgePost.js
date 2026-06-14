import Image from "next/image";
// import image1 from "@/public/posts/20231202_220234.jpg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/components/ui/loading";
// import { useParams } from "next/navigation";

function SinlgePost() {
  const router = useRouter();
  const { post } = router.query;
  // const { post } = useParams();
  // console.log(a);
  // console.log(post);
  // console.log(typeof post);

  const [detailedData, setDetailedData] = useState();
  const [isloading, setIsloading] = useState(true);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (!post) return;
    setIsloading(true);
    async function getDetailedPost() {
      try {
        const response = await fetch(`/api/getPosts?type=${post}`, {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        const postData = data.data;
        setDetailedData(postData);

        let name = postData?.authorInfo?.firstname;

        let last = postData?.authorInfo?.lastname;

        const fullName = name && last ? `${name} ${last}` : name || last || "";
        console.log(fullName);

        setFullName(fullName);
        // console.log(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsloading(false);
      }
    }
    getDetailedPost();
  }, [post]);
  if (isloading) {
    return <Loading />;
  }
  return (
    <div className="w-full px-2 dark:bg-stone-600">
      <div className="w-full mx-auto sm:max-w-lg md:max-w-xl lg:max-w-3xl rounded-2xl pt-10 space-y-4 pb-2 ">
        {/* <div className="sm:max-w-lg md:max-w-xl lg:max-w-3xl mx-auto ">
          <img src={image1.src} className="rounded-2xl" />
        </div> */}
        <div className="sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
          <Image
            src={detailedData?.imageUrl}
            alt="تصویر"
            className="rounded-2xl"
            width={600}
            height={600}
          />
        </div>
        <div className="p-4 rounded-2xl bg-amber-200 dark:bg-mauve-800">
          <p className="text-xl md:text-2xl font-bold mb-.5 text-red-900 dark:text-red-200">
            {detailedData?.title}
          </p>
          <p className="text-sm  text-gray-700 dark:text-gray-200">
            {" "}
            {new Date(detailedData?.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <hr className="pb-2" />
          <p className="font-semibold pb-2 dark:text-mauve-300">
            {detailedData?.author ||
              fullName ||
              detailedData?.author_user_email}
          </p>

          <p className="font-sans text-justify dark:text-blue-200">
            {detailedData?.longDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SinlgePost;
