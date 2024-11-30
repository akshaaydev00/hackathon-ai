import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import AnimatioWrapper from "../common/page-animation";
import BlogPostCard from "../components/blog-post.component";
import axios from "axios";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import UserCard from "../components/usercard.component";

const SearchPage = () => {
  let [blogs, setBlog] = useState(null);
  let [users, setUsers] = useState(null); 
  let { query } = useParams();

  const searchBlogs = ({page=1, create_new_arr = false }) => {
        axios.post(import.meta.env.VITE_SERVER + '/search-blogs', { query , page})
        .then(async ({ data }) => {
            let formattedData = await filterPaginationData({
                state:blogs,
                data: data.blogs,
                page:page,
                countRoute: "/search-blogs-count",
                data_to_send:{query: query},
                create_new_arr
            })
            setBlog(formattedData);
            
          })
          .catch((err) => {
            console.log(err);
          });
  }

  const fetchUsers = () => {

    console.log(query);
      axios.post(import.meta.env.VITE_SERVER + '/search-user', {query})
      .then(( { data : { userInfo } } )=> {
        
        console.log(typeof (userInfo));
        setUsers(userInfo)
        
      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    resetState()
    fetchUsers()
    searchBlogs({page:1 , create_new_arr: true})
  }, [query])

  const resetState = () =>{
    setBlog(null);
    setUsers(null);

}

  const UserCardWrapper = () => {
    return (
        <>
           {
              users == null ? <Loader /> : 
                  users.length ? users.map((user, i) => {
                    return <AnimatioWrapper key={i} transition={{duration : 1, delay: i*0.08}}>
                        <UserCard user={user} />
                    </AnimatioWrapper>;
                  })
                  : <NoDataMessage message={"No user found"} /> 
           }
        </>
    )
  }
  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`Search results for - ${query}`, `Accounts Matched`]}
          defaultHidden={["Accounts Matched"]}
        >
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

            <LoadMoreDataBtn state={blogs} fetchDataFun={searchBlogs}/>
          </>

          <UserCardWrapper />
        </InPageNavigation>
      </div>

      <div className="min-w-[40%] lg:min-w-[350px] max-w-min border-1 border-grey pl-8 pt-3 max-md:hidden border-l">

        <h1 className="font-medium text-xl mb-8"> User related to search <i className="fi fi-rr-user mt-1"></i></h1>

        <UserCardWrapper />
      </div>

    </section>
  );
};
export default SearchPage;
