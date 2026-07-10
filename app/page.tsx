// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
// //       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={100}
// //           height={20}
// //           priority
// //         />
// //         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
// //           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
// //             To get started, edit the page.tsx file.
// //           </h1>
// //           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
// //             Looking for a starting point or more instructions? Head over to{" "}
// //             <a
// //               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Templates
// //             </a>{" "}
// //             or the{" "}
// //             <a
// //               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //               className="font-medium text-zinc-950 dark:text-zinc-50"
// //             >
// //               Learning
// //             </a>{" "}
// //             center.
// //           </p>
// //         </div>
// //         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
// //           <a
// //             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={16}
// //               height={16}
// //             />
// //             Deploy Now
// //           </a>
// //           <a
// //             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Documentation
// //           </a>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }














// // // // "use client";
// // // // import { useState, useEffect, useRef } from "react";

// // // // const STYLES = [
// // // //   "Bold & High Contrast",
// // // //   "Clean & Minimal",
// // // //   "Real Estate",
// // // //   "Construction",
// // // //   "Retail & Sale",
// // // //   "Outdoor / Weather Proof",
// // // // ];

// // // // export default function DesignerPage() {
// // // //   const [prompt, setPrompt] = useState("");
// // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [imageUrl, setImageUrl] = useState("");
// // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // //   // --- Dynamic Iframe Height Synchronizer ---
// // // //   useEffect(() => {
// // // //     const sendHeight = () => {
// // // //       if (containerRef.current) {
// // // //         // Capture the full footprint of the content element
// // // //         const height = containerRef.current.scrollHeight;
// // // //         window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // //       }
// // // //     };

// // // //     // 1. Send initial layout height
// // // //     sendHeight();

// // // //     // 2. Handle window or container resizing
// // // //     window.addEventListener("resize", sendHeight);

// // // //     // 3. Observe changes (e.g., loading state turning on, image arriving)
// // // //     const observer = new MutationObserver(sendHeight);
// // // //     if (containerRef.current) {
// // // //       observer.observe(containerRef.current, {
// // // //         attributes: true,
// // // //         childList: true,
// // // //         subtree: true,
// // // //       });
// // // //     }

// // // //     return () => {
// // // //       window.removeEventListener("resize", sendHeight);
// // // //       observer.disconnect();
// // // //     };
// // // //   }, []);
// // // //   // ------------------------------------------

// // // //   const handleGenerate = async () => {
// // // //     if (!prompt || !selectedStyle) return;
// // // //     setLoading(true);
// // // //     setImageUrl("");

// // // //     // Placeholder — real Gemini call goes here later
// // // //     await new Promise((r) => setTimeout(r, 2000));
// // // //     setImageUrl("https://placehold.co/800x600/1a56a0/ffffff?text=AI+Generated+Sign");
// // // //     setLoading(false);
// // // //   };

// // // //   return (
// // // //     // Replaced min-screen wrapper to allow fluid inline fitting within Shopify 
// // // //     // <div ref={containerRef} className="bg-transparent overflow-hidden">
// // // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full">
          
// // // //       {/* Header */}
// // // //       <div className="bg-white border-b border-gray-200 px-6 py-4">
// // // //         <h1 className="text-xl font-bold text-gray-900">AI Sign Designer</h1>
// // // //         <p className="text-sm text-gray-500 mt-0.5">
// // // //           Describe your sign and let AI generate a starting design for you
// // // //         </p>
// // // //       </div>

// // // //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

// // // //         {/* Step 1 - Prompt */}
// // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
// // // //           <div className="flex items-center gap-2">
// // // //             <span className="bg-blue-600 text-white text-xs font-bold 
// // // //             rounded-full w-5 h-5 flex items-center justify-center">1</span>
// // // //             <h2 className="font-semibold text-gray-800">Describe your sign</h2>
// // // //           </div>
// // // //           <textarea
// // // //             rows={3}
// // // //             value={prompt}
// // // //             onChange={(e) => setPrompt(e.target.value)}
// // // //             placeholder="e.g. Bold red and white open house sign for a real estate agent, Saturday 10am–12pm, 123 Example Street"
// // // //             className="w-full border border-gray-300 rounded-lg px-4 py-3 
// // // //             text-sm text-gray-800 placeholder-gray-400 resize-none
// // // //             focus:outline-none focus:ring-2 focus:ring-blue-500"
// // // //           />
// // // //           <p className="text-xs text-gray-400">
// // // //             The more detail you give, the better the result.
// // // //           </p>
// // // //         </div>

