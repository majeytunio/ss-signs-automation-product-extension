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
// // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(shopifyCustomerId ? 10 : 3);
// // //   const containerRef = useRef<HTMLDivElement>(null);

// // //   // Helper function to calculate height and dispatch it up to Shopify
// // //   const syncHeightWithShopify = () => {
// // //     if (containerRef.current) {
// // //       const height = containerRef.current.scrollHeight;
// // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // //     }
// // //   };

// // //   // Auto-resize handler sync calculations for outer platform frames
// // //   useEffect(() => {
// // //     syncHeightWithShopify();
// // //     window.addEventListener("resize", syncHeightWithShopify);

// // //     const observer = new MutationObserver(syncHeightWithShopify);
// // //     if (containerRef.current) {
// // //       observer.observe(containerRef.current, {
// // //         attributes: true,
// // //         childList: true,
// // //         subtree: true,
// // //       });
// // //     }

// // //     return () => {
// // //       window.removeEventListener("resize", syncHeightWithShopify);
// // //       observer.disconnect();
// // //     };
// // //   }, []);

// // //   const handleGenerate = async () => {
// // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
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

// // //       if (typeof data.remainingAttempts === "number") {
// // //         setRemainingAttempts(data.remainingAttempts);
// // //       }

// // //       if (!response.ok) {
// // //         throw new Error(data.error || "Failed to process target structural sign composition requests.");
// // //       }

// // //       setImageUrl(data.designUrl);
// // //     } catch (err: any) {
// // //       console.error("UI Execution Fault Encountered:", err);
// // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
          
// // //       {/* Upper header section area panel structure configuration tracking elements */}
// // //       <div className="bg-white border-b border-gray-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// // //         <div>
// // //           <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // //           <p className="text-sm text-gray-500 mt-0.5">
// // //             Describe your layout preferences below to instantly establish target mockup iterations
// // //           </p>
// // //         </div>
        
// // //         {remainingAttempts !== null && (
// // //           <div className={`px-4 py-1.5 rounded-full text-xs font-semibold self-start sm:self-center border transition-all shadow-sm ${
// // //             remainingAttempts === 0 
// // //               ? "bg-red-50 border-red-200 text-red-700" 
// // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // //           }`}>
// // //             {remainingAttempts === 0 
// // //               ? "0 generations remaining" 
// // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

// // //         {error && (
// // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all animate-fadeIn">
// // //             <span className="font-semibold">Notice:</span> {error}
// // //           </div>
// // //         )}

// // //         {/* Configuration Layer 1: Prompt Input Description */}
// // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // //           <div className="flex items-center gap-2">
// // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">1</span>
// // //             <h2 className="font-semibold text-gray-900">Describe your sign</h2>
// // //           </div>
// // //           <textarea
// // //             rows={3}
// // //             value={prompt}
// // //             disabled={remainingAttempts === 0 || loading}
// // //             onChange={(e) => setPrompt(e.target.value)}
// // //             placeholder={remainingAttempts === 0 ? "Account allowances exhausted. Complete standard checkouts to clear balances." : "e.g. High visibility yellow construction notice reading 'CAUTION: SITE ACCESS AHEAD' in bold clear typography..."}
// // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
// // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // //             }`}
// // //           />
// // //         </div>

// // //         {/* Configuration Layer 2: Theme / Style Selection Matrix */}
// // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // //           <div className="flex items-center gap-2">
// // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
// // //             <h2 className="font-semibold text-gray-900">Select design theme style</h2>
// // //           </div>
// // //           <div className="flex flex-wrap gap-2">
// // //             {STYLES.map((style) => (
// // //               <button
// // //                 key={style}
// // //                 disabled={remainingAttempts === 0 || loading}
// // //                 onClick={() => setSelectedStyle(style)}
// // //                 className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
// // //                   selectedStyle === style
// // //                     ? "bg-blue-600 text-white border-blue-600 shadow-sm"
// // //                     : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 animate-none"
// // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed hover:border-gray-300 hover:bg-white" : ""}`}
// // //               >
// // //                 {style}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         {/* Action Dispatch Node Element */}
// // //         <button
// // //           onClick={handleGenerate}
// // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // //           className={`w-full py-3.5 rounded-xl font-semibold text-white tracking-wide shadow transition-all duration-150 active:scale-[0.99] ${
// // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none active:scale-100"
// // //               : "bg-blue-600 hover:bg-blue-700"
// // //           }`}
// // //         >
// // //           {loading ? "Compiling Vector Canvas Architecture..." : "Generate Custom Design Asset"}
// // //         </button>

