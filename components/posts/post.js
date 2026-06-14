import Link from "next/link";

function Post({ postItem }) {
  const singlePostItem = postItem;
  const id = singlePostItem._id;
  // console.log(singlePostItem);

  return (
    <div>
      <Link
        href={`/posts/${id}`}
        className="flex flex-col rounded-2xl w-[20rem] h-120 bg-amber-200 dark:bg-mauve-800"
      >
        <div className="h-[70%] overflow-hidden">
          <img src={singlePostItem?.imageUrl} className="rounded-2xl" />
        </div>

        <div className="flex flex-col items-center mt-3 gap-y-1">
          <p className="font-bold dark:text-mauve-200">
            {singlePostItem?.title}
          </p>
          <p className="dark:text-mauve-400">
            {singlePostItem?.createdAt &&
              new Date(singlePostItem?.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </p>
          <p className="text-center text-rose-900 dark:text-pink-200 font-semibold ">
            {singlePostItem?.shortDescription}
          </p>
        </div>
      </Link>
      {/* {user && (
        <button className="w-[50%] ms-[25%] rounded-3xl text-amber-300 bg-red-800 p-1.5 mt-1.5 cursor-pointer">
          Remove post
        </button>
      )} */}
    </div>
  );
}

export default Post;
