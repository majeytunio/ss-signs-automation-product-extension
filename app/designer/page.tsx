// // // // // // "use client";
// // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // const STYLES = [
// // // // // //   "Bold & High Contrast",
// // // // // //   "Clean & Minimal",
// // // // // //   "Real Estate",
// // // // // //   "Construction",
// // // // // //   "Retail & Sale",
// // // // // //   "Outdoor / Weather Proof",
// // // // // // ];

// // // // // // interface DesignerPageProps {
// // // // // //   shopifyCustomerId?: string | null;
// // // // // //   productWidth?: string;
// // // // // //   productHeight?: string;
// // // // // // }

// // // // // // export default function DesignerPage({ 
// // // // // //   shopifyCustomerId = null, 
// // // // // //   productWidth = "600", 
// // // // // //   productHeight = "900" 
// // // // // // }: DesignerPageProps) {
// // // // // //   const [prompt, setPrompt] = useState("");
// // // // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [imageUrl, setImageUrl] = useState("");
// // // // // //   const [error, setError] = useState("");
// // // // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(shopifyCustomerId ? 10 : 3);
// // // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // // //   // Helper function to calculate height and dispatch it up to Shopify
// // // // // //   const syncHeightWithShopify = () => {
// // // // // //     if (containerRef.current) {
// // // // // //       const height = containerRef.current.scrollHeight;
// // // // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // // // //     }
// // // // // //   };

// // // // // //   // Auto-resize handler sync calculations for outer platform frames
// // // // // //   useEffect(() => {
// // // // // //     syncHeightWithShopify();
// // // // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // // // //     const observer = new MutationObserver(syncHeightWithShopify);
// // // // // //     if (containerRef.current) {
// // // // // //       observer.observe(containerRef.current, {
// // // // // //         attributes: true,
// // // // // //         childList: true,
// // // // // //         subtree: true,
// // // // // //       });
// // // // // //     }

// // // // // //     return () => {
// // // // // //       window.removeEventListener("resize", syncHeightWithShopify);
// // // // // //       observer.disconnect();
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const handleGenerate = async () => {
// // // // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // // // //     setLoading(true);
// // // // // //     setImageUrl("");
// // // // // //     setError("");

// // // // // //     try {
// // // // // //       const response = await fetch("/api/generate-design", {
// // // // // //         method: "POST",
// // // // // //         headers: {
// // // // // //           "Content-Type": "application/json",
// // // // // //         },
// // // // // //         body: JSON.stringify({
// // // // // //           prompt: prompt,
// // // // // //           style: selectedStyle,
// // // // // //           width: productWidth,
// // // // // //           height: productHeight,
// // // // // //           customerId: shopifyCustomerId,
// // // // // //         }),
// // // // // //       });

// // // // // //       const data = await response.json();

// // // // // //       if (typeof data.remainingAttempts === "number") {
// // // // // //         setRemainingAttempts(data.remainingAttempts);
// // // // // //       }

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(data.error || "Failed to process target structural sign composition requests.");
// // // // // //       }

// // // // // //       setImageUrl(data.designUrl);
// // // // // //     } catch (err: any) {
// // // // // //       console.error("UI Execution Fault Encountered:", err);
// // // // // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
          
// // // // // //       {/* Upper header section area panel structure configuration tracking elements */}
// // // // // //       <div className="bg-white border-b border-gray-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// // // // // //         <div>
// // // // // //           <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // // // //           <p className="text-sm text-gray-500 mt-0.5">
// // // // // //             Describe your layout preferences below to instantly establish target mockup iterations
// // // // // //           </p>
// // // // // //         </div>
        
// // // // // //         {remainingAttempts !== null && (
// // // // // //           <div className={`px-4 py-1.5 rounded-full text-xs font-semibold self-start sm:self-center border transition-all shadow-sm ${
// // // // // //             remainingAttempts === 0 
// // // // // //               ? "bg-red-50 border-red-200 text-red-700" 
// // // // // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // // // // //           }`}>
// // // // // //             {remainingAttempts === 0 
// // // // // //               ? "0 generations remaining" 
// // // // // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>

// // // // // //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

// // // // // //         {error && (
// // // // // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all animate-fadeIn">
// // // // // //             <span className="font-semibold">Notice:</span> {error}
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Configuration Layer 1: Prompt Input Description */}
// // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // // //           <div className="flex items-center gap-2">
// // // // // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">1</span>
// // // // // //             <h2 className="font-semibold text-gray-900">Describe your sign</h2>
// // // // // //           </div>
// // // // // //           <textarea
// // // // // //             rows={3}
// // // // // //             value={prompt}
// // // // // //             disabled={remainingAttempts === 0 || loading}
// // // // // //             onChange={(e) => setPrompt(e.target.value)}
// // // // // //             placeholder={remainingAttempts === 0 ? "Account allowances exhausted. Complete standard checkouts to clear balances." : "e.g. High visibility yellow construction notice reading 'CAUTION: SITE ACCESS AHEAD' in bold clear typography..."}
// // // // // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
// // // // // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // // // //             }`}
// // // // // //           />
// // // // // //         </div>

// // // // // //         {/* Configuration Layer 2: Theme / Style Selection Matrix */}
// // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // // //           <div className="flex items-center gap-2">
// // // // // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
// // // // // //             <h2 className="font-semibold text-gray-900">Select design theme style</h2>
// // // // // //           </div>
// // // // // //           <div className="flex flex-wrap gap-2">
// // // // // //             {STYLES.map((style) => (
// // // // // //               <button
// // // // // //                 key={style}
// // // // // //                 disabled={remainingAttempts === 0 || loading}
// // // // // //                 onClick={() => setSelectedStyle(style)}
// // // // // //                 className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
// // // // // //                   selectedStyle === style
// // // // // //                     ? "bg-blue-600 text-white border-blue-600 shadow-sm"
// // // // // //                     : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 animate-none"
// // // // // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed hover:border-gray-300 hover:bg-white" : ""}`}
// // // // // //               >
// // // // // //                 {style}
// // // // // //               </button>
// // // // // //             ))}
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* Action Dispatch Node Element */}
// // // // // //         <button
// // // // // //           onClick={handleGenerate}
// // // // // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // // // //           className={`w-full py-3.5 rounded-xl font-semibold text-white tracking-wide shadow transition-all duration-150 active:scale-[0.99] ${
// // // // // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // // // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none active:scale-100"
// // // // // //               : "bg-blue-600 hover:bg-blue-700"
// // // // // //           }`}
// // // // // //         >
// // // // // //           {loading ? "Compiling Vector Canvas Architecture..." : "Generate Custom Design Asset"}
// // // // // //         </button>

// // // // // //         {/* Loading placeholder display states */}
// // // // // //         {loading && (
// // // // // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // // // // //             <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
// // // // // //             <p className="text-sm font-medium text-gray-500">
// // // // // //               Generating your sign layout assets...
// // // // // //             </p>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Output Canvas Wrapper Container Viewports */}
// // // // // //         {imageUrl && !loading && (
// // // // // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-md animate-fadeIn">
// // // // // //             <div className="flex items-center gap-2">
// // // // // //               <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
// // // // // //               <h2 className="font-semibold text-gray-900">Your generated layout output mockup</h2>
// // // // // //             </div>

// // // // // //             <div className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-inner">
// // // // // //               <img
// // // // // //                 src={imageUrl}
// // // // // //                 alt="AI Generated Sign Composition output preview node"
// // // // // //                 onLoad={syncHeightWithShopify} // 🚀 CRUCIAL FIX: Fires recalculation the split-second the image fully downloads!
// // // // // //                 className="w-full h-auto object-contain max-h-[500px] mx-auto transition-transform duration-200 hover:scale-[1.01]"
// // // // // //               />
// // // // // //             </div>

// // // // // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // // // // //               <button
// // // // // //                 onClick={handleGenerate}
// // // // // //                 disabled={remainingAttempts === 0}
// // // // // //                 className={`flex-1 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all ${
// // // // // //                   remainingAttempts === 0 ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50 hover:bg-gray-50" : ""
// // // // // //                 }`}
// // // // // //               >
// // // // // //                 Regenerate Alternative iteration
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 type="button"
// // // // // //                 onClick={() => alert("Design selected! Transitioning configuration specs over to order checkouts panel.")}
// // // // // //                 className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white shadow transition-all active:scale-[0.98]"
// // // // // //               >
// // // // // //                 Use This Design →
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }










// // // // // "use client";
// // // // // import { useState, useEffect, useRef } from "react";

// // // // // const STYLES = [
// // // // //   "Bold & High Contrast",
// // // // //   "Clean & Minimal",
// // // // //   "Real Estate",
// // // // //   "Construction",
// // // // //   "Retail & Sale",
// // // // //   "Outdoor / Weather Proof",
// // // // // ];

