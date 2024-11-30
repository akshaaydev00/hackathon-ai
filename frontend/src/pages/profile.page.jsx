import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatioWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";
import InPageNavigation from "../components/inpage-navigation.component";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import PageNotFound from "./404.page";

export const ProfileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_blogs: 0,
  },
  social_links: {},
  joinedAt: "",
};
const ProfilePage = () => {
  let { id: profileId } = useParams();

  let [profile, setProfile] = useState(ProfileDataStructure);
  let [loading, setLoading] = useState(true);
  let [blogs, setBlogs] = useState(null)
let [profileLoaded, setProfileLoaded] = useState("");

  let pagsState = "home"
  let {
    userAuth: { username: current_username },
    setUserAuth,
  } = useContext(UserContext);
  let {
    personal_info: { fullname, username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  const getBlogs = ({ page = 1, userId}) =>{

    userId = userId == undefined ? blogs.userId : userId;
    axios.post(import.meta.env.VITE_SERVER + "/search-blogs", {
        author:userId, 
        page
    })
    .then(async({data}) => {
        let formattedData = await filterPaginationData({
            state:blogs,
            data: data.blogs,
            page:page,
            countRoute: "/search-blogs-count",
            data_to_send:{author : userId}
        })

        formattedData.userId = userId;
        
        setBlogs(formattedData)
    })
  }
  const fetchUserProfile = () => {
    axios
      .post(import.meta.env.VITE_SERVER + "/get-profile", {
        username: profileId,
      })
      .then(({ data: user }) => {
        setLoading(false);
        getBlogs({ userId: user._id})
        setProfile(user);
        setProfileLoaded(profileId)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (profileId != profileLoaded) {
        setBlogs(null)
    }
    if (blogs == null) {
        resetStates();
    fetchUserProfile();
    }
    

  }, [profileId, blogs]);

  const resetStates = () => {
    setProfileLoaded("")
    setProfile(ProfileDataStructure);
    setLoading(true);
  } 
  return (
    <AnimatioWrapper>
      {loading ? (
        <Loader />
      ) : 
      username.length ? 
      (
        <section className="h-cover md:flex row-reverse items-start gap-5 min-[1100px]:gap-12 ">
          <div className="flex flex-col max-md:items-center gap-5 min-w-[250px] md:w-[50%] md:pl-8 md:border-grey md:sticky md:top-[100px] md:py-10">
            <img
              src={profile_img}
              alt=""
              className="w-48 h-48 bg-grey rounded-full md:w-32 md:h-32"
            />
            <h1 className="text-2xl font-medium">@{username}</h1>
            <p className="text-xl capitalize h-6">{fullname}</p>
            <p className="">
              {total_posts.toLocaleString()} Blogs -{" "}
              {total_reads.toLocaleString()} - Reads
            </p>

            <div className="flex gap-4 mt-2">
              {profileId == current_username ? (
                <Link to="/seetings/edit-profile" className="btn-light">
                  Edit Profile
                </Link>
              ) : (
                " "
              )}
            </div>

            <AboutUser className="max-md:hidden" bio={bio} social_links={social_links} joinedAt={joinedAt} />
          </div>

          <div className="max-md:mt-12 w-full ">
            <InPageNavigation routes={["Blogs Published", "About"]}
            defaultHidden={["About"]}>
            <>
              {blogs == null ? (
                <Loader />
              ) : blogs.results.length ? (
                blogs.results.map((blog, i) => {
                  return (
                    <AnimatioWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    >
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimatioWrapper>
                  );
                })
              ) : (
                <NoDataMessage message="No blogs has been published yet" />
              )}

              <LoadMoreDataBtn state={blogs} fetchDataFun={getBlogs}/>
            </>

            <AboutUser bio={bio} social_links={social_links} joinedAt={joinedAt}/>

            </InPageNavigation>
          </div>
        </section>
      ) : <PageNotFound />
      }
    </AnimatioWrapper>
  );
};

export default ProfilePage;
