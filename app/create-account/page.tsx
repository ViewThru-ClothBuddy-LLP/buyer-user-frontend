
"use client";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import { FaEye, FaEyeSlash, FaGooglePlusG, FaPhone } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth, googleProvider } from "../api/auth/firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

const LoginPage = () => {
    const router = useRouter();
    const [isActive, setIsActive] = useState(true); // Toggle between Sign Up and Sign In
    const [isResetPassword, setIsResetPassword] = useState(false); // Toggle for Reset Password form
    const [isOtpLogin, setIsOtpLogin] = useState(false); // Toggle for OTP login
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(""); // For OTP login
    const [otp, setOtp] = useState(""); // For OTP submission
    const [showPassword, setShowPassword] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null); // For OTP verification
    const recaptchaVerifierRef = useRef(null); // Ref to store RecaptchaVerifier instance

    // Initialize reCAPTCHA only once
    useEffect(() => {
        if (isOtpLogin && !recaptchaVerifierRef.current) {
            recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible', // Use invisible reCAPTCHA
            });
        }
    }, [isOtpLogin]);

    // Handle Sign Up
    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields!");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Sign Up successful!");
        } catch (error) {
            handleFirebaseError(error); // Handle Firebase errors
        }
    };

    // Handle Sign In with Email/Password
    const handleSignIn = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Please enter the valid Email Id!");
            return;
        }
        if (!password.trim()) {
            toast.error("Please enter the valid Password!");
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Sign In successful!");
            router.push('/');
        } catch (error) {
            handleFirebaseError(error); // Handle Firebase errors
        }
    };

    // Handle Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            toast.success("Google Sign In successful!");
            router.push('/');
        } catch (error) {
            handleFirebaseError(error); // Handle Firebase errors
        }
    };

    // Handle Forgot Password
    const handleForgotPassword = async () => {
        if (!email) {
            toast.error("Please enter your email!");
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent!");
            setIsResetPassword(false); // Go back to Sign In form after sending the email
        } catch (error) {
            handleFirebaseError(error); // Handle Firebase errors
        }
    };

    // Handle OTP Login
    const handleOtpLogin = async (e) => {
        e.preventDefault();
        if (!phoneNumber) {
            toast.error("Please enter your phone number!");
            return;
        }
        try {
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifierRef.current);
            setConfirmationResult(confirmation);
            toast.success("OTP sent to your phone!");
        } catch (error) {
            handleFirebaseError(error); // Handle Firebase errors
        }
    };

    // Handle OTP Submission
    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter the OTP!");
            return;
        }
        try {
            await confirmationResult.confirm(otp);
            toast.success("OTP verified! Sign In successful!");
            router.push('/');
        } catch (error) {
            handleFirebaseError(error); // Handle Firebase errors
        }
    };

    // Function to handle Firebase errors
    const handleFirebaseError = (error) => {
        switch (error.code) {
            case "auth/invalid-email":
                toast.error("Invalid email address. Please enter a valid email.");
                break;
            case "auth/user-not-found":
                toast.error("User not found. Please check your email or sign up.");
                break;
            case "auth/wrong-password":
                toast.error("Incorrect password. Please try again.");
                break;
            case "auth/email-already-in-use":
                toast.error("Email already in use. Please use a different email.");
                break;
            case "auth/weak-password":
                toast.error("Password is too weak. Please use a stronger password.");
                break;
            case "auth/too-many-requests":
                toast.error("Too many requests. Please try again later.");
                break;
            case "auth/network-request-failed":
                toast.error("Network error. Please check your internet connection.");
                break;
            case "auth/missing-password":
                toast.error("Password is required. Please enter your password.");
                break;
            case "auth/invalid-phone-number":
                toast.error("Invalid phone number. Please enter a valid phone number.");
                break;
            case "auth/invalid-verification-code":
                toast.error("Invalid OTP. Please enter the correct OTP.");
                break;
            case "auth/operation-not-allowed":
                toast.error("Phone authentication is not enabled. Please contact support.");
                break;
            case "auth/popup-closed-by-user":
                toast.error("Sign-in process canceled. Please try again.");
                break;
            default:
                toast.error("An error occurred. Please try again.");
                console.error("Firebase Error:", error.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className={`relative w-[768px] max-w-full min-h-[480px] bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-700 transform perspective-1000 ${isActive ? 'rotate-y-180' : ''}`}>
                
                {/* Sign-Up Form */}
                <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${isActive ? 'translate-x-full opacity-100 z-10' : 'opacity-0 z-0'}`}>
                    <form className="flex flex-col items-center justify-center h-full p-10" onSubmit={handleSignUp}>
                        <h1 className="text-black text-3xl font-bold">Create Account</h1>
                        
                        {/* Google Sign-In Icon Button */}
                        <button 
                            type="button" 
                            className="flex items-center justify-center w-12 h-12 mt-2 text-black bg-white-600 border-2 rounded-full hover:bg-blue-700" 
                            onClick={handleGoogleSignIn}
                        >
                            <FaGooglePlusG className="text-xl" />
                        </button>

                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" />
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" />
                        <div className="relative w-full">
                            <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" />
                            <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-800 rounded-lg hover:bg-black">Sign Up</button>

                        {/* Already have an account? Switch to Sign In */}
                        <p className="mt-3 text-sm text-gray-600">
                            Already have an account?{" "}
                            <button className="text-blue-500 underline" onClick={() => setIsActive(false)}>Sign In</button>
                        </p>
                    </form>
                </div>

                {/* Sign-In Form */}
                <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${isActive ? 'translate-x-full opacity-0 z-0' : 'opacity-100 z-10'}`}>
                    {isResetPassword ? (
                        // Reset Password Form
                        <div className="flex flex-col items-center justify-center h-full p-10">
                            <h1 className="text-3xl font-bold text-black">Reset Password</h1>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-black px-4 py-2 mt-2 border border-gray-300 rounded-lg" />
                            <button onClick={handleForgotPassword} className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Reset Password</button>
                            <button onClick={() => setIsResetPassword(false)} className="text-blue-500 text-sm mt-2 underline">Back to Login</button>
                        </div>
                    ) : isOtpLogin ? (
                        // OTP Login Form
                        <form className="flex flex-col items-center justify-center h-full p-10" onSubmit={confirmationResult ? handleOtpSubmit : handleOtpLogin}>
                            <h1 className="text-3xl font-bold text-black">Login with OTP</h1>
                            {!confirmationResult ? (
                                <>
                                    <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full text-black px-4 py-2 mt-2 border border-gray-300 rounded-lg" />
                                    <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Send OTP</button>
                                    <button type="button" onClick={() => setIsOtpLogin(false)} className="text-blue-500 text-sm mt-2 underline">Login with Email</button>
                                </>
                            ) : (
                                <>
                                    <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full text-black px-4 py-2 mt-2 border border-gray-300 rounded-lg" />
                                    <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Verify OTP</button>
                                </>
                            )}
                        </form>
                    ) : (
                        // Email/Password Login Form
                        <form className="flex flex-col items-center justify-center h-full p-10" onSubmit={handleSignIn}>
                            <h1 className="text-3xl font-bold text-black">Sign In</h1>
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-black px-4 py-2 mt-2 border border-gray-300 rounded-lg" />
                            <div className="relative w-full">
                                <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg" />
                                <button type="button" className="absolute inset-y-0 right-3 flex items-center text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            {/* Forgot Password Link */}
                            <button type="button" onClick={() => setIsResetPassword(true)} className="text-blue-500 text-sm mt-2 underline">Forgot Password?</button>
                            <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Sign In</button>

                            {/* Switch to OTP Login */}
                            <button type="button" onClick={() => setIsOtpLogin(true)} className="text-blue-500 text-sm mt-2 underline">Login with OTP</button>
                        </form>
                    )}
                </div>

                {/* Side Panel */}
                <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-[#1b3b57] text-white flex items-center justify-center transition-all duration-700 transform ${isActive ? 'translate-x-[-100%] rounded-r-[150px]' : 'rounded-l-[150px]'}`}>
                    <div className="text-center px-6">
                        <h1 className="text-3xl font-bold">{isActive ? 'Hello, Buddy!' : 'Welcome Back!'}</h1>
                        <p className="text-sm mt-2">{isActive ? 'Register with your personal details to use all site features' : 'Enter your details to use all site features'}</p>
                        <button className="px-4 py-2 mt-4 text-white bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30" onClick={() => setIsActive(!isActive)}>
                            {isActive ? 'Sign In' : 'Sign Up'}
                        </button>
                    </div>
                </div>
            </div>
            {/* reCAPTCHA Container */}
            <div id="recaptcha-container"></div>
        </div>
    );
};

export default LoginPage;














// "use client";
// import { Hero } from '@/components/Hero';
// import { Footer } from '@/components/Footer';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input"
// import Link from "next/link";

// -----------------------set go--------------------
// 'use client';

// import { useState } from 'react';
// import styles from "./LoginPage.module.css";
// import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { auth } from '../../app/api/auth/firebase'; // Import the Firebase auth instance
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//     const router = useRouter();
//     const [isActive, setIsActive] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
    

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         try {
//             await createUserWithEmailAndPassword(auth, email, password);
//             // Handle successful sign-up (e.g., redirect to a different page)
//             alert('Sign Up Successful!');
//         } catch (error) {
//             console.error("Error during sign up:", error);
//             alert(error.message);
//         }
//     };

//     const handleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             // Handle successful sign-in (e.g., redirect to a different page)
//             alert('Sign In Successful!');
//             router.push('/')
//         } catch (error) {
//             console.error("Error during sign in:", error);
//             alert(error.message);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200">
//             <div className={`relative w-[768px] max-w-full min-h-[480px] bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-700 transform ${isActive ? 'rotate-y-180' : ''}`}>
                
//                 {/* Sign Up Form */}
//                 <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${isActive ? 'translate-x-full opacity-100 z-10' : 'opacity-0 z-0'}`}>
//                     <form className="flex flex-col items-center justify-center h-full p-10" onSubmit={handleSignUp}>
//                         <h1 className="text-black text-3xl font-bold">Create Account</h1>
//                         <div className="flex space-x-3 my-4">
//                             {[FaGooglePlusG, FaFacebookF].map((Icon, idx) => (
//                                 <div key={idx} className="p-2 border-2 border-gray-300 rounded-full hover:border-blue-500">
//                                     <Icon className="w-6 h-6 text-gray-700" />
//                                 </div>
//                             ))}
//                         </div>
//                         <span className="text-sm">or use your email for registration</span>
//                         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                         <div className="relative w-full">
//                             <input 
//                                 type={showPassword ? "text" : "password"} 
//                                 placeholder="Password" 
//                                 value={password} onChange={(e) => setPassword(e.target.value)}
//                                 className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                             <button 
//                                 type="button" 
//                                 className="absolute inset-y-0 right-3 flex items-center text-gray-500" 
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                             </button>
//                         </div>
//                         <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Sign Up</button>
//                     </form>
//                 </div>
                
//                 {/* Sign In Form */}
//                 <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${isActive ? 'translate-x-full opacity-0 z-0' : 'opacity-100 z-10'}`}>
//                     <form className="flex flex-col items-center justify-center h-full p-10" onSubmit={handleSignIn}>
//                         <h1 className="text-3xl font-bold text-black">Sign In</h1>
//                         <div className="flex space-x-3 my-4">
//                             {[FaGooglePlusG, FaFacebookF].map((Icon, idx) => (
//                                 <div key={idx} className="p-2 border-2 border-gray-300 rounded-full hover:border-blue-500">
//                                     <Icon className="w-6 h-6 text-gray-700" />
//                                 </div>
//                             ))}
//                         </div>
//                         <span className="text-sm text-black">or use your email password</span>
//                         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                         <div className="relative w-full">
//                             <input 
//                                 type={showPassword ? "text" : "password"} 
//                                 placeholder="Password" 
//                                 value={password} onChange={(e) => setPassword(e.target.value)}
//                                 className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                             <button 
//                                 type="button" 
//                                 className="absolute inset-y-0 right-3 flex items-center text-gray-500" 
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                             </button>
//                         </div>
//                         <a href="#" className="text-xs text-black mt-2">Forgot Your Password?</a>
//                         <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Sign In</button>
//                     </form>
//                 </div>
                
//                 {/* Toggle Panel */}
//                 <div
//                   className={`absolute top-0 left-1/2 w-1/2 h-full bg-black text-white flex items-center justify-center transition-all duration-700 transform ${isActive ? 'translate-x-[-100%] rounded-r-[150px]' : 'rounded-l-[150px]'}`}
//                   style={{ zIndex: 1000 }}
//                 >
//                     <div className="text-center px-6">
//                         <h1 className="text-3xl font-bold">{isActive ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
//                         <p className="text-sm mt-2">{isActive ? 'Register with your personal details to use all of site features' : 'Enter your personal details to use all of site features'}</p>
//                         <button 
//                             className="px-4 py-2 mt-4 text-white bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30" 
//                             onClick={() => setIsActive(!isActive)}
//                         >
//                             {isActive ? 'Sign In' : 'Sign Up'}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// 'use client';

// import { useState } from 'react';
// import styles from "./LoginPage.module.css";
// import { FaGooglePlusG, FaFacebookF, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { auth } from '../../app/api/auth/firebase'; // Import the Firebase auth instance
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { useRouter } from 'next/navigation';

// export default function LoginPage() {
//     const router = useRouter();
//     const [isActive, setIsActive] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
    
//     const googleProvider = new GoogleAuthProvider();

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         try {
//             await createUserWithEmailAndPassword(auth, email, password);
//             alert('Sign Up Successful! login please');

//         } catch (error) {
//             console.error("Error during sign up:", error);
//             alert(`something went wrong`);
//         }
//     };

//     const handleSignIn = async (e) => {
//         e.preventDefault();
//         try {
//             await signInWithEmailAndPassword(auth, email, password);
//             alert('Sign In Successful!');
//             router.push('/');
//         } catch (error) {
//             console.error("Error during sign in:", error);
//             alert(`something went wrong`);
//         }
//     };

//     const handleGoogleSignIn = async () => {
//         try {
//             const result = await signInWithPopup(auth, googleProvider);
//             const user = result.user;
//             if (user) {
//                 alert(`Sign In Successful! Welcome ${user.displayName}`);
//                 router.push('/'); // Redirect to the homepage after sign-in
//             } else {
//                 alert("User authentication failed. Please try again.");
//             }
//         } catch (error) {
//             console.error("Error during Google sign in:", error);
//             alert("Google Sign In failed: " + error.message);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-200 to-blue-200">
//             <div className={`relative w-[768px] max-w-full min-h-[480px] bg-white rounded-3xl shadow-lg overflow-hidden transition-all duration-700 transform ${isActive ? 'rotate-y-180' : ''}`}>
//                 {/* Sign Up Form */}
//                 <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${isActive ? 'translate-x-full opacity-100 z-10' : 'opacity-0 z-0'}`}>
//                     <form className="flex flex-col items-center justify-center h-full p-10" onSubmit={handleSignUp}>
//                         <h1 className="text-black text-3xl font-bold">Create Account</h1>
//                         <div className="flex space-x-3 my-4">
//                             <div className="p-2 border-2 border-gray-300 rounded-full hover:border-blue-500" onClick={handleGoogleSignIn}>
//                                 <FaGooglePlusG className="w-6 h-6 text-gray-700" />
//                             </div>
//                         </div>
//                         <span className="text-sm">or use your email for registration</span>
//                         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                         <div className="relative w-full">
//                             <input 
//                                 type={showPassword ? "text" : "password"} 
//                                 placeholder="Password" 
//                                 value={password} onChange={(e) => setPassword(e.target.value)}
//                                 className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                             <button 
//                                 type="button" 
//                                 className="absolute inset-y-0 right-3 flex items-center text-gray-500" 
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                             </button>
//                         </div>
//                         <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Sign Up</button>
//                     </form>
//                 </div>
                
//                 {/* Sign In Form */}
//                 <div className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-700 ${isActive ? 'translate-x-full opacity-0 z-0' : 'opacity-100 z-10'}`}>
//                     <form className="flex flex-col items-center justify-center h-full p-10" onSubmit={handleSignIn}>
//                         <h1 className="text-3xl font-bold text-black">Sign In</h1>
//                         <div className="flex space-x-3 my-4">
//                             <div className="p-2 border-2 border-gray-300 rounded-full hover:border-blue-500" onClick={handleGoogleSignIn}>
//                                 <FaGooglePlusG className="w-6 h-6 text-gray-700" />
//                             </div>
//                         </div>
//                         <span className="text-sm text-black">or use your email password</span>
//                         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full text-black px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
//                         <div className="relative w-full">
//                             <input 
//                                 type={showPassword ? "text" : "password"} 
//                                 placeholder="Password" 
//                                 value={password} onChange={(e) => setPassword(e.target.value)}
//                                 className="text-black w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//                             />
//                             <button 
//                                 type="button" 
//                                 className="absolute inset-y-0 right-3 flex items-center text-gray-500" 
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//                             </button>
//                         </div>
//                         <a href="#" className="text-xs text-black mt-2">Forgot Your Password?</a>
//                         <button type="submit" className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">Sign In</button>
//                     </form>
//                 </div>
                
//                 {/* Toggle Panel */}
//                 <div
//                   className={`absolute top-0 left-1/2 w-1/2 h-full bg-black text-white flex items-center justify-center transition-all duration-700 transform ${isActive ? 'translate-x-[-100%] rounded-r-[150px]' : 'rounded-l-[150px]'}`}
//                   style={{ zIndex: 1000 }}
//                 >
//                     <div className="text-center px-6">
//                         <h1 className="text-3xl font-bold">{isActive ? 'Hello, Friend!' : 'Welcome Back!'}</h1>
//                         <p className="text-sm mt-2">{isActive ? 'Register with your personal details to use all of site features' : 'Enter your personal details to use all of site features'}</p>
//                         <button 
//                             className="px-4 py-2 mt-4 text-white bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30" 
//                             onClick={() => setIsActive(!isActive)}
//                         >
//                             {isActive ? 'Sign In' : 'Sign Up'}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