// // // // // interface DesignerPageProps {
// // // // //   shopifyCustomerId?: string | null;
// // // // //   productWidth?: string;
// // // // //   productHeight?: string;
// // // // // }

// // // // // interface HistoryItem {
// // // // //   id: string;
// // // // //   url: string;
// // // // //   prompt: string;
// // // // //   style: string;
// // // // // }

// // // // // export default function DesignerPage({ 
// // // // //   shopifyCustomerId = null, 
// // // // //   productWidth = "600", 
// // // // //   productHeight = "900" 
// // // // // }: DesignerPageProps) {
// // // // //   const [prompt, setPrompt] = useState("");
// // // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [imageUrl, setImageUrl] = useState("");
// // // // //   const [error, setError] = useState("");
// // // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(shopifyCustomerId ? 10 : 3);
// // // // //   const [history, setHistory] = useState<HistoryItem[]>([]);
// // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // //   // Sync Height with parent iframe
// // // // //   const syncHeightWithShopify = () => {
// // // // //     if (containerRef.current) {
// // // // //       const height = containerRef.current.scrollHeight;
// // // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // // //     }
// // // // //   };

// // // // //   // Push the generated image URL up to Shopify to replace the product media panel image
// // // // //   const syncProductImageWithShopify = (imgUrl: string) => {
// // // // //     if (imgUrl) {
// // // // //       window.parent.postMessage({ 
// // // // //         type: "UPDATE_PRODUCT_IMAGE", 
// // // // //         imageUrl: imgUrl 
// // // // //       }, "*");
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     syncHeightWithShopify();
// // // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // // //     const observer = new MutationObserver(syncHeightWithShopify);
// // // // //     if (containerRef.current) {
// // // // //       observer.observe(containerRef.current, {
// // // // //         attributes: true,
// // // // //         childList: true,
// // // // //         subtree: true,
// // // // //       });
// // // // //     }

// // // // //     return () => {
// // // // //       window.removeEventListener("resize", syncHeightWithShopify);
// // // // //       observer.disconnect();
// // // // //     };
// // // // //   }, []);

// // // // //   const handleGenerate = async () => {
// // // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // // //     setLoading(true);
// // // // //     setImageUrl("");
// // // // //     setError("");

// // // // //     try {
// // // // //       const response = await fetch("/api/generate-design", {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           prompt,
// // // // //           style: selectedStyle,
// // // // //           width: productWidth,
// // // // //           height: productHeight,
// // // // //           customerId: shopifyCustomerId,
// // // // //         }),
// // // // //       });

// // // // //       const data = await response.json();

// // // // //       if (typeof data.remainingAttempts === "number") {
// // // // //         setRemainingAttempts(data.remainingAttempts);
// // // // //       }

// // // // //       if (!response.ok) {
// // // // //         throw new Error(data.error || "Failed to process target structural sign composition requests.");
// // // // //       }

// // // // //       const newImageUrl = data.designUrl;
// // // // //       setImageUrl(newImageUrl);
      
// // // // //       // Update history
// // // // //       const newHistoryItem: HistoryItem = {
// // // // //         id: Date.now().toString(),
// // // // //         url: newImageUrl,
// // // // //         prompt: prompt,
// // // // //         style: selectedStyle
// // // // //       };
// // // // //       setHistory(prev => [newHistoryItem, ...prev]);

// // // // //       // Trigger automatic swap of main Shopify media panel image
// // // // //       syncProductImageWithShopify(newImageUrl);

// // // // //     } catch (err: any) {
// // // // //       console.error("UI Execution Fault Encountered:", err);
// // // // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleSelectHistoryItem = (item: HistoryItem) => {
// // // // //     setImageUrl(item.url);
// // // // //     setPrompt(item.prompt);
// // // // //     setSelectedStyle(item.style);
// // // // //     syncProductImageWithShopify(item.url);
// // // // //   };

// // // // //   return (
// // // // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
// // // // //       {/* Header */}
// // // // //       <div className="bg-white border-b border-gray-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// // // // //         <div>
// // // // //           <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // // //           <p className="text-sm text-gray-500 mt-0.5">
// // // // //             Describe your layout preferences below to instantly establish target mockup iterations
// // // // //           </p>
// // // // //         </div>
        
// // // // //         {remainingAttempts !== null && (
// // // // //           <div className={`px-4 py-1.5 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
// // // // //             remainingAttempts === 0 
// // // // //               ? "bg-red-50 border-red-200 text-red-700" 
// // // // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // // // //           }`}>
// // // // //             {remainingAttempts === 0 
// // // // //               ? "0 generations remaining" 
// // // // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // // //           </div>
// // // // //         )}
// // // // //       </div>

// // // // //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

// // // // //         {error && (
// // // // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
// // // // //             <span className="font-semibold">Notice:</span> {error}
// // // // //           </div>
// // // // //         )}

// // // // //         {/* 1. Prompt */}
// // // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // //           <div className="flex items-center gap-2">
// // // // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">1</span>
// // // // //             <h2 className="font-semibold text-gray-900">Describe your sign</h2>
// // // // //           </div>
// // // // //           <textarea
// // // // //             rows={3}
// // // // //             value={prompt}
// // // // //             disabled={remainingAttempts === 0 || loading}
// // // // //             onChange={(e) => setPrompt(e.target.value)}
// // // // //             placeholder={remainingAttempts === 0 ? "Account allowances exhausted. Check out to clear balances." : "e.g. Caution sign reading 'DANGER INSIDE' in bold clear typography..."}
// // // // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
// // // // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // // //             }`}
// // // // //           />
// // // // //         </div>

// // // // //         {/* 2. Theme selection */}
// // // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // //           <div className="flex items-center gap-2">
// // // // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
// // // // //             <h2 className="font-semibold text-gray-900">Select design theme style</h2>
// // // // //           </div>
// // // // //           <div className="flex flex-wrap gap-2">
// // // // //             {STYLES.map((style) => (
// // // // //               <button
// // // // //                 key={style}
// // // // //                 disabled={remainingAttempts === 0 || loading}
// // // // //                 onClick={() => setSelectedStyle(style)}
// // // // //                 className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
// // // // //                   selectedStyle === style
// // // // //                     ? "bg-blue-600 text-white border-blue-600"
// // // // //                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // // // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// // // // //               >
// // // // //                 {style}
// // // // //               </button>
// // // // //             ))}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Action Button */}
// // // // //         <button
// // // // //           onClick={handleGenerate}
// // // // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // // //           className={`w-full py-3.5 rounded-xl font-semibold text-white tracking-wide transition-all ${
// // // // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // // // //               : "bg-blue-600 hover:bg-blue-700"
// // // // //           }`}
// // // // //         >
// // // // //           {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// // // // //         </button>

// // // // //         {loading && (
// // // // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // // // //             <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
// // // // //             <p className="text-sm font-medium text-gray-500">Generating mockup assets...</p>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* 3. Output Canvas with Dynamic Dimensions Rulers */}
// // // // //         {imageUrl && !loading && (
// // // // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-md">
// // // // //             <div className="flex items-center gap-2">
// // // // //               <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
// // // // //               <h2 className="font-semibold text-gray-900">Your generated layout output mockup</h2>
// // // // //             </div>

// // // // //             {/* RULER INTEGRATION LAYOUT CONTAINER */}
// // // // //             <div className="relative p-8 border border-gray-100 bg-gray-50 rounded-lg flex items-center justify-center">
              
// // // // //               {/* Horizontal Top Ruler Line */}
// // // // //               <div className="absolute top-2 left-8 right-8 flex flex-col items-center">
// // // // //                 <div className="w-full h-px bg-red-400 relative">
// // // // //                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// // // // //                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// // // // //                 </div>
// // // // //                 <span className="text-[11px] font-bold text-red-500 bg-gray-50 px-2 mt-1 select-none">
// // // // //                   {productWidth}mm
// // // // //                 </span>
// // // // //               </div>

// // // // //               {/* Vertical Right Ruler Line */}
// // // // //               <div className="absolute right-2 top-8 bottom-8 flex items-center">
// // // // //                 <div className="h-full w-px bg-red-400 relative">
// // // // //                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// // // // //                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// // // // //                 </div>
// // // // //                 <span className="text-[11px] font-bold text-red-500 bg-gray-50 px-1 [writing-mode:vertical-lr] select-none ml-1">
// // // // //                   {productHeight}mm
// // // // //                 </span>
// // // // //               </div>

