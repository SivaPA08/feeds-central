'use client';

import { useState } from 'react';
import { Eye, EyeOff, Shield, Mail, Twitter } from 'lucide-react';

export default function LoginPage() {
	const [isLogin, setIsLogin] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		username: ''
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form submitted:', formData);

		if (!isLogin && formData.password !== formData.confirmPassword) {
			alert('Passwords do not match!');
			return;
		}
		// Add auth logic here
	};

	const toggleMode = () => {
		setIsLogin(!isLogin);
		setFormData({
			email: '',
			password: '',
			confirmPassword: '',
			username: ''
		});
	};

	return (
		<div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				{/* Header */}
				<div className="text-center">
					<div className="mx-auto h-12 w-12 bg-violet-600 rounded-full flex items-center justify-center mb-4">
						<Shield className="h-8 w-8 text-white" />
					</div>
					<h2 className="text-3xl font-bold text-gray-900">
						{isLogin ? 'Sign in to your account' : 'Create your account'}
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						{isLogin ? 'Welcome back!' : 'Join our community today'}
					</p>
				</div>

				{/* Form */}
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						{/* Username field for signup */}
						{!isLogin && (
							<div>
								<label htmlFor="username" className="block text-sm font-medium text-gray-700">
									Username
								</label>
								<input
									id="username"
									name="username"
									type="text"
									required={!isLogin}
									value={formData.username}
									onChange={handleInputChange}
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
									placeholder="Choose a username"
								/>
							</div>
						)}

						{/* Email field */}
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								value={formData.email}
								onChange={handleInputChange}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
								placeholder="Enter your email"
							/>
						</div>

						{/* Password field */}
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="mt-1 relative">
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									autoComplete={isLogin ? 'current-password' : 'new-password'}
									required
									value={formData.password}
									onChange={handleInputChange}
									className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
									placeholder="Enter your password"
								/>
								<button
									type="button"
									aria-label={showPassword ? 'Hide password' : 'Show password'}
									className="absolute inset-y-0 right-0 pr-3 flex items-center"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									) : (
										<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
									)}
								</button>
							</div>
						</div>

						{/* Confirm Password field for signup */}
						{!isLogin && (
							<div>
								<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
									Confirm Password
								</label>
								<div className="mt-1 relative">
									<input
										id="confirmPassword"
										name="confirmPassword"
										type={showConfirmPassword ? 'text' : 'password'}
										autoComplete="new-password"
										required={!isLogin}
										value={formData.confirmPassword}
										onChange={handleInputChange}
										className="block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 transition-colors"
										placeholder="Confirm your password"
									/>
									<button
										type="button"
										aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
										className="absolute inset-y-0 right-0 pr-3 flex items-center"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										{showConfirmPassword ? (
											<EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
										) : (
											<Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
										)}
									</button>
								</div>
							</div>
						)}
					</div>

					{/* Remember me / Forgot password */}
					{isLogin && (
						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
								/>
								<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
									Remember me
								</label>
							</div>
							<button type="button" className="text-sm text-violet-600 hover:text-violet-500 font-medium">
								Forgot password?
							</button>
						</div>
					)}

					{/* Submit button */}
					<div>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors"
						>
							{isLogin ? 'Sign in' : 'Create account'}
						</button>
					</div>

					{/* Social login options */}
					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-gray-500">Or continue with</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<button
								type="button"
								className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
							>
								<Mail className="h-5 w-5" />
								<span className="ml-2">Google</span>
							</button>

							<button
								type="button"
								className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors"
							>
								<Twitter className="h-5 w-5" />
								<span className="ml-2">Twitter</span>
							</button>
						</div>
					</div>

					{/* Toggle between login and signup */}
					<div className="text-center">
						<span className="text-sm text-gray-600">
							{isLogin ? "Don't have an account? " : 'Already have an account? '}
						</span>
						<button
							type="button"
							onClick={toggleMode}
							className="text-sm font-medium text-violet-600 hover:text-violet-500"
						>
							{isLogin ? 'Sign up' : 'Sign in'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