// // //         {/* Loading placeholder display states */}
// // //         {loading && (
// // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // //             <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
// // //             <p className="text-sm font-medium text-gray-500">
// // //               Generating your sign layout assets...
// // //             </p>
// // //           </div>
// // //         )}

// // //         {/* Output Canvas Wrapper Container Viewports */}
// // //         {imageUrl && !loading && (
// // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-md animate-fadeIn">
// // //             <div className="flex items-center gap-2">
// // //               <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
// // //               <h2 className="font-semibold text-gray-900">Your generated layout output mockup</h2>
// // //             </div>

// // //             <div className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-inner">
// // //               <img
// // //                 src={imageUrl}
// // //                 alt="AI Generated Sign Composition output preview node"
// // //                 onLoad={syncHeightWithShopify} // 🚀 CRUCIAL FIX: Fires recalculation the split-second the image fully downloads!
// // //                 className="w-full h-auto object-contain max-h-[500px] mx-auto transition-transform duration-200 hover:scale-[1.01]"
// // //               />
// // //             </div>

// // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // //               <button
// // //                 onClick={handleGenerate}
// // //                 disabled={remainingAttempts === 0}
// // //                 className={`flex-1 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all ${
// // //                   remainingAttempts === 0 ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50 hover:bg-gray-50" : ""
// // //                 }`}
// // //               >
// // //                 Regenerate Alternative iteration
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => alert("Design selected! Transitioning configuration specs over to order checkouts panel.")}
// // //                 className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white shadow transition-all active:scale-[0.98]"
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

// // interface HistoryItem {
// //   id: string;
// //   url: string;
// //   prompt: string;
// //   style: string;
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
// //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(shopifyCustomerId ? 10 : 3);
// //   const [history, setHistory] = useState<HistoryItem[]>([]);
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   // Sync Height with parent iframe
// //   const syncHeightWithShopify = () => {
// //     if (containerRef.current) {
// //       const height = containerRef.current.scrollHeight;
// //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// //     }
// //   };

// //   // Push the generated image URL up to Shopify to replace the product media panel image
// //   const syncProductImageWithShopify = (imgUrl: string) => {
// //     if (imgUrl) {
// //       window.parent.postMessage({ 
// //         type: "UPDATE_PRODUCT_IMAGE", 
// //         imageUrl: imgUrl 
// //       }, "*");
// //     }
// //   };

// //   useEffect(() => {
// //     syncHeightWithShopify();
// //     window.addEventListener("resize", syncHeightWithShopify);

// //     const observer = new MutationObserver(syncHeightWithShopify);
// //     if (containerRef.current) {
// //       observer.observe(containerRef.current, {
// //         attributes: true,
// //         childList: true,
// //         subtree: true,
// //       });
// //     }

// //     return () => {
// //       window.removeEventListener("resize", syncHeightWithShopify);
// //       observer.disconnect();
// //     };
// //   }, []);

// //   const handleGenerate = async () => {
// //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
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
// //           prompt,
// //           style: selectedStyle,
// //           width: productWidth,
// //           height: productHeight,
// //           customerId: shopifyCustomerId,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (typeof data.remainingAttempts === "number") {
// //         setRemainingAttempts(data.remainingAttempts);
// //       }

// //       if (!response.ok) {
// //         throw new Error(data.error || "Failed to process target structural sign composition requests.");
// //       }

// //       const newImageUrl = data.designUrl;
// //       setImageUrl(newImageUrl);
      
// //       // Update history
// //       const newHistoryItem: HistoryItem = {
// //         id: Date.now().toString(),
// //         url: newImageUrl,
// //         prompt: prompt,
// //         style: selectedStyle
// //       };
// //       setHistory(prev => [newHistoryItem, ...prev]);

// //       // Trigger automatic swap of main Shopify media panel image
// //       syncProductImageWithShopify(newImageUrl);

// //     } catch (err: any) {
// //       console.error("UI Execution Fault Encountered:", err);
// //       setError(err.message || "Unable to cleanly reach design processing servers.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSelectHistoryItem = (item: HistoryItem) => {
// //     setImageUrl(item.url);
// //     setPrompt(item.prompt);
// //     setSelectedStyle(item.style);
// //     syncProductImageWithShopify(item.url);
// //   };

