import axios from "axios";
import AnimatioWrapper from "../common/page-animation";
import InPageNavigation, {
  activeTab,
  activeTabLineRef,
} from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";

const HomePage = () => {
  let [blogs, setBlog] = useState(null);
  let [trendingBlogs, setTrendingBlogs] = useState(null);
  let [pagsState, setPagsState] = useState("home");
  let categories = [
    "Mathematics",
    "Physics",
    "Technology",
    "Chemistry"
  ];

  

  useEffect(() => {
    if (pagsState == "home") {
      
    } else {
      
    }
    if (!trendingBlogs) {
      
    }
    activeTab.current.click();
  }, [pagsState]);
  return (
    <AnimatioWrapper>
      <section className="h-cover flex justify-center gap-10">
        {/* latest blog */}
        <div className="w-full">
          <InPageNavigation
            routes={[pagsState, "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <>
              {blogs == null ? (
                <Loader />
              ) 
               : (
                <NoDataMessage message="No blogs has been published yet" />
              )}

              
            </>

            {trendingBlogs == null ? (
              <Loader />
            ): (
              <NoDataMessage message="There are no trending blogs" />
            )}
          </InPageNavigation>
        </div>

        {/* filters */}
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-1 border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10 ">
            <h1 className="font-medium text-xl mb-8">
              Subjects
            </h1>

            <div className="flex gap-3 flex-wrap">
              {categories.map((category, i) => {
                return (
                  <button
                    // onClick={loadBlogByCategory}
                    className={
                      "tag" +
                      (pagsState == category ? " bg-black text-white" : " ")
                    }
                    key={i}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <h1 className="font-medium text-xl mb-8">
              Recently accesed <i className="fi fi-rr-arrow-trend-up"></i>
            </h1>
            {trendingBlogs == null ? (
              <Loader />
            ) : (
              <NoDataMessage message="No recently accessed courses" />
            )}
          </div>
        </div>
      </section>
    </AnimatioWrapper>
  );
};

export default HomePage;
