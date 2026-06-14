import { useEffect, useState } from "react";
import GridPost from "../posts/grid-post";
import toast from "react-hot-toast";
import Loading from "../ui/loading";

function FeaturedPosts() {
  const [isloading, setIsloading] = useState(true);
  const [posts, setPosts] = useState();
  useEffect(() => {
    async function getSelectedPosts() {
      try {
        setIsloading(true);
        const response = await fetch("/api/getPosts?type=selectedPosts", {
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

    getSelectedPosts();
  }, []);

  if (isloading) {
    return <Loading />;
  }
  // console.log(posts);

  return (
    <div>
      <div className="text-center mt-8 mb-9 text-3xl font-bold text-gray-900 dark:text-gray-200">
        Featured Posts
      </div>
      <GridPost posts={posts} />
    </div>
  );
}

export default FeaturedPosts;
