// 'use client';

// import { Hero } from '@/components/Hero'
// import { Footer } from '@/components/Footer'
// import { useAuth } from '@/contexts/AuthContext';

// export default function Page() {
//   const { user } = useAuth();

//   return (
//     <>
//       <main>
//         {user && (
//           <div className="bg-gray-100 p-4 text-center">
//             <h1 className="text-xl font-semibold text-gray-800">
//               Welcome {user.displayName}
//             </h1>
//           </div>
//         )}
//         <Hero />
//       </main>
//       <Footer />
//     </>
//   )
// }

'use client';

import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';

export default function Page() {
  return (
    <>
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}