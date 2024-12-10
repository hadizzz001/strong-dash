import Post1 from './Post1'
 
const PostList = ({ posts }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 place-items-start'>
      {
        posts?.map(post => (
          <Post1 key={post.id} post={post} />
        )) 
      }
    </div>
  )
}

export default PostList