// //   return (
// //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
// //       {/* Header */}
// //       <div className="bg-white border-b border-gray-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// //         <div>
// //           <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// //           <p className="text-sm text-gray-500 mt-0.5">
// //             Describe your layout preferences below to instantly establish target mockup iterations
// //           </p>
// //         </div>
        
// //         {remainingAttempts !== null && (
// //           <div className={`px-4 py-1.5 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
// //             remainingAttempts === 0 
// //               ? "bg-red-50 border-red-200 text-red-700" 
// //               : "bg-blue-50 border-blue-200 text-blue-700"
// //           }`}>
// //             {remainingAttempts === 0 
// //               ? "0 generations remaining" 
// //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// //           </div>
// //         )}
// //       </div>

// //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

// //         {error && (
// //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
// //             <span className="font-semibold">Notice:</span> {error}
// //           </div>
// //         )}

// //         {/* 1. Prompt */}
// //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// //           <div className="flex items-center gap-2">
// //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">1</span>
// //             <h2 className="font-semibold text-gray-900">Describe your sign</h2>
// //           </div>
// //           <textarea
// //             rows={3}
// //             value={prompt}
// //             disabled={remainingAttempts === 0 || loading}
// //             onChange={(e) => setPrompt(e.target.value)}
// //             placeholder={remainingAttempts === 0 ? "Account allowances exhausted. Check out to clear balances." : "e.g. Caution sign reading 'DANGER INSIDE' in bold clear typography..."}
// //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
// //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// //             }`}
// //           />
// //         </div>

// //         {/* 2. Theme selection */}
// //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// //           <div className="flex items-center gap-2">
// //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
// //             <h2 className="font-semibold text-gray-900">Select design theme style</h2>
// //           </div>
// //           <div className="flex flex-wrap gap-2">
// //             {STYLES.map((style) => (
// //               <button
// //                 key={style}
// //                 disabled={remainingAttempts === 0 || loading}
// //                 onClick={() => setSelectedStyle(style)}
// //                 className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
// //                   selectedStyle === style
// //                     ? "bg-blue-600 text-white border-blue-600"
// //                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// //               >
// //                 {style}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Action Button */}
// //         <button
// //           onClick={handleGenerate}
// //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// //           className={`w-full py-3.5 rounded-xl font-semibold text-white tracking-wide transition-all ${
// //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// //               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// //               : "bg-blue-600 hover:bg-blue-700"
// //           }`}
// //         >
// //           {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// //         </button>

// //         {loading && (
// //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// //             <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
// //             <p className="text-sm font-medium text-gray-500">Generating mockup assets...</p>
// //           </div>
// //         )}

// //         {/* 3. Output Canvas with Dynamic Dimensions Rulers */}
// //         {imageUrl && !loading && (
// //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-md">
// //             <div className="flex items-center gap-2">
// //               <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
// //               <h2 className="font-semibold text-gray-900">Your generated layout output mockup</h2>
// //             </div>

// //             {/* RULER INTEGRATION LAYOUT CONTAINER */}
// //             <div className="relative p-8 border border-gray-100 bg-gray-50 rounded-lg flex items-center justify-center">
              
// //               {/* Horizontal Top Ruler Line */}
// //               <div className="absolute top-2 left-8 right-8 flex flex-col items-center">
// //                 <div className="w-full h-px bg-red-400 relative">
// //                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// //                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// //                 </div>
// //                 <span className="text-[11px] font-bold text-red-500 bg-gray-50 px-2 mt-1 select-none">
// //                   {productWidth}mm
// //                 </span>
// //               </div>

// //               {/* Vertical Right Ruler Line */}
// //               <div className="absolute right-2 top-8 bottom-8 flex items-center">
// //                 <div className="h-full w-px bg-red-400 relative">
// //                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// //                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// //                 </div>
// //                 <span className="text-[11px] font-bold text-red-500 bg-gray-50 px-1 [writing-mode:vertical-lr] select-none ml-1">
// //                   {productHeight}mm
// //                 </span>
// //               </div>

