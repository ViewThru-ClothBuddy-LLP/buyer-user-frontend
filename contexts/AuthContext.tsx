// // contexts/AuthContext.tsx
// 'use client';

// import { createContext, useContext, useEffect, useState } from 'react';
// import { 
//   signInWithPopup,
//   signOut as firebaseSignOut,
//   onAuthStateChanged,
//   User
// } from 'firebase/auth';
// import { auth, googleProvider } from '@/lib/firebase';
// import { useRouter } from 'next/navigation';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   signInWithGoogle: () => Promise<void>;
//   signOut: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType>({
//   user: null,
//   loading: true,
//   signInWithGoogle: async () => {},
//   signOut: async () => {},
// });

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const signInWithGoogle = async () => {
//     try {
//       await signInWithPopup(auth, googleProvider);
//       router.push('/');
//     } catch (error) {
//       console.error('Error signing in with Google:', error);
//     }
//   };

//   const signOut = async () => {
//     try {
//       await firebaseSignOut(auth);
//       router.push('/');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);