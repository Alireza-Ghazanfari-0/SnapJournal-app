import Post from "./post";

function GridPost({ posts }) {
  // console.log(posts);
  if (!posts || posts.length === 0) {
    return <p className="text-center dark:text-mist-300">There is no Post.</p>;
  }

  return (
    <div className="pb-5 grid lg:grid-cols-3 md:grid-cols-2 gap-5 mx-auto max-w-screen-xlg justify-center place-items-center">
      {posts.map((postItem) => (
        <Post postItem={postItem} key={postItem._id} />
      ))}
    </div>
  );
}

export default GridPost;
