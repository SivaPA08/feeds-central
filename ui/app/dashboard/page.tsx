"use client";
import React, { useState } from 'react';
import {
	ChevronUp,
	ChevronDown,
	MessageCircle,
	Share2,
	Bookmark,
	MoreHorizontal,
	Search,
	Bell,
	User,
	Plus,
	Home,
	Users
} from 'lucide-react';

const Dashboard = () => {
	const [posts, setPosts] = useState([
		{
			id: 1,
			title: "What's your favorite programming language and why?",
			content: "I'm curious to hear everyone's thoughts on programming languages. I've been using JavaScript for web development but thinking about learning Python.",
			author: "codingEnthusiast",
			subreddit: "programming",
			votes: 342,
			comments: 89,
			timeAgo: "4 hours ago",
			userVote: null
		},
		{
			id: 2,
			title: "Beautiful sunset from my backyard today",
			content: "Thought you all might enjoy this view. Sometimes the simple things in life are the most beautiful.",
			author: "natureLover23",
			subreddit: "EarthPorn",
			votes: 1247,
			comments: 34,
			timeAgo: "6 hours ago",
			userVote: null
		},
		{
			id: 3,
			title: "LPT: Always keep a small emergency kit in your car",
			content: "Include basics like water, snacks, first aid supplies, phone charger, and a flashlight. You never know when you might need them.",
			author: "helpfulHuman",
			subreddit: "LifeProTips",
			votes: 856,
			comments: 67,
			timeAgo: "8 hours ago",
			userVote: null
		},
		{
			id: 4,
			title: "My cat discovered the printer and now thinks it's his personal bed",
			content: "Every time I try to print something, Mr. Whiskers gives me the most offended look. I think I've lost this battle.",
			author: "catParent42",
			subreddit: "cats",
			votes: 2103,
			comments: 156,
			timeAgo: "12 hours ago",
			userVote: null
		}
	]);

	const [activeTab, setActiveTab] = useState('home');

	const handleVote = (postId, voteType) => {
		setPosts(posts.map(post => {
			if (post.id === postId) {
				let newVotes = post.votes;
				let newUserVote = voteType;

				if (post.userVote === voteType) {
					newUserVote = null;
					newVotes = voteType === 'up' ? post.votes - 1 : post.votes + 1;
				} else if (post.userVote) {
					newVotes = voteType === 'up' ? post.votes + 2 : post.votes - 2;
				} else {
					newVotes = voteType === 'up' ? post.votes + 1 : post.votes - 1;
				}

				return { ...post, votes: newVotes, userVote: newUserVote };
			}
			return post;
		}));
	};

	const Post = ({ post }) => (
		<div className="bg-white border border-violet-200 rounded-lg mb-6 hover:border-violet-300 transition-colors shadow-sm">
			<div className="flex">
				<div className="flex flex-col items-center p-3 bg-violet-50 rounded-l-lg">
					<button
						onClick={() => handleVote(post.id, 'up')}
						className={`p-1 rounded hover:bg-violet-200 transition-colors ${post.userVote === 'up' ? 'text-violet-600 bg-violet-100' : 'text-black hover:text-violet-600'
							}`}
					>
						<ChevronUp size={18} />
					</button>
					<span className={`text-sm font-medium py-2 ${post.userVote === 'up' ? 'text-violet-600' :
						post.userVote === 'down' ? 'text-red-500' : 'text-black'
						}`}>
						{post.votes}
					</span>
					<button
						onClick={() => handleVote(post.id, 'down')}
						className={`p-1 rounded hover:bg-violet-200 transition-colors ${post.userVote === 'down' ? 'text-red-500 bg-red-50' : 'text-black hover:text-violet-600'
							}`}
					>
						<ChevronDown size={18} />
					</button>
				</div>

				<div className="flex-1 p-5">
					<div className="flex items-center text-sm text-gray-600 mb-2">
						<span className="text-violet-600 font-medium">f/{post.subreddit}</span>
						<span className="mx-2">•</span>
						<span>Posted by u/{post.author}</span>
						<span className="mx-2">•</span>
						<span>{post.timeAgo}</span>
					</div>

					<h3 className="text-lg font-semibold text-black mb-2 hover:text-violet-600 cursor-pointer transition-colors">
						{post.title}
					</h3>

					<p className="text-black mb-4">{post.content}</p>

					<div className="flex items-center space-x-4 text-gray-600">
						<button className="flex items-center space-x-1 hover:bg-violet-100 px-2 py-1 rounded transition-colors">
							<MessageCircle size={16} />
							<span className="text-sm">{post.comments} Comments</span>
						</button>
						<button className="flex items-center space-x-1 hover:bg-violet-100 px-2 py-1 rounded transition-colors">
							<Share2 size={16} />
							<span className="text-sm">Share</span>
						</button>
						<button className="flex items-center space-x-1 hover:bg-violet-100 px-2 py-1 rounded transition-colors">
							<Bookmark size={16} />
							<span className="text-sm">Save</span>
						</button>
						<button className="p-1 hover:bg-violet-100 rounded transition-colors">
							<MoreHorizontal size={16} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="bg-violet-600 text-white shadow sticky top-0 z-50">
				<div className="max-w-6xl mx-auto px-4">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center space-x-4">
							<h1 className="text-2xl font-bold">Feeds-Central</h1>
							<nav className="hidden md:flex space-x-4">
								<button
									onClick={() => setActiveTab('home')}
									className={`flex items-center space-x-1 px-3 py-2 rounded hover:bg-violet-700 transition-colors ${activeTab === 'home' ? 'bg-violet-700' : ''
										}`}
								>
									<Home size={18} />
									<span>Home</span>
								</button>
								<button
									onClick={() => setActiveTab('communities')}
									className={`flex items-center space-x-1 px-3 py-2 rounded hover:bg-violet-700 transition-colors ${activeTab === 'communities' ? 'bg-violet-700' : ''
										}`}
								>
									<Users size={18} />
									<span>Communities</span>
								</button>
							</nav>
						</div>

						<div className="flex-1 max-w-xl mx-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300" size={18} />
								<input
									type="text"
									placeholder="Search Feeds-Central"
									className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-full border border-violet-200 focus:outline-none focus:border-violet-400"
								/>
							</div>
						</div>

						<div className="flex items-center space-x-3">
							<button className="p-2 hover:bg-violet-700 rounded-full transition-colors">
								<Plus size={18} />
							</button>
							<button className="p-2 hover:bg-violet-700 rounded-full transition-colors relative">
								<Bell size={18} />
								<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
							</button>
							<button className="p-2 hover:bg-violet-700 rounded-full transition-colors">
								<User size={18} />
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Center feed only */}
			<main className="max-w-3xl mx-auto p-6">
				<div className="mb-6">
					<div className="bg-white border border-violet-200 rounded-lg p-4">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-semibold text-black">Best Posts</h2>
							<select className="bg-white border border-violet-200 rounded px-3 py-1 text-black focus:outline-none focus:border-violet-400">
								<option>Hot</option>
								<option>New</option>
								<option>Top</option>
								<option>Rising</option>
							</select>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					{posts.map(post => (
						<Post key={post.id} post={post} />
					))}
				</div>

				<div className="text-center py-8">
					<button className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition-colors">
						Load More Posts
					</button>
				</div>
			</main>
		</div>
	);
};

export default Dashboard;

