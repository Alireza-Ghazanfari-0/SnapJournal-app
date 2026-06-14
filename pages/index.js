import FeaturedPosts from "@/components/homePage/featuredPosts";
import IntroductionFirstPage from "@/components/homePage/introductionFirstPage";

export default function Home() {
  return (
    <div className="bg-indigo-200 dark:bg-stone-600 min-h-screen">
      <IntroductionFirstPage />
      <FeaturedPosts />
    </div>
  );
}
