import React, { useState } from 'react';
import { useFormik } from 'formik';
import { usePosts } from '../../../hooks/usePosts';
import { useAuth } from '../../../hooks/useAuth';

import { BsImage } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

const AddPost = () => {
  const { addPost } = usePosts();
  const { user } = useAuth();
  const [imagePreview, setImagePreview] = useState('');

  const formik = useFormik({
    initialValues: {
      content: '',
      image: null
    },
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      formData.append('content', values.content);
      if (values.image) {
        formData.append('image', values.image);
      }

      console.log(...formData.entries())


      addPost(formData);
      resetForm();
      setImagePreview('');
    }
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('image', file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-4">
      <form onSubmit={formik.handleSubmit}>
        <div className='flex gap-3 items-center p-3'>
          <img src={user.avatar || 'default-avatar.png'} className='h-14 w-14 rounded-full' alt="User Avatar" />
          <input
            type="text"
            name="content"
            onChange={formik.handleChange}
            value={formik.values.content}
            className='w-full bg-gray-100 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500'
            placeholder="What's happening"
          />
          <label htmlFor="file-input">
            <BsImage size={24} className="text-gray-500 cursor-pointer transition hover:text-blue-500"/>
          </label>
          <input
            id="file-input"
            type="file"
            name="image"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {imagePreview && (
          <div className="relative p-2">
            <button onClick={() => {
              setImagePreview('');
              formik.setFieldValue('image', null);
            }} className="absolute right-2 top-2 text-gray-400 hover:text-gray-200">
              <AiFillCloseCircle size={24}/>
            </button>
            <img src={imagePreview} alt="Preview" className="max-h-60 max-w-full rounded-lg" />
          </div>
        )}

        <div className="flex justify-end">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 mt-2 py-2 px-5 rounded-full text-white font-bold">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