// // // //         {/* Step 2 - Style */}
// // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
// // // //           <div className="flex items-center gap-2">
// // // //             <span className="bg-blue-600 text-white text-xs font-bold 
// // // //             rounded-full w-5 h-5 flex items-center justify-center">2</span>
// // // //             <h2 className="font-semibold text-gray-800">Pick a style</h2>
// // // //           </div>
// // // //           <div className="flex flex-wrap gap-2">
// // // //             {STYLES.map((style) => (
// // // //               <button
// // // //                 key={style}
// // // //                 onClick={() => setSelectedStyle(style)}
// // // //                 className={`px-4 py-2 rounded-full text-sm font-medium border 
// // // //                 transition-all duration-150
// // // //                 ${selectedStyle === style
// // // //                   ? "bg-blue-600 text-white border-blue-600"
// // // //                   : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
// // // //                 }`}
// // // //               >
// // // //                 {style}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         {/* Generate Button */}
// // // //         <button
// // // //           onClick={handleGenerate}
// // // //           disabled={!prompt || !selectedStyle || loading}
// // // //           className={`w-full py-3 rounded-xl font-semibold text-white 
// // // //           transition-all duration-150
// // // //           ${!prompt || !selectedStyle || loading
// // // //             ? "bg-gray-300 cursor-not-allowed"
// // // //             : "bg-blue-600 hover:bg-blue-700 active:scale-95"
// // // //           }`}
// // // //         >
// // // //           {loading ? "Generating your design..." : "Generate Design"}
// // // //         </button>

// // // //         {/* Loading State */}
// // // //         {loading && (
// // // //           <div className="bg-white rounded-xl border border-gray-200 p-8 
// // // //           flex flex-col items-center justify-center gap-3">
// // // //             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent 
// // // //             rounded-full animate-spin" />
// // // //             <p className="text-sm text-gray-500">
// // // //               AI is generating your sign design...
// // // //             </p>
// // // //           </div>
// // // //         )}

// // // //         {/* Preview */}
// // // //         {imageUrl && !loading && (
// // // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
// // // //             <div className="flex items-center gap-2">
// // // //               <span className="bg-blue-600 text-white text-xs font-bold 
// // // //               rounded-full w-5 h-5 flex items-center justify-center">3</span>
// // // //               <h2 className="font-semibold text-gray-800">Your generated design</h2>
// // // //             </div>

// // // //             <img
// // // //               src={imageUrl}
// // // //               alt="Generated sign design"
// // // //               className="w-full rounded-lg border border-gray-100"
// // // //             />

// // // //             <div className="flex gap-3">
// // // //               <button
// // // //                 onClick={handleGenerate}
// // // //                 className="flex-1 py-2.5 rounded-lg border border-gray-300 
// // // //                 text-sm font-medium text-gray-700 hover:bg-gray-50 
// // // //                 transition-all duration-150"
// // // //               >
// // // //                 Regenerate
// // // //               </button>
// // // //               <button
// // // //                 className="flex-1 py-2.5 rounded-lg bg-blue-600 
// // // //                 text-sm font-medium text-white hover:bg-blue-700 
// // // //                 transition-all duration-150"
// // // //               >
// // // //                 Use This Design →
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }










// // // "use client";
// // // import { useState, useEffect, useRef } from "react";

// // // const STYLES = [
// // //   "Bold & High Contrast",
// // //   "Clean & Minimal",
// // //   "Real Estate",
// // //   "Construction",
// // //   "Retail & Sale",
// // //   "Outdoor / Weather Proof",
// // // ];

// // // interface DesignerPageProps {
// // //   shopifyCustomerId?: string | null;
// // //   productWidth?: string;
// // //   productHeight?: string;
// // // }