// // // // //               {/* Image Preview */}
// // // // //               <div className="overflow-hidden rounded border border-gray-200 bg-white max-w-[280px] sm:max-w-[340px]">
// // // // //                 <img
// // // // //                   src={imageUrl}
// // // // //                   alt="AI Generated Sign Composition output preview node"
// // // // //                   onLoad={syncHeightWithShopify}
// // // // //                   className="w-full h-auto object-contain max-h-[450px] mx-auto transition-transform duration-200 hover:scale-[1.01]"
// // // // //                 />
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // // // //               <button
// // // // //                 onClick={handleGenerate}
// // // // //                 disabled={remainingAttempts === 0}
// // // // //                 className="flex-1 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // // // //               >
// // // // //                 Regenerate Alternative
// // // // //               </button>
// // // // //               <button
// // // // //                 type="button"
// // // // //                 onClick={() => syncProductImageWithShopify(imageUrl)}
// // // // //                 className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white shadow transition-all"
// // // // //               >
// // // // //                 Use This Design →
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //         {/* 4. Generation History Shelf */}
// // // // //         {history.length > 0 && (
// // // // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // //             <h3 className="font-semibold text-gray-900 text-sm">Your previous generations</h3>
// // // // //             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
// // // // //               {history.map((item) => (
// // // // //                 <button
// // // // //                   key={item.id}
// // // // //                   onClick={() => handleSelectHistoryItem(item)}
// // // // //                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// // // // //                     imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
// // // // //                   }`}
// // // // //                 >
// // // // //                   <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// // // // //                 </button>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>
// // // // //         )}

// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }





















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

// // // // interface HistoryItem {
// // // //   id: string;
// // // //   url: string;
// // // //   prompt: string;
// // // //   style: string;
// // // // }

// // // // export default function DesignerPage() {
// // // //   const [prompt, setPrompt] = useState("");
// // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [imageUrl, setImageUrl] = useState("");
// // // //   const [error, setError] = useState("");
// // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
// // // //   const [history, setHistory] = useState<HistoryItem[]>([]);
  
// // // //   // Dynamic state attributes
// // // //   const [dynWidth, setDynWidth] = useState("600");
// // // //   const [dynHeight, setDynHeight] = useState("900");
// // // //   const [dynThickness, setDynThickness] = useState("5mm");
// // // //   const [dynEyelets, setDynEyelets] = useState("No");

// // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // //   // Sync frame heights to Shopify
// // // //   const syncHeightWithShopify = () => {
// // // //     if (containerRef.current) {
// // // //       const height = containerRef.current.scrollHeight;
// // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // //     }
// // // //   };

// // // //   // Push design image back to main Shopify gallery element
// // // //   const syncProductImageWithShopify = (imgUrl: string) => {
// // // //     if (imgUrl) {
// // // //       window.parent.postMessage({ 
// // // //         type: "UPDATE_PRODUCT_IMAGE", 
// // // //         imageUrl: imgUrl 
// // // //       }, "*");
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     syncHeightWithShopify();
// // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // //     // Dynamic state listener for Shopify scrapings
// // // //     const handleMessage = (event: MessageEvent) => {
// // // //       if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
// // // //         const { width, height, thickness, eyelets } = event.data;
// // // //         if (width) setDynWidth(width);
// // // //         if (height) setDynHeight(height);
// // // //         if (thickness) setDynThickness(thickness);
// // // //         if (eyelets) setDynEyelets(eyelets);
// // // //       }
// // // //     };

// // // //     window.addEventListener("message", handleMessage);

// // // //     const observer = new MutationObserver(syncHeightWithShopify);
// // // //     if (containerRef.current) {
// // // //       observer.observe(containerRef.current, {
// // // //         attributes: true,
// // // //         childList: true,
// // // //         subtree: true,
// // // //       });
// // // //     }

// // // //     return () => {
// // // //       window.removeEventListener("resize", syncHeightWithShopify);
// // // //       window.removeEventListener("message", handleMessage);
// // // //       observer.disconnect();
// // // //     };
// // // //   }, []);

// // // //   const handleGenerate = async () => {
// // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // //     setLoading(true);
// // // //     setImageUrl("");
// // // //     setError("");

// // // //     // Package actual selections safely into prompt specifications for AI processing
// // // //     const attributeTunedPrompt = `${prompt} (Sign physical properties: ${dynWidth}mm width, ${dynHeight}mm height, sign thickness ${dynThickness}, and eyelets option: ${dynEyelets})`;

// // // //     try {
// // // //       const response = await fetch("/api/generate-design", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           prompt: attributeTunedPrompt,
// // // //           style: selectedStyle,
// // // //           width: dynWidth,
// // // //           height: dynHeight,
// // // //           customerId: null,
// // // //         }),
// // // //       });

// // // //       const data = await response.json();

// // // //       if (typeof data.remainingAttempts === "number") {
// // // //         setRemainingAttempts(data.remainingAttempts);
// // // //       }

// // // //       if (!response.ok) {
// // // //         throw new Error(data.error || "Failed to generate design.");
// // // //       }

// // // //       const newImageUrl = data.designUrl;
// // // //       setImageUrl(newImageUrl);
      
// // // //       const newHistoryItem: HistoryItem = {
// // // //         id: Date.now().toString(),
// // // //         url: newImageUrl,
// // // //         prompt: prompt,
// // // //         style: selectedStyle
// // // //       };
// // // //       setHistory(prev => [newHistoryItem, ...prev]);
// // // //       syncProductImageWithShopify(newImageUrl);

// // // //     } catch (err: any) {
// // // //       console.error("UI Execution Fault Encountered:", err);
// // // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const handleSelectHistoryItem = (item: HistoryItem) => {
// // // //     setImageUrl(item.url);
// // // //     setPrompt(item.prompt);
// // // //     setSelectedStyle(item.style);
// // // //     syncProductImageWithShopify(item.url);
// // // //   };

// // // //   // Convert the aspect ratio dynamically for the preview container wrapper limits
// // // //   const wNum = parseFloat(dynWidth) || 600;
// // // //   const hNum = parseFloat(dynHeight) || 900;
// // // //   const aspectRatio = wNum / hNum;

// // // //   return (
// // // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
// // // //       {/* Header Panel */}
// // // //       <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// // // //         <div>
// // // //           <h1 className="text-lg font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // //           <p className="text-xs text-gray-500">
// // // //             Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
// // // //           </p>
// // // //         </div>
        
// // // //         {remainingAttempts !== null && (
// // // //           <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
// // // //             remainingAttempts === 0 
// // // //               ? "bg-red-50 border-red-200 text-red-700" 
// // // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // // //           }`}>
// // // //             {remainingAttempts === 0 
// // // //               ? "0 generations remaining" 
// // // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

// // // //         {error && (
// // // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
// // // //             <span className="font-semibold">Notice:</span> {error}
// // // //           </div>
// // // //         )}

// // // //         {/* 1. Prompt Input Box */}
// // // //         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // //           <div className="flex items-center gap-2">
// // // //             <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">1</span>
// // // //             <h2 className="text-sm font-semibold text-gray-900">Describe your sign</h2>
// // // //           </div>
// // // //           <textarea
// // // //             rows={3}
// // // //             value={prompt}
// // // //             disabled={remainingAttempts === 0 || loading}
// // // //             onChange={(e) => setPrompt(e.target.value)}
// // // //             placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in clear typography..."}
// // // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
// // // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // //             }`}
// // // //           />
// // // //         </div>

// // // //         {/* 2. Style Matrix */}
// // // //         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // //           <div className="flex items-center gap-2">
// // // //             <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">2</span>
// // // //             <h2 className="text-sm font-semibold text-gray-900">Select design theme style</h2>
// // // //           </div>
// // // //           <div className="flex flex-wrap gap-2">
// // // //             {STYLES.map((style) => (
// // // //               <button
// // // //                 key={style}
// // // //                 disabled={remainingAttempts === 0 || loading}
// // // //                 onClick={() => setSelectedStyle(style)}
// // // //                 className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
// // // //                   selectedStyle === style
// // // //                     ? "bg-blue-600 text-white border-blue-600"
// // // //                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// // // //               >
// // // //                 {style}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>

// // // //         <button
// // // //           onClick={handleGenerate}
// // // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // //           className={`w-full py-3 rounded-xl font-semibold text-sm text-white tracking-wide transition-all ${
// // // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // // //               : "bg-blue-600 hover:bg-blue-700"
// // // //           }`}
// // // //         >
// // // //           {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// // // //         </button>

// // // //         {loading && (
// // // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // // //             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
// // // //             <p className="text-xs font-medium text-gray-500">Generating mockup assets...</p>
// // // //           </div>
// // // //         )}

// // // //         {/* 3. Output Canvas with Border-Hugging Rulers */}
// // // //         {imageUrl && !loading && (
// // // //           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm">
// // // //             <div className="flex items-center gap-2">
// // // //               <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">3</span>
// // // //               <h2 className="text-sm font-semibold text-gray-900">Your generated layout output mockup</h2>
// // // //             </div>

// // // //             {/* BASE CONTAINER */}
// // // //             <div className="bg-gray-50 rounded-lg p-10 flex items-center justify-center border border-gray-100">
              
