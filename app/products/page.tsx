// 'use client';
// import { Checkbox } from "@/components/ui/checkbox";
// import { useEffect, useState } from 'react';
// import { Suspense } from "react";
// import { useMediaQuery } from 'react-responsive';
// import { productList } from '@/constants/productData';
// import { ScrollArea } from "@/components/ui/scroll-area";
// import Products from "./Products";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// const productFilters = [
//   { name: 'Product Type', availableFilters: ['Casual', 'Denim', 'Formals'] },
//   { name: 'Trend', availableFilters: ['Graphics', 'Korean', 'Formal Attire', 'Opium'] },
//   { name: 'Sleeve Type', availableFilters: ['Full Sleeve', 'Half Sleeve', 'Regular', 'Short', 'Short Sleeves'] },
//   { name: 'Size', availableFilters: ['S', 'M', 'L', 'XL', '2XL', '3XL'] },
//   { name: 'Fit', availableFilters: ['Box Fit', 'Loose Fit', 'Oversized', 'Printed'] },
//   { name: 'Color', availableFilters: ['Black', 'White', 'Blue', 'Red', 'Green', 'Yellow', 'Grey', 'Brown', 'Purple', 'Orange'] },
// ];

// export default function Men() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

//   const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
//   const [showApply, setShowApply] = useState<{ [key: string]: boolean }>({});

//   // Convert spaces to underscores for storage & URL
//   const formatForStorage = (text: string) => text.replace(/\s+/g, '_').toLowerCase();

//   // Convert back to normal display format
//   const formatForDisplay = (text: string) => text.replace(/_/g, ' ');

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     let filters: { [key: string]: string[] } = {};

//     productFilters.forEach(({ name }) => {
//       const formattedCategory = formatForStorage(name);
//       const paramValue = params.get(formattedCategory);
//       if (paramValue) {
//         filters[formattedCategory] = paramValue.split(','); // Convert URL string back to array
//       }
//     });

//     setSelectedFilters(filters);
//   }, [searchParams]);

//   // Handle checkbox selection
//   const handleCheckboxChange = (category: string, option: string) => {
//     const formattedCategory = formatForStorage(category);

//     setSelectedFilters((prevFilters) => {
//       const selectedOptions = prevFilters[formattedCategory] || [];
//       const updatedOptions = selectedOptions.includes(option)
//         ? selectedOptions.filter((item) => item !== option)
//         : [...selectedOptions, option];

//       setShowApply((prev) => ({
//         ...prev,
//         [formattedCategory]: updatedOptions.length > 0,
//       }));

//       return { ...prevFilters, [formattedCategory]: updatedOptions };
//     });
//   };

//   // Apply filters by updating the URL and making an API call
//   const applyFilters = (category: string) => {
//     const formattedCategory = formatForStorage(category);
//     const params = new URLSearchParams(searchParams.toString());

//     if (selectedFilters[formattedCategory]?.length) {
//       params.set(formattedCategory, selectedFilters[formattedCategory].join(','));
//     } else {
//       params.delete(formattedCategory);
//     }

//     router.push(`${pathname}?${params.toString()}`, { scroll: false });

//     setShowApply({});
//   };

//   return (
//     <Suspense fallback={<div>Loading...</div>}>

//       <div className="sm:px-auto mx-auto mt-28 pb-4 text-black md:mt-16">
//         <div className="relative flex items-stretch gap-3">
//           <div className="sticky top-20 left-0 h-[calc(100vh-5rem)] overflow-auto w-[20%]">
//             <ScrollArea className="h-full pr-1">
//               <div className="flex flex-col">
//                 <div className='px-3 flex flex-wrap justify-between items-center'>
//                   <p className='font-bold tracking-wide text-sm'>FILTERS</p>
//                   <button
//                     className='text-[#083554] text-[12px] font-semibold hover:text-[#4a6e8d]'
//                     type="button"
//                     onClick={() => {
//                       setSelectedFilters({});
//                       setShowApply({});
//                       router.push(pathname, { scroll: false });
//                     }}
//                   >
//                     CLEAR ALL
//                   </button>
//                 </div>

//                 <div className='mt-1 border-r border-t border-b border-[#f0e0e0]'>
//                   {productFilters.map((item, index) => {
//                     const formattedCategory = formatForStorage(item.name); // Convert for storage

//                     return (
//                       <div className='p-2 px-3' key={index}>
//                         <div className='flex justify-between'>
//                           <p className='text-[13px] text-[#083554] tracking-wide font-semibold'>
//                             {formatForDisplay(item.name).toUpperCase()} {/* Convert back for UI */}
//                           </p>

//                           {/* Show "Apply" button only if filters exist */}
//                           {showApply[formattedCategory] && (
//                             <button
//                               className='rounded-sm tracking-wide font-semibold text-[10px] bg-[#083554] text-white px-2 py-1 hover:bg-[#4a6e8d] transition-all'
//                               type="button"
//                               onClick={() => applyFilters(item.name)}
//                             >
//                               APPLY
//                             </button>
//                           )}
//                         </div>

//                         <div className="flex flex-col gap-1 items-start mt-[2px]">
//                           {item.availableFilters.map((filter, i) => (
//                             <div className="flex gap-1 items-center" key={i}>
//                               <Checkbox
//                                 checked={selectedFilters[formattedCategory]?.includes(filter) || false}
//                                 onCheckedChange={() => handleCheckboxChange(item.name, filter)}
//                                 className="data-[state=checked]:bg-[#083554] h-3 w-3 before:w-1.5 before:h-1.5"
//                               />
//                               <button onClick={() => handleCheckboxChange(item.name, filter)} type="button" className="cursor-pointer tracking-wide text-[12px]">{filter}</button>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </ScrollArea>
//           </div>

