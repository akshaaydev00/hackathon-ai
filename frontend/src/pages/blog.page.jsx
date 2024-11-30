import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimatioWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import BlogInteraction from "../components/blog-interaction.component";

export const blogStructure = {
  title: "",
  content: [],
  banner: "",
  des:"",
  tags:[],
  author: { personal_info: {} },
  publishedAt: "",
};

export const BlogContext = createContext({ })

const BlogPage = () => {
  let { id } = useParams();
  let [blog, setBlog] = useState(blogStructure);
  let [loading, setLoading] = useState(true) 
  let {
    title,
    content,
    banner,
    author: {
      personal_info: { fullname, username: author_username, profile_img },
    },
    publishedAt,
  } = blog;
  const fetchBlog = () => {
    axios
      .post(import.meta.env.VITE_SERVER + "/get-blogs", { id })
      .then(({ data: { blogs } }) => {
        setBlog(blogs);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  };
  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <AnimatioWrapper>
        {
            
            loading ? <Loader /> : 
            <BlogContext.Provider value={{ blog, setBlog}}> 
            <div className="max-w-[900px] center py-10 max-lg:[5vw] ">

                  <img src={banner} className="aspect-video" />
                  <div className="mt-12">
                    <h2 className=""> {title} </h2>

                    <div className="flex max-sm:flex-col justify-between my-8 ">
                        <div className="flex gap-5 items-start">
                            <img src={profile_img} className="w-12 h-12 rounded-full" />
                        </div>

                        <p className="capitalize">
                            {fullname}
                            <br />
                            @
                            <Link to={`/user/${author_username}`} className="underline">{author_username}</Link>
                        </p>
                    </div>
                    <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                        Published On { getDay(publishedAt)}
                    </p>
                  </div>

                  <BlogInteraction />
            </div>
            </BlogContext.Provider>
        }

    </AnimatioWrapper>
           
    )
};

export default BlogPage;