// // // //               {/* RULER CONTAINER WRAPPER - This element hugs the image structure precisely */}
// // // //               <div 
// // // //                 className="relative p-6 border border-dashed border-gray-300 bg-white rounded-lg shadow-inner flex items-center justify-center"
// // // //                 style={{
// // // //                   width: "100%",
// // // //                   maxWidth: aspectRatio > 1 ? "400px" : `${400 * aspectRatio}px`,
// // // //                   aspectRatio: `${aspectRatio}`
// // // //                 }}
// // // //               >
                
// // // //                 {/* Horizontal Top Ruler - aligned directly above the bounding layout box */}
// // // //                 <div className="absolute -top-6 left-6 right-6 flex flex-col items-center">
// // // //                   <div className="w-full h-px bg-red-500 relative">
// // // //                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // //                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // //                   </div>
// // // //                   <span className="text-[10px] font-bold text-red-500 bg-white px-1.5 mt-0.5 shadow-sm rounded border border-gray-100 select-none">
// // // //                     {dynWidth}mm
// // // //                   </span>
// // // //                 </div>

// // // //                 {/* Vertical Right Ruler - aligned directly to the right side of the bounding layout box */}
// // // //                 <div className="absolute -right-7 top-6 bottom-6 flex items-center">
// // // //                   <div className="h-full w-px bg-red-500 relative">
// // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // //                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // //                   </div>
// // // //                   <span className="text-[10px] font-bold text-red-500 bg-white px-1 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] select-none ml-0.5">
// // // //                     {dynHeight}mm
// // // //                   </span>
// // // //                 </div>

// // // //                 {/* Rendered Design Output inside the bounding box */}
// // // //                 <img
// // // //                   src={imageUrl}
// // // //                   alt="AI Generated Design"
// // // //                   onLoad={syncHeightWithShopify}
// // // //                   className="w-full h-full object-contain rounded"
// // // //                 />
// // // //               </div>

// // // //             </div>

// // // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // // //               <button
// // // //                 onClick={handleGenerate}
// // // //                 disabled={remainingAttempts === 0}
// // // //                 className="flex-1 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // // //               >
// // // //                 Regenerate Alternative
// // // //               </button>
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() => syncProductImageWithShopify(imageUrl)}
// // // //                 className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow transition-all"
// // // //               >
// // // //                 Use This Design →
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* 4. Generation History Drawer */}
// // // //         {history.length > 0 && (
// // // //           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // //             <h3 className="font-semibold text-gray-900 text-xs">Your previous generations</h3>
// // // //             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
// // // //               {history.map((item) => (
// // // //                 <button
// // // //                   key={item.id}
// // // //                   onClick={() => handleSelectHistoryItem(item)}
// // // //                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// // // //                     imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
// // // //                   }`}
// // // //                 >
// // // //                   <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// // // //                 </button>
// // // //               ))}
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

// // // interface HistoryItem {
// // //   id: string;
// // //   url: string;
// // //   prompt: string;
// // //   style: string;
// // // }

// // // export default function DesignerPage() {
// // //   const [prompt, setPrompt] = useState("");
// // //   const [selectedStyle, setSelectedStyle] = useState("");
// // //   const [loading, setLoading] = useState(false);
// // //   const [imageUrl, setImageUrl] = useState("");
// // //   const [error, setError] = useState("");
// // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
// // //   const [history, setHistory] = useState<HistoryItem[]>([]);
  
// // //   // States to hold dynamically scraped Shopify attribute options
// // //   const [dynWidth, setDynWidth] = useState("600");
// // //   const [dynHeight, setDynHeight] = useState("900");
// // //   const [dynThickness, setDynThickness] = useState("5mm");
// // //   const [dynEyelets, setDynEyelets] = useState("No");

// // //   const containerRef = useRef<HTMLDivElement>(null);

// // //   // Sync frame heights to Shopify
// // //   const syncHeightWithShopify = () => {
// // //     if (containerRef.current) {
// // //       const height = containerRef.current.scrollHeight;
// // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // //     }
// // //   };

// // //   // Push design image back to main Shopify gallery element
// // //   // const syncProductImageWithShopify = (imgUrl: string) => {
// // //   //   if (imgUrl) {
// // //   //     window.parent.postMessage({ 
// // //   //       type: "UPDATE_PRODUCT_IMAGE", 
// // //   //       imageUrl: imgUrl 
// // //   //     }, "*");
// // //   //   }
// // //   // };

// // //   // Push design image back to main Shopify gallery element
// // //   const syncProductImageWithShopify = (imgUrl: string) => {
// // //     if (!imgUrl) return;

// // //     console.log("✈️ [Next.js] Attempting to dispatch image to Shopify:", imgUrl);

// // //     const payload = { 
// // //       type: "UPDATE_PRODUCT_IMAGE", 
// // //       imageUrl: imgUrl 
// // //     };

// // //     // Fallback chain: try parent window, then absolute top window
// // //     if (window.parent && window.parent !== window) {
// // //       window.parent.postMessage(payload, "*");
// // //       console.log("📬 Sent via window.parent");
// // //     } else if (window.top) {
// // //       window.top.postMessage(payload, "*");
// // //       console.log("📬 Sent via window.top (Sandbox Fallback)");
// // //     } else {
// // //       console.error("❌ Crucial Error: No window access available due to strict sandbox restrictions.");
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     syncHeightWithShopify();
// // //     window.addEventListener("resize", syncHeightWithShopify);

// // //     // Listen to parent message signals for state variations
// // //     const handleMessage = (event: MessageEvent) => {
// // //       if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
// // //         const { width, height, thickness, eyelets } = event.data;
// // //         if (width) setDynWidth(width);
// // //         if (height) setDynHeight(height);
// // //         if (thickness) setDynThickness(thickness);
// // //         if (eyelets) setDynEyelets(eyelets);
// // //       }
// // //     };

// // //     window.addEventListener("message", handleMessage);

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
// // //       window.removeEventListener("message", handleMessage);
// // //       observer.disconnect();
// // //     };
// // //   }, []);

// // //   const handleGenerate = async () => {
// // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // //     setLoading(true);
// // //     setImageUrl("");
// // //     setError("");

// // //     // Inject active scraped attribute data directly into the generation prompt instructions
// // //     const attributeTunedPrompt = `${prompt} (Specifications: Sign thickness ${dynThickness}, Eyelets config: ${dynEyelets})`;

// // //     try {
// // //       const response = await fetch("/api/generate-design", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           prompt: attributeTunedPrompt,
// // //           style: selectedStyle,
// // //           width: dynWidth,
// // //           height: dynHeight,
// // //           customerId: null,
// // //         }),
// // //       });

// // //       const data = await response.json();

// // //       if (typeof data.remainingAttempts === "number") {
// // //         setRemainingAttempts(data.remainingAttempts);
// // //       }

// // //       if (!response.ok) {
// // //         throw new Error(data.error || "Failed to process target structural sign composition requests.");
// // //       }

// // //       const newImageUrl = data.designUrl;
// // //       setImageUrl(newImageUrl);
      
// // //       const newHistoryItem: HistoryItem = {
// // //         id: Date.now().toString(),
// // //         url: newImageUrl,
// // //         prompt: prompt,
// // //         style: selectedStyle
// // //       };
// // //       setHistory(prev => [newHistoryItem, ...prev]);
// // //       syncProductImageWithShopify(newImageUrl);

// // //     } catch (err: any) {
// // //       console.error("UI Execution Fault Encountered:", err);
// // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleSelectHistoryItem = (item: HistoryItem) => {
// // //     setImageUrl(item.url);
// // //     setPrompt(item.prompt);
// // //     setSelectedStyle(item.style);
// // //     syncProductImageWithShopify(item.url);
// // //   };

// // //   // Convert the aspect ratio dynamically for the preview container wrapper limits
// // //   const wNum = parseFloat(dynWidth) || 600;
// // //   const hNum = parseFloat(dynHeight) || 900;
// // //   const aspectRatio = wNum / hNum;

// // //   return (
// // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
// // //       {/* Header Panel */}
// // //       <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// // //         <div>
// // //           <h1 className="text-lg font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // //           <p className="text-xs text-gray-500">
// // //             Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
// // //           </p>
// // //         </div>
        
// // //         {remainingAttempts !== null && (
// // //           <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
// // //             remainingAttempts === 0 
// // //               ? "bg-red-50 border-red-200 text-red-700" 
// // //               : "bg-[#02aef0] border-[#02aef0] text-white"
// // //           }`}>
// // //             {remainingAttempts === 0 
// // //               ? "0 generations remaining"
// // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // //           </div>
// // //         )}
// // //       </div>

// // //       <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

// // //         {error && (
// // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
// // //             <span className="font-semibold">Notice:</span> {error}
// // //           </div>
// // //         )}