// //               {/* Image Preview */}
// //               <div className="overflow-hidden rounded border border-gray-200 bg-white max-w-[280px] sm:max-w-[340px]">
// //                 <img
// //                   src={imageUrl}
// //                   alt="AI Generated Sign Composition output preview node"
// //                   onLoad={syncHeightWithShopify}
// //                   className="w-full h-auto object-contain max-h-[450px] mx-auto transition-transform duration-200 hover:scale-[1.01]"
// //                 />
// //               </div>
// //             </div>

// //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// //               <button
// //                 onClick={handleGenerate}
// //                 disabled={remainingAttempts === 0}
// //                 className="flex-1 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// //               >
// //                 Regenerate Alternative
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={() => syncProductImageWithShopify(imageUrl)}
// //                 className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white shadow transition-all"
// //               >
// //                 Use This Design →
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* 4. Generation History Shelf */}
// //         {history.length > 0 && (
// //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// //             <h3 className="font-semibold text-gray-900 text-sm">Your previous generations</h3>
// //             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
// //               {history.map((item) => (
// //                 <button
// //                   key={item.id}
// //                   onClick={() => handleSelectHistoryItem(item)}
// //                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// //                     imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
// //                   }`}
// //                 >
// //                   <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// //                 </button>
// //               ))}
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

// interface HistoryItem {
//   id: string;
//   url: string;
//   prompt: string;
//   style: string;
// }

// export default function DesignerPage() {
//   const [prompt, setPrompt] = useState("");
//   const [selectedStyle, setSelectedStyle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");
//   const [error, setError] = useState("");
//   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
//   const [history, setHistory] = useState<HistoryItem[]>([]);
  
//   // Dynamic state attributes
//   const [dynWidth, setDynWidth] = useState("600");
//   const [dynHeight, setDynHeight] = useState("900");
//   const [dynThickness, setDynThickness] = useState("5mm");
//   const [dynEyelets, setDynEyelets] = useState("No");

//   const containerRef = useRef<HTMLDivElement>(null);

//   // Sync frame heights to Shopify
//   const syncHeightWithShopify = () => {
//     if (containerRef.current) {
//       const height = containerRef.current.scrollHeight;
//       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
//     }
//   };

//   // Push design image back to main Shopify gallery element
//   const syncProductImageWithShopify = (imgUrl: string) => {
//     if (imgUrl) {
//       window.parent.postMessage({ 
//         type: "UPDATE_PRODUCT_IMAGE", 
//         imageUrl: imgUrl 
//       }, "*");
//     }
//   };

//   useEffect(() => {
//     syncHeightWithShopify();
//     window.addEventListener("resize", syncHeightWithShopify);

//     // Dynamic state listener for Shopify scrapings
//     const handleMessage = (event: MessageEvent) => {
//       if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
//         const { width, height, thickness, eyelets } = event.data;
//         if (width) setDynWidth(width);
//         if (height) setDynHeight(height);
//         if (thickness) setDynThickness(thickness);
//         if (eyelets) setDynEyelets(eyelets);
//       }
//     };

//     window.addEventListener("message", handleMessage);

//     const observer = new MutationObserver(syncHeightWithShopify);
//     if (containerRef.current) {
//       observer.observe(containerRef.current, {
//         attributes: true,
//         childList: true,
//         subtree: true,
//       });
//     }

//     return () => {
//       window.removeEventListener("resize", syncHeightWithShopify);
//       window.removeEventListener("message", handleMessage);
//       observer.disconnect();
//     };
//   }, []);

//   const handleGenerate = async () => {
//     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
//     setLoading(true);
//     setImageUrl("");
//     setError("");

//     // Package actual selections safely into prompt specifications for AI processing
//     const attributeTunedPrompt = `${prompt} (Sign physical properties: ${dynWidth}mm width, ${dynHeight}mm height, sign thickness ${dynThickness}, and eyelets option: ${dynEyelets})`;

//     try {
//       const response = await fetch("/api/generate-design", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           prompt: attributeTunedPrompt,
//           style: selectedStyle,
//           width: dynWidth,
//           height: dynHeight,
//           customerId: null,
//         }),
//       });

//       const data = await response.json();

//       if (typeof data.remainingAttempts === "number") {
//         setRemainingAttempts(data.remainingAttempts);
//       }

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to generate design.");
//       }

//       const newImageUrl = data.designUrl;
//       setImageUrl(newImageUrl);
      
//       const newHistoryItem: HistoryItem = {
//         id: Date.now().toString(),
//         url: newImageUrl,
//         prompt: prompt,
//         style: selectedStyle
//       };
//       setHistory(prev => [newHistoryItem, ...prev]);
//       syncProductImageWithShopify(newImageUrl);