// // // export default function DesignerPage({ 
// // //   shopifyCustomerId = null, 
// // //   productWidth = "600", 
// // //   productHeight = "900" 
// // // }: DesignerPageProps) {
// // //   const [prompt, setPrompt] = useState("");
// // //   const [selectedStyle, setSelectedStyle] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [imageUrl, setImageUrl] = useState("");
// // //   const [error, setError] = useState("");
// // //   const containerRef = useRef<HTMLDivElement>(null);

// // //   // --- Dynamic Iframe Height Synchronizer ---
// // //   useEffect(() => {
// // //     const sendHeight = () => {
// // //       if (containerRef.current) {
// // //         const height = containerRef.current.scrollHeight;
// // //         window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // //       }
// // //     };

// // //     sendHeight();
// // //     window.addEventListener("resize", sendHeight);

// // //     const observer = new MutationObserver(sendHeight);
// // //     if (containerRef.current) {
// // //       observer.observe(containerRef.current, {
// // //         attributes: true,
// // //         childList: true,
// // //         subtree: true,
// // //       });
// // //     }

// // //     return () => {
// // //       window.removeEventListener("resize", sendHeight);
// // //       observer.disconnect();
// // //     };
// // //   }, []);
// // //   // ------------------------------------------

// // //   const handleGenerate = async () => {
// // //     if (!prompt || !selectedStyle) return;
// // //     setLoading(true);
// // //     setImageUrl("");
// // //     setError("");

// // //     try {
// // //       const response = await fetch("/api/generate-design", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           prompt: prompt,
// // //           style: selectedStyle,
// // //           width: productWidth,
// // //           height: productHeight,
// // //           customerId: shopifyCustomerId,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (!response.ok) {
// // //         throw new Error(data.error || "Something went wrong while generating the design.");
// // //       }

// // //       // Receives the secure public Cloudflare R2 link from your backend route
// // //       setImageUrl(data.designUrl);
// // //     } catch (err: any) {
// // //       console.error("Generation Error:", err);
// // //       setError(err.message || "Failed to contact design server.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full">
          
// // //       {/* Header */}
// // //       <div className="bg-white border-b border-gray-200 px-6 py-4">
// // //         <h1 className="text-xl font-bold text-gray-900">AI Sign Designer</h1>
// // //         <p className="text-sm text-gray-500 mt-0.5">
// // //           Describe your sign and let AI generate a starting design for you
// // //         </p>
// // //       </div>

// // //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

// // //         {/* Error Alert Box */}
// // //         {error && (
// // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
// // //             <span className="font-semibold">Notice:</span> {error}
// // //           </div>
// // //         )}

// // //         {/* Step 1 - Prompt */}
// // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
// // //           <div className="flex items-center gap-2">
// // //             <span className="bg-blue-600 text-white text-xs font-bold 
// // //             rounded-full w-5 h-5 flex items-center justify-center">1</span>
// // //             <h2 className="font-semibold text-gray-800">Describe your sign</h2>
// // //           </div>
// // //           <textarea
// // //             rows={3}
// // //             value={prompt}
// // //             onChange={(e) => setPrompt(e.target.value)}
// // //             placeholder="e.g. Bold red and white open house sign for a real estate agent, Saturday 10am–12pm, 123 Example Street"
// // //             className="w-full border border-gray-300 rounded-lg px-4 py-3 
// // //             text-sm text-gray-800 placeholder-gray-400 resize-none
// // //             focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //           />
// // //           <p className="text-xs text-gray-400">
// // //             The more detail you give, the better the result.
// // //           </p>
// // //         </div>

