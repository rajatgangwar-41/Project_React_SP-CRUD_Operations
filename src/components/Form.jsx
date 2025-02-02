/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { postData } from "../API/postAPI";

// eslint-disable-next-line react/prop-types
const Form = ({data, setData, newFormData, setNewFormData}) => {

  const [formData, setFormData] = useState({
    title: "",
    body: "",
  })

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name] : value,
      }
    })
  }

  const addPostData = async () => {
    try{
      const res = await postData(formData)
      if(res.status === 201){
        setData([...data, res.data])
        setFormData({title: "", body: ""})
      }
      console.log("Added Data", res.data)
    } catch(err){
      console.log(err)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  }

  useEffect(() => {
    setFormData({
      title: newFormData.title || "",
      body: newFormData.body || "",
    })
  }, [newFormData])

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          autoComplete="off"
          id="title"
          name="title"
          placeholder="Add Title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          autoComplete="off"
          id="body"
          name="body"
          placeholder="Add Post"
          value={formData.body}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default Form