// // //         {/* 1. Prompt Input Box */}
// // //         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // //           <div className="flex items-center gap-2">
// // //             <span className="bg-[#02aef0] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">1</span>
// // //             <h2 className="text-sm font-semibold text-gray-900">Describe your sign</h2>
// // //           </div>
// // //           <textarea
// // //             rows={3}
// // //             value={prompt}
// // //             disabled={remainingAttempts === 0 || loading}
// // //             onChange={(e) => setPrompt(e.target.value)}
// // //             placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in clear typography..."}
// // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
// // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // //             }`}
// // //           />
// // //         </div>

// // //         {/* 2. Style Matrix */}
// // //         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // //           <div className="flex items-center gap-2">
// // //             <span className="bg-[#02aef0] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">2</span>
// // //             <h2 className="text-sm font-semibold text-gray-900">Select design theme style</h2>
// // //           </div>
// // //           <div className="flex flex-wrap gap-2">
// // //             {STYLES.map((style) => (
// // //               <button
// // //                 key={style}
// // //                 disabled={remainingAttempts === 0 || loading}
// // //                 onClick={() => setSelectedStyle(style)}
// // //                 className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
// // //                   selectedStyle === style
// // //                     ? "bg-[#02aef0] text-white border-[#02aef0]"
// // //                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// // //               >
// // //                 {style}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <button
// // //           onClick={handleGenerate}
// // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // //           className={`w-full py-3 rounded-xl font-semibold text-sm text-white tracking-wide transition-all ${
// // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // //               : "bg-[#02aef0] hover:bg-[#028bc9]"
// // //           }`}
// // //         >
// // //           {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// // //         </button>

// // //         {loading && (
// // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // //             <div className="w-6 h-6 border-2 border-[#02aef0] border-t-transparent rounded-full animate-spin" />
// // //             <p className="text-xs font-medium text-gray-500">Generating mockup assets...</p>
// // //           </div>
// // //         )}

// // //         {/* 3. Output Canvas with Border-Hugging Rulers */}
// // //         {imageUrl && !loading && (
// // //           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm">
// // //             <div className="flex items-center gap-2">
// // //               <span className="bg-[#02aef0] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">3</span>
// // //               <h2 className="text-sm font-semibold text-gray-900">Your generated layout output mockup</h2>
// // //             </div>

// // //             {/* BASE CONTAINER */}
// // //             <div className="bg-gray-50 rounded-lg p-10 flex items-center justify-center border border-gray-100">
              
// // //               {/* RULER CONTAINER WRAPPER - This element hugs the image structure precisely */}
// // //               <div 
// // //                 className="relative p-6 border border-dashed border-gray-300 bg-white rounded-lg shadow-inner flex items-center justify-center"
// // //                 style={{
// // //                   width: "100%",
// // //                   maxWidth: aspectRatio > 1 ? "400px" : `${400 * aspectRatio}px`,
// // //                   aspectRatio: `${aspectRatio}`
// // //                 }}
// // //               >
                
// // //                 {/* Horizontal Top Ruler - aligned directly above the bounding layout box */}
// // //                 <div className="absolute -top-6 left-6 right-6 flex flex-col items-center">
// // //                   <div className="w-full h-px bg-red-500 relative">
// // //                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // //                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // //                   </div>
// // //                   <span className="text-[10px] font-bold text-red-500 bg-white px-1.5 mt-0.5 shadow-sm rounded border border-gray-100 select-none">
// // //                     {dynWidth}mm
// // //                   </span>
// // //                 </div>

// // //                 {/* Vertical Right Ruler - aligned directly to the right side of the bounding box */}
// // //                 <div className="absolute -right-7 top-6 bottom-6 flex items-center">
// // //                   <div className="h-full w-px bg-red-500 relative">
// // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // //                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // //                   </div>
// // //                   <span className="text-[10px] font-bold text-red-500 bg-white px-1 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] select-none ml-0.5">
// // //                     {dynHeight}mm
// // //                   </span>
// // //                 </div>

// // //                 {/* Rendered Design Output inside the bounding box */}
// // //                 <img
// // //                   src={imageUrl}
// // //                   alt="AI Generated Design"
// // //                   onLoad={syncHeightWithShopify}
// // //                   className="w-full h-full object-contain rounded"
// // //                 />
// // //               </div>

// // //             </div>

// // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // //               <button
// // //                 onClick={handleGenerate}
// // //                 disabled={remainingAttempts === 0}
// // //                 className="flex-1 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // //               >
// // //                 Regenerate Alternative
// // //               </button>
// // //               <button
// // //                 type="button"
// // //                 onClick={() => syncProductImageWithShopify(imageUrl)}
// // //                 className="flex-1 py-2.5 rounded-lg bg-[#02aef0] hover:bg-[#028bc9] text-xs font-semibold text-white shadow transition-all"
// // //               >
// // //                 Use This Design →
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* 4. Generation History Drawer */}
// // //         {history.length > 0 && (
// // //           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // //             <h3 className="font-semibold text-gray-900 text-xs">Your previous generations</h3>
// // //             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
// // //               {history.map((item) => (
// // //                 <button
// // //                   key={item.id}
// // //                   onClick={() => handleSelectHistoryItem(item)}
// // //                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// // //                     imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
// // //                   }`}
// // //                 >
// // //                   <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// // //                 </button>
// // //               ))}
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

// // interface HistoryItem {
// //   id: string;
// //   url: string;
// //   prompt: string;
// //   style: string;
// // }

// // export default function DesignerPage() {
// //   const [prompt, setPrompt] = useState("");
// //   const [selectedStyle, setSelectedStyle] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [imageUrl, setImageUrl] = useState("");
// //   const [error, setError] = useState("");
// //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
// //   const [history, setHistory] = useState<HistoryItem[]>([]);
  
// //   // Lightbox Modal State
// //   const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

// //   // Dynamic Shopify options
// //   const [dynWidth, setDynWidth] = useState("600");
// //   const [dynHeight, setDynHeight] = useState("900");
// //   const [dynThickness, setDynThickness] = useState("5mm");
// //   const [dynEyelets, setDynEyelets] = useState("No");

// //   const containerRef = useRef<HTMLDivElement>(null);

// //   const syncHeightWithShopify = () => {
// //     if (containerRef.current) {
// //       const height = containerRef.current.scrollHeight;
// //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// //     }
// //   };

// //   const syncProductImageWithShopify = (imgUrl: string) => {
// //     if (!imgUrl) return;
// //     const payload = { type: "UPDATE_PRODUCT_IMAGE", imageUrl: imgUrl };

// //     if (window.parent && window.parent !== window) {
// //       window.parent.postMessage(payload, "*");
// //     } else if (window.top) {
// //       window.top.postMessage(payload, "*");
// //     }
// //   };

// //   useEffect(() => {
// //     syncHeightWithShopify();
// //     window.addEventListener("resize", syncHeightWithShopify);

// //     const handleMessage = (event: MessageEvent) => {
// //       if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
// //         const { width, height, thickness, eyelets } = event.data;
// //         if (width) setDynWidth(width);
// //         if (height) setDynHeight(height);
// //         if (thickness) setDynThickness(thickness);
// //         if (eyelets) setDynEyelets(eyelets);
// //       }
// //     };

// //     window.addEventListener("message", handleMessage);

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
// //       window.removeEventListener("message", handleMessage);
// //       observer.disconnect();
// //     };
// //   }, []);

// //   const handleGenerate = async () => {
// //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// //     setLoading(true);
// //     setImageUrl("");
// //     setError("");

// //     const attributeTunedPrompt = `${prompt} (Specifications: Sign thickness ${dynThickness}, Eyelets config: ${dynEyelets})`;

// //     try {
// //       const response = await fetch("/api/generate-design", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           prompt: attributeTunedPrompt,
// //           style: selectedStyle,
// //           width: dynWidth,
// //           height: dynHeight,
// //           customerId: null,
// //         }),
// //       });

// //       const data = await response.json();

// //       if (typeof data.remainingAttempts === "number") {
// //         setRemainingAttempts(data.remainingAttempts);
// //       }

// //       if (!response.ok) {
// //         throw new Error(data.error || "Failed to generate custom sign artwork.");
// //       }

// //       const newImageUrl = data.designUrl;
// //       setImageUrl(newImageUrl);

// //       const newHistoryItem: HistoryItem = {
// //         id: Date.now().toString(),
// //         url: newImageUrl,
// //         prompt: prompt,
// //         style: selectedStyle
// //       };
// //       setHistory(prev => [newHistoryItem, ...prev]);
// //       syncProductImageWithShopify(newImageUrl);

// //     } catch (err: any) {
// //       console.error("UI Generation Fault:", err);
// //       setError(err.message || "Unable to reach generation server.");
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

// //   const wNum = parseFloat(dynWidth) || 600;
// //   const hNum = parseFloat(dynHeight) || 900;
// //   const aspectRatio = wNum / hNum;