//     } catch (err: any) {
//       console.error("UI Execution Fault Encountered:", err);
//       setError(err.message || "Unable to cleanly reach design processing servers.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelectHistoryItem = (item: HistoryItem) => {
//     setImageUrl(item.url);
//     setPrompt(item.prompt);
//     setSelectedStyle(item.style);
//     syncProductImageWithShopify(item.url);
//   };

//   // Convert the aspect ratio dynamically for the preview container wrapper limits
//   const wNum = parseFloat(dynWidth) || 600;
//   const hNum = parseFloat(dynHeight) || 900;
//   const aspectRatio = wNum / hNum;

//   return (
//     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
//       {/* Header Panel */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="text-lg font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
//           <p className="text-xs text-gray-500">
//             Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
//           </p>
//         </div>
        
//         {remainingAttempts !== null && (
//           <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
//             remainingAttempts === 0 
//               ? "bg-red-50 border-red-200 text-red-700" 
//               : "bg-blue-50 border-blue-200 text-blue-700"
//           }`}>
//             {remainingAttempts === 0 
//               ? "0 generations remaining" 
//               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
//           </div>
//         )}
//       </div>

//       <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
//             <span className="font-semibold">Notice:</span> {error}
//           </div>
//         )}

//         {/* 1. Prompt Input Box */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
//           <div className="flex items-center gap-2">
//             <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">1</span>
//             <h2 className="text-sm font-semibold text-gray-900">Describe your sign</h2>
//           </div>
//           <textarea
//             rows={3}
//             value={prompt}
//             disabled={remainingAttempts === 0 || loading}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in clear typography..."}
//             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
//               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
//             }`}
//           />
//         </div>

//         {/* 2. Style Matrix */}
//         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
//           <div className="flex items-center gap-2">
//             <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">2</span>
//             <h2 className="text-sm font-semibold text-gray-900">Select design theme style</h2>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {STYLES.map((style) => (
//               <button
//                 key={style}
//                 disabled={remainingAttempts === 0 || loading}
//                 onClick={() => setSelectedStyle(style)}
//                 className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
//                   selectedStyle === style
//                     ? "bg-blue-600 text-white border-blue-600"
//                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
//               >
//                 {style}
//               </button>
//             ))}
//           </div>
//         </div>

//         <button
//           onClick={handleGenerate}
//           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
//           className={`w-full py-3 rounded-xl font-semibold text-sm text-white tracking-wide transition-all ${
//             !prompt || !selectedStyle || loading || remainingAttempts === 0
//               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
//         </button>

//         {loading && (
//           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
//             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
//             <p className="text-xs font-medium text-gray-500">Generating mockup assets...</p>
//           </div>
//         )}

//         {/* 3. Output Canvas with Border-Hugging Rulers */}
//         {imageUrl && !loading && (
//           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">3</span>
//               <h2 className="text-sm font-semibold text-gray-900">Your generated layout output mockup</h2>
//             </div>

//             {/* BASE CONTAINER */}
//             <div className="bg-gray-50 rounded-lg p-10 flex items-center justify-center border border-gray-100">
              
//               {/* RULER CONTAINER WRAPPER - This element hugs the image structure precisely */}
//               <div 
//                 className="relative p-6 border border-dashed border-gray-300 bg-white rounded-lg shadow-inner flex items-center justify-center"
//                 style={{
//                   width: "100%",
//                   maxWidth: aspectRatio > 1 ? "400px" : `${400 * aspectRatio}px`,
//                   aspectRatio: `${aspectRatio}`
//                 }}
//               >
                
//                 {/* Horizontal Top Ruler - aligned directly above the bounding layout box */}
//                 <div className="absolute -top-6 left-6 right-6 flex flex-col items-center">
//                   <div className="w-full h-px bg-red-500 relative">
//                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
//                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
//                   </div>
//                   <span className="text-[10px] font-bold text-red-500 bg-white px-1.5 mt-0.5 shadow-sm rounded border border-gray-100 select-none">
//                     {dynWidth}mm
//                   </span>
//                 </div>