//           <div className="flex-1 w-full py-4">
//             <Products products={productList} />
//           </div>
//         </div>
//       </div>
//     </Suspense>
//   );
// }

"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState, Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { productList } from "@/constants/productData";
import { ScrollArea } from "@/components/ui/scroll-area";
import Products from "./Products";
import { usePathname, useRouter } from "next/navigation";

const productFilters = [
  { name: "Product Type", availableFilters: ["Casual", "Denim", "Formals"] },
  { name: "Trend", availableFilters: ["Graphics", "Korean", "Formal Attire", "Opium"] },
  { name: "Sleeve Type", availableFilters: ["Full Sleeve", "Half Sleeve", "Regular", "Short", "Short Sleeves"] },
  { name: "Size", availableFilters: ["S", "M", "L", "XL", "2XL", "3XL"] },
  { name: "Fit", availableFilters: ["Box Fit", "Loose Fit", "Oversized", "Printed"] },
  { name: "Color", availableFilters: ["Black", "White", "Blue", "Red", "Green", "Yellow", "Grey", "Brown", "Purple", "Orange"] },
];

export default function Men() {
  const router = useRouter();
  const pathname = usePathname();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [showApply, setShowApply] = useState<{ [key: string]: boolean }>({});

  // Convert spaces to underscores for storage & URL
  const formatForStorage = (text: string) => text.replace(/\s+/g, "_").toLowerCase();

  // Convert back to normal display format
  const formatForDisplay = (text: string) => text.replace(/_/g, " ");

  useEffect(() => {
    // Read query params manually from window.location
    const params = new URLSearchParams(window.location.search);
    let filters: { [key: string]: string[] } = {};

    productFilters.forEach(({ name }) => {
      const formattedCategory = formatForStorage(name);
      const paramValue = params.get(formattedCategory);
      if (paramValue) {
        filters[formattedCategory] = paramValue.split(","); // Convert URL string back to array
      }
    });

    setSelectedFilters(filters);
  }, []);

  // Handle checkbox selection
  const handleCheckboxChange = (category: string, option: string) => {
    const formattedCategory = formatForStorage(category);

    setSelectedFilters((prevFilters) => {
      const selectedOptions = prevFilters[formattedCategory] || [];
      const updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((item) => item !== option)
        : [...selectedOptions, option];

      setShowApply((prev) => ({
        ...prev,
        [formattedCategory]: updatedOptions.length > 0,
      }));

      return { ...prevFilters, [formattedCategory]: updatedOptions };
    });
  };

  // Apply filters by updating the URL and making an API call
  const applyFilters = (category: string) => {
    const formattedCategory = formatForStorage(category);
    const params = new URLSearchParams(window.location.search);

    if (selectedFilters[formattedCategory]?.length) {
      params.set(formattedCategory, selectedFilters[formattedCategory].join(","));
    } else {
      params.delete(formattedCategory);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setShowApply({});
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="sm:px-auto mx-auto mt-28 pb-4 text-black md:mt-16">
        <div className="relative flex items-stretch gap-3">
          <div className="sticky top-20 left-0 h-[calc(100vh-5rem)] overflow-auto w-[20%]">
            <ScrollArea className="h-full pr-1">
              <div className="flex flex-col">
                <div className="px-3 flex flex-wrap justify-between items-center">
                  <p className="font-bold tracking-wide text-sm">FILTERS</p>
                  <button
                    className="text-[#083554] text-[12px] font-semibold hover:text-[#4a6e8d]"
                    type="button"
                    onClick={() => {
                      setSelectedFilters({});
                      setShowApply({});
                      router.push(pathname, { scroll: false });
                    }}
                  >
                    CLEAR ALL
                  </button>
                </div>

                <div className="mt-1 border-r border-t border-b border-[#f0e0e0]">
                  {productFilters.map((item, index) => {
                    const formattedCategory = formatForStorage(item.name);

                    return (
                      <div className="p-2 px-3" key={index}>
                        <div className="flex justify-between">
                          <p className="text-[13px] text-[#083554] tracking-wide font-semibold">
                            {formatForDisplay(item.name).toUpperCase()}
                          </p>

                          {showApply[formattedCategory] && (
                            <button
                              className="rounded-sm tracking-wide font-semibold text-[10px] bg-[#083554] text-white px-2 py-1 hover:bg-[#4a6e8d] transition-all"
                              type="button"
                              onClick={() => applyFilters(item.name)}
                            >
                              APPLY
                            </button>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 items-start mt-[2px]">
                          {item.availableFilters.map((filter, i) => (
                            <div className="flex gap-1 items-center" key={i}>
                              <Checkbox
                                checked={selectedFilters[formattedCategory]?.includes(filter) || false}
                                onCheckedChange={() => handleCheckboxChange(item.name, filter)}
                                className="data-[state=checked]:bg-[#083554] h-3 w-3 before:w-1.5 before:h-1.5"
                              />
                              <button
                                onClick={() => handleCheckboxChange(item.name, filter)}
                                type="button"
                                className="cursor-pointer tracking-wide text-[12px]"
                              >
                                {filter}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollArea>
          </div>

          <div className="flex-1 w-full py-4">
            <Products products={productList} />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

