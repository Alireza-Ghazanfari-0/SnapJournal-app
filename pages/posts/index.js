import GridPost from "@/components/posts/grid-post";
// import MyPosts from "@/components/posts/my-posts";
import Loading from "@/components/ui/loading";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Posts() {
  const [isloading, setIsloading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const email = session?.user?.email;
  // console.log(email);

  useEffect(() => {
    async function getAllPosts() {
      try {
        setIsloading(true);
        const response = await fetch("/api/getPosts?type=allPosts", {
          method: "GET",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            data.message || "error in getting data from database",
          );
        }
        // console.log(data);
        setPosts(data.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsloading(false);
      }
    }

    getAllPosts();
  }, []);

  if (isloading) {
    return <Loading />;
  }
  // console.log(posts);
  const userPosts = posts.filter((post) => post.author_user_email === email);
  // console.log(userPosts);

  return (
    <div className="bg-indigo-100 dark:bg-stone-600 min-h-screen">
      <p className="text-center pt-8 mb-9 text-3xl font-bold text-gray-900 dark:text-gray-200">
        My Posts
      </p>
      {/* <MyPosts /> */}
      <GridPost posts={userPosts} />
      <hr className="max-w-2xl mx-auto mt-2" />

      <p className="text-center pt-8 mb-9 text-3xl font-bold text-gray-900 dark:text-gray-200">
        All Posts
      </p>
      <GridPost posts={posts} />
    </div>
  );
}

export default Posts;