// //   return (
// //     <>
// //       {/* Montserrat Font + Custom Brand Colors */}
// //       <style jsx global>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
// //         body, input, textarea, button, select {
// //           font-family: 'Montserrat', sans-serif !important;
// //         }

// //         .bg-brand {
// //           background-color: #02aef0 !important;
// //         }
// //         .text-brand {
// //           color: #02aef0 !important;
// //         }
// //         .border-brand {
// //           border-color: #02aef0 !important;
// //         }
// //         .hover-bg-brand:hover {
// //           background-color: #029ad5 !important;
// //         }
// //       `}</style>

// //       <div ref={containerRef} className="bg-white overflow-hidden min-h-full antialiased text-gray-900 w-full py-2">
        
// //         {/* Header Panel */}
// //         <div className="bg-white border-b border-gray-200 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// //           <div>
// //             {/* <h1 className="text-base font-bold text-gray-900 tracking-tight">AI Sign Designer</h1> */}
// //             <p className="text-[12px] text-gray-800 font-bold">
// //               Current Specs:
// //             </p>
// //             <p className="text-[11px] text-gray-500">
// //               {dynWidth}mm x {dynHeight}mm
// //             </p>
// //             <p className="text-[11px] text-gray-500">
// //               Thickness: {dynThickness}
// //             </p>
// //             <p className="text-[11px] text-gray-500">
// //               Eyelets: {dynEyelets}
// //             </p>
// //           </div>
          
// //           {remainingAttempts !== null && (
// //             <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold self-start sm:self-center border transition-all ${
// //               remainingAttempts === 0 
// //                 ? "bg-red-50 border-red-200 text-red-700" 
// //                 : "bg-sky-50 border-sky-200 text-brand"
// //             }`}>
// //               {remainingAttempts === 0 
// //                 ? "0 generations remaining" 
// //                 : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// //             </div>
// //           )}
// //         </div>

// //         <div className="w-full space-y-4">

// //           {error && (
// //             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs">
// //               <span className="font-semibold">Notice:</span> {error}
// //             </div>
// //           )}

// //           {/* 1. Prompt Input Box */}
// //           <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// //             <div className="flex items-center gap-2">
// //               <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
// //               <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Describe your sign</h2>
// //             </div>
// //             <textarea
// //               rows={3}
// //               value={prompt}
// //               disabled={remainingAttempts === 0 || loading}
// //               onChange={(e) => setPrompt(e.target.value)}
// //               placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in bold lettering..."}
// //               className={`w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all ${
// //                 remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// //               }`}
// //             />
// //           </div>

// //           {/* 2. Style Matrix */}
// //           <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// //             <div className="flex items-center gap-2">
// //               <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
// //               <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Select design theme style</h2>
// //             </div>
// //             <div className="flex flex-wrap gap-1.5">
// //               {STYLES.map((style) => (
// //                 <button
// //                   key={style}
// //                   disabled={remainingAttempts === 0 || loading}
// //                   onClick={() => setSelectedStyle(style)}
// //                   className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
// //                     selectedStyle === style
// //                       ? "bg-brand text-white border-brand shadow-sm"
// //                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// //                   } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// //                 >
// //                   {style}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           <button
// //             onClick={handleGenerate}
// //             disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// //             className={`w-full py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all ${
// //               !prompt || !selectedStyle || loading || remainingAttempts === 0
// //                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
// //                 : "bg-brand hover-bg-brand text-white shadow-md"
// //             }`}
// //           >
// //             {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// //           </button>

// //           {loading && (
// //             <div className="bg-sky-50/40 rounded-lg border-2 border-dashed border-sky-200 p-8 flex flex-col items-center justify-center gap-2 animate-pulse">
// //               <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
// //               <p className="text-[11px] font-medium text-gray-500">Generating mockup assets...</p>
// //             </div>
// //           )}

// //           {/* 3. Output Canvas */}
// //           {imageUrl && !loading && (
// //             <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-sm">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-2">
// //                   <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
// //                   <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Your generated layout output mockup</h2>
// //                 </div>
// //                 <button
// //                   onClick={() => setModalImageUrl(imageUrl)}
// //                   className="text-[11px] font-semibold text-brand hover:underline flex items-center gap-1"
// //                 >
// //                   🔍 Full Screen Preview
// //                 </button>
// //               </div>

// //               <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center border border-gray-100">
// //                 <div 
// //                   className="relative p-5 border border-dashed border-gray-300 bg-white rounded shadow-inner flex items-center justify-center group"
// //                   style={{
// //                     width: "100%",
// //                     maxWidth: aspectRatio > 1 ? "360px" : `${360 * aspectRatio}px`,
// //                     aspectRatio: `${aspectRatio}`
// //                   }}
// //                 >
// //                   {/* Top Ruler */}
// //                   <div className="absolute -top-5 left-5 right-5 flex flex-col items-center">
// //                     <div className="w-full h-px bg-red-500 relative">
// //                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
// //                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
// //                     </div>
// //                     <span className="text-[9px] font-bold text-red-500 bg-white px-1 mt-0.5 shadow-sm rounded border border-gray-100">
// //                       {dynWidth}mm
// //                     </span>
// //                   </div>

// //                   {/* Right Ruler */}
// //                   <div className="absolute -right-6 top-5 bottom-5 flex items-center">
// //                     <div className="h-full w-px bg-red-500 relative">
// //                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
// //                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
// //                     </div>
// //                     <span className="text-[9px] font-bold text-red-500 bg-white px-0.5 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] ml-0.5">
// //                       {dynHeight}mm
// //                     </span>
// //                   </div>

// //                   <img
// //                     src={imageUrl}
// //                     alt="AI Generated Design"
// //                     onLoad={syncHeightWithShopify}
// //                     className="w-full h-full object-contain rounded cursor-pointer"
// //                     onClick={() => setModalImageUrl(imageUrl)}
// //                   />
// //                 </div>
// //               </div>

// //               <div className="flex flex-col sm:flex-row gap-2 pt-1">
// //                 <button
// //                   onClick={handleGenerate}
// //                   disabled={remainingAttempts === 0}
// //                   className="flex-1 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// //                 >
// //                   Regenerate Alternative
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => syncProductImageWithShopify(imageUrl)}
// //                   className="flex-1 py-2 rounded-md bg-brand hover-bg-brand text-xs font-bold text-white shadow transition-all uppercase tracking-wider"
// //                 >
// //                   Use This Design →
// //                 </button>
// //               </div>
// //             </div>
// //           )}

// //           {/* 4. Generation History Drawer */}
// //           {history.length > 0 && (
// //             <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// //               <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Your previous generations</h3>
// //               <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
// //                 {history.map((item) => (
// //                   <div key={item.id} className="relative group">
// //                     <button
// //                       onClick={() => handleSelectHistoryItem(item)}
// //                       className={`w-full aspect-square rounded overflow-hidden border-2 transition-all ${
// //                         imageUrl === item.url ? "border-brand scale-95 opacity-100 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
// //                       }`}
// //                     >
// //                       <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// //                     </button>
// //                     <button
// //                       onClick={() => setModalImageUrl(item.url)}
// //                       className="absolute top-1 right-1 bg-black/70 text-white rounded p-0.5 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"
// //                       title="Enlarge preview"
// //                     >
// //                       🔍
// //                     </button>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //         </div>

// //         {/* 5. Full Screen Lightbox Modal */}
// //         {modalImageUrl && (
// //           <div 
// //             className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
// //             onClick={() => setModalImageUrl(null)}
// //           >
// //             <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg p-2 overflow-hidden shadow-2xl flex flex-col items-center">
// //               <button
// //                 onClick={() => setModalImageUrl(null)}
// //                 className="absolute top-3 right-3 bg-brand text-white w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center hover-bg-brand"
// //               >
// //                 ✕
// //               </button>
// //               <img
// //                 src={modalImageUrl}
// //                 alt="Enlarged Design Artwork"
// //                 className="max-w-full max-h-[80vh] object-contain rounded"
// //               />
// //               <p className="text-xs text-gray-500 mt-2 font-medium">Click anywhere outside to close</p>
// //             </div>
// //           </div>
// //         )}

// //       </div>
// //     </>
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

//   // Dynamic Shopify options
//   const [dynWidth, setDynWidth] = useState("600");
//   const [dynHeight, setDynHeight] = useState("900");
//   const [dynThickness, setDynThickness] = useState("5mm");
//   const [dynEyelets, setDynEyelets] = useState("No");

//   const containerRef = useRef<HTMLDivElement>(null);

//   const syncHeightWithShopify = () => {
//     if (containerRef.current) {
//       const height = containerRef.current.scrollHeight;
//       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
//     }
//   };

//   const syncProductImageWithShopify = (imgUrl: string) => {
//     if (!imgUrl) return;
//     const payload = { type: "UPDATE_PRODUCT_IMAGE", imageUrl: imgUrl };

