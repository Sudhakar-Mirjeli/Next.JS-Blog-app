"use client";
import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { parseISO, format } from 'date-fns';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the Blog interface
interface Blog {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

export default function Dashboard() {
    const [blog, setBlog] = React.useState({
        title: "",
        content: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const [blogs, setBlogs] = React.useState<Blog[]>([])
    const [showForm, setShowForm] = React.useState(false);  // Define the showForm state here

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token
                let decodedToken: JwtPayload | null = null;
                if (token) {
                    decodedToken = jwt.decode(token) as JwtPayload;
                }
                if (decodedToken && decodedToken.userId) {
                    const response = await axios.get(`http://localhost:5050/api/posts?author=${decodedToken.userId}`, {
                        headers: {
                            Authorization: `Bearer ${token}` // Set the Authorization header
                        }
                    })
                    setBlogs(response.data.blogs as Blog[])
                }
            } catch (err) {
                toast.error('Failed to fetch blogs');
            }
        };

        fetchBlogs();
    }, []);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token'); // Retrieve the token
            const response = await axios.post('http://localhost:5050/api/post', blog, {
                headers: {
                    Authorization: `Bearer ${token}` // Set the Authorization header
                }
            })
            console.log('Blog post success', response);

            if (response.data.success) {
                toast.success('Blog posted successfully');
                setBlog({ title: '', content: '' });
                setShowForm(false); // Hide the form after successful post
            } else {
                toast.error('Failed to post blog');
            }
        } catch (err) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-2">
            <div className="w-full max-w-4xl p-4">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-100 z-10">
                    <h1 className="text-2xl font-bold">Blogs</h1>
                    <button
                        onClick={() => setShowForm(!showForm)}  // Toggle form visibility
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                    >
                        {showForm ? 'Close' : 'Add a Blog'}
                    </button>
                </div>
                {showForm && (
                    <div className="bg-white p-8 rounded mb-6">
                        <h1 className="text-2xl font-bold mb-6">Post a New Blog</h1>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Title:</label>
                                <input
                                    type="text"
                                    value={blog.title}
                                    onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Content:</label>
                                <textarea
                                    value={blog.content}
                                    onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full px-3 py-2 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} focus:outline-none`}
                            >
                                {loading ? 'Posting...' : 'Post'}
                            </button>
                        </form>
                    </div>
                )}
                <div className="bg-white p-4 rounded shadow-md max-h-screen overflow-y-auto">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog._id} className="mb-4">
                                <h2 className="text-xl font-bold">{blog.title}</h2>
                                <p className="text-gray-700">{blog.content}</p>
                                <span className="text-slate-500 py-8">Posted on: </span>
                                <time dateTime={blog.createdAt}>
                                    {format(parseISO(blog.createdAt), 'LLLL d, yyyy')}
                                </time>
                                <hr className="mt-4" />
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700">No blogs available</p>
                    )}
                </div>
            </div>
        </div>
    );
}
