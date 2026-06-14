import Image from "next/image";
function IntroductionFirstPage() {
  return (
    <div className="h-115 bg-cyan-500 dark:bg-cyan-950">
      <div className="flex flex-col items-center py-35 ">
        <Image
          src="/Untitled.jpg"
          alt="owner first photo"
          width="250"
          height="250"
          className="rounded-[50%] overflow-hidden shadow-2xl drop-shadow-stone-800"
        />
        <p className="dark:text-amber-100 mt-6 text-center leading-8 font-mono md:text-xl font-bold px-2">
          Hello my friends.
          <br /> I am Alireza. here, At the service of YOU.
          <br />
          You can login, see all posts, upload your posts and write your
          comments.
        </p>
      </div>
    </div>
  );
}

export default IntroductionFirstPage;
