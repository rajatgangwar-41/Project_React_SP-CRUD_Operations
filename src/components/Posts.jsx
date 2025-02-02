import { useEffect, useState } from 'react'
import { deletePost, getPost } from '../API/postAPI';
import "../App.css";
import Form from './Form';

const Posts = () => {

  const [data, setData] = useState([])

  const getPostData = async () => {
    const res = await getPost();
    setData(res.data)
  }

  const handleDeletePost = async (id) => {
    try{
      const res = await deletePost(id);
      if(res.status === 200){
        setData(
          data.filter((currElement) => {
            return currElement.id != id
          })
        )
        console.log(`Post ${id} Deleted:`)
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getPostData();
  }, [])

  return (
    <>
      <section className='section-form'>
        <Form data={data} setData={setData}/>
      </section>
      <section className='section-post'>
        <ol>
          {
            data.map((currElement) => {
              const {id, title, body} = currElement
              return (
                <li key={id}>
                  <p>Title: {title}</p>
                  <p>Body: {body}</p>
                  <button>Edit</button>
                  <button className='btn-delete' onClick={()=> handleDeletePost(id) }>Delete</button>
                </li>
              )
            })
          }
        </ol>
      </section>
    </>
  )
}

export default Posts