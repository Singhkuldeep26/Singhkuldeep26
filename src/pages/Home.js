import { useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { Comment,Loader } from '../components';
import { getPosts } from "../api";
import styles from '../styles/home.module.css';

const Home =()=> {
  const [posts,setPosts]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchPosts=async()=>{
      const response=await getPosts();
      //console.log('response',response);

      if(response.success){
        setPosts(response.data.posts);
      }
      setLoading(false);
    }
    fetchPosts();
  },[]);

  if(loading){
    return <Loader />;
  }
  return (
    <div className={styles.postsList}>
      {posts.map(posts =>
        <div className={styles.postWrapper} key={`post-${posts._id}`}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/4440/4440953.png"
              alt="user-pic"
            />
            <div>
              <span className={styles.postAuthor}>{posts.user.name}</span>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>{posts.content}</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                alt="likes-icon"
              />
              <span>5</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/6144/6144284.png"
                alt="comments-icon"
              />
              <span>2</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            {posts.comments.map((comment)=>(
              <Comment comment ={comment} />
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

Home.propTypes={
  posts:PropTypes.array.isRequired,
}

export default Home;