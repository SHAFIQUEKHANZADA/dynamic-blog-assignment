"use client";
import { Heebo } from 'next/font/google';
import Image from 'next/image';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { HiDotsHorizontal } from "react-icons/hi";

const heebo = Heebo({ subsets: ['latin'] });

interface Comment {
  id: string;
  name: string;
  email: string;
  comment: string;
}

const CommentSection: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);  

  useEffect(() => {
    const savedComments = localStorage.getItem('comments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();

    if (name.trim() === '' || comment.trim() === '') {
      alert('Name and comment cannot be empty.');
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(), 
      name,
      email,
      comment,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);

    localStorage.setItem('comments', JSON.stringify(updatedComments));
 
    setName('');
    setEmail('');
    setComment('');
  };

  const handleEdit = (id: string) => {
    const commentToEdit = comments.find((c) => c.id === id);
    if (commentToEdit) {
      setName(commentToEdit.name);
      setEmail(commentToEdit.email);
      setComment(commentToEdit.comment);
      deleteComment(id);  
    }
  };

  const handleDelete = (id: string) => {
    deleteComment(id);
  };

  const deleteComment = (id: string) => {
    const filteredComments = comments.filter((comment) => comment.id !== id);
    setComments(filteredComments);

    localStorage.setItem('comments', JSON.stringify(filteredComments));
  };

  const toggleDropdown = (id: string) => {
    setDropdownOpen(dropdownOpen === id ? null : id); 
  };

  return (
    <div className={`${heebo.className} comment-section max-w-4xl mx-auto sm:p-6 p-3 py-6 border bg-white dark:bg-neutral-900 rounded-sm`}>
      <h2 className="text-2xl font-semibold mb-4">Leave a Comment:</h2>

      {/* Display the list of comments */}
      <div className="comments-list mt-6">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment p-4 mb-4 border-b flex items-start">
              <div className="avatar mr-4 w-10 h-10">
                <Image
                  src={"/sa.png"}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  width={100}
                  height={100}
                />
              </div>

              {/* Comment Text */}
              <div className="comment-text flex flex-col">
                <div className="name font-bold text-lg">{comment.name}</div>
                <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.comment}</p>
              </div>

              {/* Three Dot Dropdown */}
              <div className="ml-auto relative">
                <button
                  onClick={() => toggleDropdown(comment.id)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <span className="text-xl font-semibold"><HiDotsHorizontal /></span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen === comment.id && (
                  <div className="absolute right-0 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-gray-800 shadow-lg rounded-sm w-32">
                    <button
                      onClick={() => handleEdit(comment.id)}
                      className="w-full text-left px-4 py-2   hover:bg-gray-100 hover:text-black"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="w-full text-left px-4 py-2   hover:bg-gray-100 hover:text-black"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleNameChange}
            className="w-full p-3 border rounded-sm"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Your Email (will not be displayed)"
            value={email}
            onChange={handleEmailChange}
            className="w-full p-3 border rounded-sm"
          />
        </div>

        <div className="mb-4">
          <textarea
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            rows={4}
            className="w-full p-3 border rounded-sm"
            required
          />
        </div>

        <button type="submit" className="sm:w-[200px] w-full bg-blue-500 dark:bg-blue-400 text-white p-3 rounded-sm  hover:bg-blue-700 dark:hover:bg-blue-600 transition">
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