//     if (window.parent && window.parent !== window) {
//       window.parent.postMessage(payload, "*");
//     } else if (window.top) {
//       window.top.postMessage(payload, "*");
//     }
//   };

//   // Dispatch Lightbox request to the main Shopify page window
//   const openFullscreenLightbox = (imgUrl: string) => {
//     if (!imgUrl) return;
//     const payload = { type: "OPEN_FULLSCREEN_LIGHTBOX", imageUrl: imgUrl };

//     if (window.parent && window.parent !== window) {
//       window.parent.postMessage(payload, "*");
//     } else if (window.top) {
//       window.top.postMessage(payload, "*");
//     }
//   };

//   useEffect(() => {
//     syncHeightWithShopify();
//     window.addEventListener("resize", syncHeightWithShopify);

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

//     const attributeTunedPrompt = `${prompt} (Specifications: Sign thickness ${dynThickness}, Eyelets config: ${dynEyelets})`;

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
//         throw new Error(data.error || "Failed to generate custom sign artwork.");
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
//       console.error("UI Generation Fault:", err);
//       setError(err.message || "Unable to reach generation server.");
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

//   const wNum = parseFloat(dynWidth) || 600;
//   const hNum = parseFloat(dynHeight) || 900;
//   const aspectRatio = wNum / hNum;

//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
//         body, input, textarea, button, select {
//           font-family: 'Montserrat', sans-serif !important;
//         }

//         .bg-brand {
//           background-color: #02aef0 !important;
//         }
//         .text-brand {
//           color: #02aef0 !important;
//         }
//         .border-brand {
//           border-color: #02aef0 !important;
//         }
//         .hover-bg-brand:hover {
//           background-color: #029ad5 !important;
//         }
//       `}</style>

//       <div ref={containerRef} className="bg-white overflow-hidden min-h-full antialiased text-gray-900 w-full py-2">
        
//         {/* Header Panel */}
//         <div className="bg-white border-b border-gray-200 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//           <div>
//             <h1 className="text-base font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
//             <p className="text-[11px] text-gray-500">
//               Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
//             </p>
//           </div>
          
//           {remainingAttempts !== null && (
//             <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold self-start sm:self-center border transition-all ${
//               remainingAttempts === 0 
//                 ? "bg-red-50 border-red-200 text-red-700" 
//                 : "bg-sky-50 border-sky-200 text-brand"
//             }`}>
//               {remainingAttempts === 0 
//                 ? "0 generations remaining" 
//                 : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
//             </div>
//           )}
//         </div>

//         <div className="w-full space-y-4">

//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs">
//               <span className="font-semibold">Notice:</span> {error}
//             </div>
//           )}

//           {/* 1. Prompt Input Box */}
//           <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
//               <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Describe your sign</h2>
//             </div>
//             <textarea
//               rows={3}
//               value={prompt}
//               disabled={remainingAttempts === 0 || loading}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in bold lettering..."}
//               className={`w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all ${
//                 remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
//               }`}
//             />
//           </div>

//           {/* 2. Style Matrix */}
//           <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
//             <div className="flex items-center gap-2">
//               <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
//               <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Select design theme style</h2>
//             </div>
//             <div className="flex flex-wrap gap-1.5">
//               {STYLES.map((style) => (
//                 <button
//                   key={style}
//                   disabled={remainingAttempts === 0 || loading}
//                   onClick={() => setSelectedStyle(style)}
//                   className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
//                     selectedStyle === style
//                       ? "bg-brand text-white border-brand shadow-sm"
//                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
//                   } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
//                 >
//                   {style}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <button
//             onClick={handleGenerate}
//             disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
//             className={`w-full py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all ${
//               !prompt || !selectedStyle || loading || remainingAttempts === 0
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 : "bg-brand hover-bg-brand text-white shadow-md"
//             }`}
//           >
//             {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
//           </button>

//           {loading && (
//             <div className="bg-sky-50/40 rounded-lg border-2 border-dashed border-sky-200 p-8 flex flex-col items-center justify-center gap-2 animate-pulse">
//               <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
//               <p className="text-[11px] font-medium text-gray-500">Generating mockup assets...</p>
//             </div>
//           )}

//           {/* 3. Output Canvas */}
//           {imageUrl && !loading && (
//             <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-sm">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
//                   <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Your generated layout output mockup</h2>
//                 </div>
//                 <button
//                   onClick={() => openFullscreenLightbox(imageUrl)}
//                   className="text-[11px] font-semibold text-brand hover:underline flex items-center gap-1"
//                 >
//                   🔍 Full Screen Preview
//                 </button>
//               </div>

//               <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center border border-gray-100">
//                 <div 
//                   className="relative p-5 border border-dashed border-gray-300 bg-white rounded shadow-inner flex items-center justify-center group"
//                   style={{
//                     width: "100%",
//                     maxWidth: aspectRatio > 1 ? "360px" : `${360 * aspectRatio}px`,
//                     aspectRatio: `${aspectRatio}`
//                   }}
//                 >
//                   {/* Top Ruler */}
//                   <div className="absolute -top-5 left-5 right-5 flex flex-col items-center">
//                     <div className="w-full h-px bg-red-500 relative">
//                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
//                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
//                     </div>
//                     <span className="text-[9px] font-bold text-red-500 bg-white px-1 mt-0.5 shadow-sm rounded border border-gray-100">
//                       {dynWidth}mm
//                     </span>
//                   </div>

//                   {/* Right Ruler */}
//                   <div className="absolute -right-6 top-5 bottom-5 flex items-center">
//                     <div className="h-full w-px bg-red-500 relative">
//                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
//                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
//                     </div>
//                     <span className="text-[9px] font-bold text-red-500 bg-white px-0.5 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] ml-0.5">
//                       {dynHeight}mm
//                     </span>
//                   </div>

//                   <img
//                     src={imageUrl}
//                     alt="AI Generated Design"
//                     onLoad={syncHeightWithShopify}
//                     className="w-full h-full object-contain rounded cursor-pointer"
//                     onClick={() => openFullscreenLightbox(imageUrl)}
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-2 pt-1">
//                 <button
//                   onClick={handleGenerate}
//                   disabled={remainingAttempts === 0}
//                   className="flex-1 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
//                 >
//                   Regenerate Alternative
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => syncProductImageWithShopify(imageUrl)}
//                   className="flex-1 py-2 rounded-md bg-brand hover-bg-brand text-xs font-bold text-white shadow transition-all uppercase tracking-wider"
//                 >
//                   Use This Design →
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* 4. Generation History Drawer */}
//           {history.length > 0 && (
//             <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
//               <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Your previous generations</h3>
//               <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
//                 {history.map((item) => (
//                   <div key={item.id} className="relative group">
//                     <button
//                       onClick={() => handleSelectHistoryItem(item)}
//                       className={`w-full aspect-square rounded overflow-hidden border-2 transition-all ${
//                         imageUrl === item.url ? "border-brand scale-95 opacity-100 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
//                       }`}
//                     >
//                       <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
//                     </button>
//                     <button
//                       onClick={() => openFullscreenLightbox(item.url)}
//                       className="absolute top-1 right-1 bg-black/70 text-white rounded p-0.5 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"
//                       title="Enlarge preview"
//                     >
//                       🔍
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//         </div>

//       </div>
//     </>
//   );
// }
























"use client";

import React, { useState, useEffect } from "react";