// // //         {/* Step 2 - Style */}
// // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
// // //           <div className="flex items-center gap-2">
// // //             <span className="bg-blue-600 text-white text-xs font-bold 
// // //             rounded-full w-5 h-5 flex items-center justify-center">2</span>
// // //             <h2 className="font-semibold text-gray-800">Pick a style</h2>
// // //           </div>
// // //           <div className="flex flex-wrap gap-2">
// // //             {STYLES.map((style) => (
// // //               <button
// // //                 key={style}
// // //                 onClick={() => setSelectedStyle(style)}
// // //                 className={`px-4 py-2 rounded-full text-sm font-medium border 
// // //                 transition-all duration-150
// // //                 ${selectedStyle === style
// // //                   ? "bg-blue-600 text-white border-blue-600"
// // //                   : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
// // //                 }`}
// // //               >
// // //                 {style}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Generate Button */}
// // //         <button
// // //           onClick={handleGenerate}
// // //           disabled={!prompt || !selectedStyle || loading}
// // //           className={`w-full py-3 rounded-xl font-semibold text-white 
// // //           transition-all duration-150
// // //           ${!prompt || !selectedStyle || loading
// // //             ? "bg-gray-300 cursor-not-allowed"
// // //             : "bg-blue-600 hover:bg-blue-700 active:scale-95"
// // //           }`}
// // //         >
// // //           {loading ? "Generating your design..." : "Generate Design"}
// // //         </button>

// // //         {/* Loading State */}
// // //         {loading && (
// // //           <div className="bg-white rounded-xl border border-gray-200 p-8 
// // //           flex flex-col items-center justify-center gap-3">
// // //             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent 
// // //             rounded-full animate-spin" />
// // //             <p className="text-sm text-gray-500">
// // //               AI is generating your sign design...
// // //             </p>
// // //           </div>
// // //         )}

// // //         {/* Preview */}
// // //         {imageUrl && !loading && (
// // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
// // //             <div className="flex items-center gap-2">
// // //               <span className="bg-blue-600 text-white text-xs font-bold 
// // //               rounded-full w-5 h-5 flex items-center justify-center">3</span>
// // //               <h2 className="font-semibold text-gray-800">Your generated design</h2>
// // //             </div>

// // //             <img
// // //               src={imageUrl}
// // //               alt="Generated sign design"
// // //               className="w-full rounded-lg border border-gray-100"
// // //             />

// // //             <div className="flex gap-3">
// // //               <button
// // //                 onClick={handleGenerate}
// // //                 className="flex-1 py-2.5 rounded-lg border border-gray-300 
// // //                 text-sm font-medium text-gray-700 hover:bg-gray-50 
// // //                 transition-all duration-150"
// // //               >
// // //                 Regenerate
// // //               </button>
// // //               <button
// // //                 className="flex-1 py-2.5 rounded-lg bg-blue-600 
// // //                 text-sm font-medium text-white hover:bg-blue-700 
// // //                 transition-all duration-150"
// // //               >
// // //                 Use This Design →
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}

// // //       </div>
// // //     </div>
// // //   );
// // // }














// // "use client";
// // import { useState, useEffect, useRef } from "react";

// // const STYLES = [
// //   "Bold & High Contrast",
// //   "Clean & Minimal",
// //   "Real Estate",
// //   "Construction",
// //   "Retail & Sale",
// //   "Outdoor / Weather Proof",
// // ];

// // interface DesignerPageProps {
// //   shopifyCustomerId?: string | null;
// //   productWidth?: string;
// //   productHeight?: string;
// // }

