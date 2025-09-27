'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const LoginPage = () => {
    const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
        rememberMe: false
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        if (loginType === 'email') {
            if (!formData.email) {
                newErrors.email = '請輸入電子郵件';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = '請輸入有效的電子郵件格式';
            }
        } else {
            if (!formData.phone) {
                newErrors.phone = '請輸入手機號碼';
            } else if (!/^09\d{8}$/.test(formData.phone)) {
                newErrors.phone = '請輸入有效的手機號碼格式';
            }
        }

        if (!formData.password) {
            newErrors.password = '請輸入密碼';
        } else if (formData.password.length < 6) {
            newErrors.password = '密碼至少需要6個字符';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Handle login logic here
            console.log('Login data:', formData);
        }
    };

    const handleSocialLogin = (provider: 'google' | 'line') => {
        // Handle social login logic here
        console.log(`Login with ${provider}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-md w-full space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            歡迎回來
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            登入您的帳戶以繼續購物
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white py-8 px-6 shadow-xl rounded-2xl">
                        {/* Login Type Toggle */}
                        <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                            <button
                                type="button"
                                onClick={() => setLoginType('email')}
                                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${loginType === 'email'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                電子郵件
                            </button>
                            <button
                                type="button"
                                onClick={() => setLoginType('phone')}
                                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${loginType === 'phone'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                手機號碼
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email/Phone Input */}
                            <div>
                                <label htmlFor={loginType} className="block text-sm font-medium text-gray-700 mb-2">
                                    {loginType === 'email' ? '電子郵件' : '手機號碼'}
                                </label>
                                <input
                                    id={loginType}
                                    name={loginType}
                                    type={loginType === 'email' ? 'email' : 'tel'}
                                    value={loginType === 'email' ? formData.email : formData.phone}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors[loginType] ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder={loginType === 'email' ? '請輸入您的電子郵件' : '請輸入手機號碼'}
                                />
                                {errors[loginType] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[loginType]}</p>
                                )}
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    密碼
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                    placeholder="請輸入您的密碼"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="rememberMe"
                                        name="rememberMe"
                                        type="checkbox"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                        記住我
                                    </label>
                                </div>
                                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 transition-colors">
                                    忘記密碼？
                                </Link>
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                登入
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">或使用以下方式登入</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="mt-6 space-y-3">
                            {/* Google Login */}
                            <button
                                onClick={() => handleSocialLogin('google')}
                                className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                使用 Google 登入
                            </button>

                            {/* LINE Login */}
                            <button
                                onClick={() => handleSocialLogin('line')}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .63.285.63.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                                </svg>
                                使用 LINE 登入
                            </button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                還沒有帳戶？{' '}
                                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                    立即註冊
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default LoginPage;