//                 {/* Vertical Right Ruler - aligned directly to the right side of the bounding layout box */}
//                 <div className="absolute -right-7 top-6 bottom-6 flex items-center">
//                   <div className="h-full w-px bg-red-500 relative">
//                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
//                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
//                   </div>
//                   <span className="text-[10px] font-bold text-red-500 bg-white px-1 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] select-none ml-0.5">
//                     {dynHeight}mm
//                   </span>
//                 </div>

//                 {/* Rendered Design Output inside the bounding box */}
//                 <img
//                   src={imageUrl}
//                   alt="AI Generated Design"
//                   onLoad={syncHeightWithShopify}
//                   className="w-full h-full object-contain rounded"
//                 />
//               </div>

//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 pt-2">
//               <button
//                 onClick={handleGenerate}
//                 disabled={remainingAttempts === 0}
//                 className="flex-1 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
//               >
//                 Regenerate Alternative
//               </button>
//               <button
//                 type="button"
//                 onClick={() => syncProductImageWithShopify(imageUrl)}
//                 className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow transition-all"
//               >
//                 Use This Design →
//               </button>
//             </div>
//           </div>
//         )}

//         {/* 4. Generation History Drawer */}
//         {history.length > 0 && (
//           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
//             <h3 className="font-semibold text-gray-900 text-xs">Your previous generations</h3>
//             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
//               {history.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => handleSelectHistoryItem(item)}
//                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
//                     imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
//                   }`}
//                 >
//                   <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
//                 </button>
//               ))}
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

interface HistoryItem {
  id: string;
  url: string;
  prompt: string;
  style: string;
}