// // export default function DesignerPage({ 
// //   shopifyCustomerId = null, 
// //   productWidth = "600", 
// //   productHeight = "900" 
// // }: DesignerPageProps) {
// //   const [prompt, setPrompt] = useState("");
// //   const [selectedStyle, setSelectedStyle] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [imageUrl, setImageUrl] = useState("");
// //   const [error, setError] = useState("");
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const sendHeight = () => {
// //       if (containerRef.current) {
// //         const height = containerRef.current.scrollHeight;
// //         window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// //       }
// //     };

// //     sendHeight();
// //     window.addEventListener("resize", sendHeight);

// //     const observer = new MutationObserver(sendHeight);
// //     if (containerRef.current) {
// //       observer.observe(containerRef.current, {
// //         attributes: true,
// //         childList: true,
// //         subtree: true,
// //       });
// //     }

// //     return () => {
// //       window.removeEventListener("resize", sendHeight);
// //       observer.disconnect();
// //     };
// //   }, []);

// //   const handleGenerate = async () => {
// //     if (!prompt || !selectedStyle) return;
// //     setLoading(true);
// //     setImageUrl("");
// //     setError("");

// //     try {
// //       const response = await fetch("/api/generate-design", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           prompt: prompt,
// //           style: selectedStyle,
// //           width: productWidth,
// //           height: productHeight,
// //           customerId: shopifyCustomerId,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (!response.ok) {
// //         throw new Error(data.error || "Something went wrong while generating the design.");
// //       }

// //       setImageUrl(data.designUrl);
// //     } catch (err: any) {
// //       console.error("Generation Error:", err);
// //       setError(err.message || "Failed to contact design server.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full">
          
// //       {/* Header */}
// //       <div className="bg-white border-b border-gray-200 px-6 py-4">
// //         <h1 className="text-xl font-bold text-gray-900">AI Sign Designer</h1>
// //         <p className="text-sm text-gray-500 mt-0.5">
// //           Describe your sign and let AI generate a starting design for you
// //         </p>
// //       </div>

// //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

// //         {/* Error Alert Box */}
// //         {error && (
// //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
// //             <span className="font-semibold">Notice:</span> {error}
// //           </div>
// //         )}

// //         {/* Step 1 - Prompt */}
// //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
// //           <div className="flex items-center gap-2">
// //             <span className="bg-blue-600 text-white text-xs font-bold 
// //             rounded-full w-5 h-5 flex items-center justify-center">1</span>
// //             <h2 className="font-semibold text-gray-800">Describe your sign</h2>
// //           </div>
// //           <textarea
// //             rows={3}
// //             value={prompt}
// //             onChange={(e) => setPrompt(e.target.value)}
// //             placeholder="e.g. Bold red and white open house sign for a real estate agent, Saturday 10am–12pm, 123 Example Street"
// //             className="w-full border border-gray-300 rounded-lg px-4 py-3 
// //             text-sm text-gray-800 placeholder-gray-400 resize-none
// //             focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           />
// //           <p className="text-xs text-gray-400">
// //             The more detail you give, the better the result.
// //           </p>
// //         </div>

// //         {/* Step 2 - Style */}
// //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
// //           <div className="flex items-center gap-2">
// //             <span className="bg-blue-600 text-white text-xs font-bold 
// //             rounded-full w-5 h-5 flex items-center justify-center">2</span>
// //             <h2 className="font-semibold text-gray-800">Pick a style</h2>
// //           </div>
// //           <div className="flex flex-wrap gap-2">
// //             {STYLES.map((style) => (
// //               <button
// //                 key={style}
// //                 onClick={() => setSelectedStyle(style)}
// //                 className={`px-4 py-2 rounded-full text-sm font-medium border 
// //                 transition-all duration-150
// //                 ${selectedStyle === style
// //                   ? "bg-blue-600 text-white border-blue-600"
// //                   : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
// //                 }`}
// //               >
// //                 {style}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Generate Button */}
// //         <button
// //           onClick={handleGenerate}
// //           disabled={!prompt || !selectedStyle || loading}
// //           className={`w-full py-3 rounded-xl font-semibold text-white 
// //           transition-all duration-150
// //           ${!prompt || !selectedStyle || loading
// //             ? "bg-gray-300 cursor-not-allowed"
// //             : "bg-blue-600 hover:bg-blue-700 active:scale-95"
// //           }`}
// //         >
// //           {loading ? "Generating your design..." : "Generate Design"}
// //         </button>

// //         {/* Loading State */}
// //         {loading && (
// //           <div className="bg-white rounded-xl border border-gray-200 p-8 
// //           flex flex-col items-center justify-center gap-3">
// //             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent 
// //             rounded-full animate-spin" />
// //             <p className="text-sm text-gray-500">
// //               AI is generating your sign design...
// //             </p>
// //           </div>
// //         )}

// //         {/* Preview */}
// //         {imageUrl && !loading && (
// //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
// //             <div className="flex items-center gap-2">
// //               <span className="bg-blue-600 text-white text-xs font-bold 
// //               rounded-full w-5 h-5 flex items-center justify-center">3</span>
// //               <h2 className="font-semibold text-gray-800">Your generated design</h2>
// //             </div>

// //             <img
// //               src={imageUrl}
// //               alt="Generated sign design"
// //               className="w-full rounded-lg border border-gray-100"
// //             />

// //             <div className="flex gap-3">
// //               <button
// //                 onClick={handleGenerate}
// //                 className="flex-1 py-2.5 rounded-lg border border-gray-300 
// //                 text-sm font-medium text-gray-700 hover:bg-gray-50 
// //                 transition-all duration-150"
// //               >
// //                 Regenerate
// //               </button>
// //               <button
// //                 className="flex-1 py-2.5 rounded-lg bg-blue-600 
// //                 text-sm font-medium text-white hover:bg-blue-700 
// //                 transition-all duration-150"
// //               >
// //                 Use This Design →
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // }

















// "use client";
// import { useState, useEffect, useRef } from "react";

// const STYLES = [
//   "Bold & High Contrast",
//   "Clean & Minimal",
//   "Real Estate",
//   "Construction",
//   "Retail & Sale",
//   "Outdoor / Weather Proof",
// ];

// interface DesignerPageProps {
//   shopifyCustomerId?: string | null;
//   productWidth?: string;
//   productHeight?: string;
// }

// export default function DesignerPage({ 
//   shopifyCustomerId = null, 
//   productWidth = "600", 
//   productHeight = "900" 
// }: DesignerPageProps) {
//   const [prompt, setPrompt] = useState("");
//   const [selectedStyle, setSelectedStyle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [error, setError] = useState("");
//   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(shopifyCustomerId ? 10 : 3);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const sendHeight = () => {
//       if (containerRef.current) {
//         const height = containerRef.current.scrollHeight;
//         window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
//       }
//     };

//     sendHeight();
//     window.addEventListener("resize", sendHeight);

//     const observer = new MutationObserver(sendHeight);
//     if (containerRef.current) {
//       observer.observe(containerRef.current, {
//         attributes: true,
//         childList: true,
//         subtree: true,
//       });
//     }

//     return () => {
//       window.removeEventListener("resize", sendHeight);
//       observer.disconnect();
//     };
//   }, []);

//   const handleGenerate = async () => {
//     if (!prompt || !selectedStyle) return;
//     setLoading(true);
//     setImageUrl("");
//     setError("");

//     try {
//       const response = await fetch("/api/generate-design", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prompt: prompt,
//           style: selectedStyle,
//           width: productWidth,
//           height: productHeight,
//           customerId: shopifyCustomerId,
//         }),
//       });

//       const data = await response.json();

//       // Sync remaining attempts token tracking
//       if (typeof data.remainingAttempts === "number") {
//         setRemainingAttempts(data.remainingAttempts);
//       }

//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong while generating the design.");
//       }

//       setImageUrl(data.designUrl);
//     } catch (err: any) {
//       console.error("Generation Error:", err);
//       setError(err.message || "Failed to contact design server.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div ref={containerRef} className="bg-white overflow-hidden min-h-full">
          
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="text-xl font-bold text-gray-900">AI Sign Designer</h1>
//           <p className="text-sm text-gray-500 mt-0.5">
//             Describe your sign and let AI generate a starting design for you
//           </p>
//         </div>
        
//         {/* Dynamic Badge for Counter Display */}
//         {remainingAttempts !== null && (
//           <div className={`px-4 py-1.5 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
//             remainingAttempts === 0 
//               ? "bg-red-50 border-red-200 text-red-700" 
//               : "bg-blue-50 border-blue-200 text-blue-700"
//           }`}>
//             {remainingAttempts === 0 
//               ? "0 generations remaining" 
//               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} left`}
//           </div>
//         )}
//       </div>

//       <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

//         {/* Error Alert Box */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
//             <span className="font-semibold">Notice:</span> {error}
//           </div>
//         )}

//         {/* Step 1 - Prompt */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="bg-blue-600 text-white text-xs font-bold 
//             rounded-full w-5 h-5 flex items-center justify-center">1</span>
//             <h2 className="font-semibold text-gray-800">Describe your sign</h2>
//           </div>
//           <textarea
//             rows={3}
//             value={prompt}
//             disabled={remainingAttempts === 0}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder={remainingAttempts === 0 ? "Limits exhausted. Please try again shortly." : "e.g. Bold red and white open house sign for a real estate agent..."}
//             className={`w-full border border-gray-300 rounded-lg px-4 py-3 
//             text-sm text-gray-800 placeholder-gray-400 resize-none
//             focus:outline-none focus:ring-2 focus:ring-blue-500 ${remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed" : ""}`}
//           />
//           <p className="text-xs text-gray-400">
//             The more detail you give, the better the result.
//           </p>
//         </div>

//         {/* Step 2 - Style */}
//         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="bg-blue-600 text-white text-xs font-bold 
//             rounded-full w-5 h-5 flex items-center justify-center">2</span>
//             <h2 className="font-semibold text-gray-800">Pick a style</h2>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STYLES.map((style) => (
//               <button
//                 key={style}
//                 disabled={remainingAttempts === 0}
//                 onClick={() => setSelectedStyle(style)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium border 
//                 transition-all duration-150
//                 ${selectedStyle === style
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
//                 } ${remainingAttempts === 0 ? "opacity-50 cursor-not-allowed hover:border-gray-300" : ""}`}
//               >
//                 {style}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Generate Button */}
//         <button
//           onClick={handleGenerate}
//           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
//           className={`w-full py-3 rounded-xl font-semibold text-white 
//           transition-all duration-150
//           ${!prompt || !selectedStyle || loading || remainingAttempts === 0
//             ? "bg-gray-300 cursor-not-allowed"
//             : "bg-blue-600 hover:bg-blue-700 active:scale-95"
//           }`}
//         >
//           {loading ? "Generating your design..." : "Generate Design"}
//         </button>

//         {/* Loading State */}
//         {loading && (
//           <div className="bg-white rounded-xl border border-gray-200 p-8 
//           flex flex-col items-center justify-center gap-3">
//             <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent 
//             rounded-full animate-spin" />
//             <p className="text-sm text-gray-500">
//               AI is generating your sign design...
//             </p>
//           </div>
//         )}

//         {/* Preview */}
//         {imageUrl && !loading && (
//           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
//             <div className="flex items-center gap-2">
//               <span className="bg-blue-600 text-white text-xs font-bold 
//               rounded-full w-5 h-5 flex items-center justify-center">3</span>
//               <h2 className="font-semibold text-gray-800">Your generated design</h2>
//             </div>

//             <img
//               src={imageUrl}
//               alt="Generated sign design"
//               className="w-full rounded-lg border border-gray-100"
//             />

//             <div className="flex gap-3">
//               <button
//                 onClick={handleGenerate}
//                 disabled={remainingAttempts === 0}
//                 className={`flex-1 py-2.5 rounded-lg border border-gray-300 
//                 text-sm font-medium text-gray-700 hover:bg-gray-50 
//                 transition-all duration-150 ${remainingAttempts === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100" : ""}`}
//               >
//                 Regenerate
//               </button>
//               <button
//                 className="flex-1 py-2.5 rounded-lg bg-blue-600 
//                 text-sm font-medium text-white hover:bg-blue-700 
//                 transition-all duration-150"
//               >
//                 Use This Design →
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }
























