// FILE: app/[username]/post/[postId]/page.tsx
// Place this file at: app/[username]/post/[postId]/page.tsx

"use client";

import React, { useState } from "react";

type PostParams = {
	params: {
		username: string;
		postId: string;
	};
};

// Mock fetch — replace with a real API call (e.g. fetch(`/api/users/${username}/posts/${postId}`))
function fetchPost(username: string, postId: string) {
	// validate: must start with '1020' followed by digits
	if (!/^1020\d+$/.test(postId)) return null;

	return {
		id: postId,
		community: "f/programming",
		author: username,
		time: "3 hours ago",
		title: `Example post #${postId} by ${username}`,
		content:
			"This is an example post content. You can replace this with markdown-rendered text, images, or links.\n\n- point one\n- point two",
		votes: 420,
		comments: [
			{ id: "c1", author: "alice", text: "Great post!", time: "2h" },
			{ id: "c2", author: "bob", text: "Thanks for sharing.", time: "1h" },
		],
	};
}

export default function PostPage({ params }: PostParams) {
	const { username, postId } = params;
	const post = fetchPost(username, postId);

	// If post is null (invalid id pattern or not found) show a 404-like UI
	if (!post) {
		return (
			<div className="min-h-screen bg-gray-50">
				<header className="bg-[#6a2ded] text-white">
					<div className="max-w-6xl mx-auto px-6 py-4">
						<div className="text-2xl font-semibold">Feeds-Central</div>
					</div>
				</header>

				<main className="max-w-4xl mx-auto px-6 py-20 text-center">
					<h1 className="text-3xl font-bold">404 — Post not found</h1>
					<p className="mt-4 text-gray-600">
						We couldn't find a post with id <span className="font-mono">{postId}</span>.
					</p>
					<p className="mt-2 text-gray-500">
						Post IDs must start with <span className="font-medium">1020</span>.
					</p>
					<div className="mt-6">
						<a href={`/${username}`} className="text-[#6a2ded]">
							Back to {username}'s profile
						</a>
					</div>
				</main>

				<footer className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">© Feeds-Central</footer>
			</div>
		);
	}

	const [vote, setVote] = useState<number>(post.votes);
	const [comments, setComments] = useState(post.comments);
	const [newComment, setNewComment] = useState("");

	function addComment() {
		if (!newComment.trim()) return;
		const c = { id: `c${Date.now()}`, author: "you", text: newComment.trim(), time: "just now" };
		setComments((s) => [c, ...s]);
		setNewComment("");
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="bg-[#6a2ded] text-white">
				<div className="max-w-6xl mx-auto px-6 py-4">
					<div className="text-2xl font-semibold">Feeds-Central</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-6 py-8">
				<nav className="text-sm text-gray-500 mb-4">
					<a href={`/${username}`} className="text-[#6a2ded] font-medium">
						{username}
					</a>
					<span className="mx-2">/</span>
					<span>post #{postId}</span>
				</nav>

				<article className="bg-white rounded-2xl shadow p-6">
					<div className="flex items-start gap-6">
						<div className="w-14 flex flex-col items-center text-gray-600 pr-4 border-r border-gray-100">
							<button className="text-xl" onClick={() => setVote((v) => v + 1)}>
								▲
							</button>
							<div className="font-semibold mt-2">{vote}</div>
							<button className="mt-2 text-xl" onClick={() => setVote((v) => v - 1)}>
								▼
							</button>
						</div>

						<div className="flex-1">
							<div className="text-xs text-[#6a2ded] font-medium">
								{post.community} • Posted by {post.author} • {post.time}
							</div>
							<h1 className="mt-2 font-bold text-2xl text-gray-800">{post.title}</h1>

							<div className="mt-4 text-gray-700 whitespace-pre-line">{post.content}</div>

							<div className="mt-6 flex items-center gap-6 text-sm text-gray-500">
								<div>💬 {comments.length} Comments</div>
								<div>🔗 Share</div>
								<div>🔖 Save</div>
							</div>
						</div>
					</div>
				</article>

				{/* Comments section */}
				<section className="mt-6">
					<div className="bg-white rounded-2xl shadow p-4">
						<h3 className="font-semibold">Comments</h3>

						<div className="mt-4">
							<textarea
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								className="w-full rounded-md border p-3 text-sm"
								placeholder="Add a comment..."
								rows={3}
							/>

							<div className="mt-3 flex justify-end">
								<button className="px-4 py-2 rounded-md bg-[#6a2ded] text-white" onClick={addComment}>
									Comment
								</button>
							</div>
						</div>

						<div className="mt-6 space-y-4">
							{comments.map((c: any) => (
								<div key={c.id} className="flex gap-4">
									<div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
										{c.author.charAt(0)}
									</div>
									<div>
										<div className="text-sm font-medium">
											{c.author} <span className="text-xs text-gray-400">• {c.time}</span>
										</div>
										<div className="text-sm text-gray-700">{c.text}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</main>

			<footer className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-500">© Feeds-Central</footer>
		</div>
	);
}