export default function DesignerPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // States to hold dynamically scraped Shopify attribute options
  const [dynWidth, setDynWidth] = useState("600");
  const [dynHeight, setDynHeight] = useState("900");
  const [dynThickness, setDynThickness] = useState("5mm");
  const [dynEyelets, setDynEyelets] = useState("No");

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync frame heights to Shopify
  const syncHeightWithShopify = () => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
    }
  };

  // Push design image back to main Shopify gallery element
  // const syncProductImageWithShopify = (imgUrl: string) => {
  //   if (imgUrl) {
  //     window.parent.postMessage({ 
  //       type: "UPDATE_PRODUCT_IMAGE", 
  //       imageUrl: imgUrl 
  //     }, "*");
  //   }
  // };

  // Push design image back to main Shopify gallery element
  const syncProductImageWithShopify = (imgUrl: string) => {
    if (!imgUrl) return;

    console.log("✈️ [Next.js] Attempting to dispatch image to Shopify:", imgUrl);

    const payload = { 
      type: "UPDATE_PRODUCT_IMAGE", 
      imageUrl: imgUrl 
    };

    // Fallback chain: try parent window, then absolute top window
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(payload, "*");
      console.log("📬 Sent via window.parent");
    } else if (window.top) {
      window.top.postMessage(payload, "*");
      console.log("📬 Sent via window.top (Sandbox Fallback)");
    } else {
      console.error("❌ Crucial Error: No window access available due to strict sandbox restrictions.");
    }
  };

  useEffect(() => {
    syncHeightWithShopify();
    window.addEventListener("resize", syncHeightWithShopify);

    // Listen to parent message signals for state variations
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
        const { width, height, thickness, eyelets } = event.data;
        if (width) setDynWidth(width);
        if (height) setDynHeight(height);
        if (thickness) setDynThickness(thickness);
        if (eyelets) setDynEyelets(eyelets);
      }
    };

    window.addEventListener("message", handleMessage);

    const observer = new MutationObserver(syncHeightWithShopify);
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.removeEventListener("resize", syncHeightWithShopify);
      window.removeEventListener("message", handleMessage);
      observer.disconnect();
    };
  }, []);

  const handleGenerate = async () => {
    if (!prompt || !selectedStyle || remainingAttempts === 0) return;
    setLoading(true);
    setImageUrl("");
    setError("");

    // Inject active scraped attribute data directly into the generation prompt instructions
    const attributeTunedPrompt = `${prompt} (Specifications: Sign thickness ${dynThickness}, Eyelets config: ${dynEyelets})`;

    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: attributeTunedPrompt,
          style: selectedStyle,
          width: dynWidth,
          height: dynHeight,
          customerId: null,
        }),
      });

      const data = await response.json();

      if (typeof data.remainingAttempts === "number") {
        setRemainingAttempts(data.remainingAttempts);
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to process target structural sign composition requests.");
      }

      const newImageUrl = data.designUrl;
      setImageUrl(newImageUrl);
      
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        url: newImageUrl,
        prompt: prompt,
        style: selectedStyle
      };
      setHistory(prev => [newHistoryItem, ...prev]);
      syncProductImageWithShopify(newImageUrl);

    } catch (err: any) {
      console.error("UI Execution Fault Encountered:", err);
      setError(err.message || "Unable to cleanly reach design processing servers.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setImageUrl(item.url);
    setPrompt(item.prompt);
    setSelectedStyle(item.style);
    syncProductImageWithShopify(item.url);
  };

  // Convert the aspect ratio dynamically for the preview container wrapper limits
  const wNum = parseFloat(dynWidth) || 600;
  const hNum = parseFloat(dynHeight) || 900;
  const aspectRatio = wNum / hNum;

  return (
    <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
      {/* Header Panel */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
          <p className="text-xs text-gray-500">
            Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
          </p>
        </div>
        
        {remainingAttempts !== null && (
          <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
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

      <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
            <span className="font-semibold">Notice:</span> {error}
          </div>
        )}

        {/* 1. Prompt Input Box */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">1</span>
            <h2 className="text-sm font-semibold text-gray-900">Describe your sign</h2>
          </div>
          <textarea
            rows={3}
            value={prompt}
            disabled={remainingAttempts === 0 || loading}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in clear typography..."}
            className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
              remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
            }`}
          />
        </div>

        {/* 2. Style Matrix */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">2</span>
            <h2 className="text-sm font-semibold text-gray-900">Select design theme style</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((style) => (
              <button
                key={style}
                disabled={remainingAttempts === 0 || loading}
                onClick={() => setSelectedStyle(style)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  selectedStyle === style
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
          className={`w-full py-3 rounded-xl font-semibold text-sm text-white tracking-wide transition-all ${
            !prompt || !selectedStyle || loading || remainingAttempts === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
        </button>

        {loading && (
          <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-medium text-gray-500">Generating mockup assets...</p>
          </div>
        )}

        {/* 3. Output Canvas with Border-Hugging Rulers */}
        {imageUrl && !loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">3</span>
              <h2 className="text-sm font-semibold text-gray-900">Your generated layout output mockup</h2>
            </div>

            {/* BASE CONTAINER */}
            <div className="bg-gray-50 rounded-lg p-10 flex items-center justify-center border border-gray-100">
              
              {/* RULER CONTAINER WRAPPER - This element hugs the image structure precisely */}
              <div 
                className="relative p-6 border border-dashed border-gray-300 bg-white rounded-lg shadow-inner flex items-center justify-center"
                style={{
                  width: "100%",
                  maxWidth: aspectRatio > 1 ? "400px" : `${400 * aspectRatio}px`,
                  aspectRatio: `${aspectRatio}`
                }}
              >
                
                {/* Horizontal Top Ruler - aligned directly above the bounding layout box */}
                <div className="absolute -top-6 left-6 right-6 flex flex-col items-center">
                  <div className="w-full h-px bg-red-500 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </div>
                  <span className="text-[10px] font-bold text-red-500 bg-white px-1.5 mt-0.5 shadow-sm rounded border border-gray-100 select-none">
                    {dynWidth}mm
                  </span>
                </div>

                {/* Vertical Right Ruler - aligned directly to the right side of the bounding box */}
                <div className="absolute -right-7 top-6 bottom-6 flex items-center">
                  <div className="h-full w-px bg-red-500 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </div>
                  <span className="text-[10px] font-bold text-red-500 bg-white px-1 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] select-none ml-0.5">
                    {dynHeight}mm
                  </span>
                </div>

                {/* Rendered Design Output inside the bounding box */}
                <img
                  src={imageUrl}
                  alt="AI Generated Design"
                  onLoad={syncHeightWithShopify}
                  className="w-full h-full object-contain rounded"
                />
              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleGenerate}
                disabled={remainingAttempts === 0}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
              >
                Regenerate Alternative
              </button>
              <button
                type="button"
                onClick={() => syncProductImageWithShopify(imageUrl)}
                className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow transition-all"
              >
                Use This Design →
              </button>
            </div>
          </div>
        )}

        {/* 4. Generation History Drawer */}
        {history.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
            <h3 className="font-semibold text-gray-900 text-xs">Your previous generations</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelectHistoryItem(item)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
                    imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
                  }`}
                >
                  <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}