export default function DesignerPage() {
  // ML1 - ML3: Base Designer States
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Bold & High Contrast");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Shopify Product Spec States (Retained from theme message listener)
  const [productSpecs, setProductSpecs] = useState({
    width: "450mm",
    height: "600mm",
    thickness: "5mm",
    eyelets: "No",
  });

  // Calculate Aspect Ratio from Product Specs (Default to 450:600 -> 0.75)
  const numericWidth = parseFloat(productSpecs.width) || 450;
  const numericHeight = parseFloat(productSpecs.height) || 600;
  const aspectRatio = numericWidth / numericHeight;

  // ML4: Overlay & Interactive Canvas States
  const [textOverlay, setTextOverlay] = useState("YOUR TEXT HERE");
  const [fontSize, setFontSize] = useState(28);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [fontFamily, setFontFamily] = useState("Montserrat");
  const [textPos, setTextPos] = useState({ x: 50, y: 50 }); // Center percentage coordinates

  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoPos, setLogoPos] = useState({ x: 10, y: 10 });
  const [logoWarning, setLogoWarning] = useState<string | null>(null);

  const [showPrintGuides, setShowPrintGuides] = useState(true);
  const [refinePrompt, setRefinePrompt] = useState("");

  // Listen for iframe messages from Shopify App Embed / Theme
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "SET_PRODUCT_SPECS") {
        setProductSpecs(event.data.specs);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // ML4: Logo Upload & DPI Resolution Check
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoWarning(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        // Resolution check threshold (< 800px width/height for print fidelity)
        if (img.width < 800 || img.height < 800) {
          setLogoWarning(`Low resolution logo (${img.width}x${img.height}px). May appear pixelated when printed.`);
        }
        setLogoUrl(img.src);
      };
    };
    reader.readAsDataURL(file);
  };

  // Generate Base Image via AI Gateway API
  const handleGenerate = async () => {
    if (!prompt) return;
    if (remainingAttempts <= 0) {
      setErrorNotice("You have reached the maximum generation limit for this session.");
      return;
    }

    setLoading(true);
    setErrorNotice(null);

    const fullPrompt = `Signage design for ${productSpecs.width}x${productSpecs.height} corflute sign. Style: ${selectedStyle}. ${prompt}`;

    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: fullPrompt,
          aspectRatio: aspectRatio,
          width: numericWidth,
          height: numericHeight,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate design through Cloudflare AI Gateway.");
      }

      setImageUrl(data.imageUrl);
      setRemainingAttempts((prev) => prev - 1);
    } catch (err: any) {
      setErrorNotice(err.message || "Failed to generate design through Cloudflare AI Gateway.");
    } finally {
      setLoading(false);
    }
  };

  // Sync Final Canvas Image Back to Shopify Theme
  const syncProductImageWithShopify = (generatedImage: string) => {
    if (window.parent) {
      window.parent.postMessage(
        {
          type: "SET_DESIGN_RESULT",
          imageUrl: generatedImage,
          textOverlay,
          logoUrl,
        },
        "*"
      );
    }
  };

  const stylePresets = [
    "Bold & High Contrast",
    "Clean & Minimal",
    "Real Estate",
    "Construction",
    "Retail & Sale",
    "Outdoor / Weather Proof",
  ];

  return (
    <div className="max-w-xl mx-auto p-4 font-sans space-y-4 bg-white text-gray-800 rounded-xl border border-gray-100 shadow-sm">
      {/* Header Specs Bar */}
      <div className="border-b border-gray-100 pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-sm font-extrabold text-gray-900 tracking-tight">AI Sign Designer</h1>
          <p className="text-[11px] text-gray-500">
            Current Specs: {productSpecs.width} x {productSpecs.height} | Thickness: {productSpecs.thickness} | Eyelets: {productSpecs.eyelets}
          </p>
        </div>
        <span className="text-[11px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
          {remainingAttempts} generations remaining
        </span>
      </div>

      {/* Error / Notice Display */}
      {errorNotice && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-lg flex items-center justify-between">
          <span><strong>Notice:</strong> {errorNotice}</span>
          <button onClick={() => setErrorNotice(null)} className="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Step 1: Describe Your Sign */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
          <span className="bg-brand text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">1</span>
          Describe Your Sign
        </label>
        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Build me a banner design with my name John Carter..."
          className="w-full text-xs p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
        />
      </div>

      {/* Step 2: Select Design Theme Style */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
          <span className="bg-brand text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">2</span>
          Select Design Theme Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {stylePresets.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setSelectedStyle(style)}
              className={`text-[11px] px-3 py-1.5 rounded-full font-medium transition-all ${
                selectedStyle === style
                  ? "bg-brand text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={loading || !prompt || remainingAttempts === 0}
        className="w-full py-3 bg-brand hover-bg-brand text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating Custom Design...
          </>
        ) : (
          "Generate Custom Design Asset"
        )}
      </button>

      {/* Step 3: Interactive Canvas & Overlay Editor (ML4) */}
      {imageUrl && !loading && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4 shadow-sm mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Interactive Layout & Overlay Editor</h2>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-[11px] font-medium text-gray-600 cursor-pointer select-none">
                <input 
                  type="checkbox" 
                  checked={showPrintGuides} 
                  onChange={(e) => setShowPrintGuides(e.target.checked)}
                  className="rounded border-gray-300 text-brand focus:ring-brand"
                />
                Show Print Bleed Guides
              </label>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="text-[11px] font-semibold text-brand hover:underline flex items-center gap-1"
              >
                🔍 Full Screen Preview
              </button>
            </div>
          </div>

          {/* Canvas Display Area */}
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center border border-gray-100">
            <div 
              className="relative border border-dashed border-gray-300 bg-white rounded shadow-inner flex items-center justify-center overflow-hidden"
              style={{
                width: "100%",
                maxWidth: aspectRatio > 1 ? "420px" : `${420 * aspectRatio}px`,
                aspectRatio: `${aspectRatio}`
              }}
            >
              {/* Base AI Generated Background */}
              <img
                src={imageUrl}
                alt="AI Generated Background"
                className="w-full h-full object-contain pointer-events-none select-none"
              />

              {/* Dynamic Print Bleed & Safe Area Overlay */}
              {showPrintGuides && (
                <div className="absolute inset-2 border-2 border-dashed border-red-400/70 pointer-events-none flex items-start justify-start p-1">
                  <span className="text-[8px] font-bold text-red-500 bg-white/90 px-1 rounded shadow-xs">5mm Safe Margin</span>
                </div>
              )}

              {/* Dynamic Logo Overlay */}
              {logoUrl && (
                <div 
                  className="absolute cursor-move border border-transparent hover:border-brand p-0.5 rounded"
                  style={{ left: `${logoPos.x}%`, top: `${logoPos.y}%` }}
                >
                  <img src={logoUrl} alt="Uploaded Logo" className="h-12 w-auto object-contain" />
                </div>
              )}

              {/* Dynamic Text Overlay */}
              {textOverlay && (
                <div 
                  className="absolute cursor-move border border-transparent hover:border-brand px-2 py-1 rounded text-center select-none"
                  style={{ 
                    left: `${textPos.x}%`, 
                    top: `${textPos.y}%`, 
                    transform: "translate(-50%, -50%)",
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    fontFamily: fontFamily
                  }}
                >
                  <span className="font-bold drop-shadow-md">{textOverlay}</span>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            
            {/* Text Block Controls */}
            <div className="bg-gray-50 p-3 rounded-md space-y-2 border border-gray-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Text Block Editor</h3>
              <input 
                type="text" 
                value={textOverlay} 
                onChange={(e) => setTextOverlay(e.target.value)}
                placeholder="Enter sign wording..."
                className="w-full border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-brand"
              />
              <div className="flex gap-2">
                <select 
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs text-gray-700 bg-white"
                >
                  <option value="Montserrat">Montserrat</option>
                  <option value="Arial">Arial Black</option>
                  <option value="Impact">Impact</option>
                  <option value="Times New Roman">Times New Roman</option>
                </select>
                <input 
                  type="color" 
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-7 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                  title="Text Color"
                />
                <input 
                  type="number" 
                  value={fontSize} 
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-14 border border-gray-300 rounded px-1.5 text-xs text-center bg-white"
                  min={12} max={72}
                />
              </div>
            </div>

            {/* Logo Upload & DPI Checks */}
            <div className="bg-gray-50 p-3 rounded-md space-y-2 border border-gray-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-700">Logo & Vector Upload</h3>
              <input 
                type="file" 
                accept="image/png, image/jpeg, image/svg+xml"
                onChange={handleLogoUpload}
                className="w-full text-[11px] text-gray-600 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-sky-100 file:text-brand hover:file:bg-sky-200 cursor-pointer"
              />
              {logoWarning && (
                <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 p-1.5 rounded">
                  ⚠️ {logoWarning}
                </p>
              )}
            </div>

          </div>

          {/* Background Iterative Refinement Input */}
          <div className="bg-sky-50/50 p-3 rounded-md space-y-2 border border-sky-100">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-brand">Refine Base Background</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={refinePrompt} 
                onChange={(e) => setRefinePrompt(e.target.value)}
                placeholder="e.g. Make background darker, change yellow border to red..."
                className="flex-1 border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-800 bg-white"
              />
              <button 
                type="button"
                onClick={() => {
                  setPrompt((prev) => `${prev}. Refinement: ${refinePrompt}`);
                  handleGenerate();
                }}
                disabled={!refinePrompt || loading || remainingAttempts === 0}
                className="px-3 py-1.5 bg-brand text-white rounded font-bold text-xs uppercase tracking-wider disabled:opacity-50"
              >
                Refine
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={remainingAttempts === 0}
              className="flex-1 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
            >
              Regenerate Base Design
            </button>
            <button
              type="button"
              onClick={() => syncProductImageWithShopify(imageUrl)}
              className="flex-1 py-2 rounded-md bg-brand text-xs font-bold text-white shadow transition-all uppercase tracking-wider"
            >
              Use This Design →
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && imageUrl && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-10 right-0 text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full"
            >
              Close ✕
            </button>
            <img
              src={imageUrl}
              alt="Fullscreen Preview"
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}