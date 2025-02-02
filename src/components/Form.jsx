/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { postData, updateData } from "../API/postAPI";

const Form = ({data, setData, editFormData, setEditFormData}) => {

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

  const updatePostData = async () => {
    try{
      const res = await updateData(editFormData.id, formData)
      if(res.status === 200){
        setData((prevData) => {
          return prevData.map((currElement) => {
            return currElement.id === res.data.id ? res.data : currElement
          })
        })
        setFormData({title: "", body: ""})
        setEditFormData({})
        console.log(`Edited Data ${res.data.id}`, res.data)
      }
    } catch(err){
      console.log(err)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value

    if(action === "Add")
      addPostData();
    
    else
      updatePostData()
  }

  useEffect(() => {
    setFormData({
      title: editFormData.title || "",
      body: editFormData.body || "",
    })
  }, [editFormData])

  const isEmpty = Object.entries(editFormData).length == 0

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
      <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
    </form>
  )
}

export default Form