"use client";
import { useState, useEffect, useRef } from "react";

const STYLES = [
  "Bold & High Contrast",
  "Clean & Minimal",
  "Real Estate",
  "Construction",
  "Retail & Sale",
  "Outdoor / Weather Proof",
];

interface DesignerPageProps {
  shopifyCustomerId?: string | null;
  productWidth?: string;
  productHeight?: string;
}

export default function DesignerPage({ 
  shopifyCustomerId = null, 
  productWidth = "600", 
  productHeight = "900" 
}: DesignerPageProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(shopifyCustomerId ? 10 : 3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-resize handler sync calculations for outer platform frames
  useEffect(() => {
    const sendHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.scrollHeight;
        window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
      }
    };

    sendHeight();
    window.addEventListener("resize", sendHeight);

    const observer = new MutationObserver(sendHeight);
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", sendHeight);
      observer.disconnect();
    };
  }, []);

  const handleGenerate = async () => {
    if (!prompt || !selectedStyle || remainingAttempts === 0) return;
    setLoading(true);
    setImageUrl("");
    setError("");

    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
          style: selectedStyle,
          width: productWidth,
          height: productHeight,
          customerId: shopifyCustomerId,
        }),
      });

      const data = await response.json();

      if (typeof data.remainingAttempts === "number") {
        setRemainingAttempts(data.remainingAttempts);
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to process target structural sign composition requests.");
      }

      setImageUrl(data.designUrl);
    } catch (err: any) {
      console.error("UI Execution Fault Encountered:", err);
      setError(err.message || "Unable to cleanly reach design processing servers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
          
      {/* Upper header section area panel structure configuration tracking elements */}
      <div className="bg-white border-b border-gray-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Describe your layout preferences below to instantly establish target mockup iterations
          </p>
        </div>
        
        {remainingAttempts !== null && (
          <div className={`px-4 py-1.5 rounded-full text-xs font-semibold self-start sm:self-center border transition-all shadow-sm ${
            remainingAttempts === 0 
              ? "bg-red-50 border-red-200 text-red-700" 
              : "bg-blue-50 border-blue-200 text-blue-700"
          }`}>
            {remainingAttempts === 0 
              ? "0 generations remaining" 
              : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all animate-fadeIn">
            <span className="font-semibold">Notice:</span> {error}
          </div>
        )}

        {/* Configuration Layer 1: Prompt Input Description */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">1</span>
            <h2 className="font-semibold text-gray-900">Describe your sign</h2>
          </div>
          <textarea
            rows={3}
            value={prompt}
            disabled={remainingAttempts === 0 || loading}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={remainingAttempts === 0 ? "Account allowances exhausted. Complete standard checkouts to clear balances." : "e.g. High visibility yellow construction notice reading 'CAUTION: SITE ACCESS AHEAD' in bold clear typography..."}
            className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
            }`}
          />
        </div>

        {/* Configuration Layer 2: Theme / Style Selection Matrix */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
            <h2 className="font-semibold text-gray-900">Select design theme style</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((style) => (
              <button
                key={style}
                disabled={remainingAttempts === 0 || loading}
                onClick={() => setSelectedStyle(style)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
                  selectedStyle === style
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 animate-none"
                } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed hover:border-gray-300 hover:bg-white" : ""}`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Action Dispatch Node Element */}
        <button
          onClick={handleGenerate}
          disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
          className={`w-full py-3.5 rounded-xl font-semibold text-white tracking-wide shadow transition-all duration-150 active:scale-[0.99] ${
            !prompt || !selectedStyle || loading || remainingAttempts === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none active:scale-100"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Compiling Vector Canvas Architecture..." : "Generate Custom Design Asset"}
        </button>

        {/* Loading placeholder display states */}
        {loading && (
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
            <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-medium text-gray-500">
              Generating your sign layout assets...
            </p>
          </div>
        )}

        {/* Output Canvas Wrapper Container Viewports */}
        {imageUrl && !loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-md animate-fadeIn">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
              <h2 className="font-semibold text-gray-900">Your generated layout output mockup</h2>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-inner">
              <img
                src={imageUrl}
                alt="AI Generated Sign Composition output preview node"
                className="w-full h-auto object-contain max-h-[500px] mx-auto transition-transform duration-200 hover:scale-[1.01]"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleGenerate}
                disabled={remainingAttempts === 0}
                className={`flex-1 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all ${
                  remainingAttempts === 0 ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50 hover:bg-gray-50" : ""
                }`}
              >
                Regenerate Alternative iteration
              </button>
              <button
                type="button"
                onClick={() => alert("Design selected! Transitioning configuration specs over to order checkouts panel.")}
                className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white shadow transition-all active:scale-[0.98]"
              >
                Use This Design →
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}