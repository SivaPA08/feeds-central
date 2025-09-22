"use client"

import React from "react";

// Dynamic profile page for Next.js App Router
// Save this as: app/[username]/page.tsx
// It receives the dynamic `username` from params and renders the profile + posts UI.

type Props = {
	params: {
		username: string;
	};
};

// Mock posts generator — in a real app fetch from your API using `username`.
function makePostsFor(username: string) {
	return [
		{
			id: 1,
			community: "f/programming",
			author: username,
			time: "4 hours ago",
			title: "What's your favorite programming language and why?",
			excerpt:
				"I'm curious to hear everyone's thoughts on programming languages. I've been using JavaScript for web development but thinking about learning Python.",
			votes: 342,
			comments: 89,
		},
		{
			id: 2,
			community: "f/photography",
			author: username,
			time: "2 days ago",
			title: "A quick photo from my walk",
			excerpt: "Took this while I was out exploring the neighborhood — colors were perfect.",
			votes: 124,
			comments: 12,
		},
	];
}

export default function ProfilePage({ params }: Props) {
	const { username } = params;

	// Replace with a real data fetch in production (server or client fetch)
	const user = {
		name: username.charAt(0).toUpperCase() + username.slice(1),
		handle: `@${username}`,
		bio: "Frontend developer. Coffee enthusiast. Building delightful UIs.",
		location: "India",
		joined: "Joined May 2022",
		avatarUrl: null,
		followers: 1280,
		following: 142,
		postsCount: 2,
	};

	const posts = makePostsFor(username);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Top purple header */}
			<header className="bg-[#6a2ded] text-white">
				<div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
					<div className="text-2xl font-semibold">Feeds-Central</div>
					<nav className="ml-6 flex items-center gap-4 opacity-90">
						<button className="px-3 py-1 rounded-md bg-white/10">Home</button>
						<button className="px-3 py-1 rounded-md bg-white/5">Communities</button>
					</nav>
					<div className="ml-auto flex items-center gap-4">
						<div className="relative">
							<input
								className="rounded-full py-2 px-4 w-[320px] text-sm bg-white/90 placeholder-gray-500"
								placeholder="Search Feeds-Central"
							/>
						</div>
						<div className="flex items-center gap-3">
							<button className="p-2">＋</button>
							<button className="p-2">🔔</button>
							<button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">{user.name.charAt(0)}</button>
						</div>
					</div>
				</div>
			</header>

			{/* Page body */}
			<main className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Left: Profile card */}
				<aside className="md:col-span-1">
					<div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
						<div className="flex items-center gap-4">
							<div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
								{user.avatarUrl ? (
									<img src={user.avatarUrl} alt="avatar" className="w-20 h-20 rounded-full" />
								) : (
									<span>{user.name.charAt(0)}</span>
								)}
							</div>
							<div>
								<h2 className="text-lg font-semibold">{user.name}</h2>
								<div className="text-sm text-gray-500">{user.handle}</div>
							</div>
						</div>

						<p className="mt-4 text-sm text-gray-600">{user.bio}</p>

						<div className="mt-4 flex gap-3 text-sm text-gray-600">
							<div>📍 {user.location}</div>
							<div>•</div>
							<div>{user.joined}</div>
						</div>

						<div className="mt-6 flex items-center gap-4">
							<button className="px-4 py-2 rounded-md bg-[#6a2ded] text-white">Edit profile</button>
							<button className="px-3 py-2 rounded-md border border-gray-200">Message</button>
						</div>

						<div className="mt-6 grid grid-cols-3 text-center">
							<div>
								<div className="text-lg font-semibold">{user.postsCount}</div>
								<div className="text-xs text-gray-500">Posts</div>
							</div>
							<div>
								<div className="text-lg font-semibold">{user.followers}</div>
								<div className="text-xs text-gray-500">Followers</div>
							</div>
							<div>
								<div className="text-lg font-semibold">{user.following}</div>
								<div className="text-xs text-gray-500">Following</div>
							</div>
						</div>
					</div>

					{/* small about box */}
					<div className="mt-6 bg-white rounded-2xl shadow-md p-4">
						<h3 className="text-sm font-semibold text-gray-700">About</h3>
						<p className="text-xs text-gray-500 mt-2">Software developer building accessible web apps. Loves open-source.</p>
					</div>
				</aside>

				{/* Right: Posts list */}
				<section className="md:col-span-2 space-y-6">
					<div className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
						<h3 className="font-semibold">Posts</h3>
						<select className="text-sm border rounded-md px-3 py-1">
							<option>Hot</option>
							<option>New</option>
							<option>Top</option>
						</select>
					</div>

					{posts.map((post) => (
						<article key={post.id} className="bg-white rounded-2xl shadow p-4 flex">
							{/* vote column */}
							<div className="w-14 flex flex-col items-center justify-start text-gray-600 pr-4 border-r border-gray-100">
								<button className="text-xl">▲</button>
								<div className="font-semibold mt-2">{post.votes}</div>
								<button className="mt-2 text-xl">▼</button>
							</div>

							<div className="pl-4 flex-1">
								<div className="text-xs text-[#6a2ded] font-medium">{post.community} • Posted by {post.author} • {post.time}</div>
								<h4 className="mt-2 font-semibold text-gray-800 text-lg">{post.title}</h4>
								<p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>

								<div className="mt-4 flex items-center gap-6 text-sm text-gray-500">
									<div>💬 {post.comments} Comments</div>
									<div>🔗 Share</div>
									<div>🔖 Save</div>
									<div className="ml-auto text-xs text-gray-400">...</div>
								</div>
							</div>
						</article>
					))}

					<div className="flex justify-center">
						<button className="px-4 py-2 rounded-md border border-gray-200">Load more</button>
					</div>
				</section>
			</main>

			<footer className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">© Feeds-Central</footer>
		</div>
	);
}

