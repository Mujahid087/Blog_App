'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennett",
    authorImg: "/author_img_png.png"
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }))
    console.log(data)
  }

  const onSubmitHanlder = async (e) => {
    e.preventDefault()
    
    console.log('Form submitted!'); // Debug log
    
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('category', data.category)
      formData.append('author', data.author)
      formData.append('authorImg', data.authorImg)
      formData.append('image', image)
      
      console.log('Submitting form...'); // Debug log
      console.log('Form data:', {
        title: data.title,
        description: data.description,
        category: data.category,
        author: data.author,
        authorImg: data.authorImg,
        image: image
      });
      
      const response = await axios.post('http://localhost:3000/api/blog', formData)
      
      console.log('Full response:', response); // Debug log
      console.log('Response data:', response.data); // Debug log
      console.log('Response status:', response.status); // Debug log

      // Check if response exists and has data
      if (response && response.data) {
        console.log('Response.data.success:', response.data.success); // Debug log
        
        if (response.data.success === true) {
          console.log('Success condition met! Showing success toast...'); // Debug log
          toast.success(response.data.message || "Blog created successfully!")
          setImage(false)
          setData({
            title: "",
            description: "",
            category: "Startup",
            author: "Alex Bennett",
            authorImg: "/author_img_png.png"
          })
        } else {
          console.log('Success condition not met. Showing error toast...'); // Debug log
          console.log('Expected success: true, got:', response.data.success);
          toast.error(response.data.message || "Error occurred")
        }
      } else {
        console.log('No response data received'); // Debug log
        toast.error("Invalid response from server")
      }
    } catch (error) {
      console.error('Request failed with error:', error); // Debug log
      console.error('Error response:', error.response); // Debug log
      console.error('Error message:', error.message); // Debug log
      
      if (error.response) {
        // Server responded with error status
        console.log('Server error response:', error.response.data);
        toast.error(`Server error: ${error.response.data.message || error.response.statusText}`)
      } else if (error.request) {
        // Request was made but no response received
        console.log('No response received:', error.request);
        toast.error("No response from server")
      } else {
        // Something else happened
        console.log('Request setup error:', error.message);
        toast.error("Network error occurred")
      }
    }
  }

  // Test toast function
  const testToast = () => {
    toast.success("Test toast - this should work!")
  }

  return (
    <>
      <form onSubmit={onSubmitHanlder} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
    
        
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor="image">
          <Image className='mt-4' src={!image ? assets.upload_area : URL.createObjectURL(image)} width={140} height={70} alt='' />
        </label>
        <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        <p className='text-xl mt-4' >Blog title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} type="text" placeholder='Type here' required className='w-full sm:w-[500px] mt-4 px-4 py-3 border ' />
        <p className='text-xl mt-4'>Blog description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" placeholder='write content here' required rows={6} className='w-full sm:w-[500px] mt-4 px-4 py-3 border ' />
        <p className='text-xl mt-4'>Blog category</p>
        <select name='category' onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
      </form>
    </>
  )
}

export default Page