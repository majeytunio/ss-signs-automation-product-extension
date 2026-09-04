// // // // // // // // // // "use client";
// // // // // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // // // // const STYLES = [
// // // // // // // // // //   "Bold & High Contrast",
// // // // // // // // // //   "Clean & Minimal",
// // // // // // // // // //   "Real Estate",
// // // // // // // // // //   "Construction",
// // // // // // // // // //   "Retail & Sale",
// // // // // // // // // //   "Outdoor / Weather Proof",
// // // // // // // // // // ];

// // // // // // // // // // interface DesignerPageProps {
// // // // // // // // // //   shopifyCustomerId?: string | null;
// // // // // // // // // //   productWidth?: string;
// // // // // // // // // //   productHeight?: string;
// // // // // // // // // // }

// // // // // // // // // // export default function DesignerPage({ 
// // // // // // // // // //   shopifyCustomerId = null, 
// // // // // // // // // //   productWidth = "600", 
// // // // // // // // // //   productHeight = "900" 
// // // // // // // // // // }: DesignerPageProps) {
// // // // // // // // // //   const [prompt, setPrompt] = useState("");
// // // // // // // // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // // //   const [imageUrl, setImageUrl] = useState("");
// // // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(shopifyCustomerId ? 10 : 3);
// // // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // // // // // // //   // Helper function to calculate height and dispatch it up to Shopify
// // // // // // // // // //   const syncHeightWithShopify = () => {
// // // // // // // // // //     if (containerRef.current) {
// // // // // // // // // //       const height = containerRef.current.scrollHeight;
// // // // // // // // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // Auto-resize handler sync calculations for outer platform frames
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     syncHeightWithShopify();
// // // // // // // // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // // // // // // // //     const observer = new MutationObserver(syncHeightWithShopify);
// // // // // // // // // //     if (containerRef.current) {
// // // // // // // // // //       observer.observe(containerRef.current, {
// // // // // // // // // //         attributes: true,
// // // // // // // // // //         childList: true,
// // // // // // // // // //         subtree: true,
// // // // // // // // // //       });
// // // // // // // // // //     }

// // // // // // // // // //     return () => {
// // // // // // // // // //       window.removeEventListener("resize", syncHeightWithShopify);
// // // // // // // // // //       observer.disconnect();
// // // // // // // // // //     };
// // // // // // // // // //   }, []);

// // // // // // // // // //   const handleGenerate = async () => {
// // // // // // // // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // // // // // // // //     setLoading(true);
// // // // // // // // // //     setImageUrl("");
// // // // // // // // // //     setError("");

// // // // // // // // // //     try {
// // // // // // // // // //       const response = await fetch("/api/generate-design", {
// // // // // // // // // //         method: "POST",
// // // // // // // // // //         headers: {
// // // // // // // // // //           "Content-Type": "application/json",
// // // // // // // // // //         },
// // // // // // // // // //         body: JSON.stringify({
// // // // // // // // // //           prompt: prompt,
// // // // // // // // // //           style: selectedStyle,
// // // // // // // // // //           width: productWidth,
// // // // // // // // // //           height: productHeight,
// // // // // // // // // //           customerId: shopifyCustomerId,
// // // // // // // // // //         }),
// // // // // // // // // //       });

// // // // // // // // // //       const data = await response.json();

// // // // // // // // // //       if (typeof data.remainingAttempts === "number") {
// // // // // // // // // //         setRemainingAttempts(data.remainingAttempts);
// // // // // // // // // //       }

// // // // // // // // // //       if (!response.ok) {
// // // // // // // // // //         throw new Error(data.error || "Failed to process target structural sign composition requests.");
// // // // // // // // // //       }

// // // // // // // // // //       setImageUrl(data.designUrl);
// // // // // // // // // //     } catch (err: any) {
// // // // // // // // // //       console.error("UI Execution Fault Encountered:", err);
// // // // // // // // // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
          
// // // // // // // // // //       {/* Upper header section area panel structure configuration tracking elements */}
// // // // // // // // // //       <div className="bg-white border-b border-gray-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// // // // // // // // // //         <div>
// // // // // // // // // //           <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // // // // // // // //           <p className="text-sm text-gray-500 mt-0.5">
// // // // // // // // // //             Describe your layout preferences below to instantly establish target mockup iterations
// // // // // // // // // //           </p>
// // // // // // // // // //         </div>
        
// // // // // // // // // //         {remainingAttempts !== null && (
// // // // // // // // // //           <div className={`px-4 py-1.5 rounded-full text-xs font-semibold self-start sm:self-center border transition-all shadow-sm ${
// // // // // // // // // //             remainingAttempts === 0 
// // // // // // // // // //               ? "bg-red-50 border-red-200 text-red-700" 
// // // // // // // // // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // // // // // // // // //           }`}>
// // // // // // // // // //             {remainingAttempts === 0 
// // // // // // // // // //               ? "0 generations remaining" 
// // // // // // // // // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // // // // // // // //           </div>
// // // // // // // // // //         )}
// // // // // // // // // //       </div>

// // // // // // // // // //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

// // // // // // // // // //         {error && (
// // // // // // // // // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all animate-fadeIn">
// // // // // // // // // //             <span className="font-semibold">Notice:</span> {error}
// // // // // // // // // //           </div>
// // // // // // // // // //         )}

// // // // // // // // // //         {/* Configuration Layer 1: Prompt Input Description */}
// // // // // // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // // // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">1</span>
// // // // // // // // // //             <h2 className="font-semibold text-gray-900">Describe your sign</h2>
// // // // // // // // // //           </div>
// // // // // // // // // //           <textarea
// // // // // // // // // //             rows={3}
// // // // // // // // // //             value={prompt}
// // // // // // // // // //             disabled={remainingAttempts === 0 || loading}
// // // // // // // // // //             onChange={(e) => setPrompt(e.target.value)}
// // // // // // // // // //             placeholder={remainingAttempts === 0 ? "Account allowances exhausted. Complete standard checkouts to clear balances." : "e.g. High visibility yellow construction notice reading 'CAUTION: SITE ACCESS AHEAD' in bold clear typography..."}
// // // // // // // // // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
// // // // // // // // // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // // // // // // // //             }`}
// // // // // // // // // //           />
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* Configuration Layer 2: Theme / Style Selection Matrix */}
// // // // // // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // // // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
// // // // // // // // // //             <h2 className="font-semibold text-gray-900">Select design theme style</h2>
// // // // // // // // // //           </div>
// // // // // // // // // //           <div className="flex flex-wrap gap-2">
// // // // // // // // // //             {STYLES.map((style) => (
// // // // // // // // // //               <button
// // // // // // // // // //                 key={style}
// // // // // // // // // //                 disabled={remainingAttempts === 0 || loading}
// // // // // // // // // //                 onClick={() => setSelectedStyle(style)}
// // // // // // // // // //                 className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
// // // // // // // // // //                   selectedStyle === style
// // // // // // // // // //                     ? "bg-blue-600 text-white border-blue-600 shadow-sm"
// // // // // // // // // //                     : "bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50 animate-none"
// // // // // // // // // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed hover:border-gray-300 hover:bg-white" : ""}`}
// // // // // // // // // //               >
// // // // // // // // // //                 {style}
// // // // // // // // // //               </button>
// // // // // // // // // //             ))}
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>

// // // // // // // // // //         {/* Action Dispatch Node Element */}
// // // // // // // // // //         <button
// // // // // // // // // //           onClick={handleGenerate}
// // // // // // // // // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // // // // // // // //           className={`w-full py-3.5 rounded-xl font-semibold text-white tracking-wide shadow transition-all duration-150 active:scale-[0.99] ${
// // // // // // // // // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // // // // // // // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none active:scale-100"
// // // // // // // // // //               : "bg-blue-600 hover:bg-blue-700"
// // // // // // // // // //           }`}
// // // // // // // // // //         >
// // // // // // // // // //           {loading ? "Compiling Vector Canvas Architecture..." : "Generate Custom Design Asset"}
// // // // // // // // // //         </button>

// // // // // // // // // //         {/* Loading placeholder display states */}
// // // // // // // // // //         {loading && (
// // // // // // // // // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // // // // // // // // //             <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
// // // // // // // // // //             <p className="text-sm font-medium text-gray-500">
// // // // // // // // // //               Generating your sign layout assets...
// // // // // // // // // //             </p>
// // // // // // // // // //           </div>
// // // // // // // // // //         )}

// // // // // // // // // //         {/* Output Canvas Wrapper Container Viewports */}
// // // // // // // // // //         {imageUrl && !loading && (
// // // // // // // // // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-md animate-fadeIn">
// // // // // // // // // //             <div className="flex items-center gap-2">
// // // // // // // // // //               <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
// // // // // // // // // //               <h2 className="font-semibold text-gray-900">Your generated layout output mockup</h2>
// // // // // // // // // //             </div>

// // // // // // // // // //             <div className="overflow-hidden rounded-lg border border-gray-100 bg-gray-50 shadow-inner">
// // // // // // // // // //               <img
// // // // // // // // // //                 src={imageUrl}
// // // // // // // // // //                 alt="AI Generated Sign Composition output preview node"
// // // // // // // // // //                 onLoad={syncHeightWithShopify} // 🚀 CRUCIAL FIX: Fires recalculation the split-second the image fully downloads!
// // // // // // // // // //                 className="w-full h-auto object-contain max-h-[500px] mx-auto transition-transform duration-200 hover:scale-[1.01]"
// // // // // // // // // //               />
// // // // // // // // // //             </div>

// // // // // // // // // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // // // // // // // // //               <button
// // // // // // // // // //                 onClick={handleGenerate}
// // // // // // // // // //                 disabled={remainingAttempts === 0}
// // // // // // // // // //                 className={`flex-1 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all ${
// // // // // // // // // //                   remainingAttempts === 0 ? "bg-gray-50 text-gray-400 cursor-not-allowed opacity-50 hover:bg-gray-50" : ""
// // // // // // // // // //                 }`}
// // // // // // // // // //               >
// // // // // // // // // //                 Regenerate Alternative iteration
// // // // // // // // // //               </button>
// // // // // // // // // //               <button
// // // // // // // // // //                 type="button"
// // // // // // // // // //                 onClick={() => alert("Design selected! Transitioning configuration specs over to order checkouts panel.")}
// // // // // // // // // //                 className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white shadow transition-all active:scale-[0.98]"
// // // // // // // // // //               >
// // // // // // // // // //                 Use This Design →
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         )}

// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // }










// // // // // // // // // "use client";
// // // // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // // // const STYLES = [
// // // // // // // // //   "Bold & High Contrast",
// // // // // // // // //   "Clean & Minimal",
// // // // // // // // //   "Real Estate",
// // // // // // // // //   "Construction",
// // // // // // // // //   "Retail & Sale",
// // // // // // // // //   "Outdoor / Weather Proof",
// // // // // // // // // ];

// // // // // // // // // interface DesignerPageProps {
// // // // // // // // //   shopifyCustomerId?: string | null;
// // // // // // // // //   productWidth?: string;
// // // // // // // // //   productHeight?: string;
// // // // // // // // // }

// // // // // // // // // interface HistoryItem {
// // // // // // // // //   id: string;
// // // // // // // // //   url: string;
// // // // // // // // //   prompt: string;
// // // // // // // // //   style: string;
// // // // // // // // // }

// // // // // // // // // export default function DesignerPage({ 
// // // // // // // // //   shopifyCustomerId = null, 
// // // // // // // // //   productWidth = "600", 
// // // // // // // // //   productHeight = "900" 
// // // // // // // // // }: DesignerPageProps) {
// // // // // // // // //   const [prompt, setPrompt] = useState("");
// // // // // // // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // // //   const [imageUrl, setImageUrl] = useState("");
// // // // // // // // //   const [error, setError] = useState("");
// // // // // // // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(shopifyCustomerId ? 10 : 3);
// // // // // // // // //   const [history, setHistory] = useState<HistoryItem[]>([]);
// // // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // // // // // //   // Sync Height with parent iframe
// // // // // // // // //   const syncHeightWithShopify = () => {
// // // // // // // // //     if (containerRef.current) {
// // // // // // // // //       const height = containerRef.current.scrollHeight;
// // // // // // // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Push the generated image URL up to Shopify to replace the product media panel image
// // // // // // // // //   const syncProductImageWithShopify = (imgUrl: string) => {
// // // // // // // // //     if (imgUrl) {
// // // // // // // // //       window.parent.postMessage({ 
// // // // // // // // //         type: "UPDATE_PRODUCT_IMAGE", 
// // // // // // // // //         imageUrl: imgUrl 
// // // // // // // // //       }, "*");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     syncHeightWithShopify();
// // // // // // // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // // // // // // //     const observer = new MutationObserver(syncHeightWithShopify);
// // // // // // // // //     if (containerRef.current) {
// // // // // // // // //       observer.observe(containerRef.current, {
// // // // // // // // //         attributes: true,
// // // // // // // // //         childList: true,
// // // // // // // // //         subtree: true,
// // // // // // // // //       });
// // // // // // // // //     }

// // // // // // // // //     return () => {
// // // // // // // // //       window.removeEventListener("resize", syncHeightWithShopify);
// // // // // // // // //       observer.disconnect();
// // // // // // // // //     };
// // // // // // // // //   }, []);

// // // // // // // // //   const handleGenerate = async () => {
// // // // // // // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // // // // // // //     setLoading(true);
// // // // // // // // //     setImageUrl("");
// // // // // // // // //     setError("");

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch("/api/generate-design", {
// // // // // // // // //         method: "POST",
// // // // // // // // //         headers: {
// // // // // // // // //           "Content-Type": "application/json",
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify({
// // // // // // // // //           prompt,
// // // // // // // // //           style: selectedStyle,
// // // // // // // // //           width: productWidth,
// // // // // // // // //           height: productHeight,
// // // // // // // // //           customerId: shopifyCustomerId,
// // // // // // // // //         }),
// // // // // // // // //       });

// // // // // // // // //       const data = await response.json();

// // // // // // // // //       if (typeof data.remainingAttempts === "number") {
// // // // // // // // //         setRemainingAttempts(data.remainingAttempts);
// // // // // // // // //       }

// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         throw new Error(data.error || "Failed to process target structural sign composition requests.");
// // // // // // // // //       }

// // // // // // // // //       const newImageUrl = data.designUrl;
// // // // // // // // //       setImageUrl(newImageUrl);
      
// // // // // // // // //       // Update history
// // // // // // // // //       const newHistoryItem: HistoryItem = {
// // // // // // // // //         id: Date.now().toString(),
// // // // // // // // //         url: newImageUrl,
// // // // // // // // //         prompt: prompt,
// // // // // // // // //         style: selectedStyle
// // // // // // // // //       };
// // // // // // // // //       setHistory(prev => [newHistoryItem, ...prev]);

// // // // // // // // //       // Trigger automatic swap of main Shopify media panel image
// // // // // // // // //       syncProductImageWithShopify(newImageUrl);

// // // // // // // // //     } catch (err: any) {
// // // // // // // // //       console.error("UI Execution Fault Encountered:", err);
// // // // // // // // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleSelectHistoryItem = (item: HistoryItem) => {
// // // // // // // // //     setImageUrl(item.url);
// // // // // // // // //     setPrompt(item.prompt);
// // // // // // // // //     setSelectedStyle(item.style);
// // // // // // // // //     syncProductImageWithShopify(item.url);
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
// // // // // // // // //       {/* Header */}
// // // // // // // // //       <div className="bg-white border-b border-gray-200 px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
// // // // // // // // //         <div>
// // // // // // // // //           <h1 className="text-xl font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // // // // // // //           <p className="text-sm text-gray-500 mt-0.5">
// // // // // // // // //             Describe your layout preferences below to instantly establish target mockup iterations
// // // // // // // // //           </p>
// // // // // // // // //         </div>
        
// // // // // // // // //         {remainingAttempts !== null && (
// // // // // // // // //           <div className={`px-4 py-1.5 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
// // // // // // // // //             remainingAttempts === 0 
// // // // // // // // //               ? "bg-red-50 border-red-200 text-red-700" 
// // // // // // // // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // // // // // // // //           }`}>
// // // // // // // // //             {remainingAttempts === 0 
// // // // // // // // //               ? "0 generations remaining" 
// // // // // // // // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // // // // // // //           </div>
// // // // // // // // //         )}
// // // // // // // // //       </div>

// // // // // // // // //       <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

// // // // // // // // //         {error && (
// // // // // // // // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
// // // // // // // // //             <span className="font-semibold">Notice:</span> {error}
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {/* 1. Prompt */}
// // // // // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">1</span>
// // // // // // // // //             <h2 className="font-semibold text-gray-900">Describe your sign</h2>
// // // // // // // // //           </div>
// // // // // // // // //           <textarea
// // // // // // // // //             rows={3}
// // // // // // // // //             value={prompt}
// // // // // // // // //             disabled={remainingAttempts === 0 || loading}
// // // // // // // // //             onChange={(e) => setPrompt(e.target.value)}
// // // // // // // // //             placeholder={remainingAttempts === 0 ? "Account allowances exhausted. Check out to clear balances." : "e.g. Caution sign reading 'DANGER INSIDE' in bold clear typography..."}
// // // // // // // // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
// // // // // // // // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // // // // // // //             }`}
// // // // // // // // //           />
// // // // // // // // //         </div>

// // // // // // // // //         {/* 2. Theme selection */}
// // // // // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // // //             <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">2</span>
// // // // // // // // //             <h2 className="font-semibold text-gray-900">Select design theme style</h2>
// // // // // // // // //           </div>
// // // // // // // // //           <div className="flex flex-wrap gap-2">
// // // // // // // // //             {STYLES.map((style) => (
// // // // // // // // //               <button
// // // // // // // // //                 key={style}
// // // // // // // // //                 disabled={remainingAttempts === 0 || loading}
// // // // // // // // //                 onClick={() => setSelectedStyle(style)}
// // // // // // // // //                 className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
// // // // // // // // //                   selectedStyle === style
// // // // // // // // //                     ? "bg-blue-600 text-white border-blue-600"
// // // // // // // // //                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // // // // // // // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// // // // // // // // //               >
// // // // // // // // //                 {style}
// // // // // // // // //               </button>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Action Button */}
// // // // // // // // //         <button
// // // // // // // // //           onClick={handleGenerate}
// // // // // // // // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // // // // // // //           className={`w-full py-3.5 rounded-xl font-semibold text-white tracking-wide transition-all ${
// // // // // // // // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // // // // // // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // // // // // // // //               : "bg-blue-600 hover:bg-blue-700"
// // // // // // // // //           }`}
// // // // // // // // //         >
// // // // // // // // //           {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// // // // // // // // //         </button>

// // // // // // // // //         {loading && (
// // // // // // // // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // // // // // // // //             <div className="w-7 h-7 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
// // // // // // // // //             <p className="text-sm font-medium text-gray-500">Generating mockup assets...</p>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {/* 3. Output Canvas with Dynamic Dimensions Rulers */}
// // // // // // // // //         {imageUrl && !loading && (
// // // // // // // // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-md">
// // // // // // // // //             <div className="flex items-center gap-2">
// // // // // // // // //               <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
// // // // // // // // //               <h2 className="font-semibold text-gray-900">Your generated layout output mockup</h2>
// // // // // // // // //             </div>

// // // // // // // // //             {/* RULER INTEGRATION LAYOUT CONTAINER */}
// // // // // // // // //             <div className="relative p-8 border border-gray-100 bg-gray-50 rounded-lg flex items-center justify-center">
              
// // // // // // // // //               {/* Horizontal Top Ruler Line */}
// // // // // // // // //               <div className="absolute top-2 left-8 right-8 flex flex-col items-center">
// // // // // // // // //                 <div className="w-full h-px bg-red-400 relative">
// // // // // // // // //                   <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// // // // // // // // //                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// // // // // // // // //                 </div>
// // // // // // // // //                 <span className="text-[11px] font-bold text-red-500 bg-gray-50 px-2 mt-1 select-none">
// // // // // // // // //                   {productWidth}mm
// // // // // // // // //                 </span>
// // // // // // // // //               </div>

// // // // // // // // //               {/* Vertical Right Ruler Line */}
// // // // // // // // //               <div className="absolute right-2 top-8 bottom-8 flex items-center">
// // // // // // // // //                 <div className="h-full w-px bg-red-400 relative">
// // // // // // // // //                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// // // // // // // // //                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-400 rounded-full" />
// // // // // // // // //                 </div>
// // // // // // // // //                 <span className="text-[11px] font-bold text-red-500 bg-gray-50 px-1 [writing-mode:vertical-lr] select-none ml-1">
// // // // // // // // //                   {productHeight}mm
// // // // // // // // //                 </span>
// // // // // // // // //               </div>

// // // // // // // // //               {/* Image Preview */}
// // // // // // // // //               <div className="overflow-hidden rounded border border-gray-200 bg-white max-w-[280px] sm:max-w-[340px]">
// // // // // // // // //                 <img
// // // // // // // // //                   src={imageUrl}
// // // // // // // // //                   alt="AI Generated Sign Composition output preview node"
// // // // // // // // //                   onLoad={syncHeightWithShopify}
// // // // // // // // //                   className="w-full h-auto object-contain max-h-[450px] mx-auto transition-transform duration-200 hover:scale-[1.01]"
// // // // // // // // //                 />
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // // // // // // // //               <button
// // // // // // // // //                 onClick={handleGenerate}
// // // // // // // // //                 disabled={remainingAttempts === 0}
// // // // // // // // //                 className="flex-1 py-3 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // // // // // // // //               >
// // // // // // // // //                 Regenerate Alternative
// // // // // // // // //               </button>
// // // // // // // // //               <button
// // // // // // // // //                 type="button"
// // // // // // // // //                 onClick={() => syncProductImageWithShopify(imageUrl)}
// // // // // // // // //                 className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white shadow transition-all"
// // // // // // // // //               >
// // // // // // // // //                 Use This Design →
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //         {/* 4. Generation History Shelf */}
// // // // // // // // //         {history.length > 0 && (
// // // // // // // // //           <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3 shadow-sm">
// // // // // // // // //             <h3 className="font-semibold text-gray-900 text-sm">Your previous generations</h3>
// // // // // // // // //             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
// // // // // // // // //               {history.map((item) => (
// // // // // // // // //                 <button
// // // // // // // // //                   key={item.id}
// // // // // // // // //                   onClick={() => handleSelectHistoryItem(item)}
// // // // // // // // //                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// // // // // // // // //                     imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
// // // // // // // // //                   }`}
// // // // // // // // //                 >
// // // // // // // // //                   <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// // // // // // // // //                 </button>
// // // // // // // // //               ))}
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         )}

// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // }





















// // // // // // // // "use client";
// // // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // // const STYLES = [
// // // // // // // //   "Bold & High Contrast",
// // // // // // // //   "Clean & Minimal",
// // // // // // // //   "Real Estate",
// // // // // // // //   "Construction",
// // // // // // // //   "Retail & Sale",
// // // // // // // //   "Outdoor / Weather Proof",
// // // // // // // // ];

// // // // // // // // interface HistoryItem {
// // // // // // // //   id: string;
// // // // // // // //   url: string;
// // // // // // // //   prompt: string;
// // // // // // // //   style: string;
// // // // // // // // }

// // // // // // // // export default function DesignerPage() {
// // // // // // // //   const [prompt, setPrompt] = useState("");
// // // // // // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // // //   const [imageUrl, setImageUrl] = useState("");
// // // // // // // //   const [error, setError] = useState("");
// // // // // // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
// // // // // // // //   const [history, setHistory] = useState<HistoryItem[]>([]);
  
// // // // // // // //   // Dynamic state attributes
// // // // // // // //   const [dynWidth, setDynWidth] = useState("600");
// // // // // // // //   const [dynHeight, setDynHeight] = useState("900");
// // // // // // // //   const [dynThickness, setDynThickness] = useState("5mm");
// // // // // // // //   const [dynEyelets, setDynEyelets] = useState("No");

// // // // // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // // // // //   // Sync frame heights to Shopify
// // // // // // // //   const syncHeightWithShopify = () => {
// // // // // // // //     if (containerRef.current) {
// // // // // // // //       const height = containerRef.current.scrollHeight;
// // // // // // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Push design image back to main Shopify gallery element
// // // // // // // //   const syncProductImageWithShopify = (imgUrl: string) => {
// // // // // // // //     if (imgUrl) {
// // // // // // // //       window.parent.postMessage({ 
// // // // // // // //         type: "UPDATE_PRODUCT_IMAGE", 
// // // // // // // //         imageUrl: imgUrl 
// // // // // // // //       }, "*");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     syncHeightWithShopify();
// // // // // // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // // // // // //     // Dynamic state listener for Shopify scrapings
// // // // // // // //     const handleMessage = (event: MessageEvent) => {
// // // // // // // //       if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
// // // // // // // //         const { width, height, thickness, eyelets } = event.data;
// // // // // // // //         if (width) setDynWidth(width);
// // // // // // // //         if (height) setDynHeight(height);
// // // // // // // //         if (thickness) setDynThickness(thickness);
// // // // // // // //         if (eyelets) setDynEyelets(eyelets);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     window.addEventListener("message", handleMessage);

// // // // // // // //     const observer = new MutationObserver(syncHeightWithShopify);
// // // // // // // //     if (containerRef.current) {
// // // // // // // //       observer.observe(containerRef.current, {
// // // // // // // //         attributes: true,
// // // // // // // //         childList: true,
// // // // // // // //         subtree: true,
// // // // // // // //       });
// // // // // // // //     }

// // // // // // // //     return () => {
// // // // // // // //       window.removeEventListener("resize", syncHeightWithShopify);
// // // // // // // //       window.removeEventListener("message", handleMessage);
// // // // // // // //       observer.disconnect();
// // // // // // // //     };
// // // // // // // //   }, []);

// // // // // // // //   const handleGenerate = async () => {
// // // // // // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // // // // // //     setLoading(true);
// // // // // // // //     setImageUrl("");
// // // // // // // //     setError("");

// // // // // // // //     // Package actual selections safely into prompt specifications for AI processing
// // // // // // // //     const attributeTunedPrompt = `${prompt} (Sign physical properties: ${dynWidth}mm width, ${dynHeight}mm height, sign thickness ${dynThickness}, and eyelets option: ${dynEyelets})`;

// // // // // // // //     try {
// // // // // // // //       const response = await fetch("/api/generate-design", {
// // // // // // // //         method: "POST",
// // // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // // //         body: JSON.stringify({
// // // // // // // //           prompt: attributeTunedPrompt,
// // // // // // // //           style: selectedStyle,
// // // // // // // //           width: dynWidth,
// // // // // // // //           height: dynHeight,
// // // // // // // //           customerId: null,
// // // // // // // //         }),
// // // // // // // //       });

// // // // // // // //       const data = await response.json();

// // // // // // // //       if (typeof data.remainingAttempts === "number") {
// // // // // // // //         setRemainingAttempts(data.remainingAttempts);
// // // // // // // //       }

// // // // // // // //       if (!response.ok) {
// // // // // // // //         throw new Error(data.error || "Failed to generate design.");
// // // // // // // //       }

// // // // // // // //       const newImageUrl = data.designUrl;
// // // // // // // //       setImageUrl(newImageUrl);
      
// // // // // // // //       const newHistoryItem: HistoryItem = {
// // // // // // // //         id: Date.now().toString(),
// // // // // // // //         url: newImageUrl,
// // // // // // // //         prompt: prompt,
// // // // // // // //         style: selectedStyle
// // // // // // // //       };
// // // // // // // //       setHistory(prev => [newHistoryItem, ...prev]);
// // // // // // // //       syncProductImageWithShopify(newImageUrl);

// // // // // // // //     } catch (err: any) {
// // // // // // // //       console.error("UI Execution Fault Encountered:", err);
// // // // // // // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const handleSelectHistoryItem = (item: HistoryItem) => {
// // // // // // // //     setImageUrl(item.url);
// // // // // // // //     setPrompt(item.prompt);
// // // // // // // //     setSelectedStyle(item.style);
// // // // // // // //     syncProductImageWithShopify(item.url);
// // // // // // // //   };

// // // // // // // //   // Convert the aspect ratio dynamically for the preview container wrapper limits
// // // // // // // //   const wNum = parseFloat(dynWidth) || 600;
// // // // // // // //   const hNum = parseFloat(dynHeight) || 900;
// // // // // // // //   const aspectRatio = wNum / hNum;

// // // // // // // //   return (
// // // // // // // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
// // // // // // // //       {/* Header Panel */}
// // // // // // // //       <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// // // // // // // //         <div>
// // // // // // // //           <h1 className="text-lg font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // // // // // //           <p className="text-xs text-gray-500">
// // // // // // // //             Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
// // // // // // // //           </p>
// // // // // // // //         </div>
        
// // // // // // // //         {remainingAttempts !== null && (
// // // // // // // //           <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
// // // // // // // //             remainingAttempts === 0 
// // // // // // // //               ? "bg-red-50 border-red-200 text-red-700" 
// // // // // // // //               : "bg-blue-50 border-blue-200 text-blue-700"
// // // // // // // //           }`}>
// // // // // // // //             {remainingAttempts === 0 
// // // // // // // //               ? "0 generations remaining" 
// // // // // // // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>

// // // // // // // //       <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

// // // // // // // //         {error && (
// // // // // // // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
// // // // // // // //             <span className="font-semibold">Notice:</span> {error}
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {/* 1. Prompt Input Box */}
// // // // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // //             <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">1</span>
// // // // // // // //             <h2 className="text-sm font-semibold text-gray-900">Describe your sign</h2>
// // // // // // // //           </div>
// // // // // // // //           <textarea
// // // // // // // //             rows={3}
// // // // // // // //             value={prompt}
// // // // // // // //             disabled={remainingAttempts === 0 || loading}
// // // // // // // //             onChange={(e) => setPrompt(e.target.value)}
// // // // // // // //             placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in clear typography..."}
// // // // // // // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
// // // // // // // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // // // // // //             }`}
// // // // // // // //           />
// // // // // // // //         </div>

// // // // // // // //         {/* 2. Style Matrix */}
// // // // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // //             <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">2</span>
// // // // // // // //             <h2 className="text-sm font-semibold text-gray-900">Select design theme style</h2>
// // // // // // // //           </div>
// // // // // // // //           <div className="flex flex-wrap gap-2">
// // // // // // // //             {STYLES.map((style) => (
// // // // // // // //               <button
// // // // // // // //                 key={style}
// // // // // // // //                 disabled={remainingAttempts === 0 || loading}
// // // // // // // //                 onClick={() => setSelectedStyle(style)}
// // // // // // // //                 className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
// // // // // // // //                   selectedStyle === style
// // // // // // // //                     ? "bg-blue-600 text-white border-blue-600"
// // // // // // // //                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // // // // // // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// // // // // // // //               >
// // // // // // // //                 {style}
// // // // // // // //               </button>
// // // // // // // //             ))}
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         <button
// // // // // // // //           onClick={handleGenerate}
// // // // // // // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // // // // // //           className={`w-full py-3 rounded-xl font-semibold text-sm text-white tracking-wide transition-all ${
// // // // // // // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // // // // // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // // // // // // //               : "bg-blue-600 hover:bg-blue-700"
// // // // // // // //           }`}
// // // // // // // //         >
// // // // // // // //           {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// // // // // // // //         </button>

// // // // // // // //         {loading && (
// // // // // // // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // // // // // // //             <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
// // // // // // // //             <p className="text-xs font-medium text-gray-500">Generating mockup assets...</p>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {/* 3. Output Canvas with Border-Hugging Rulers */}
// // // // // // // //         {imageUrl && !loading && (
// // // // // // // //           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm">
// // // // // // // //             <div className="flex items-center gap-2">
// // // // // // // //               <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">3</span>
// // // // // // // //               <h2 className="text-sm font-semibold text-gray-900">Your generated layout output mockup</h2>
// // // // // // // //             </div>

// // // // // // // //             {/* BASE CONTAINER */}
// // // // // // // //             <div className="bg-gray-50 rounded-lg p-10 flex items-center justify-center border border-gray-100">
              
// // // // // // // //               {/* RULER CONTAINER WRAPPER - This element hugs the image structure precisely */}
// // // // // // // //               <div 
// // // // // // // //                 className="relative p-6 border border-dashed border-gray-300 bg-white rounded-lg shadow-inner flex items-center justify-center"
// // // // // // // //                 style={{
// // // // // // // //                   width: "100%",
// // // // // // // //                   maxWidth: aspectRatio > 1 ? "400px" : `${400 * aspectRatio}px`,
// // // // // // // //                   aspectRatio: `${aspectRatio}`
// // // // // // // //                 }}
// // // // // // // //               >
                
// // // // // // // //                 {/* Horizontal Top Ruler - aligned directly above the bounding layout box */}
// // // // // // // //                 <div className="absolute -top-6 left-6 right-6 flex flex-col items-center">
// // // // // // // //                   <div className="w-full h-px bg-red-500 relative">
// // // // // // // //                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // // // // // //                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // // // // // //                   </div>
// // // // // // // //                   <span className="text-[10px] font-bold text-red-500 bg-white px-1.5 mt-0.5 shadow-sm rounded border border-gray-100 select-none">
// // // // // // // //                     {dynWidth}mm
// // // // // // // //                   </span>
// // // // // // // //                 </div>

// // // // // // // //                 {/* Vertical Right Ruler - aligned directly to the right side of the bounding layout box */}
// // // // // // // //                 <div className="absolute -right-7 top-6 bottom-6 flex items-center">
// // // // // // // //                   <div className="h-full w-px bg-red-500 relative">
// // // // // // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // // // // // //                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // // // // // //                   </div>
// // // // // // // //                   <span className="text-[10px] font-bold text-red-500 bg-white px-1 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] select-none ml-0.5">
// // // // // // // //                     {dynHeight}mm
// // // // // // // //                   </span>
// // // // // // // //                 </div>

// // // // // // // //                 {/* Rendered Design Output inside the bounding box */}
// // // // // // // //                 <img
// // // // // // // //                   src={imageUrl}
// // // // // // // //                   alt="AI Generated Design"
// // // // // // // //                   onLoad={syncHeightWithShopify}
// // // // // // // //                   className="w-full h-full object-contain rounded"
// // // // // // // //                 />
// // // // // // // //               </div>

// // // // // // // //             </div>

// // // // // // // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // // // // // // //               <button
// // // // // // // //                 onClick={handleGenerate}
// // // // // // // //                 disabled={remainingAttempts === 0}
// // // // // // // //                 className="flex-1 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // // // // // // //               >
// // // // // // // //                 Regenerate Alternative
// // // // // // // //               </button>
// // // // // // // //               <button
// // // // // // // //                 type="button"
// // // // // // // //                 onClick={() => syncProductImageWithShopify(imageUrl)}
// // // // // // // //                 className="flex-1 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow transition-all"
// // // // // // // //               >
// // // // // // // //                 Use This Design →
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //         {/* 4. Generation History Drawer */}
// // // // // // // //         {history.length > 0 && (
// // // // // // // //           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // // // // // //             <h3 className="font-semibold text-gray-900 text-xs">Your previous generations</h3>
// // // // // // // //             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
// // // // // // // //               {history.map((item) => (
// // // // // // // //                 <button
// // // // // // // //                   key={item.id}
// // // // // // // //                   onClick={() => handleSelectHistoryItem(item)}
// // // // // // // //                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// // // // // // // //                     imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
// // // // // // // //                   }`}
// // // // // // // //                 >
// // // // // // // //                   <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// // // // // // // //                 </button>
// // // // // // // //               ))}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         )}

// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // }


















// // // // // // // "use client";
// // // // // // // import { useState, useEffect, useRef } from "react";

// // // // // // // const STYLES = [
// // // // // // //   "Bold & High Contrast",
// // // // // // //   "Clean & Minimal",
// // // // // // //   "Real Estate",
// // // // // // //   "Construction",
// // // // // // //   "Retail & Sale",
// // // // // // //   "Outdoor / Weather Proof",
// // // // // // // ];

// // // // // // // interface HistoryItem {
// // // // // // //   id: string;
// // // // // // //   url: string;
// // // // // // //   prompt: string;
// // // // // // //   style: string;
// // // // // // // }

// // // // // // // export default function DesignerPage() {
// // // // // // //   const [prompt, setPrompt] = useState("");
// // // // // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // // // // //   const [loading, setLoading] = useState(false);
// // // // // // //   const [imageUrl, setImageUrl] = useState("");
// // // // // // //   const [error, setError] = useState("");
// // // // // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
// // // // // // //   const [history, setHistory] = useState<HistoryItem[]>([]);
  
// // // // // // //   // States to hold dynamically scraped Shopify attribute options
// // // // // // //   const [dynWidth, setDynWidth] = useState("600");
// // // // // // //   const [dynHeight, setDynHeight] = useState("900");
// // // // // // //   const [dynThickness, setDynThickness] = useState("5mm");
// // // // // // //   const [dynEyelets, setDynEyelets] = useState("No");

// // // // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // // // //   // Sync frame heights to Shopify
// // // // // // //   const syncHeightWithShopify = () => {
// // // // // // //     if (containerRef.current) {
// // // // // // //       const height = containerRef.current.scrollHeight;
// // // // // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Push design image back to main Shopify gallery element
// // // // // // //   // const syncProductImageWithShopify = (imgUrl: string) => {
// // // // // // //   //   if (imgUrl) {
// // // // // // //   //     window.parent.postMessage({ 
// // // // // // //   //       type: "UPDATE_PRODUCT_IMAGE", 
// // // // // // //   //       imageUrl: imgUrl 
// // // // // // //   //     }, "*");
// // // // // // //   //   }
// // // // // // //   // };

// // // // // // //   // Push design image back to main Shopify gallery element
// // // // // // //   const syncProductImageWithShopify = (imgUrl: string) => {
// // // // // // //     if (!imgUrl) return;

// // // // // // //     console.log("✈️ [Next.js] Attempting to dispatch image to Shopify:", imgUrl);

// // // // // // //     const payload = { 
// // // // // // //       type: "UPDATE_PRODUCT_IMAGE", 
// // // // // // //       imageUrl: imgUrl 
// // // // // // //     };

// // // // // // //     // Fallback chain: try parent window, then absolute top window
// // // // // // //     if (window.parent && window.parent !== window) {
// // // // // // //       window.parent.postMessage(payload, "*");
// // // // // // //       console.log("📬 Sent via window.parent");
// // // // // // //     } else if (window.top) {
// // // // // // //       window.top.postMessage(payload, "*");
// // // // // // //       console.log("📬 Sent via window.top (Sandbox Fallback)");
// // // // // // //     } else {
// // // // // // //       console.error("❌ Crucial Error: No window access available due to strict sandbox restrictions.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   useEffect(() => {
// // // // // // //     syncHeightWithShopify();
// // // // // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // // // // //     // Listen to parent message signals for state variations
// // // // // // //     const handleMessage = (event: MessageEvent) => {
// // // // // // //       if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
// // // // // // //         const { width, height, thickness, eyelets } = event.data;
// // // // // // //         if (width) setDynWidth(width);
// // // // // // //         if (height) setDynHeight(height);
// // // // // // //         if (thickness) setDynThickness(thickness);
// // // // // // //         if (eyelets) setDynEyelets(eyelets);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     window.addEventListener("message", handleMessage);

// // // // // // //     const observer = new MutationObserver(syncHeightWithShopify);
// // // // // // //     if (containerRef.current) {
// // // // // // //       observer.observe(containerRef.current, {
// // // // // // //         attributes: true,
// // // // // // //         childList: true,
// // // // // // //         subtree: true,
// // // // // // //       });
// // // // // // //     }

// // // // // // //     return () => {
// // // // // // //       window.removeEventListener("resize", syncHeightWithShopify);
// // // // // // //       window.removeEventListener("message", handleMessage);
// // // // // // //       observer.disconnect();
// // // // // // //     };
// // // // // // //   }, []);

// // // // // // //   const handleGenerate = async () => {
// // // // // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // // // // //     setLoading(true);
// // // // // // //     setImageUrl("");
// // // // // // //     setError("");

// // // // // // //     // Inject active scraped attribute data directly into the generation prompt instructions
// // // // // // //     const attributeTunedPrompt = `${prompt} (Specifications: Sign thickness ${dynThickness}, Eyelets config: ${dynEyelets})`;

// // // // // // //     try {
// // // // // // //       const response = await fetch("/api/generate-design", {
// // // // // // //         method: "POST",
// // // // // // //         headers: { "Content-Type": "application/json" },
// // // // // // //         body: JSON.stringify({
// // // // // // //           prompt: attributeTunedPrompt,
// // // // // // //           style: selectedStyle,
// // // // // // //           width: dynWidth,
// // // // // // //           height: dynHeight,
// // // // // // //           customerId: null,
// // // // // // //         }),
// // // // // // //       });

// // // // // // //       const data = await response.json();

// // // // // // //       if (typeof data.remainingAttempts === "number") {
// // // // // // //         setRemainingAttempts(data.remainingAttempts);
// // // // // // //       }

// // // // // // //       if (!response.ok) {
// // // // // // //         throw new Error(data.error || "Failed to process target structural sign composition requests.");
// // // // // // //       }

// // // // // // //       const newImageUrl = data.designUrl;
// // // // // // //       setImageUrl(newImageUrl);
      
// // // // // // //       const newHistoryItem: HistoryItem = {
// // // // // // //         id: Date.now().toString(),
// // // // // // //         url: newImageUrl,
// // // // // // //         prompt: prompt,
// // // // // // //         style: selectedStyle
// // // // // // //       };
// // // // // // //       setHistory(prev => [newHistoryItem, ...prev]);
// // // // // // //       syncProductImageWithShopify(newImageUrl);

// // // // // // //     } catch (err: any) {
// // // // // // //       console.error("UI Execution Fault Encountered:", err);
// // // // // // //       setError(err.message || "Unable to cleanly reach design processing servers.");
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleSelectHistoryItem = (item: HistoryItem) => {
// // // // // // //     setImageUrl(item.url);
// // // // // // //     setPrompt(item.prompt);
// // // // // // //     setSelectedStyle(item.style);
// // // // // // //     syncProductImageWithShopify(item.url);
// // // // // // //   };

// // // // // // //   // Convert the aspect ratio dynamically for the preview container wrapper limits
// // // // // // //   const wNum = parseFloat(dynWidth) || 600;
// // // // // // //   const hNum = parseFloat(dynHeight) || 900;
// // // // // // //   const aspectRatio = wNum / hNum;

// // // // // // //   return (
// // // // // // //     <div ref={containerRef} className="bg-white overflow-hidden min-h-full font-sans antialiased text-gray-800">
      
// // // // // // //       {/* Header Panel */}
// // // // // // //       <div className="bg-white border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// // // // // // //         <div>
// // // // // // //           <h1 className="text-lg font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // // // // //           <p className="text-xs text-gray-500">
// // // // // // //             Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
// // // // // // //           </p>
// // // // // // //         </div>
        
// // // // // // //         {remainingAttempts !== null && (
// // // // // // //           <div className={`px-3 py-1 rounded-full text-xs font-semibold self-start sm:self-center border transition-all ${
// // // // // // //             remainingAttempts === 0 
// // // // // // //               ? "bg-red-50 border-red-200 text-red-700" 
// // // // // // //               : "bg-[#02aef0] border-[#02aef0] text-white"
// // // // // // //           }`}>
// // // // // // //             {remainingAttempts === 0 
// // // // // // //               ? "0 generations remaining"
// // // // // // //               : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>

// // // // // // //       <div className="max-w-3xl mx-auto px-6 py-6 space-y-6">

// // // // // // //         {error && (
// // // // // // //           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm transition-all">
// // // // // // //             <span className="font-semibold">Notice:</span> {error}
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* 1. Prompt Input Box */}
// // // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // // // // //           <div className="flex items-center gap-2">
// // // // // // //             <span className="bg-[#02aef0] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">1</span>
// // // // // // //             <h2 className="text-sm font-semibold text-gray-900">Describe your sign</h2>
// // // // // // //           </div>
// // // // // // //           <textarea
// // // // // // //             rows={3}
// // // // // // //             value={prompt}
// // // // // // //             disabled={remainingAttempts === 0 || loading}
// // // // // // //             onChange={(e) => setPrompt(e.target.value)}
// // // // // // //             placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in clear typography..."}
// // // // // // //             className={`w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
// // // // // // //               remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // // // // //             }`}
// // // // // // //           />
// // // // // // //         </div>

// // // // // // //         {/* 2. Style Matrix */}
// // // // // // //         <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // // // // //           <div className="flex items-center gap-2">
// // // // // // //             <span className="bg-[#02aef0] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">2</span>
// // // // // // //             <h2 className="text-sm font-semibold text-gray-900">Select design theme style</h2>
// // // // // // //           </div>
// // // // // // //           <div className="flex flex-wrap gap-2">
// // // // // // //             {STYLES.map((style) => (
// // // // // // //               <button
// // // // // // //                 key={style}
// // // // // // //                 disabled={remainingAttempts === 0 || loading}
// // // // // // //                 onClick={() => setSelectedStyle(style)}
// // // // // // //                 className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
// // // // // // //                   selectedStyle === style
// // // // // // //                     ? "bg-[#02aef0] text-white border-[#02aef0]"
// // // // // // //                     : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // // // // // //                 } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// // // // // // //               >
// // // // // // //                 {style}
// // // // // // //               </button>
// // // // // // //             ))}
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         <button
// // // // // // //           onClick={handleGenerate}
// // // // // // //           disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // // // // //           className={`w-full py-3 rounded-xl font-semibold text-sm text-white tracking-wide transition-all ${
// // // // // // //             !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // // // // //               ? "bg-gray-300 text-gray-500 cursor-not-allowed"
// // // // // // //               : "bg-[#02aef0] hover:bg-[#028bc9]"
// // // // // // //           }`}
// // // // // // //         >
// // // // // // //           {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// // // // // // //         </button>

// // // // // // //         {loading && (
// // // // // // //           <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-10 flex flex-col items-center justify-center gap-3 animate-pulse">
// // // // // // //             <div className="w-6 h-6 border-2 border-[#02aef0] border-t-transparent rounded-full animate-spin" />
// // // // // // //             <p className="text-xs font-medium text-gray-500">Generating mockup assets...</p>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* 3. Output Canvas with Border-Hugging Rulers */}
// // // // // // //         {imageUrl && !loading && (
// // // // // // //           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 shadow-sm">
// // // // // // //             <div className="flex items-center gap-2">
// // // // // // //               <span className="bg-[#02aef0] text-white text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center">3</span>
// // // // // // //               <h2 className="text-sm font-semibold text-gray-900">Your generated layout output mockup</h2>
// // // // // // //             </div>

// // // // // // //             {/* BASE CONTAINER */}
// // // // // // //             <div className="bg-gray-50 rounded-lg p-10 flex items-center justify-center border border-gray-100">
              
// // // // // // //               {/* RULER CONTAINER WRAPPER - This element hugs the image structure precisely */}
// // // // // // //               <div 
// // // // // // //                 className="relative p-6 border border-dashed border-gray-300 bg-white rounded-lg shadow-inner flex items-center justify-center"
// // // // // // //                 style={{
// // // // // // //                   width: "100%",
// // // // // // //                   maxWidth: aspectRatio > 1 ? "400px" : `${400 * aspectRatio}px`,
// // // // // // //                   aspectRatio: `${aspectRatio}`
// // // // // // //                 }}
// // // // // // //               >
                
// // // // // // //                 {/* Horizontal Top Ruler - aligned directly above the bounding layout box */}
// // // // // // //                 <div className="absolute -top-6 left-6 right-6 flex flex-col items-center">
// // // // // // //                   <div className="w-full h-px bg-red-500 relative">
// // // // // // //                     <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // // // // //                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // // // // //                   </div>
// // // // // // //                   <span className="text-[10px] font-bold text-red-500 bg-white px-1.5 mt-0.5 shadow-sm rounded border border-gray-100 select-none">
// // // // // // //                     {dynWidth}mm
// // // // // // //                   </span>
// // // // // // //                 </div>

// // // // // // //                 {/* Vertical Right Ruler - aligned directly to the right side of the bounding box */}
// // // // // // //                 <div className="absolute -right-7 top-6 bottom-6 flex items-center">
// // // // // // //                   <div className="h-full w-px bg-red-500 relative">
// // // // // // //                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // // // // //                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // // // // //                   </div>
// // // // // // //                   <span className="text-[10px] font-bold text-red-500 bg-white px-1 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] select-none ml-0.5">
// // // // // // //                     {dynHeight}mm
// // // // // // //                   </span>
// // // // // // //                 </div>

// // // // // // //                 {/* Rendered Design Output inside the bounding box */}
// // // // // // //                 <img
// // // // // // //                   src={imageUrl}
// // // // // // //                   alt="AI Generated Design"
// // // // // // //                   onLoad={syncHeightWithShopify}
// // // // // // //                   className="w-full h-full object-contain rounded"
// // // // // // //                 />
// // // // // // //               </div>

// // // // // // //             </div>

// // // // // // //             <div className="flex flex-col sm:flex-row gap-3 pt-2">
// // // // // // //               <button
// // // // // // //                 onClick={handleGenerate}
// // // // // // //                 disabled={remainingAttempts === 0}
// // // // // // //                 className="flex-1 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // // // // // //               >
// // // // // // //                 Regenerate Alternative
// // // // // // //               </button>
// // // // // // //               <button
// // // // // // //                 type="button"
// // // // // // //                 onClick={() => syncProductImageWithShopify(imageUrl)}
// // // // // // //                 className="flex-1 py-2.5 rounded-lg bg-[#02aef0] hover:bg-[#028bc9] text-xs font-semibold text-white shadow transition-all"
// // // // // // //               >
// // // // // // //                 Use This Design →
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {/* 4. Generation History Drawer */}
// // // // // // //         {history.length > 0 && (
// // // // // // //           <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3 shadow-sm">
// // // // // // //             <h3 className="font-semibold text-gray-900 text-xs">Your previous generations</h3>
// // // // // // //             <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
// // // // // // //               {history.map((item) => (
// // // // // // //                 <button
// // // // // // //                   key={item.id}
// // // // // // //                   onClick={() => handleSelectHistoryItem(item)}
// // // // // // //                   className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:opacity-100 ${
// // // // // // //                     imageUrl === item.url ? "border-blue-500 scale-95 opacity-100" : "border-transparent opacity-60 hover:border-gray-300"
// // // // // // //                   }`}
// // // // // // //                 >
// // // // // // //                   <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// // // // // // //                 </button>
// // // // // // //               ))}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // }















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

// // // // // // interface HistoryItem {
// // // // // //   id: string;
// // // // // //   url: string;
// // // // // //   prompt: string;
// // // // // //   style: string;
// // // // // // }

// // // // // // export default function DesignerPage() {
// // // // // //   const [prompt, setPrompt] = useState("");
// // // // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // // // //   const [loading, setLoading] = useState(false);
// // // // // //   const [imageUrl, setImageUrl] = useState("");
// // // // // //   const [error, setError] = useState("");
// // // // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
// // // // // //   const [history, setHistory] = useState<HistoryItem[]>([]);
  
// // // // // //   // Lightbox Modal State
// // // // // //   const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

// // // // // //   // Dynamic Shopify options
// // // // // //   const [dynWidth, setDynWidth] = useState("600");
// // // // // //   const [dynHeight, setDynHeight] = useState("900");
// // // // // //   const [dynThickness, setDynThickness] = useState("5mm");
// // // // // //   const [dynEyelets, setDynEyelets] = useState("No");

// // // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // // //   const syncHeightWithShopify = () => {
// // // // // //     if (containerRef.current) {
// // // // // //       const height = containerRef.current.scrollHeight;
// // // // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // // // //     }
// // // // // //   };

// // // // // //   const syncProductImageWithShopify = (imgUrl: string) => {
// // // // // //     if (!imgUrl) return;
// // // // // //     const payload = { type: "UPDATE_PRODUCT_IMAGE", imageUrl: imgUrl };

// // // // // //     if (window.parent && window.parent !== window) {
// // // // // //       window.parent.postMessage(payload, "*");
// // // // // //     } else if (window.top) {
// // // // // //       window.top.postMessage(payload, "*");
// // // // // //     }
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     syncHeightWithShopify();
// // // // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // // // //     const handleMessage = (event: MessageEvent) => {
// // // // // //       if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
// // // // // //         const { width, height, thickness, eyelets } = event.data;
// // // // // //         if (width) setDynWidth(width);
// // // // // //         if (height) setDynHeight(height);
// // // // // //         if (thickness) setDynThickness(thickness);
// // // // // //         if (eyelets) setDynEyelets(eyelets);
// // // // // //       }
// // // // // //     };

// // // // // //     window.addEventListener("message", handleMessage);

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
// // // // // //       window.removeEventListener("message", handleMessage);
// // // // // //       observer.disconnect();
// // // // // //     };
// // // // // //   }, []);

// // // // // //   const handleGenerate = async () => {
// // // // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // // // //     setLoading(true);
// // // // // //     setImageUrl("");
// // // // // //     setError("");

// // // // // //     const attributeTunedPrompt = `${prompt} (Specifications: Sign thickness ${dynThickness}, Eyelets config: ${dynEyelets})`;

// // // // // //     try {
// // // // // //       const response = await fetch("/api/generate-design", {
// // // // // //         method: "POST",
// // // // // //         headers: { "Content-Type": "application/json" },
// // // // // //         body: JSON.stringify({
// // // // // //           prompt: attributeTunedPrompt,
// // // // // //           style: selectedStyle,
// // // // // //           width: dynWidth,
// // // // // //           height: dynHeight,
// // // // // //           customerId: null,
// // // // // //         }),
// // // // // //       });

// // // // // //       const data = await response.json();

// // // // // //       if (typeof data.remainingAttempts === "number") {
// // // // // //         setRemainingAttempts(data.remainingAttempts);
// // // // // //       }

// // // // // //       if (!response.ok) {
// // // // // //         throw new Error(data.error || "Failed to generate custom sign artwork.");
// // // // // //       }

// // // // // //       const newImageUrl = data.designUrl;
// // // // // //       setImageUrl(newImageUrl);

// // // // // //       const newHistoryItem: HistoryItem = {
// // // // // //         id: Date.now().toString(),
// // // // // //         url: newImageUrl,
// // // // // //         prompt: prompt,
// // // // // //         style: selectedStyle
// // // // // //       };
// // // // // //       setHistory(prev => [newHistoryItem, ...prev]);
// // // // // //       syncProductImageWithShopify(newImageUrl);

// // // // // //     } catch (err: any) {
// // // // // //       console.error("UI Generation Fault:", err);
// // // // // //       setError(err.message || "Unable to reach generation server.");
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleSelectHistoryItem = (item: HistoryItem) => {
// // // // // //     setImageUrl(item.url);
// // // // // //     setPrompt(item.prompt);
// // // // // //     setSelectedStyle(item.style);
// // // // // //     syncProductImageWithShopify(item.url);
// // // // // //   };

// // // // // //   const wNum = parseFloat(dynWidth) || 600;
// // // // // //   const hNum = parseFloat(dynHeight) || 900;
// // // // // //   const aspectRatio = wNum / hNum;

// // // // // //   return (
// // // // // //     <>
// // // // // //       {/* Montserrat Font + Custom Brand Colors */}
// // // // // //       <style jsx global>{`
// // // // // //         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
// // // // // //         body, input, textarea, button, select {
// // // // // //           font-family: 'Montserrat', sans-serif !important;
// // // // // //         }

// // // // // //         .bg-brand {
// // // // // //           background-color: #02aef0 !important;
// // // // // //         }
// // // // // //         .text-brand {
// // // // // //           color: #02aef0 !important;
// // // // // //         }
// // // // // //         .border-brand {
// // // // // //           border-color: #02aef0 !important;
// // // // // //         }
// // // // // //         .hover-bg-brand:hover {
// // // // // //           background-color: #029ad5 !important;
// // // // // //         }
// // // // // //       `}</style>

// // // // // //       <div ref={containerRef} className="bg-white overflow-hidden min-h-full antialiased text-gray-900 w-full py-2">
        
// // // // // //         {/* Header Panel */}
// // // // // //         <div className="bg-white border-b border-gray-200 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// // // // // //           <div>
// // // // // //             {/* <h1 className="text-base font-bold text-gray-900 tracking-tight">AI Sign Designer</h1> */}
// // // // // //             <p className="text-[12px] text-gray-800 font-bold">
// // // // // //               Current Specs:
// // // // // //             </p>
// // // // // //             <p className="text-[11px] text-gray-500">
// // // // // //               {dynWidth}mm x {dynHeight}mm
// // // // // //             </p>
// // // // // //             <p className="text-[11px] text-gray-500">
// // // // // //               Thickness: {dynThickness}
// // // // // //             </p>
// // // // // //             <p className="text-[11px] text-gray-500">
// // // // // //               Eyelets: {dynEyelets}
// // // // // //             </p>
// // // // // //           </div>
          
// // // // // //           {remainingAttempts !== null && (
// // // // // //             <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold self-start sm:self-center border transition-all ${
// // // // // //               remainingAttempts === 0 
// // // // // //                 ? "bg-red-50 border-red-200 text-red-700" 
// // // // // //                 : "bg-sky-50 border-sky-200 text-brand"
// // // // // //             }`}>
// // // // // //               {remainingAttempts === 0 
// // // // // //                 ? "0 generations remaining" 
// // // // // //                 : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // // // //             </div>
// // // // // //           )}
// // // // // //         </div>

// // // // // //         <div className="w-full space-y-4">

// // // // // //           {error && (
// // // // // //             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs">
// // // // // //               <span className="font-semibold">Notice:</span> {error}
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* 1. Prompt Input Box */}
// // // // // //           <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// // // // // //             <div className="flex items-center gap-2">
// // // // // //               <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
// // // // // //               <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Describe your sign</h2>
// // // // // //             </div>
// // // // // //             <textarea
// // // // // //               rows={3}
// // // // // //               value={prompt}
// // // // // //               disabled={remainingAttempts === 0 || loading}
// // // // // //               onChange={(e) => setPrompt(e.target.value)}
// // // // // //               placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in bold lettering..."}
// // // // // //               className={`w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all ${
// // // // // //                 remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // // // //               }`}
// // // // // //             />
// // // // // //           </div>

// // // // // //           {/* 2. Style Matrix */}
// // // // // //           <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// // // // // //             <div className="flex items-center gap-2">
// // // // // //               <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
// // // // // //               <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Select design theme style</h2>
// // // // // //             </div>
// // // // // //             <div className="flex flex-wrap gap-1.5">
// // // // // //               {STYLES.map((style) => (
// // // // // //                 <button
// // // // // //                   key={style}
// // // // // //                   disabled={remainingAttempts === 0 || loading}
// // // // // //                   onClick={() => setSelectedStyle(style)}
// // // // // //                   className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
// // // // // //                     selectedStyle === style
// // // // // //                       ? "bg-brand text-white border-brand shadow-sm"
// // // // // //                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // // // // //                   } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// // // // // //                 >
// // // // // //                   {style}
// // // // // //                 </button>
// // // // // //               ))}
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <button
// // // // // //             onClick={handleGenerate}
// // // // // //             disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // // // //             className={`w-full py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all ${
// // // // // //               !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // // // //                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
// // // // // //                 : "bg-brand hover-bg-brand text-white shadow-md"
// // // // // //             }`}
// // // // // //           >
// // // // // //             {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// // // // // //           </button>

// // // // // //           {loading && (
// // // // // //             <div className="bg-sky-50/40 rounded-lg border-2 border-dashed border-sky-200 p-8 flex flex-col items-center justify-center gap-2 animate-pulse">
// // // // // //               <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
// // // // // //               <p className="text-[11px] font-medium text-gray-500">Generating mockup assets...</p>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* 3. Output Canvas */}
// // // // // //           {imageUrl && !loading && (
// // // // // //             <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-sm">
// // // // // //               <div className="flex items-center justify-between">
// // // // // //                 <div className="flex items-center gap-2">
// // // // // //                   <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
// // // // // //                   <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Your generated layout output mockup</h2>
// // // // // //                 </div>
// // // // // //                 <button
// // // // // //                   onClick={() => setModalImageUrl(imageUrl)}
// // // // // //                   className="text-[11px] font-semibold text-brand hover:underline flex items-center gap-1"
// // // // // //                 >
// // // // // //                   🔍 Full Screen Preview
// // // // // //                 </button>
// // // // // //               </div>

// // // // // //               <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center border border-gray-100">
// // // // // //                 <div 
// // // // // //                   className="relative p-5 border border-dashed border-gray-300 bg-white rounded shadow-inner flex items-center justify-center group"
// // // // // //                   style={{
// // // // // //                     width: "100%",
// // // // // //                     maxWidth: aspectRatio > 1 ? "360px" : `${360 * aspectRatio}px`,
// // // // // //                     aspectRatio: `${aspectRatio}`
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   {/* Top Ruler */}
// // // // // //                   <div className="absolute -top-5 left-5 right-5 flex flex-col items-center">
// // // // // //                     <div className="w-full h-px bg-red-500 relative">
// // // // // //                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
// // // // // //                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
// // // // // //                     </div>
// // // // // //                     <span className="text-[9px] font-bold text-red-500 bg-white px-1 mt-0.5 shadow-sm rounded border border-gray-100">
// // // // // //                       {dynWidth}mm
// // // // // //                     </span>
// // // // // //                   </div>

// // // // // //                   {/* Right Ruler */}
// // // // // //                   <div className="absolute -right-6 top-5 bottom-5 flex items-center">
// // // // // //                     <div className="h-full w-px bg-red-500 relative">
// // // // // //                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
// // // // // //                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
// // // // // //                     </div>
// // // // // //                     <span className="text-[9px] font-bold text-red-500 bg-white px-0.5 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] ml-0.5">
// // // // // //                       {dynHeight}mm
// // // // // //                     </span>
// // // // // //                   </div>

// // // // // //                   <img
// // // // // //                     src={imageUrl}
// // // // // //                     alt="AI Generated Design"
// // // // // //                     onLoad={syncHeightWithShopify}
// // // // // //                     className="w-full h-full object-contain rounded cursor-pointer"
// // // // // //                     onClick={() => setModalImageUrl(imageUrl)}
// // // // // //                   />
// // // // // //                 </div>
// // // // // //               </div>

// // // // // //               <div className="flex flex-col sm:flex-row gap-2 pt-1">
// // // // // //                 <button
// // // // // //                   onClick={handleGenerate}
// // // // // //                   disabled={remainingAttempts === 0}
// // // // // //                   className="flex-1 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // // // // //                 >
// // // // // //                   Regenerate Alternative
// // // // // //                 </button>
// // // // // //                 <button
// // // // // //                   type="button"
// // // // // //                   onClick={() => syncProductImageWithShopify(imageUrl)}
// // // // // //                   className="flex-1 py-2 rounded-md bg-brand hover-bg-brand text-xs font-bold text-white shadow transition-all uppercase tracking-wider"
// // // // // //                 >
// // // // // //                   Use This Design →
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}

// // // // // //           {/* 4. Generation History Drawer */}
// // // // // //           {history.length > 0 && (
// // // // // //             <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// // // // // //               <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Your previous generations</h3>
// // // // // //               <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
// // // // // //                 {history.map((item) => (
// // // // // //                   <div key={item.id} className="relative group">
// // // // // //                     <button
// // // // // //                       onClick={() => handleSelectHistoryItem(item)}
// // // // // //                       className={`w-full aspect-square rounded overflow-hidden border-2 transition-all ${
// // // // // //                         imageUrl === item.url ? "border-brand scale-95 opacity-100 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
// // // // // //                       }`}
// // // // // //                     >
// // // // // //                       <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       onClick={() => setModalImageUrl(item.url)}
// // // // // //                       className="absolute top-1 right-1 bg-black/70 text-white rounded p-0.5 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"
// // // // // //                       title="Enlarge preview"
// // // // // //                     >
// // // // // //                       🔍
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 ))}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           )}

// // // // // //         </div>

// // // // // //         {/* 5. Full Screen Lightbox Modal */}
// // // // // //         {modalImageUrl && (
// // // // // //           <div 
// // // // // //             className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
// // // // // //             onClick={() => setModalImageUrl(null)}
// // // // // //           >
// // // // // //             <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg p-2 overflow-hidden shadow-2xl flex flex-col items-center">
// // // // // //               <button
// // // // // //                 onClick={() => setModalImageUrl(null)}
// // // // // //                 className="absolute top-3 right-3 bg-brand text-white w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center hover-bg-brand"
// // // // // //               >
// // // // // //                 ✕
// // // // // //               </button>
// // // // // //               <img
// // // // // //                 src={modalImageUrl}
// // // // // //                 alt="Enlarged Design Artwork"
// // // // // //                 className="max-w-full max-h-[80vh] object-contain rounded"
// // // // // //               />
// // // // // //               <p className="text-xs text-gray-500 mt-2 font-medium">Click anywhere outside to close</p>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //       </div>
// // // // // //     </>
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

// // // // // interface HistoryItem {
// // // // //   id: string;
// // // // //   url: string;
// // // // //   prompt: string;
// // // // //   style: string;
// // // // // }

// // // // // export default function DesignerPage() {
// // // // //   const [prompt, setPrompt] = useState("");
// // // // //   const [selectedStyle, setSelectedStyle] = useState("");
// // // // //   const [loading, setLoading] = useState(false);
// // // // //   const [imageUrl, setImageUrl] = useState("");
// // // // //   const [error, setError] = useState("");
// // // // //   const [remainingAttempts, setRemainingAttempts] = useState<number | null>(3);
// // // // //   const [history, setHistory] = useState<HistoryItem[]>([]);

// // // // //   // Dynamic Shopify options
// // // // //   const [dynWidth, setDynWidth] = useState("600");
// // // // //   const [dynHeight, setDynHeight] = useState("900");
// // // // //   const [dynThickness, setDynThickness] = useState("5mm");
// // // // //   const [dynEyelets, setDynEyelets] = useState("No");

// // // // //   const containerRef = useRef<HTMLDivElement>(null);

// // // // //   const syncHeightWithShopify = () => {
// // // // //     if (containerRef.current) {
// // // // //       const height = containerRef.current.scrollHeight;
// // // // //       window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
// // // // //     }
// // // // //   };

// // // // //   const syncProductImageWithShopify = (imgUrl: string) => {
// // // // //     if (!imgUrl) return;
// // // // //     const payload = { type: "UPDATE_PRODUCT_IMAGE", imageUrl: imgUrl };

// // // // //     if (window.parent && window.parent !== window) {
// // // // //       window.parent.postMessage(payload, "*");
// // // // //     } else if (window.top) {
// // // // //       window.top.postMessage(payload, "*");
// // // // //     }
// // // // //   };

// // // // //   // Dispatch Lightbox request to the main Shopify page window
// // // // //   const openFullscreenLightbox = (imgUrl: string) => {
// // // // //     if (!imgUrl) return;
// // // // //     const payload = { type: "OPEN_FULLSCREEN_LIGHTBOX", imageUrl: imgUrl };

// // // // //     if (window.parent && window.parent !== window) {
// // // // //       window.parent.postMessage(payload, "*");
// // // // //     } else if (window.top) {
// // // // //       window.top.postMessage(payload, "*");
// // // // //     }
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     syncHeightWithShopify();
// // // // //     window.addEventListener("resize", syncHeightWithShopify);

// // // // //     const handleMessage = (event: MessageEvent) => {
// // // // //       if (event.data && event.data.type === 'SHOPIFY_ATTRIBUTES_CHANGED') {
// // // // //         const { width, height, thickness, eyelets } = event.data;
// // // // //         if (width) setDynWidth(width);
// // // // //         if (height) setDynHeight(height);
// // // // //         if (thickness) setDynThickness(thickness);
// // // // //         if (eyelets) setDynEyelets(eyelets);
// // // // //       }
// // // // //     };

// // // // //     window.addEventListener("message", handleMessage);

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
// // // // //       window.removeEventListener("message", handleMessage);
// // // // //       observer.disconnect();
// // // // //     };
// // // // //   }, []);

// // // // //   const handleGenerate = async () => {
// // // // //     if (!prompt || !selectedStyle || remainingAttempts === 0) return;
// // // // //     setLoading(true);
// // // // //     setImageUrl("");
// // // // //     setError("");

// // // // //     const attributeTunedPrompt = `${prompt} (Specifications: Sign thickness ${dynThickness}, Eyelets config: ${dynEyelets})`;

// // // // //     try {
// // // // //       const response = await fetch("/api/generate-design", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           prompt: attributeTunedPrompt,
// // // // //           style: selectedStyle,
// // // // //           width: dynWidth,
// // // // //           height: dynHeight,
// // // // //           customerId: null,
// // // // //         }),
// // // // //       });

// // // // //       const data = await response.json();

// // // // //       if (typeof data.remainingAttempts === "number") {
// // // // //         setRemainingAttempts(data.remainingAttempts);
// // // // //       }

// // // // //       if (!response.ok) {
// // // // //         throw new Error(data.error || "Failed to generate custom sign artwork.");
// // // // //       }

// // // // //       const newImageUrl = data.designUrl;
// // // // //       setImageUrl(newImageUrl);

// // // // //       const newHistoryItem: HistoryItem = {
// // // // //         id: Date.now().toString(),
// // // // //         url: newImageUrl,
// // // // //         prompt: prompt,
// // // // //         style: selectedStyle
// // // // //       };
// // // // //       setHistory(prev => [newHistoryItem, ...prev]);
// // // // //       syncProductImageWithShopify(newImageUrl);

// // // // //     } catch (err: any) {
// // // // //       console.error("UI Generation Fault:", err);
// // // // //       setError(err.message || "Unable to reach generation server.");
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

// // // // //   const wNum = parseFloat(dynWidth) || 600;
// // // // //   const hNum = parseFloat(dynHeight) || 900;
// // // // //   const aspectRatio = wNum / hNum;

// // // // //   return (
// // // // //     <>
// // // // //       <style jsx global>{`
// // // // //         @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
// // // // //         body, input, textarea, button, select {
// // // // //           font-family: 'Montserrat', sans-serif !important;
// // // // //         }

// // // // //         .bg-brand {
// // // // //           background-color: #02aef0 !important;
// // // // //         }
// // // // //         .text-brand {
// // // // //           color: #02aef0 !important;
// // // // //         }
// // // // //         .border-brand {
// // // // //           border-color: #02aef0 !important;
// // // // //         }
// // // // //         .hover-bg-brand:hover {
// // // // //           background-color: #029ad5 !important;
// // // // //         }
// // // // //       `}</style>

// // // // //       <div ref={containerRef} className="bg-white overflow-hidden min-h-full antialiased text-gray-900 w-full py-2">
        
// // // // //         {/* Header Panel */}
// // // // //         <div className="bg-white border-b border-gray-200 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
// // // // //           <div>
// // // // //             <h1 className="text-base font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // // //             <p className="text-[11px] text-gray-500">
// // // // //               Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
// // // // //             </p>
// // // // //           </div>
          
// // // // //           {remainingAttempts !== null && (
// // // // //             <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold self-start sm:self-center border transition-all ${
// // // // //               remainingAttempts === 0 
// // // // //                 ? "bg-red-50 border-red-200 text-red-700" 
// // // // //                 : "bg-sky-50 border-sky-200 text-brand"
// // // // //             }`}>
// // // // //               {remainingAttempts === 0 
// // // // //                 ? "0 generations remaining" 
// // // // //                 : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
// // // // //             </div>
// // // // //           )}
// // // // //         </div>

// // // // //         <div className="w-full space-y-4">

// // // // //           {error && (
// // // // //             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs">
// // // // //               <span className="font-semibold">Notice:</span> {error}
// // // // //             </div>
// // // // //           )}

// // // // //           {/* 1. Prompt Input Box */}
// // // // //           <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// // // // //             <div className="flex items-center gap-2">
// // // // //               <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
// // // // //               <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Describe your sign</h2>
// // // // //             </div>
// // // // //             <textarea
// // // // //               rows={3}
// // // // //               value={prompt}
// // // // //               disabled={remainingAttempts === 0 || loading}
// // // // //               onChange={(e) => setPrompt(e.target.value)}
// // // // //               placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in bold lettering..."}
// // // // //               className={`w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all ${
// // // // //                 remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
// // // // //               }`}
// // // // //             />
// // // // //           </div>

// // // // //           {/* 2. Style Matrix */}
// // // // //           <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// // // // //             <div className="flex items-center gap-2">
// // // // //               <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
// // // // //               <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Select design theme style</h2>
// // // // //             </div>
// // // // //             <div className="flex flex-wrap gap-1.5">
// // // // //               {STYLES.map((style) => (
// // // // //                 <button
// // // // //                   key={style}
// // // // //                   disabled={remainingAttempts === 0 || loading}
// // // // //                   onClick={() => setSelectedStyle(style)}
// // // // //                   className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
// // // // //                     selectedStyle === style
// // // // //                       ? "bg-brand text-white border-brand shadow-sm"
// // // // //                       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
// // // // //                   } ${remainingAttempts === 0 ? "opacity-40 cursor-not-allowed" : ""}`}
// // // // //                 >
// // // // //                   {style}
// // // // //                 </button>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>

// // // // //           <button
// // // // //             onClick={handleGenerate}
// // // // //             disabled={!prompt || !selectedStyle || loading || remainingAttempts === 0}
// // // // //             className={`w-full py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all ${
// // // // //               !prompt || !selectedStyle || loading || remainingAttempts === 0
// // // // //                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
// // // // //                 : "bg-brand hover-bg-brand text-white shadow-md"
// // // // //             }`}
// // // // //           >
// // // // //             {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
// // // // //           </button>

// // // // //           {loading && (
// // // // //             <div className="bg-sky-50/40 rounded-lg border-2 border-dashed border-sky-200 p-8 flex flex-col items-center justify-center gap-2 animate-pulse">
// // // // //               <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
// // // // //               <p className="text-[11px] font-medium text-gray-500">Generating mockup assets...</p>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* 3. Output Canvas */}
// // // // //           {imageUrl && !loading && (
// // // // //             <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-sm">
// // // // //               <div className="flex items-center justify-between">
// // // // //                 <div className="flex items-center gap-2">
// // // // //                   <span className="bg-brand text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
// // // // //                   <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Your generated layout output mockup</h2>
// // // // //                 </div>
// // // // //                 <button
// // // // //                   onClick={() => openFullscreenLightbox(imageUrl)}
// // // // //                   className="text-[11px] font-semibold text-brand hover:underline flex items-center gap-1"
// // // // //                 >
// // // // //                   🔍 Full Screen Preview
// // // // //                 </button>
// // // // //               </div>

// // // // //               <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center border border-gray-100">
// // // // //                 <div 
// // // // //                   className="relative p-5 border border-dashed border-gray-300 bg-white rounded shadow-inner flex items-center justify-center group"
// // // // //                   style={{
// // // // //                     width: "100%",
// // // // //                     maxWidth: aspectRatio > 1 ? "360px" : `${360 * aspectRatio}px`,
// // // // //                     aspectRatio: `${aspectRatio}`
// // // // //                   }}
// // // // //                 >
// // // // //                   {/* Top Ruler */}
// // // // //                   <div className="absolute -top-5 left-5 right-5 flex flex-col items-center">
// // // // //                     <div className="w-full h-px bg-red-500 relative">
// // // // //                       <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
// // // // //                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
// // // // //                     </div>
// // // // //                     <span className="text-[9px] font-bold text-red-500 bg-white px-1 mt-0.5 shadow-sm rounded border border-gray-100">
// // // // //                       {dynWidth}mm
// // // // //                     </span>
// // // // //                   </div>

// // // // //                   {/* Right Ruler */}
// // // // //                   <div className="absolute -right-6 top-5 bottom-5 flex items-center">
// // // // //                     <div className="h-full w-px bg-red-500 relative">
// // // // //                       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
// // // // //                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
// // // // //                     </div>
// // // // //                     <span className="text-[9px] font-bold text-red-500 bg-white px-0.5 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] ml-0.5">
// // // // //                       {dynHeight}mm
// // // // //                     </span>
// // // // //                   </div>

// // // // //                   <img
// // // // //                     src={imageUrl}
// // // // //                     alt="AI Generated Design"
// // // // //                     onLoad={syncHeightWithShopify}
// // // // //                     className="w-full h-full object-contain rounded cursor-pointer"
// // // // //                     onClick={() => openFullscreenLightbox(imageUrl)}
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="flex flex-col sm:flex-row gap-2 pt-1">
// // // // //                 <button
// // // // //                   onClick={handleGenerate}
// // // // //                   disabled={remainingAttempts === 0}
// // // // //                   className="flex-1 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // // // //                 >
// // // // //                   Regenerate Alternative
// // // // //                 </button>
// // // // //                 <button
// // // // //                   type="button"
// // // // //                   onClick={() => syncProductImageWithShopify(imageUrl)}
// // // // //                   className="flex-1 py-2 rounded-md bg-brand hover-bg-brand text-xs font-bold text-white shadow transition-all uppercase tracking-wider"
// // // // //                 >
// // // // //                   Use This Design →
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* 4. Generation History Drawer */}
// // // // //           {history.length > 0 && (
// // // // //             <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
// // // // //               <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Your previous generations</h3>
// // // // //               <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
// // // // //                 {history.map((item) => (
// // // // //                   <div key={item.id} className="relative group">
// // // // //                     <button
// // // // //                       onClick={() => handleSelectHistoryItem(item)}
// // // // //                       className={`w-full aspect-square rounded overflow-hidden border-2 transition-all ${
// // // // //                         imageUrl === item.url ? "border-brand scale-95 opacity-100 shadow-sm" : "border-transparent opacity-60 hover:opacity-100"
// // // // //                       }`}
// // // // //                     >
// // // // //                       <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
// // // // //                     </button>
// // // // //                     <button
// // // // //                       onClick={() => openFullscreenLightbox(item.url)}
// // // // //                       className="absolute top-1 right-1 bg-black/70 text-white rounded p-0.5 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"
// // // // //                       title="Enlarge preview"
// // // // //                     >
// // // // //                       🔍
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 ))}
// // // // //               </div>
// // // // //             </div>
// // // // //           )}

// // // // //         </div>

// // // // //       </div>
// // // // //     </>
// // // // //   );
// // // // // }
























// // // // "use client";

// // // // import React, { useState, useEffect } from "react";

// // // // export default function DesignerPage() {
// // // //   // Base Designer States
// // // //   const [prompt, setPrompt] = useState("");
// // // //   const [selectedStyle, setSelectedStyle] = useState("Bold & High Contrast");
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [imageUrl, setImageUrl] = useState<string | null>(null);
// // // //   const [errorNotice, setErrorNotice] = useState<string | null>(null);
// // // //   const [remainingAttempts, setRemainingAttempts] = useState(3);
// // // //   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

// // // //   // Shopify Product Spec States
// // // //   const [productSpecs, setProductSpecs] = useState({
// // // //     width: "450mm",
// // // //     height: "600mm",
// // // //     thickness: "5mm",
// // // //     eyelets: "No",
// // // //   });

// // // //   // Aspect Ratio Calculation
// // // //   const numericWidth = parseFloat(productSpecs.width) || 450;
// // // //   const numericHeight = parseFloat(productSpecs.height) || 600;
// // // //   const aspectRatio = numericWidth / numericHeight;

// // // //   // ML4: Interactive Overlay & Editor States
// // // //   const [textOverlay, setTextOverlay] = useState("YOUR TEXT HERE");
// // // //   const [fontSize, setFontSize] = useState(24);
// // // //   const [textColor, setTextColor] = useState("#FFFFFF");
// // // //   const [fontFamily, setFontFamily] = useState("Montserrat");
// // // //   const [textPos, setTextPos] = useState({ x: 50, y: 50 });

// // // //   const [logoUrl, setLogoUrl] = useState<string | null>(null);
// // // //   const [logoPos, setLogoPos] = useState({ x: 10, y: 10 });
// // // //   const [logoWarning, setLogoWarning] = useState<string | null>(null);

// // // //   const [showPrintGuides, setShowPrintGuides] = useState(true);
// // // //   const [refinePrompt, setRefinePrompt] = useState("");

// // // //   // Shopify App Embed / Theme Message Listener
// // // //   useEffect(() => {
// // // //     const handleMessage = (event: MessageEvent) => {
// // // //       if (event.data?.type === "SET_PRODUCT_SPECS") {
// // // //         setProductSpecs(event.data.specs);
// // // //       }
// // // //     };
// // // //     window.addEventListener("message", handleMessage);
// // // //     return () => window.removeEventListener("message", handleMessage);
// // // //   }, []);

// // // //   // ML4: Logo Upload & Resolution Check
// // // //   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // // //     const file = e.target.files?.[0];
// // // //     if (!file) return;

// // // //     setLogoWarning(null);
// // // //     const reader = new FileReader();
// // // //     reader.onload = (event) => {
// // // //       const img = new Image();
// // // //       img.src = event.target?.result as string;
// // // //       img.onload = () => {
// // // //         if (img.width < 800 || img.height < 800) {
// // // //           setLogoWarning(`Low resolution logo (${img.width}x${img.height}px). May appear pixelated when printed.`);
// // // //         }
// // // //         setLogoUrl(img.src);
// // // //       };
// // // //     };
// // // //     reader.readAsDataURL(file);
// // // //   };

// // // //   // Extract Image URL or Base64 String from any response key
// // // //   const extractImageUrl = (data: any): string | null => {
// // // //     if (!data) return null;
    
// // // //     // Directly returns standard HTTP URLs or Base64 Data URIs
// // // //     if (typeof data === "string" && (data.startsWith("http") || data.startsWith("data:image"))) {
// // // //       return data;
// // // //     }

// // // //     return (
// // // //       data.designUrl || // <--- Added your backend's exact key
// // // //       data.imageUrl ||
// // // //       data.url ||
// // // //       data.image ||
// // // //       data.result ||
// // // //       data.data?.designUrl ||
// // // //       data.data?.imageUrl ||
// // // //       data.data?.url ||
// // // //       data.data?.image ||
// // // //       data.result?.designUrl ||
// // // //       data.result?.url ||
// // // //       data.result?.image ||
// // // //       (Array.isArray(data.images) && data.images[0]) ||
// // // //       (Array.isArray(data.output) && data.output[0]) ||
// // // //       (Array.isArray(data.result) && data.result[0]?.url) ||
// // // //       null
// // // //     );
// // // //   };

// // // //   // Generate Base Image Handler
// // // //   const handleGenerate = async () => {
// // // //     if (!prompt.trim()) {
// // // //       setErrorNotice("Please describe your sign before generating.");
// // // //       return;
// // // //     }
// // // //     if (remainingAttempts <= 0) {
// // // //       setErrorNotice("You have reached the maximum generation limit for this session.");
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     setErrorNotice(null);

// // // //     const fullPrompt = `Signage design for ${productSpecs.width} x ${productSpecs.height} corflute sign. Style: ${selectedStyle}. ${prompt}`;

// // // //     try {
// // // //       const response = await fetch("/api/generate-design", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           prompt: fullPrompt,
// // // //           style: selectedStyle,
// // // //           selectedStyle: selectedStyle,
// // // //           aspectRatio: aspectRatio,
// // // //           width: numericWidth,
// // // //           height: numericHeight,
// // // //         }),
// // // //       });

// // // //       const data = await response.json();

// // // //       if (!response.ok) {
// // // //         throw new Error(data.error || "Failed to generate design through Cloudflare AI Gateway.");
// // // //       }

// // // //       // Deep extraction across all standard response keys
// // // //       const receivedUrl = extractImageUrl(data);

// // // //       if (!receivedUrl) {
// // // //         console.error("Unrecognized API JSON structure:", data);
// // // //         throw new Error(`API returned 200 OK but keys were: [${Object.keys(data).join(", ")}]. Check console for details.`);
// // // //       }

// // // //       setImageUrl(receivedUrl);
// // // //       setRemainingAttempts((prev) => prev - 1);
// // // //     } catch (err: any) {
// // // //       setErrorNotice(err.message || "Failed to generate design.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Sync Final Asset Back to Shopify Theme
// // // //   const syncProductImageWithShopify = (finalImage: string) => {
// // // //     if (window.parent) {
// // // //       window.parent.postMessage(
// // // //         {
// // // //           type: "SET_DESIGN_RESULT",
// // // //           imageUrl: finalImage,
// // // //           textOverlay,
// // // //           logoUrl,
// // // //         },
// // // //         "*"
// // // //       );
// // // //     }
// // // //   };

// // // //   const stylePresets = [
// // // //     "Bold & High Contrast",
// // // //     "Clean & Minimal",
// // // //     "Real Estate",
// // // //     "Construction",
// // // //     "Retail & Sale",
// // // //     "Outdoor / Weather Proof",
// // // //   ];

// // // //   return (
// // // //     <div className="w-full max-w-xl mx-auto p-4 font-sans space-y-3 bg-white text-gray-900 rounded-xl border border-gray-200 shadow-sm">
// // // //       {/* Header Specs Bar */}
// // // //       <div className="border-b border-gray-200 pb-2.5 flex items-center justify-between">
// // // //         <div>
// // // //           <h1 className="text-xs font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // // //           <p className="text-[10px] text-gray-500">
// // // //             Current Specs: {productSpecs.width} x {productSpecs.height} | Thickness: {productSpecs.thickness} | Eyelets: {productSpecs.eyelets}
// // // //           </p>
// // // //         </div>
// // // //         <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
// // // //           {remainingAttempts} generations remaining
// // // //         </span>
// // // //       </div>

// // // //       {/* Error / Notice Display */}
// // // //       {errorNotice && (
// // // //         <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-md flex items-center justify-between">
// // // //           <span><strong>Notice:</strong> {errorNotice}</span>
// // // //           <button onClick={() => setErrorNotice(null)} className="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
// // // //         </div>
// // // //       )}

// // // //       {/* Step 1: Describe Your Sign */}
// // // //       <div className="space-y-1">
// // // //         <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
// // // //           <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
// // // //           Describe Your Sign
// // // //         </label>
// // // //         <textarea
// // // //           rows={3}
// // // //           value={prompt}
// // // //           onChange={(e) => setPrompt(e.target.value)}
// // // //           placeholder="e.g. Build me a banner design with my name John Carter..."
// // // //           className="w-full text-xs p-2.5 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400 resize-none"
// // // //         />
// // // //       </div>

// // // //       {/* Step 2: Select Design Theme Style */}
// // // //       <div className="space-y-1.5">
// // // //         <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
// // // //           <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
// // // //           Select Design Theme Style
// // // //         </label>
// // // //         <div className="flex flex-wrap gap-1.5">
// // // //           {stylePresets.map((style) => (
// // // //             <button
// // // //               key={style}
// // // //               type="button"
// // // //               onClick={() => setSelectedStyle(style)}
// // // //               className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
// // // //                 selectedStyle === style
// // // //                   ? "bg-sky-600 text-white shadow-xs font-bold"
// // // //                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// // // //               }`}
// // // //             >
// // // //               {style}
// // // //             </button>
// // // //           ))}
// // // //         </div>
// // // //       </div>

// // // //       {/* Primary Action Button */}
// // // //       <button
// // // //         type="button"
// // // //         onClick={handleGenerate}
// // // //         disabled={loading || !prompt || remainingAttempts === 0}
// // // //         className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm disabled:opacity-50 transition-all flex items-center justify-center gap-2"
// // // //       >
// // // //         {loading ? (
// // // //           <>
// // // //             <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
// // // //               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
// // // //               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
// // // //             </svg>
// // // //             Generating Custom Design...
// // // //           </>
// // // //         ) : (
// // // //           "Generate Custom Design Asset"
// // // //         )}
// // // //       </button>

// // // //       {/* Step 3: Interactive Canvas & Overlay Editor (ML4) */}
// // // //       {imageUrl && !loading && (
// // // //         <div className="bg-white rounded-md border border-gray-200 p-3 space-y-3 shadow-xs mt-3">
// // // //           <div className="flex items-center justify-between">
// // // //             <div className="flex items-center gap-1.5">
// // // //               <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
// // // //               <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Interactive Layout & Overlay Editor</h2>
// // // //             </div>
// // // //             <div className="flex items-center gap-2">
// // // //               <label className="flex items-center gap-1 text-[10px] font-medium text-gray-600 cursor-pointer select-none">
// // // //                 <input 
// // // //                   type="checkbox" 
// // // //                   checked={showPrintGuides} 
// // // //                   onChange={(e) => setShowPrintGuides(e.target.checked)}
// // // //                   className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
// // // //                 />
// // // //                 Bleed Guides
// // // //               </label>
// // // //               <button
// // // //                 type="button"
// // // //                 onClick={() => setIsLightboxOpen(true)}
// // // //                 className="text-[10px] font-semibold text-sky-600 hover:underline flex items-center gap-0.5"
// // // //               >
// // // //                 🔍 Full Preview
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Interactive Canvas Display Area */}
// // // //           <div className="bg-gray-50 rounded-md p-2 flex items-center justify-center border border-gray-200">
// // // //             <div 
// // // //               className="relative border border-dashed border-gray-300 bg-white rounded flex items-center justify-center overflow-hidden"
// // // //               style={{
// // // //                 width: "100%",
// // // //                 maxWidth: aspectRatio > 1 ? "320px" : `${320 * aspectRatio}px`,
// // // //                 aspectRatio: `${aspectRatio}`
// // // //               }}
// // // //             >
// // // //               {/* Base AI Generated Background */}
// // // //               <img
// // // //                 src={imageUrl}
// // // //                 alt="AI Generated Background"
// // // //                 className="w-full h-full object-contain pointer-events-none select-none"
// // // //               />

// // // //               {/* Dynamic Print Bleed Overlay */}
// // // //               {showPrintGuides && (
// // // //                 <div className="absolute inset-1 border border-dashed border-red-500/80 pointer-events-none flex items-start justify-start p-0.5">
// // // //                   <span className="text-[7px] font-bold text-red-600 bg-white/90 px-0.5 rounded shadow-xs">5mm Safe Margin</span>
// // // //                 </div>
// // // //               )}

// // // //               {/* Dynamic Logo Overlay */}
// // // //               {logoUrl && (
// // // //                 <div 
// // // //                   className="absolute cursor-move border border-transparent hover:border-sky-500 p-0.5 rounded"
// // // //                   style={{ left: `${logoPos.x}%`, top: `${logoPos.y}%` }}
// // // //                 >
// // // //                   <img src={logoUrl} alt="Uploaded Logo" className="h-10 w-auto object-contain" />
// // // //                 </div>
// // // //               )}

// // // //               {/* Dynamic Text Overlay */}
// // // //               {textOverlay && (
// // // //                 <div 
// // // //                   className="absolute cursor-move border border-transparent hover:border-sky-500 px-1 py-0.5 rounded text-center select-none"
// // // //                   style={{ 
// // // //                     left: `${textPos.x}%`, 
// // // //                     top: `${textPos.y}%`, 
// // // //                     transform: "translate(-50%, -50%)",
// // // //                     color: textColor,
// // // //                     fontSize: `${fontSize}px`,
// // // //                     fontFamily: fontFamily
// // // //                   }}
// // // //                 >
// // // //                   <span className="font-bold drop-shadow-xs">{textOverlay}</span>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Controls Panel Grid */}
// // // //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-gray-100">
            
// // // //             {/* Text Overlay Controls */}
// // // //             <div className="bg-gray-50 p-2 rounded space-y-1.5 border border-gray-200">
// // // //               <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Text Block Editor</h3>
// // // //               <input 
// // // //                 type="text" 
// // // //                 value={textOverlay} 
// // // //                 onChange={(e) => setTextOverlay(e.target.value)}
// // // //                 placeholder="Enter sign wording..."
// // // //                 className="w-full border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 bg-white focus:outline-none focus:border-sky-500"
// // // //               />
// // // //               <div className="flex gap-1.5">
// // // //                 <select 
// // // //                   value={fontFamily}
// // // //                   onChange={(e) => setFontFamily(e.target.value)}
// // // //                   className="flex-1 border border-gray-300 rounded px-1.5 py-1 text-[11px] text-gray-800 bg-white"
// // // //                 >
// // // //                   <option value="Montserrat">Montserrat</option>
// // // //                   <option value="Arial">Arial</option>
// // // //                   <option value="Impact">Impact</option>
// // // //                   <option value="Times New Roman">Times New Roman</option>
// // // //                 </select>
// // // //                 <input 
// // // //                   type="color" 
// // // //                   value={textColor}
// // // //                   onChange={(e) => setTextColor(e.target.value)}
// // // //                   className="w-7 h-6 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
// // // //                   title="Text Color"
// // // //                 />
// // // //                 <input 
// // // //                   type="number" 
// // // //                   value={fontSize} 
// // // //                   onChange={(e) => setFontSize(Number(e.target.value))}
// // // //                   className="w-12 border border-gray-300 rounded px-1 text-[11px] text-center bg-white"
// // // //                   min={12} max={72}
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Logo Upload & Quality Checks */}
// // // //             <div className="bg-gray-50 p-2 rounded space-y-1.5 border border-gray-200">
// // // //               <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Logo Upload</h3>
// // // //               <input 
// // // //                 type="file" 
// // // //                 accept="image/png, image/jpeg, image/svg+xml"
// // // //                 onChange={handleLogoUpload}
// // // //                 className="w-full text-[10px] text-gray-600 file:mr-1.5 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer"
// // // //               />
// // // //               {logoWarning && (
// // // //                 <p className="text-[9px] text-amber-800 bg-amber-50 border border-amber-200 p-1 rounded">
// // // //                   ⚠️ {logoWarning}
// // // //                 </p>
// // // //               )}
// // // //             </div>

// // // //           </div>

// // // //           {/* Background Iterative Refinement Input */}
// // // //           <div className="bg-sky-50 p-2 rounded space-y-1.5 border border-sky-100">
// // // //             <h3 className="text-[10px] font-bold uppercase tracking-wider text-sky-800">Refine Base Background</h3>
// // // //             <div className="flex gap-1.5">
// // // //               <input 
// // // //                 type="text" 
// // // //                 value={refinePrompt} 
// // // //                 onChange={(e) => setRefinePrompt(e.target.value)}
// // // //                 placeholder="e.g. Make background darker, change yellow to red..."
// // // //                 className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 bg-white"
// // // //               />
// // // //               <button 
// // // //                 type="button"
// // // //                 onClick={() => {
// // // //                   setPrompt((prev) => `${prev}. Refinement: ${refinePrompt}`);
// // // //                   handleGenerate();
// // // //                 }}
// // // //                 disabled={!refinePrompt || loading || remainingAttempts === 0}
// // // //                 className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white rounded font-bold text-[10px] uppercase tracking-wider disabled:opacity-50"
// // // //               >
// // // //                 Refine
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           {/* Action Buttons */}
// // // //           <div className="flex flex-col sm:flex-row gap-1.5 pt-1">
// // // //             <button
// // // //               type="button"
// // // //               onClick={handleGenerate}
// // // //               disabled={remainingAttempts === 0}
// // // //               className="flex-1 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // // //             >
// // // //               Regenerate Base
// // // //             </button>
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => syncProductImageWithShopify(imageUrl)}
// // // //               className="flex-1 py-1.5 rounded bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white shadow-xs transition-all uppercase tracking-wider"
// // // //             >
// // // //               Use This Design →
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Lightbox Modal */}
// // // //       {isLightboxOpen && imageUrl && (
// // // //         <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
// // // //           <div className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center">
// // // //             <button
// // // //               onClick={() => setIsLightboxOpen(false)}
// // // //               className="absolute -top-9 right-0 text-white font-bold text-xs bg-gray-800 px-2.5 py-1 rounded-full"
// // // //             >
// // // //               Close ✕
// // // //             </button>
// // // //             <img
// // // //               src={imageUrl}
// // // //               alt="Fullscreen Preview"
// // // //               className="max-h-[75vh] w-auto object-contain rounded-md shadow-2xl"
// // // //             />
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // }











































// // // "use client";

// // // import React, { useState, useEffect, useRef } from "react";

// // // export default function DesignerPage() {
// // //   // Base State
// // //   const [prompt, setPrompt] = useState("");
// // //   const [selectedStyle, setSelectedStyle] = useState("Bold & High Contrast");
// // //   const [loading, setLoading] = useState(false);
// // //   const [imageUrl, setImageUrl] = useState<string | null>(null);
// // //   const [errorNotice, setErrorNotice] = useState<string | null>(null);
// // //   const [remainingAttempts, setRemainingAttempts] = useState(3);
// // //   const [isLightboxOpen, setIsLightboxOpen] = useState(false);

// // //   // Shopify Product Specs State
// // //   const [productSpecs, setProductSpecs] = useState({
// // //     width: "450mm",
// // //     height: "600mm",
// // //     thickness: "5mm",
// // //     eyelets: "No",
// // //   });

// // //   const numericWidth = parseFloat(productSpecs.width) || 450;
// // //   const numericHeight = parseFloat(productSpecs.height) || 600;
// // //   const aspectRatio = numericWidth / numericHeight;

// // //   // Text Overlay State
// // //   const [textOverlay, setTextOverlay] = useState("YOUR CUSTOM TEXT");
// // //   const [fontSize, setFontSize] = useState(24);
// // //   const [textColor, setTextColor] = useState("#000000");
// // //   const [fontFamily, setFontFamily] = useState("Montserrat");

// // //   // Draggable Positions (Percentage-based for scaling responsiveness)
// // //   const [textPos, setTextPos] = useState({ x: 50, y: 50 });
// // //   const [logoPos, setLogoPos] = useState({ x: 15, y: 15 });

// // //   // Logo Overlay State
// // //   const [logoUrl, setLogoUrl] = useState<string | null>(null);
// // //   const [logoWarning, setLogoWarning] = useState<string | null>(null);

// // //   // Canvas Print Controls
// // //   const [showPrintGuides, setShowPrintGuides] = useState(true);

// // //   // References for Drag Handling
// // //   const canvasRef = useRef<HTMLDivElement>(null);
// // //   const isDraggingText = useRef(false);
// // //   const isDraggingLogo = useRef(false);

// // //   // Listen for product spec changes sent from Shopify Theme
// // //   useEffect(() => {
// // //     const handleMessage = (event: MessageEvent) => {
// // //       if (event.data?.type === "SET_PRODUCT_SPECS") {
// // //         setProductSpecs(event.data.specs);
// // //       }
// // //     };
// // //     window.addEventListener("message", handleMessage);
// // //     return () => window.removeEventListener("message", handleMessage);
// // //   }, []);

// // //   // Handle Logo Upload and Check Resolution
// // //   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// // //     const file = e.target.files?.[0];
// // //     if (!file) return;

// // //     setLogoWarning(null);
// // //     const reader = new FileReader();
// // //     reader.onload = (event) => {
// // //       const img = new Image();
// // //       img.src = event.target?.result as string;
// // //       img.onload = () => {
// // //         if (img.width < 800 || img.height < 800) {
// // //           setLogoWarning(`Low resolution logo (${img.width}x${img.height}px). May appear pixelated when printed.`);
// // //         }
// // //         setLogoUrl(img.src);
// // //       };
// // //     };
// // //     reader.readAsDataURL(file);
// // //   };

// // //   // Safe Extractor for Response Image Payloads
// // //   const extractImageUrl = (data: any): string | null => {
// // //     if (!data) return null;
// // //     if (typeof data === "string" && (data.startsWith("http") || data.startsWith("data:image"))) {
// // //       return data;
// // //     }
// // //     return (
// // //       data.designUrl ||
// // //       data.imageUrl ||
// // //       data.url ||
// // //       data.image ||
// // //       data.data?.designUrl ||
// // //       data.data?.imageUrl ||
// // //       data.result?.image ||
// // //       null
// // //     );
// // //   };

// // //   // Trigger Generation Request
// // //   const handleGenerate = async () => {
// // //     if (!prompt.trim()) {
// // //       setErrorNotice("Please describe your sign before generating.");
// // //       return;
// // //     }
// // //     if (remainingAttempts <= 0) {
// // //       setErrorNotice("Maximum generation limit reached for this session.");
// // //       return;
// // //     }

// // //     setLoading(true);
// // //     setErrorNotice(null);

// // //     try {
// // //       const response = await fetch("/api/generate-design", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           prompt,
// // //           style: selectedStyle,
// // //           aspectRatio,
// // //           width: numericWidth,
// // //           height: numericHeight,
// // //         }),
// // //       });

// // //       const data = await response.json();
// // //       if (!response.ok) throw new Error(data.error || "Failed to generate design.");

// // //       const receivedUrl = extractImageUrl(data);
// // //       if (!receivedUrl) throw new Error("API returned success, but image payload key was missing.");

// // //       setImageUrl(receivedUrl);
// // //       setRemainingAttempts((prev) => prev - 1);
// // //     } catch (err: any) {
// // //       setErrorNotice(err.message || "Failed to generate background asset.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Mouse Move Event Listener for Canvas Dragging
// // //   const handleMouseMove = (e: React.MouseEvent) => {
// // //     if (!canvasRef.current) return;
// // //     const rect = canvasRef.current.getBoundingClientRect();

// // //     // Convert mouse coordinates to relative percentages inside container
// // //     const x = Math.min(Math.max(0, ((e.clientX - rect.left) / rect.width) * 100), 100);
// // //     const y = Math.min(Math.max(0, ((e.clientY - rect.top) / rect.height) * 100), 100);

// // //     if (isDraggingText.current) {
// // //       setTextPos({ x, y });
// // //     } else if (isDraggingLogo.current) {
// // //       setLogoPos({ x, y });
// // //     }
// // //   };

// // //   const stopDragging = () => {
// // //     isDraggingText.current = false;
// // //     isDraggingLogo.current = false;
// // //   };

// // //   // Export & Composite Final Image via Client-side HTML5 Canvas
// // //   const handleExportDesign = () => {
// // //     if (!imageUrl) return;

// // //     const exportCanvas = document.createElement("canvas");
// // //     const ctx = exportCanvas.getContext("2d");
// // //     if (!ctx) return;

// // //     const bgImg = new Image();
// // //     bgImg.crossOrigin = "anonymous";
// // //     bgImg.src = imageUrl;

// // //     bgImg.onload = () => {
// // //       // Set export resolution to match target aspect ratio at high DPI
// // //       exportCanvas.width = 1800;
// // //       exportCanvas.height = 1800 / aspectRatio;

// // //       // 1. Draw Clean AI Background
// // //       ctx.drawImage(bgImg, 0, 0, exportCanvas.width, exportCanvas.height);

// // //       // 2. Draw Uploaded Logo Overlay (if present)
// // //       if (logoUrl) {
// // //         const logoImg = new Image();
// // //         logoImg.crossOrigin = "anonymous";
// // //         logoImg.src = logoUrl;
// // //         logoImg.onload = () => {
// // //           const lx = (logoPos.x / 100) * exportCanvas.width;
// // //           const ly = (logoPos.y / 100) * exportCanvas.height;
// // //           const logoWidth = exportCanvas.width * 0.25; // 25% scale
// // //           const logoHeight = logoWidth * (logoImg.naturalHeight / logoImg.naturalWidth);

// // //           ctx.drawImage(logoImg, lx - logoWidth / 2, ly - logoHeight / 2, logoWidth, logoHeight);
// // //           renderTextAndFinalize(exportCanvas, ctx);
// // //         };
// // //         return;
// // //       }

// // //       renderTextAndFinalize(exportCanvas, ctx);
// // //     };
// // //   };

// // //   const renderTextAndFinalize = (
// // //     canvas: HTMLCanvasElement,
// // //     ctx: CanvasRenderingContext2D
// // //   ) => {
// // //     // 3. Draw Dynamic Text Overlay
// // //     if (textOverlay) {
// // //       const tx = (textPos.x / 100) * canvas.width;
// // //       const ty = (textPos.y / 100) * canvas.height;

// // //       // Scale font size relative to export resolution
// // //       const scaledFontSize = Math.round((fontSize / 320) * canvas.width);

// // //       ctx.font = `bold ${scaledFontSize}px ${fontFamily}, sans-serif`;
// // //       ctx.fillStyle = textColor;
// // //       ctx.textAlign = "center";
// // //       ctx.textBaseline = "middle";

// // //       // Draw text
// // //       ctx.fillText(textOverlay, tx, ty);
// // //     }

// // //     // Convert canvas to Data URL and sync back to Shopify
// // //     const finalDataUri = canvas.toDataURL("image/jpeg", 0.95);
// // //     if (window.parent) {
// // //       window.parent.postMessage(
// // //         {
// // //           type: "SET_DESIGN_RESULT",
// // //           imageUrl: finalDataUri,
// // //           textOverlay,
// // //           productSpecs,
// // //         },
// // //         "*"
// // //       );
// // //     }
// // //   };

// // //   const stylePresets = [
// // //     "Bold & High Contrast",
// // //     "Clean & Minimal",
// // //     "Real Estate",
// // //     "Construction",
// // //     "Retail & Sale",
// // //     "Outdoor / Weather Proof",
// // //   ];

// // //   return (
// // //     <div
// // //       className="w-full max-w-xl mx-auto p-4 font-sans space-y-3 bg-white text-gray-900 rounded-xl border border-gray-200 shadow-sm select-none"
// // //       onMouseMove={handleMouseMove}
// // //       onMouseUp={stopDragging}
// // //       onMouseLeave={stopDragging}
// // //     >
// // //       {/* Header Specs Bar */}
// // //       <div className="border-b border-gray-200 pb-2.5 flex items-center justify-between">
// // //         <div>
// // //           <h1 className="text-xs font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// // //           <p className="text-[10px] text-gray-500">
// // //             Specs: {productSpecs.width} x {productSpecs.height} | Thickness: {productSpecs.thickness} | Eyelets: {productSpecs.eyelets}
// // //           </p>
// // //         </div>
// // //         <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
// // //           {remainingAttempts} attempts left
// // //         </span>
// // //       </div>

// // //       {/* Error / Notice Display */}
// // //       {errorNotice && (
// // //         <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-md flex items-center justify-between">
// // //           <span><strong>Notice:</strong> {errorNotice}</span>
// // //           <button onClick={() => setErrorNotice(null)} className="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
// // //         </div>
// // //       )}

// // //       {/* Step 1: Prompt Input */}
// // //       <div className="space-y-1">
// // //         <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
// // //           <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
// // //           Describe Background Theme
// // //         </label>
// // //         <textarea
// // //           rows={2}
// // //           value={prompt}
// // //           onChange={(e) => setPrompt(e.target.value)}
// // //           placeholder="e.g. Modern geometric vector background with blue and yellow accents..."
// // //           className="w-full text-xs p-2.5 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 outline-none resize-none select-text"
// // //         />
// // //       </div>

// // //       {/* Step 2: Select Style Preset */}
// // //       <div className="space-y-1.5">
// // //         <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
// // //           <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
// // //           Select Theme Style
// // //         </label>
// // //         <div className="flex flex-wrap gap-1.5">
// // //           {stylePresets.map((style) => (
// // //             <button
// // //               key={style}
// // //               type="button"
// // //               onClick={() => setSelectedStyle(style)}
// // //               className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
// // //                 selectedStyle === style
// // //                   ? "bg-sky-600 text-white font-bold"
// // //                   : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// // //               }`}
// // //             >
// // //               {style}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Generate Action Button */}
// // //       <button
// // //         type="button"
// // //         onClick={handleGenerate}
// // //         disabled={loading || !prompt || remainingAttempts === 0}
// // //         className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm disabled:opacity-50 transition-all"
// // //       >
// // //         {loading ? "Generating Clean Background..." : "Generate Background Asset"}
// // //       </button>

// // //       {/* Step 3: Interactive Draggable Canvas */}
// // //       {imageUrl && !loading && (
// // //         <div className="bg-white rounded-md border border-gray-200 p-3 space-y-3 shadow-xs mt-3">
// // //           <div className="flex items-center justify-between">
// // //             <div className="flex items-center gap-1.5">
// // //               <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
// // //               <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Interactive Overlay Canvas</h2>
// // //             </div>
// // //             <label className="flex items-center gap-1 text-[10px] font-medium text-gray-600 cursor-pointer">
// // //               <input
// // //                 type="checkbox"
// // //                 checked={showPrintGuides}
// // //                 onChange={(e) => setShowPrintGuides(e.target.checked)}
// // //                 className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
// // //               />
// // //               Bleed Guides
// // //             </label>
// // //           </div>

// // //           {/* Draggable Viewport Box */}
// // //           <div className="bg-gray-50 rounded-md p-2 flex items-center justify-center border border-gray-200">
// // //             <div
// // //               ref={canvasRef}
// // //               className="relative border border-dashed border-gray-300 bg-white rounded overflow-hidden"
// // //               style={{
// // //                 width: "100%",
// // //                 maxWidth: aspectRatio > 1 ? "320px" : `${320 * aspectRatio}px`,
// // //                 aspectRatio: `${aspectRatio}`,
// // //               }}
// // //             >
// // //               {/* Clean AI Background Image */}
// // //               <img
// // //                 src={imageUrl}
// // //                 alt="AI Background"
// // //                 className="w-full h-full object-contain pointer-events-none"
// // //               />

// // //               {/* Print Safe Margin Overlay */}
// // //               {showPrintGuides && (
// // //                 <div className="absolute inset-1.5 border border-dashed border-red-500/70 pointer-events-none flex items-start justify-start p-0.5">
// // //                   <span className="text-[7px] font-bold text-red-600 bg-white/90 px-0.5 rounded">5mm Margin</span>
// // //                 </div>
// // //               )}

// // //               {/* Draggable Logo */}
// // //               {logoUrl && (
// // //                 <div
// // //                   onMouseDown={() => (isDraggingLogo.current = true)}
// // //                   className="absolute cursor-grab active:cursor-grabbing border border-dashed border-sky-400 p-0.5 rounded bg-white/20 hover:border-sky-600"
// // //                   style={{
// // //                     left: `${logoPos.x}%`,
// // //                     top: `${logoPos.y}%`,
// // //                     transform: "translate(-50%, -50%)",
// // //                   }}
// // //                 >
// // //                   <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain pointer-events-none" />
// // //                 </div>
// // //               )}

// // //               {/* Draggable & Editable Text Overlay */}
// // //               {textOverlay && (
// // //                 <div
// // //                   onMouseDown={() => (isDraggingText.current = true)}
// // //                   className="absolute cursor-grab active:cursor-grabbing border border-dashed border-sky-400 hover:border-sky-600 px-2 py-0.5 rounded text-center whitespace-nowrap"
// // //                   style={{
// // //                     left: `${textPos.x}%`,
// // //                     top: `${textPos.y}%`,
// // //                     transform: "translate(-50%, -50%)",
// // //                     color: textColor,
// // //                     fontSize: `${fontSize}px`,
// // //                     fontFamily: fontFamily,
// // //                   }}
// // //                 >
// // //                   <span className="font-bold drop-shadow-xs">{textOverlay}</span>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Text and Control Inputs */}
// // //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-gray-100">
// // //             <div className="bg-gray-50 p-2 rounded space-y-1.5 border border-gray-200">
// // //               <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Edit Sign Wording</h3>
// // //               <input
// // //                 type="text"
// // //                 value={textOverlay}
// // //                 onChange={(e) => setTextOverlay(e.target.value)}
// // //                 placeholder="Enter text here..."
// // //                 className="w-full border border-gray-300 rounded px-2 py-1 text-xs text-gray-900 bg-white focus:outline-none focus:border-sky-500 select-text"
// // //               />
// // //               <div className="flex gap-1.5 items-center">
// // //                 <select
// // //                   value={fontFamily}
// // //                   onChange={(e) => setFontFamily(e.target.value)}
// // //                   className="flex-1 border border-gray-300 rounded px-1.5 py-1 text-[11px] text-gray-800 bg-white"
// // //                 >
// // //                   <option value="Montserrat">Montserrat</option>
// // //                   <option value="Arial">Arial</option>
// // //                   <option value="Impact">Impact</option>
// // //                   <option value="Times New Roman">Times New Roman</option>
// // //                 </select>
// // //                 <input
// // //                   type="color"
// // //                   value={textColor}
// // //                   onChange={(e) => setTextColor(e.target.value)}
// // //                   className="w-7 h-6 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
// // //                   title="Text Color"
// // //                 />
// // //                 <input
// // //                   type="number"
// // //                   value={fontSize}
// // //                   onChange={(e) => setFontSize(Number(e.target.value))}
// // //                   className="w-12 border border-gray-300 rounded px-1 text-[11px] text-center bg-white"
// // //                   min={12}
// // //                   max={72}
// // //                 />
// // //               </div>
// // //             </div>

// // //             {/* Logo Upload Box */}
// // //             <div className="bg-gray-50 p-2 rounded space-y-1.5 border border-gray-200">
// // //               <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Logo Upload</h3>
// // //               <input
// // //                 type="file"
// // //                 accept="image/png, image/jpeg, image/svg+xml"
// // //                 onChange={handleLogoUpload}
// // //                 className="w-full text-[10px] text-gray-600 file:mr-1.5 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer"
// // //               />
// // //               {logoWarning && (
// // //                 <p className="text-[9px] text-amber-800 bg-amber-50 border border-amber-200 p-1 rounded">
// // //                   ⚠️ {logoWarning}
// // //                 </p>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Action Buttons */}
// // //           <div className="flex flex-col sm:flex-row gap-1.5 pt-1">
// // //             <button
// // //               type="button"
// // //               onClick={handleGenerate}
// // //               disabled={remainingAttempts === 0}
// // //               className="flex-1 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// // //             >
// // //               Regenerate Background
// // //             </button>
// // //             <button
// // //               type="button"
// // //               onClick={handleExportDesign}
// // //               className="flex-1 py-1.5 rounded bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white shadow-xs transition-all uppercase tracking-wider"
// // //             >
// // //               Use This Design →
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }


















// // "use client";

// // import React, { useState, useEffect, useRef } from "react";

// // export interface TextElement {
// //   id: string;
// //   text: string;
// //   x: number;
// //   y: number;
// //   fontSize: number;
// //   textColor: string;
// //   fontFamily: string;
// // }

// // export default function DesignerPage() {
// //   // Base State
// //   const [prompt, setPrompt] = useState("");
// //   const [selectedStyle, setSelectedStyle] = useState("Retail & Sale");
// //   const [loading, setLoading] = useState(false);
// //   const [imageUrl, setImageUrl] = useState<string | null>(null);
// //   const [errorNotice, setErrorNotice] = useState<string | null>(null);
// //   const [remainingAttempts, setRemainingAttempts] = useState(3);

// //   // Shopify Product Specs State
// //   const [productSpecs, setProductSpecs] = useState({
// //     width: "450mm",
// //     height: "600mm",
// //     thickness: "5mm",
// //     eyelets: "No",
// //   });

// //   const numericWidth = parseFloat(productSpecs.width) || 450;
// //   const numericHeight = parseFloat(productSpecs.height) || 600;
// //   const aspectRatio = numericWidth / numericHeight;

// //   // Multi-Text State Management (Supports line breaks natively via \n)
// //   const [textElements, setTextElements] = useState<TextElement[]>([
// //     {
// //       id: "text-1",
// //       text: "YOUR TEXT\nOne",
// //       x: 50,
// //       y: 50,
// //       fontSize: 24,
// //       textColor: "#000000",
// //       fontFamily: "Montserrat",
// //     },
// //   ]);
// //   const [selectedTextId, setSelectedTextId] = useState<string>("text-1");

// //   // Draggable Logo Overlay State
// //   const [logoUrl, setLogoUrl] = useState<string | null>(null);
// //   const [logoWarning, setLogoWarning] = useState<string | null>(null);
// //   const [logoPos, setLogoPos] = useState({ x: 15, y: 15 });

// //   // Canvas Print Controls
// //   const [showPrintGuides, setShowPrintGuides] = useState(true);

// //   // References for Drag Handling
// //   const canvasRef = useRef<HTMLDivElement>(null);
// //   const draggingId = useRef<string | null>(null);
// //   const isDraggingLogo = useRef(false);

// //   // Get active text item properties
// //   const activeText = textElements.find((el) => el.id === selectedTextId) || textElements[0];

// //   // Listen for product spec changes sent from Shopify Theme
// //   useEffect(() => {
// //     const handleMessage = (event: MessageEvent) => {
// //       if (event.data?.type === "SET_PRODUCT_SPECS") {
// //         setProductSpecs(event.data.specs);
// //       }
// //     };
// //     window.addEventListener("message", handleMessage);
// //     return () => window.removeEventListener("message", handleMessage);
// //   }, []);


// //   // Inside DesignerPage component in app/designer/page.tsx
// //   const containerRef = useRef<HTMLDivElement>(null);

// //   useEffect(() => {
// //     const sendHeight = () => {
// //       if (containerRef.current && typeof window !== "undefined" && window.parent) {
// //         // Measure explicit pixel height of the inner card container
// //         const cardHeight = Math.ceil(containerRef.current.getBoundingClientRect().height);
        
// //         if (cardHeight > 0) {
// //           window.parent.postMessage({ type: "SET_HEIGHT", height: cardHeight + 10 }, "*");
// //           window.parent.postMessage({ type: "RESIZE_APP_IFRAME", height: cardHeight + 10 }, "*");
// //         }
// //       }
// //     };

// //     sendHeight();

// //     const handleParentMessage = (e: MessageEvent) => {
// //       if (e.data?.type === "REQUEST_HEIGHT_SYNC") {
// //         sendHeight();
// //       }
// //     };

// //     window.addEventListener("message", handleParentMessage);

// //     // ResizeObserver attached directly to card DOM node, NOT body
// //     let observer: ResizeObserver | null = null;
// //     if (containerRef.current) {
// //       observer = new ResizeObserver(() => {
// //         sendHeight();
// //       });
// //       observer.observe(containerRef.current);
// //     }

// //     return () => {
// //       if (observer) observer.disconnect();
// //       window.removeEventListener("message", handleParentMessage);
// //     };
// //   }, [imageUrl, textElements, loading]);




// //   // Handle Text Layer Management
// //   const handleAddTextElement = () => {
// //     const newId = `text-${Date.now()}`;
// //     const newElement: TextElement = {
// //       id: newId,
// //       text: "NEW LINE\nTEXT HERE",
// //       x: 50,
// //       y: Math.min(80, 30 + textElements.length * 10),
// //       fontSize: 20,
// //       textColor: "#000000",
// //       fontFamily: "Montserrat",
// //     };
// //     setTextElements((prev) => [...prev, newElement]);
// //     setSelectedTextId(newId);
// //   };

// //   const handleRemoveTextElement = (id: string) => {
// //     if (textElements.length <= 1) return;
// //     const filtered = textElements.filter((el) => el.id !== id);
// //     setTextElements(filtered);
// //     if (selectedTextId === id) {
// //       setSelectedTextId(filtered[0].id);
// //     }
// //   };

// //   const updateActiveTextProp = <K extends keyof TextElement>(prop: K, value: TextElement[K]) => {
// //     if (!selectedTextId) return;
// //     setTextElements((prev) =>
// //       prev.map((el) => (el.id === selectedTextId ? { ...el, [prop]: value } : el))
// //     );
// //   };

// //   // Handle Logo Upload and Quality Check
// //   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     setLogoWarning(null);
// //     const reader = new FileReader();
// //     reader.onload = (event) => {
// //       const img = new Image();
// //       img.src = event.target?.result as string;
// //       img.onload = () => {
// //         if (img.width < 800 || img.height < 800) {
// //           setLogoWarning(`Low resolution logo (${img.width}x${img.height}px). May appear pixelated when printed.`);
// //         }
// //         setLogoUrl(img.src);
// //       };
// //     };
// //     reader.readAsDataURL(file);
// //   };

// //   // Safe Image URL Payload Extractor
// //   const extractImageUrl = (data: any): string | null => {
// //     if (!data) return null;
// //     if (typeof data === "string" && (data.startsWith("http") || data.startsWith("data:image"))) {
// //       return data;
// //     }
// //     return data.designUrl || data.imageUrl || data.url || data.image || null;
// //   };

// //   // Generation Handler
// //   const handleGenerate = async () => {
// //     if (!prompt.trim()) {
// //       setErrorNotice("Please describe your sign before generating.");
// //       return;
// //     }
// //     if (remainingAttempts <= 0) {
// //       setErrorNotice("Maximum generation limit reached for this session.");
// //       return;
// //     }

// //     setLoading(true);
// //     setErrorNotice(null);

// //     try {
// //       const response = await fetch("/api/generate-design", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           prompt,
// //           style: selectedStyle,
// //           width: numericWidth,
// //           height: numericHeight,
// //         }),
// //       });

// //       const data = await response.json();
// //       if (!response.ok) throw new Error(data.error || "Failed to generate design.");

// //       const receivedUrl = extractImageUrl(data);
// //       if (!receivedUrl) throw new Error("API returned success, but image payload key was missing.");

// //       setImageUrl(receivedUrl);
// //       setRemainingAttempts((prev) => prev - 1);
// //     } catch (err: any) {
// //       setErrorNotice(err.message || "Failed to generate background asset.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Mouse Move Event Listener for Canvas Element Dragging
// //   const handleMouseMove = (e: React.MouseEvent) => {
// //     if (!canvasRef.current) return;
// //     const rect = canvasRef.current.getBoundingClientRect();

// //     const x = Math.min(Math.max(0, ((e.clientX - rect.left) / rect.width) * 100), 100);
// //     const y = Math.min(Math.max(0, ((e.clientY - rect.top) / rect.height) * 100), 100);

// //     if (draggingId.current) {
// //       const activeId = draggingId.current;
// //       setTextElements((prev) =>
// //         prev.map((el) => (el.id === activeId ? { ...el, x, y } : el))
// //       );
// //     } else if (isDraggingLogo.current) {
// //       setLogoPos({ x, y });
// //     }
// //   };

// //   const stopDragging = () => {
// //     draggingId.current = null;
// //     isDraggingLogo.current = false;
// //   };

// //   // Export Design and Composite HTML5 Canvas
// //   const handleExportDesign = () => {
// //     if (!imageUrl) return;

// //     const exportCanvas = document.createElement("canvas");
// //     const ctx = exportCanvas.getContext("2d");
// //     if (!ctx) return;

// //     const bgImg = new Image();
// //     bgImg.crossOrigin = "anonymous";
// //     bgImg.src = imageUrl;

// //     bgImg.onload = () => {
// //       exportCanvas.width = 1800;
// //       exportCanvas.height = 1800 / aspectRatio;

// //       // 1. Draw Clean AI Background
// //       ctx.drawImage(bgImg, 0, 0, exportCanvas.width, exportCanvas.height);

// //       // 2. Draw Logo Overlay (If Present)
// //       if (logoUrl) {
// //         const logoImg = new Image();
// //         logoImg.crossOrigin = "anonymous";
// //         logoImg.src = logoUrl;
// //         logoImg.onload = () => {
// //           const lx = (logoPos.x / 100) * exportCanvas.width;
// //           const ly = (logoPos.y / 100) * exportCanvas.height;
// //           const logoWidth = exportCanvas.width * 0.25;
// //           const logoHeight = logoWidth * (logoImg.naturalHeight / logoImg.naturalWidth);

// //           ctx.drawImage(logoImg, lx - logoWidth / 2, ly - logoHeight / 2, logoWidth, logoHeight);
// //           renderMultiLineTextAndFinalize(exportCanvas, ctx);
// //         };
// //         return;
// //       }

// //       renderMultiLineTextAndFinalize(exportCanvas, ctx);
// //     };
// //   };

// //   const renderMultiLineTextAndFinalize = (
// //     canvas: HTMLCanvasElement,
// //     ctx: CanvasRenderingContext2D
// //   ) => {
// //     // Draw All Dynamic Text Overlays with Multiline Rendering
// //     textElements.forEach((el) => {
// //       if (!el.text.trim()) return;

// //       const tx = (el.x / 100) * canvas.width;
// //       const ty = (el.y / 100) * canvas.height;
// //       const scaledFontSize = Math.round((el.fontSize / 320) * canvas.width);
// //       const lineHeight = scaledFontSize * 1.25;

// //       ctx.font = `bold ${scaledFontSize}px ${el.fontFamily}, sans-serif`;
// //       ctx.fillStyle = el.textColor;
// //       ctx.textAlign = "center";
// //       ctx.textBaseline = "middle";

// //       const lines = el.text.split("\n");
// //       const totalHeight = lines.length * lineHeight;
// //       const startY = ty - totalHeight / 2 + lineHeight / 2;

// //       lines.forEach((line, index) => {
// //         ctx.fillText(line, tx, startY + index * lineHeight);
// //       });
// //     });

// //     // Convert canvas output to JPEG Data URI
// //     const finalDataUri = canvas.toDataURL("image/jpeg", 0.95);

// //     if (typeof window !== "undefined" && window.parent) {
// //       // 1. Direct message to update all Shopify Product Thumbnails & Gallery
// //       window.parent.postMessage(
// //         {
// //           type: "UPDATE_PRODUCT_IMAGE",
// //           imageUrl: finalDataUri,
// //         },
// //         "*"
// //       );

// //       // 2. Transmit complete payload for Shopify Cart / Form attributes
// //       window.parent.postMessage(
// //         {
// //           type: "SET_DESIGN_RESULT",
// //           imageUrl: finalDataUri,
// //           textElements,
// //           productSpecs,
// //         },
// //         "*"
// //       );

// //       // 3. Trigger Fullscreen Lightbox Preview on Shopify Storefront
// //       window.parent.postMessage(
// //         {
// //           type: "OPEN_FULLSCREEN_LIGHTBOX",
// //           imageUrl: finalDataUri,
// //         },
// //         "*"
// //       );
// //     }
// //   };

// //   const stylePresets = [
// //     "Bold & High Contrast",
// //     "Clean & Minimal",
// //     "Real Estate",
// //     "Construction",
// //     "Retail & Sale",
// //     "Outdoor / Weather Proof",
// //   ];

// //   return (
// //     <div ref={containerRef} className="w-full h-fit bg-white p-0 m-0">
// //       <div className="w-full max-w-xl mx-auto p-0 font-sans space-y-3 bg-white text-gray-900 select-none">
// //         <div
// //           className="w-full max-w-xl mx-auto p-4 font-sans space-y-3 bg-white text-gray-900 rounded-xl border border-gray-200 shadow-sm select-none"
// //           onMouseMove={handleMouseMove}
// //           onMouseUp={stopDragging}
// //           onMouseLeave={stopDragging}
// //         >
// //           {/* Header Specs Bar */}
// //           <div className="border-b border-gray-200 pb-2.5 flex items-center justify-between">
// //             <div>
// //               <h1 className="text-xs font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
// //               <p className="text-[10px] text-gray-500">
// //                 Specs: {productSpecs.width} x {productSpecs.height} | Thickness: {productSpecs.thickness} | Eyelets: {productSpecs.eyelets}
// //               </p>
// //             </div>
// //             <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
// //               {remainingAttempts} attempts left
// //             </span>
// //           </div>

// //           {/* Error / Notice Display */}
// //           {errorNotice && (
// //             <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-md flex items-center justify-between">
// //               <span><strong>Notice:</strong> {errorNotice}</span>
// //               <button onClick={() => setErrorNotice(null)} className="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
// //             </div>
// //           )}

// //           {/* Step 1: Prompt Input */}
// //           <div className="space-y-1">
// //             <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
// //               <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
// //               Describe Background Theme
// //             </label>
// //             <textarea
// //               rows={2}
// //               value={prompt}
// //               onChange={(e) => setPrompt(e.target.value)}
// //               placeholder="e.g. Modern geometric vector background with blue and yellow accents..."
// //               className="w-full text-xs p-2.5 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 outline-none resize-none select-text"
// //             />
// //           </div>

// //           {/* Step 2: Select Style Preset */}
// //           <div className="space-y-1.5">
// //             <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
// //               <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
// //               Select Theme Style
// //             </label>
// //             <div className="flex flex-wrap gap-1.5">
// //               {stylePresets.map((style) => (
// //                 <button
// //                   key={style}
// //                   type="button"
// //                   onClick={() => setSelectedStyle(style)}
// //                   className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
// //                     selectedStyle === style
// //                       ? "bg-sky-600 text-white font-bold"
// //                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
// //                   }`}
// //                 >
// //                   {style}
// //                 </button>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Generate Action Button */}
// //           <button
// //             type="button"
// //             onClick={handleGenerate}
// //             disabled={loading || !prompt || remainingAttempts === 0}
// //             className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm disabled:opacity-50 transition-all"
// //           >
// //             {loading ? "Generating Clean Background..." : "Generate Background Asset"}
// //           </button>

// //           {/* Step 3: Interactive Draggable Canvas */}
// //           {imageUrl && !loading && (
// //             <div className="bg-white rounded-md border border-gray-200 p-3 space-y-3 shadow-xs mt-3">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-1.5">
// //                   <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
// //                   <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Interactive Overlay Canvas</h2>
// //                 </div>
// //                 <label className="flex items-center gap-1 text-[10px] font-medium text-gray-600 cursor-pointer">
// //                   <input
// //                     type="checkbox"
// //                     checked={showPrintGuides}
// //                     onChange={(e) => setShowPrintGuides(e.target.checked)}
// //                     className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
// //                   />
// //                   Bleed Guides
// //                 </label>
// //               </div>

// //               {/* Draggable Viewport Box */}
// //               <div className="bg-gray-50 rounded-md p-2 flex items-center justify-center border border-gray-200">
// //                 <div
// //                   ref={canvasRef}
// //                   className="relative border border-dashed border-gray-300 bg-white rounded overflow-hidden"
// //                   style={{
// //                     width: "100%",
// //                     maxWidth: aspectRatio > 1 ? "320px" : `${320 * aspectRatio}px`,
// //                     aspectRatio: `${aspectRatio}`,
// //                   }}
// //                 >
// //                   {/* Clean AI Background Image */}
// //                   <img
// //                     src={imageUrl}
// //                     alt="AI Background"
// //                     className="w-full h-full object-contain pointer-events-none"
// //                   />

// //                   {/* Print Safe Margin Overlay */}
// //                   {showPrintGuides && (
// //                     <div className="absolute inset-1.5 border border-dashed border-red-500/70 pointer-events-none flex items-start justify-start p-0.5">
// //                       <span className="text-[7px] font-bold text-red-600 bg-white/90 px-0.5 rounded">5mm Margin</span>
// //                     </div>
// //                   )}

// //                   {/* Draggable Logo */}
// //                   {logoUrl && (
// //                     <div
// //                       onMouseDown={() => (isDraggingLogo.current = true)}
// //                       className="absolute cursor-grab active:cursor-grabbing border border-dashed border-sky-400 p-0.5 rounded bg-white/20 hover:border-sky-600"
// //                       style={{
// //                         left: `${logoPos.x}%`,
// //                         top: `${logoPos.y}%`,
// //                         transform: "translate(-50%, -50%)",
// //                       }}
// //                     >
// //                       <img src={logoUrl} alt="Logo" className="h-8 w-auto object-contain pointer-events-none" />
// //                     </div>
// //                   )}

// //                   {/* Multi-Text Render Engine (Supports Enter key lines) */}
// //                   {textElements.map((el) => {
// //                     const isSelected = el.id === selectedTextId;
// //                     return (
// //                       <div
// //                         key={el.id}
// //                         onMouseDown={(e) => {
// //                           e.stopPropagation();
// //                           setSelectedTextId(el.id);
// //                           draggingId.current = el.id;
// //                         }}
// //                         className={`absolute cursor-grab active:cursor-grabbing px-2 py-0.5 rounded text-center whitespace-pre-wrap leading-tight transition-all ${
// //                           isSelected
// //                             ? "border border-sky-500 ring-2 ring-sky-400/40 bg-sky-50/20"
// //                             : "border border-dashed border-transparent hover:border-sky-300"
// //                         }`}
// //                         style={{
// //                           left: `${el.x}%`,
// //                           top: `${el.y}%`,
// //                           transform: "translate(-50%, -50%)",
// //                           color: el.textColor,
// //                           fontSize: `${el.fontSize}px`,
// //                           fontFamily: el.fontFamily,
// //                         }}
// //                       >
// //                         <span className="font-bold drop-shadow-xs select-none">{el.text || "Empty Text"}</span>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               {/* Multi-Text & Property Customizer */}
// //               <div className="bg-gray-50 p-2.5 rounded border border-gray-200 space-y-2">
// //                 <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
// //                   <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Manage Text Layers</span>
// //                   <button
// //                     type="button"
// //                     onClick={handleAddTextElement}
// //                     className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded hover:bg-sky-700 transition-all"
// //                   >
// //                     + Add Text Layer
// //                   </button>
// //                 </div>

// //                 {/* Selection Tabs */}
// //                 <div className="flex flex-wrap gap-1">
// //                   {textElements.map((el, idx) => (
// //                     <button
// //                       key={el.id}
// //                       type="button"
// //                       onClick={() => setSelectedTextId(el.id)}
// //                       className={`text-[10px] px-2 py-0.5 rounded font-medium border transition-all ${
// //                         el.id === selectedTextId
// //                           ? "bg-sky-600 text-white border-sky-600 font-bold"
// //                           : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
// //                       }`}
// //                     >
// //                       Text #{idx + 1}
// //                     </button>
// //                   ))}
// //                 </div>

// //                 {/* Controls for Active Text Item */}
// //                 {activeText && (
// //                   <div className="space-y-2 pt-1">
// //                     <div className="flex items-center justify-between">
// //                       <label className="text-[10px] font-bold text-gray-600">Edit Sign Text (Press Enter for New Line)</label>
// //                       {textElements.length > 1 && (
// //                         <button
// //                           type="button"
// //                           onClick={() => handleRemoveTextElement(activeText.id)}
// //                           className="text-[10px] text-red-600 hover:underline font-semibold"
// //                         >
// //                           Delete Layer
// //                         </button>
// //                       )}
// //                     </div>

// //                     <textarea
// //                       rows={2}
// //                       value={activeText.text}
// //                       onChange={(e) => updateActiveTextProp("text", e.target.value)}
// //                       placeholder="Enter text..."
// //                       className="w-full border border-gray-300 rounded p-1.5 text-xs text-gray-900 bg-white focus:ring-2 focus:ring-sky-500 outline-none resize-none select-text"
// //                     />

// //                     <div className="flex gap-1.5 items-center">
// //                       <select
// //                         value={activeText.fontFamily}
// //                         onChange={(e) => updateActiveTextProp("fontFamily", e.target.value)}
// //                         className="flex-1 border border-gray-300 rounded px-1.5 py-1 text-[11px] text-gray-800 bg-white"
// //                       >
// //                         <option value="Montserrat">Montserrat</option>
// //                         <option value="Arial">Arial</option>
// //                         <option value="Impact">Impact</option>
// //                         <option value="Times New Roman">Times New Roman</option>
// //                       </select>
// //                       <input
// //                         type="color"
// //                         value={activeText.textColor}
// //                         onChange={(e) => updateActiveTextProp("textColor", e.target.value)}
// //                         className="w-7 h-6 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
// //                         title="Text Color"
// //                       />
// //                       <input
// //                         type="number"
// //                         value={activeText.fontSize}
// //                         onChange={(e) => updateActiveTextProp("fontSize", Number(e.target.value))}
// //                         className="w-12 border border-gray-300 rounded px-1 text-[11px] text-center bg-white"
// //                         min={10}
// //                         max={72}
// //                       />
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Logo Upload Box */}
// //               <div className="bg-gray-50 p-2 rounded space-y-1.5 border border-gray-200">
// //                 <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Logo Upload</h3>
// //                 <input
// //                   type="file"
// //                   accept="image/png, image/jpeg, image/svg+xml"
// //                   onChange={handleLogoUpload}
// //                   className="w-full text-[10px] text-gray-600 file:mr-1.5 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer"
// //                 />
// //                 {logoWarning && (
// //                   <p className="text-[9px] text-amber-800 bg-amber-50 border border-amber-200 p-1 rounded">
// //                     ⚠️ {logoWarning}
// //                   </p>
// //                 )}
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex flex-col sm:flex-row gap-1.5 pt-1">
// //                 <button
// //                   type="button"
// //                   onClick={handleGenerate}
// //                   disabled={remainingAttempts === 0}
// //                   className="flex-1 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
// //                 >
// //                   Regenerate Background
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={handleExportDesign}
// //                   className="flex-1 py-1.5 rounded bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white shadow-xs transition-all uppercase tracking-wider"
// //                 >
// //                   Use This Design →
// //                 </button>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


























// "use client";

// import React, { useState, useEffect, useRef } from "react";

// export interface TextElement {
//   id: string;
//   text: string;
//   x: number;
//   y: number;
//   fontSize: number;
//   textColor: string;
//   fontFamily: string;
// }

// export default function DesignerPage() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   // Base State
//   const [prompt, setPrompt] = useState("");
//   const [selectedStyle, setSelectedStyle] = useState("Retail & Sale");
//   const [generationMode, setGenerationMode] = useState<"background" | "full">("background");
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [errorNotice, setErrorNotice] = useState<string | null>(null);
//   const [remainingAttempts, setRemainingAttempts] = useState(3);
//   const [localLightboxUrl, setLocalLightboxUrl] = useState<string | null>(null);

//   // Shopify Product Specs State
//   const [productSpecs, setProductSpecs] = useState({
//     width: "450mm",
//     height: "600mm",
//     thickness: "5mm",
//     eyelets: "No",
//   });

//   const numericWidth = parseFloat(productSpecs.width) || 450;
//   const numericHeight = parseFloat(productSpecs.height) || 600;
//   const aspectRatio = numericWidth / numericHeight;

//   // Active Selection Tracking ('text' | 'logo')
//   const [activeSelectionType, setActiveSelectionType] = useState<"text" | "logo">("text");

//   // Multi-Text State Management
//   const [textElements, setTextElements] = useState<TextElement[]>([
//     {
//       id: "text-1",
//       text: "FAMILY DAY\nToday",
//       x: 50,
//       y: 40,
//       fontSize: 22,
//       textColor: "#000000",
//       fontFamily: "Montserrat",
//     },
//   ]);
//   const [selectedTextId, setSelectedTextId] = useState<string>("text-1");

//   // Draggable & Resizable Logo State
//   const [logoUrl, setLogoUrl] = useState<string | null>(null);
//   const [logoWarning, setLogoWarning] = useState<string | null>(null);
//   const [logoPos, setLogoPos] = useState({ x: 50, y: 65 });
//   const [logoSize, setLogoSize] = useState(25);

//   // Canvas Print Controls
//   const [showPrintGuides, setShowPrintGuides] = useState(true);

//   // References for Dragging and Corner Resizing
//   const canvasRef = useRef<HTMLDivElement>(null);
//   const draggingId = useRef<string | null>(null);
//   const isDraggingLogo = useRef(false);
//   const isResizingText = useRef<string | null>(null);
//   const isResizingLogo = useRef(false);
//   const dragStartPos = useRef({ x: 0, y: 0, initialSize: 0 });

//   const activeText = textElements.find((el) => el.id === selectedTextId) || textElements[0];

//   // Auto-Sync Height with Parent Shopify Window
//   useEffect(() => {
//     const sendHeight = () => {
//       if (containerRef.current && typeof window !== "undefined" && window.parent) {
//         const cardHeight = Math.ceil(containerRef.current.getBoundingClientRect().height);
//         if (cardHeight > 0) {
//           window.parent.postMessage({ type: "SET_HEIGHT", height: cardHeight + 10 }, "*");
//           window.parent.postMessage({ type: "RESIZE_APP_IFRAME", height: cardHeight + 10 }, "*");
//         }
//       }
//     };

//     sendHeight();
//     let observer: ResizeObserver | null = null;
//     if (containerRef.current) {
//       observer = new ResizeObserver(sendHeight);
//       observer.observe(containerRef.current);
//     }
//     return () => {
//       if (observer) observer.disconnect();
//     };
//   }, [imageUrl, textElements, loading, activeSelectionType, logoUrl]);

//   // Handle Product Attributes sent from Shopify Storefront
//   useEffect(() => {
//     const handleMessage = (event: MessageEvent) => {
//       if (event.data?.type === "SHOPIFY_ATTRIBUTES_CHANGED") {
//         setProductSpecs({
//           width: `${event.data.width}mm`,
//           height: `${event.data.height}mm`,
//           thickness: event.data.thickness || "5mm",
//           eyelets: event.data.eyelets || "No",
//         });
//       }
//     };
//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, []);

//   const handleAddTextElement = () => {
//     const newId = `text-${Date.now()}`;
//     const newElement: TextElement = {
//       id: newId,
//       text: "NEW LINE\nTEXT HERE",
//       x: 50,
//       y: Math.min(80, 30 + textElements.length * 10),
//       fontSize: 20,
//       textColor: "#000000",
//       fontFamily: "Montserrat",
//     };
//     setTextElements((prev) => [...prev, newElement]);
//     setSelectedTextId(newId);
//     setActiveSelectionType("text");
//   };

//   const handleRemoveActiveElement = () => {
//     if (activeSelectionType === "logo") {
//       setLogoUrl(null);
//       setActiveSelectionType("text");
//     } else if (activeSelectionType === "text" && textElements.length > 1) {
//       const filtered = textElements.filter((el) => el.id !== selectedTextId);
//       setTextElements(filtered);
//       setSelectedTextId(filtered[0].id);
//     }
//   };

//   const updateActiveTextProp = <K extends keyof TextElement>(prop: K, value: TextElement[K]) => {
//     if (!selectedTextId) return;
//     setTextElements((prev) =>
//       prev.map((el) => (el.id === selectedTextId ? { ...el, [prop]: value } : el))
//     );
//   };

//   const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setLogoWarning(null);
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       const img = new Image();
//       img.src = event.target?.result as string;
//       img.onload = () => {
//         if (img.width < 800 || img.height < 800) {
//           setLogoWarning(`Low resolution logo (${img.width}x${img.height}px). May pixelate when printed.`);
//         }
//         setLogoUrl(img.src);
//         setActiveSelectionType("logo");
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleGenerate = async () => {
//     if (!prompt.trim()) {
//       setErrorNotice("Please describe your design vision before generating.");
//       return;
//     }
//     if (remainingAttempts <= 0) {
//       setErrorNotice("Maximum generation limit reached for this session.");
//       return;
//     }

//     setLoading(true);
//     setErrorNotice(null);

//     const formattedPrompt =
//       generationMode === "background"
//         ? `${prompt}, clean vector background pattern, strictly no text, no typography, no letters`
//         : `${prompt}, full promotional sign design with graphic typography`;

//     try {
//       const response = await fetch("/api/generate-design", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           prompt: formattedPrompt,
//           style: selectedStyle,
//           width: numericWidth,
//           height: numericHeight,
//           mode: generationMode,
//         }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Failed to generate design.");

//       const receivedUrl = data.designUrl || data.imageUrl || data.url || data.image;
//       if (!receivedUrl) throw new Error("API returned success but image payload key was missing.");

//       setImageUrl(receivedUrl);
//       setRemainingAttempts((prev) => prev - 1);
//     } catch (err: any) {
//       setErrorNotice(err.message || "Failed to generate background asset.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Drag and Resize Mouse Motion Engine
//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!canvasRef.current) return;
//     const rect = canvasRef.current.getBoundingClientRect();

//     const currentMouseX = e.clientX;

//     if (isResizingText.current) {
//       const deltaX = currentMouseX - dragStartPos.current.x;
//       const fontAdjustment = Math.round(deltaX / 5);
//       const newFontSize = Math.max(10, Math.min(72, dragStartPos.current.initialSize + fontAdjustment));
//       updateActiveTextProp("fontSize", newFontSize);
//       return;
//     }

//     if (isResizingLogo.current) {
//       const deltaX = currentMouseX - dragStartPos.current.x;
//       const sizeAdjustment = Math.round(deltaX / 4);
//       const newLogoSize = Math.max(10, Math.min(60, dragStartPos.current.initialSize + sizeAdjustment));
//       setLogoSize(newLogoSize);
//       return;
//     }

//     const x = Math.min(Math.max(0, ((e.clientX - rect.left) / rect.width) * 100), 100);
//     const y = Math.min(Math.max(0, ((e.clientY - rect.top) / rect.height) * 100), 100);

//     if (draggingId.current) {
//       const activeId = draggingId.current;
//       setTextElements((prev) =>
//         prev.map((el) => (el.id === activeId ? { ...el, x, y } : el))
//       );
//     } else if (isDraggingLogo.current) {
//       setLogoPos({ x, y });
//     }
//   };

//   const stopDragging = () => {
//     draggingId.current = null;
//     isDraggingLogo.current = false;
//     isResizingText.current = null;
//     isResizingLogo.current = false;
//   };

//   const triggerFullscreenLightbox = () => {
//     if (!imageUrl) return;

//     if (typeof window !== "undefined" && window.parent && window.parent !== window) {
//       window.parent.postMessage({ type: "OPEN_FULLSCREEN_LIGHTBOX", imageUrl }, "*");
//     } else {
//       setLocalLightboxUrl(imageUrl);
//     }
//   };

//   const handleExportDesign = () => {
//     if (!imageUrl) return;

//     const exportCanvas = document.createElement("canvas");
//     const ctx = exportCanvas.getContext("2d");
//     if (!ctx) return;

//     const bgImg = new Image();
//     bgImg.crossOrigin = "anonymous";
//     bgImg.src = imageUrl;

//     bgImg.onload = () => {
//       exportCanvas.width = 1800;
//       exportCanvas.height = 1800 / aspectRatio;

//       ctx.drawImage(bgImg, 0, 0, exportCanvas.width, exportCanvas.height);

//       if (logoUrl) {
//         const logoImg = new Image();
//         logoImg.crossOrigin = "anonymous";
//         logoImg.src = logoUrl;
//         logoImg.onload = () => {
//           const lx = (logoPos.x / 100) * exportCanvas.width;
//           const ly = (logoPos.y / 100) * exportCanvas.height;
//           const logoWidth = exportCanvas.width * (logoSize / 100);
//           const logoHeight = logoWidth * (logoImg.naturalHeight / logoImg.naturalWidth);

//           ctx.drawImage(logoImg, lx - logoWidth / 2, ly - logoHeight / 2, logoWidth, logoHeight);
//           finalizeExportCanvas(exportCanvas, ctx);
//         };
//         return;
//       }

//       finalizeExportCanvas(exportCanvas, ctx);
//     };
//   };

//   const finalizeExportCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
//     textElements.forEach((el) => {
//       if (!el.text.trim()) return;

//       const tx = (el.x / 100) * canvas.width;
//       const ty = (el.y / 100) * canvas.height;
//       const scaledFontSize = Math.round((el.fontSize / 320) * canvas.width);
//       const lineHeight = scaledFontSize * 1.25;

//       ctx.font = `bold ${scaledFontSize}px ${el.fontFamily}, sans-serif`;
//       ctx.fillStyle = el.textColor;
//       ctx.textAlign = "center";
//       ctx.textBaseline = "middle";

//       const lines = el.text.split("\n");
//       const totalHeight = lines.length * lineHeight;
//       const startY = ty - totalHeight / 2 + lineHeight / 2;

//       lines.forEach((line, index) => {
//         ctx.fillText(line, tx, startY + index * lineHeight);
//       });
//     });

//     const finalDataUri = canvas.toDataURL("image/jpeg", 0.95);
//     if (typeof window !== "undefined" && window.parent) {
//       window.parent.postMessage({ type: "UPDATE_PRODUCT_IMAGE", imageUrl: finalDataUri }, "*");
//       window.parent.postMessage({ type: "SET_DESIGN_RESULT", imageUrl: finalDataUri, textElements, productSpecs }, "*");
//       window.parent.postMessage({ type: "OPEN_FULLSCREEN_LIGHTBOX", imageUrl: finalDataUri }, "*");
//     }
//   };

//   const stylePresets = [
//     "Bold & High Contrast",
//     "Clean & Minimal",
//     "Real Estate",
//     "Construction",
//     "Retail & Sale",
//     "Outdoor / Weather Proof",
//   ];

//   return (
//     <div ref={containerRef} className="w-full h-fit bg-white p-2">
//       <div
//         className="w-full max-w-xl mx-auto p-4 font-sans space-y-3 bg-white text-gray-900 rounded-xl border border-gray-200 shadow-sm select-none"
//         onMouseMove={handleMouseMove}
//         onMouseUp={stopDragging}
//         onMouseLeave={stopDragging}
//       >
//         {/* Header Specs Bar */}
//         <div className="border-b border-gray-200 pb-2.5 flex items-center justify-between">
//           <div>
//             <h1 className="text-xs font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
//             <p className="text-[10px] text-gray-500">
//               Specs: {productSpecs.width} x {productSpecs.height} | Thickness: {productSpecs.thickness} | Eyelets: {productSpecs.eyelets}
//             </p>
//           </div>
//           <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
//             {remainingAttempts} attempts left
//           </span>
//         </div>

//         {errorNotice && (
//           <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-md flex items-center justify-between">
//             <span><strong>Notice:</strong> {errorNotice}</span>
//             <button onClick={() => setErrorNotice(null)} className="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
//           </div>
//         )}

//         {/* Step 1: Mode Switch & Prompt Input */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
//               <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
//               Generation Mode
//             </label>
//             <div className="flex bg-gray-100 p-0.5 rounded-md border border-gray-200">
//               <button
//                 type="button"
//                 onClick={() => setGenerationMode("background")}
//                 className={`text-[10px] px-2.5 py-1 rounded font-semibold transition-all ${
//                   generationMode === "background" ? "bg-white text-sky-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 Background Only
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setGenerationMode("full")}
//                 className={`text-[10px] px-2.5 py-1 rounded font-semibold transition-all ${
//                   generationMode === "full" ? "bg-white text-sky-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
//                 }`}
//               >
//                 Full AI Sign
//               </button>
//             </div>
//           </div>

//           <textarea
//             rows={2}
//             value={prompt}
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder={
//               generationMode === "background"
//                 ? "Describe clean background graphics (e.g., modern yellow & black geometric pattern)..."
//                 : "Describe full sign layout with graphics and built-in typography..."
//             }
//             className="w-full text-xs p-2.5 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 outline-none resize-none select-text"
//           />
//         </div>

//         {/* Step 2: Theme Preset */}
//         <div className="space-y-1.5">
//           <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
//             <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
//             Select Theme Style
//           </label>
//           <div className="flex flex-wrap gap-1.5">
//             {stylePresets.map((style) => (
//               <button
//                 key={style}
//                 type="button"
//                 onClick={() => setSelectedStyle(style)}
//                 className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${
//                   selectedStyle === style
//                     ? "bg-sky-600 text-white font-bold"
//                     : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//               >
//                 {style}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Generate Button */}
//         <button
//           type="button"
//           onClick={handleGenerate}
//           disabled={loading || !prompt || remainingAttempts === 0}
//           className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm disabled:opacity-50 transition-all cursor-pointer"
//         >
//           {loading
//             ? "Generating Artwork..."
//             : generationMode === "background"
//             ? "Generate Background Asset"
//             : "Generate Full AI Sign"}
//         </button>

//         {/* Step 3: Interactive Canvas Editor */}
//         {imageUrl && !loading && (
//           <div className="bg-white rounded-md border border-gray-200 p-3 space-y-3 shadow-xs mt-3">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-1.5">
//                 <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
//                 <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Interactive Overlay Canvas</h2>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={triggerFullscreenLightbox}
//                   className="text-[10px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded hover:bg-sky-100 transition-all cursor-pointer"
//                 >
//                   🔍 View Fullscreen
//                 </button>
//                 <label className="flex items-center gap-1 text-[10px] font-medium text-gray-600 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={showPrintGuides}
//                     onChange={(e) => setShowPrintGuides(e.target.checked)}
//                     className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
//                   />
//                   Bleed Guides
//                 </label>
//               </div>
//             </div>

//             {/* Centered Outer Canvas Wrapper */}
//             <div className="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center border border-gray-200 relative w-full overflow-hidden">
//               {/* Top Width Indicator */}
//               <div className="text-center pb-2 font-bold text-[10px] text-gray-600 flex items-center justify-center gap-2">
//                 <span className="h-px w-10 bg-gray-400"></span>
//                 <span>Width: {productSpecs.width}</span>
//                 <span className="h-px w-10 bg-gray-400"></span>
//               </div>

//               {/* Grid Layout to Center Canvas Perfectly with Side Spacers */}
//               <div className="grid grid-cols-[auto_1fr_auto] items-center justify-items-center w-full max-w-md gap-2">
//                 {/* Left Height Indicator */}
//                 <div className="flex items-center justify-center h-full">
//                   <span className="text-[10px] font-bold text-gray-600 -rotate-90 whitespace-nowrap select-none">
//                     Height: {productSpecs.height}
//                   </span>
//                 </div>

//                 {/* Aspect-Ratio Locked Viewport */}
//                 <div className="w-full flex justify-center items-center">
//                   <div
//                     ref={canvasRef}
//                     className="relative border border-solid border-gray-300 bg-white rounded shadow-sm overflow-hidden"
//                     style={{
//                       width: "100%",
//                       maxWidth: aspectRatio > 1 ? "280px" : `${280 * aspectRatio}px`,
//                       aspectRatio: `${aspectRatio}`,
//                     }}
//                   >
//                     <img src={imageUrl} alt="AI Background" className="w-full h-full object-contain pointer-events-none" />

//                     {showPrintGuides && (
//                       <div className="absolute inset-1.5 border border-dashed border-red-500/70 pointer-events-none flex items-start justify-start p-0.5">
//                         <span className="text-[7px] font-bold text-red-600 bg-white/90 px-0.5 rounded">5mm Safe Margin</span>
//                       </div>
//                     )}

//                     {/* Resizable & Draggable Logo Overlay */}
//                     {logoUrl && (
//                       <div
//                         onMouseDown={(e) => {
//                           e.stopPropagation();
//                           setActiveSelectionType("logo");
//                           isDraggingLogo.current = true;
//                         }}
//                         className={`absolute cursor-grab active:cursor-grabbing p-1 rounded ${
//                           activeSelectionType === "logo" ? "border-2 border-sky-500 ring-2 ring-sky-300/40" : "border border-dashed border-sky-400"
//                         }`}
//                         style={{
//                           left: `${logoPos.x}%`,
//                           top: `${logoPos.y}%`,
//                           width: `${logoSize}%`,
//                           transform: "translate(-50%, -50%)",
//                         }}
//                       >
//                         <img src={logoUrl} alt="Logo" className="w-full h-auto object-contain pointer-events-none" />
//                         {activeSelectionType === "logo" && (
//                           <div
//                             onMouseDown={(e) => {
//                               e.stopPropagation();
//                               isResizingLogo.current = true;
//                               dragStartPos.current = { x: e.clientX, y: e.clientY, initialSize: logoSize };
//                             }}
//                             className="absolute -right-1.5 -bottom-1.5 w-3.5 h-3.5 bg-sky-600 border border-white rounded-full cursor-se-resize shadow-md"
//                             title="Drag to resize logo"
//                           />
//                         )}
//                       </div>
//                     )}

//                     {/* Multi-Text Overlays */}
//                     {textElements.map((el) => {
//                       const isSelected = el.id === selectedTextId && activeSelectionType === "text";
//                       return (
//                         <div
//                           key={el.id}
//                           onMouseDown={(e) => {
//                             e.stopPropagation();
//                             setSelectedTextId(el.id);
//                             setActiveSelectionType("text");
//                             draggingId.current = el.id;
//                           }}
//                           className={`absolute cursor-grab active:cursor-grabbing px-2 py-0.5 rounded text-center whitespace-pre-wrap leading-tight transition-all ${
//                             isSelected
//                               ? "border-2 border-sky-500 ring-2 ring-sky-300/40 bg-sky-50/20"
//                               : "border border-dashed border-transparent hover:border-sky-300"
//                           }`}
//                           style={{
//                             left: `${el.x}%`,
//                             top: `${el.y}%`,
//                             transform: "translate(-50%, -50%)",
//                             color: el.textColor,
//                             fontSize: `${el.fontSize}px`,
//                             fontFamily: el.fontFamily,
//                           }}
//                         >
//                           <span className="font-bold drop-shadow-xs select-none">{el.text || "Empty Text"}</span>
//                           {isSelected && (
//                             <div
//                               onMouseDown={(e) => {
//                                 e.stopPropagation();
//                                 isResizingText.current = el.id;
//                                 dragStartPos.current = { x: e.clientX, y: e.clientY, initialSize: el.fontSize };
//                               }}
//                               className="absolute -right-1.5 -bottom-1.5 w-3.5 h-3.5 bg-sky-600 border border-white rounded-full cursor-se-resize shadow-md"
//                               title="Drag to resize text font"
//                             />
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Right Balance Spacer to Maintain Center */}
//                 <div className="w-4"></div>
//               </div>
//             </div>

//             {/* Customizer Panel */}
//             <div className="bg-gray-50 p-2.5 rounded border border-gray-200 space-y-2">
//               <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
//                 <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Manage Canvas Overlays</span>
//                 <div className="flex gap-1.5">
//                   <button
//                     type="button"
//                     onClick={handleRemoveActiveElement}
//                     className="text-[10px] bg-red-50 text-red-600 border border-red-200 font-bold px-2 py-0.5 rounded hover:bg-red-100 transition-all cursor-pointer"
//                   >
//                     Delete {activeSelectionType === "logo" ? "Logo" : "Text"}
//                   </button>
//                   <button
//                     type="button"
//                     onClick={handleAddTextElement}
//                     className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded hover:bg-sky-700 transition-all cursor-pointer"
//                   >
//                     + Add Text Layer
//                   </button>
//                 </div>
//               </div>

//               {/* Layer Selection Tabs */}
//               <div className="flex flex-wrap gap-1">
//                 {textElements.map((el, idx) => (
//                   <button
//                     key={el.id}
//                     type="button"
//                     onClick={() => {
//                       setSelectedTextId(el.id);
//                       setActiveSelectionType("text");
//                     }}
//                     className={`text-[10px] px-2 py-0.5 rounded font-medium border transition-all cursor-pointer ${
//                       el.id === selectedTextId && activeSelectionType === "text"
//                         ? "bg-sky-600 text-white border-sky-600 font-bold"
//                         : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                     }`}
//                   >
//                     Text #{idx + 1}
//                   </button>
//                 ))}
//                 {logoUrl && (
//                   <button
//                     type="button"
//                     onClick={() => setActiveSelectionType("logo")}
//                     className={`text-[10px] px-2 py-0.5 rounded font-medium border transition-all cursor-pointer ${
//                       activeSelectionType === "logo"
//                         ? "bg-sky-600 text-white border-sky-600 font-bold"
//                         : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//                     }`}
//                   >
//                     Logo Layer
//                   </button>
//                 )}
//               </div>

//               {/* Active Text Controls */}
//               {activeSelectionType === "text" && activeText && (
//                 <div className="space-y-2 pt-1">
//                   <label className="text-[10px] font-bold text-gray-600">Edit Selected Text (Enter = line break)</label>
//                   <textarea
//                     rows={2}
//                     value={activeText.text}
//                     onChange={(e) => updateActiveTextProp("text", e.target.value)}
//                     placeholder="Enter sign text..."
//                     className="w-full border border-gray-300 rounded p-1.5 text-xs text-gray-900 bg-white focus:ring-2 focus:ring-sky-500 outline-none resize-none select-text"
//                   />
//                   <div className="flex gap-1.5 items-center">
//                     <select
//                       value={activeText.fontFamily}
//                       onChange={(e) => updateActiveTextProp("fontFamily", e.target.value)}
//                       className="flex-1 border border-gray-300 rounded px-1.5 py-1 text-[11px] text-gray-800 bg-white"
//                     >
//                       <option value="Montserrat">Montserrat</option>
//                       <option value="Arial">Arial</option>
//                       <option value="Impact">Impact</option>
//                       <option value="Times New Roman">Times New Roman</option>
//                     </select>
//                     <input
//                       type="color"
//                       value={activeText.textColor}
//                       onChange={(e) => updateActiveTextProp("textColor", e.target.value)}
//                       className="w-7 h-6 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
//                       title="Text Color"
//                     />
//                     <input
//                       type="number"
//                       value={activeText.fontSize}
//                       onChange={(e) => updateActiveTextProp("fontSize", Number(e.target.value))}
//                       className="w-12 border border-gray-300 rounded px-1 text-[11px] text-center bg-white"
//                       min={10}
//                       max={72}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Logo Upload Container */}
//             <div className="bg-gray-50 p-2 rounded space-y-1.5 border border-gray-200">
//               <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Logo Upload</h3>
//               <input
//                 type="file"
//                 accept="image/png, image/jpeg, image/svg+xml"
//                 onChange={handleLogoUpload}
//                 className="w-full text-[10px] text-gray-600 file:mr-1.5 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer"
//               />
//               {logoWarning && (
//                 <p className="text-[9px] text-amber-800 bg-amber-50 border border-amber-200 p-1 rounded">
//                   ⚠️ {logoWarning}
//                 </p>
//               )}
//             </div>

//             {/* Final Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-1.5 pt-1">
//               <button
//                 type="button"
//                 onClick={handleGenerate}
//                 disabled={remainingAttempts === 0}
//                 className="flex-1 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all cursor-pointer"
//               >
//                 Regenerate Background
//               </button>
//               <button
//                 type="button"
//                 onClick={handleExportDesign}
//                 className="flex-1 py-1.5 rounded bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white shadow-xs transition-all uppercase tracking-wider cursor-pointer"
//               >
//                 Use This Design →
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Localhost Fullscreen Lightbox Fallback */}
//       {localLightboxUrl && (
//         <div
//           onClick={() => setLocalLightboxUrl(null)}
//           className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
//         >
//           <div className="relative max-w-2xl max-h-[90vh] bg-white rounded-xl p-3 shadow-2xl flex flex-col items-center">
//             <button
//               onClick={() => setLocalLightboxUrl(null)}
//               className="absolute top-2 right-2 bg-sky-600 text-white w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center"
//             >
//               ✕
//             </button>
//             <img src={localLightboxUrl} alt="Fullscreen Preview" className="max-h-[80vh] w-auto rounded object-contain" />
//             <span className="text-xs text-gray-500 font-medium mt-2">Click anywhere to dismiss</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






















































"use client";

import React, { useState, useEffect, useRef } from "react";

export interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  textColor: string;
  fontFamily: string;
}

export default function DesignerPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // State
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Retail & Sale");
  const [generationMode, setGenerationMode] = useState<"background" | "full">("background");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState(3);
  const [localLightboxUrl, setLocalLightboxUrl] = useState<string | null>(null);

  // Shopify Attributes
  const [productSpecs, setProductSpecs] = useState({
    width: "600mm",
    height: "900mm",
    thickness: "5mm",
    eyelets: "No",
  });

  const numericWidth = parseFloat(productSpecs.width) || 600;
  const numericHeight = parseFloat(productSpecs.height) || 900;
  const aspectRatio = numericWidth / numericHeight;

  // Active Overlay Trackers
  const [activeSelectionType, setActiveSelectionType] = useState<"text" | "logo">("text");

  // Multi-Text State
  const [textElements, setTextElements] = useState<TextElement[]>([
    {
      id: "text-1",
      text: "SALE\nTODAY",
      x: 50,
      y: 40,
      fontSize: 22,
      textColor: "#000000",
      fontFamily: "Montserrat",
    },
  ]);
  const [selectedTextId, setSelectedTextId] = useState<string>("text-1");

  // Logo Overlay State
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoWarning, setLogoWarning] = useState<string | null>(null);
  const [logoPos, setLogoPos] = useState({ x: 50, y: 70 });
  const [logoSize, setLogoSize] = useState(25);

  const [showPrintGuides, setShowPrintGuides] = useState(true);

  // Dragging & Resizing References
  const canvasRef = useRef<HTMLDivElement>(null);
  const draggingId = useRef<string | null>(null);
  const isDraggingLogo = useRef(false);
  const isResizingText = useRef<string | null>(null);
  const isResizingLogo = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0, initialSize: 0 });

  const activeText = textElements.find((el) => el.id === selectedTextId) || textElements[0];

  // Post Height Sync to Shopify Parent
  const sendHeight = () => {
    if (containerRef.current && typeof window !== "undefined" && window.parent) {
      const cardHeight = Math.ceil(containerRef.current.getBoundingClientRect().height);
      if (cardHeight > 0) {
        window.parent.postMessage({ type: "SET_HEIGHT", height: cardHeight + 15 }, "*");
        window.parent.postMessage({ type: "RESIZE_APP_IFRAME", height: cardHeight + 15 }, "*");
      }
    }
  };

  useEffect(() => {
    sendHeight();
    let observer: ResizeObserver | null = null;
    if (containerRef.current) {
      observer = new ResizeObserver(sendHeight);
      observer.observe(containerRef.current);
    }
    return () => observer?.disconnect();
  }, [imageUrl, textElements, loading, activeSelectionType, logoUrl, generationMode]);

  // Handle Parent Shopify Attribute Sync
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "SHOPIFY_ATTRIBUTES_CHANGED") {
        setProductSpecs({
          width: `${event.data.width}mm`,
          height: `${event.data.height}mm`,
          thickness: event.data.thickness || "5mm",
          eyelets: event.data.eyelets || "No",
        });
      } else if (event.data?.type === "REQUEST_HEIGHT_SYNC") {
        sendHeight();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleAddTextElement = () => {
    const newId = `text-${Date.now()}`;
    const newElement: TextElement = {
      id: newId,
      text: "NEW LINE\nTEXT HERE",
      x: 50,
      y: Math.min(80, 30 + textElements.length * 10),
      fontSize: 20,
      textColor: "#000000",
      fontFamily: "Montserrat",
    };
    setTextElements((prev) => [...prev, newElement]);
    setSelectedTextId(newId);
    setActiveSelectionType("text");
  };

  const handleRemoveActiveElement = () => {
    if (activeSelectionType === "logo") {
      setLogoUrl(null);
      setActiveSelectionType("text");
    } else if (activeSelectionType === "text" && textElements.length > 1) {
      const filtered = textElements.filter((el) => el.id !== selectedTextId);
      setTextElements(filtered);
      setSelectedTextId(filtered[0].id);
    }
  };

  const updateActiveTextProp = <K extends keyof TextElement>(prop: K, value: TextElement[K]) => {
    if (!selectedTextId) return;
    setTextElements((prev) =>
      prev.map((el) => (el.id === selectedTextId ? { ...el, [prop]: value } : el))
    );
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoWarning(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        if (img.width < 800 || img.height < 800) {
          setLogoWarning(`Low resolution image (${img.width}x${img.height}px). May pixelate when printed.`);
        }
        setLogoUrl(img.src);
        setActiveSelectionType("logo");
      };
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setErrorNotice("Please enter design instructions before generating.");
      return;
    }
    if (remainingAttempts <= 0) {
      setErrorNotice("Maximum generation limit reached for this session.");
      return;
    }

    setLoading(true);
    setErrorNotice(null);

    try {
      const response = await fetch("/api/generate-design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt,
          style: selectedStyle,
          width: numericWidth,
          height: numericHeight,
          mode: generationMode,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate design.");

      const receivedUrl = data.designUrl || data.imageUrl;
      if (!receivedUrl) throw new Error("API returned success but image payload key was missing.");

      setImageUrl(receivedUrl);
      setRemainingAttempts((prev) => prev - 1);
    } catch (err: any) {
      setErrorNotice(err.message || "Failed to generate design.");
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current || generationMode === "full") return;
    const rect = canvasRef.current.getBoundingClientRect();
    const currentMouseX = e.clientX;

    if (isResizingText.current) {
      const deltaX = currentMouseX - dragStartPos.current.x;
      const fontAdjustment = Math.round(deltaX / 5);
      const newFontSize = Math.max(10, Math.min(72, dragStartPos.current.initialSize + fontAdjustment));
      updateActiveTextProp("fontSize", newFontSize);
      return;
    }

    if (isResizingLogo.current) {
      const deltaX = currentMouseX - dragStartPos.current.x;
      const sizeAdjustment = Math.round(deltaX / 4);
      const newLogoSize = Math.max(10, Math.min(60, dragStartPos.current.initialSize + sizeAdjustment));
      setLogoSize(newLogoSize);
      return;
    }

    const x = Math.min(Math.max(0, ((e.clientX - rect.left) / rect.width) * 100), 100);
    const y = Math.min(Math.max(0, ((e.clientY - rect.top) / rect.height) * 100), 100);

    if (draggingId.current) {
      const activeId = draggingId.current;
      setTextElements((prev) =>
        prev.map((el) => (el.id === activeId ? { ...el, x, y } : el))
      );
    } else if (isDraggingLogo.current) {
      setLogoPos({ x, y });
    }
  };

  const stopDragging = () => {
    draggingId.current = null;
    isDraggingLogo.current = false;
    isResizingText.current = null;
    isResizingLogo.current = false;
  };

  const triggerFullscreenLightbox = () => {
    if (!imageUrl) return;

    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      window.parent.postMessage({ type: "OPEN_FULLSCREEN_LIGHTBOX", imageUrl }, "*");
    } else {
      setLocalLightboxUrl(imageUrl);
    }
  };

  const handleExportDesign = () => {
    if (!imageUrl) return;

    if (generationMode === "full") {
      if (typeof window !== "undefined" && window.parent) {
        window.parent.postMessage({ type: "UPDATE_PRODUCT_IMAGE", imageUrl }, "*");
        window.parent.postMessage({ type: "SET_DESIGN_RESULT", imageUrl, productSpecs }, "*");
        window.parent.postMessage({ type: "OPEN_FULLSCREEN_LIGHTBOX", imageUrl }, "*");
      }
      return;
    }

    const exportCanvas = document.createElement("canvas");
    const ctx = exportCanvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.src = imageUrl;

    bgImg.onload = () => {
      exportCanvas.width = 1800;
      exportCanvas.height = 1800 / aspectRatio;

      ctx.drawImage(bgImg, 0, 0, exportCanvas.width, exportCanvas.height);

      if (logoUrl) {
        const logoImg = new Image();
        logoImg.crossOrigin = "anonymous";
        logoImg.src = logoUrl;
        logoImg.onload = () => {
          const lx = (logoPos.x / 100) * exportCanvas.width;
          const ly = (logoPos.y / 100) * exportCanvas.height;
          const logoWidth = exportCanvas.width * (logoSize / 100);
          const logoHeight = logoWidth * (logoImg.naturalHeight / logoImg.naturalWidth);

          ctx.drawImage(logoImg, lx - logoWidth / 2, ly - logoHeight / 2, logoWidth, logoHeight);
          finalizeExportCanvas(exportCanvas, ctx);
        };
        return;
      }

      finalizeExportCanvas(exportCanvas, ctx);
    };
  };

  const finalizeExportCanvas = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    textElements.forEach((el) => {
      if (!el.text.trim()) return;

      const tx = (el.x / 100) * canvas.width;
      const ty = (el.y / 100) * canvas.height;
      const scaledFontSize = Math.round((el.fontSize / 320) * canvas.width);
      const lineHeight = scaledFontSize * 1.25;

      ctx.font = `bold ${scaledFontSize}px ${el.fontFamily}, sans-serif`;
      ctx.fillStyle = el.textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const lines = el.text.split("\n");
      const totalHeight = lines.length * lineHeight;
      const startY = ty - totalHeight / 2 + lineHeight / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, tx, startY + index * lineHeight);
      });
    });

    const finalDataUri = canvas.toDataURL("image/jpeg", 0.95);
    if (typeof window !== "undefined" && window.parent) {
      window.parent.postMessage({ type: "UPDATE_PRODUCT_IMAGE", imageUrl: finalDataUri }, "*");
      window.parent.postMessage({ type: "SET_DESIGN_RESULT", imageUrl: finalDataUri, textElements, productSpecs }, "*");
      window.parent.postMessage({ type: "OPEN_FULLSCREEN_LIGHTBOX", imageUrl: finalDataUri }, "*");
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
    <div ref={containerRef} className="w-full h-fit bg-white p-2">
      <div
        className="w-full max-w-xl mx-auto p-4 font-sans space-y-3 bg-white text-gray-900 rounded-xl border border-gray-200 shadow-sm select-none"
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        {/* Header Specs */}
        <div className="border-b border-gray-200 pb-2.5 flex items-center justify-between">
          <div>
            <h1 className="text-xs font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
            <p className="text-[10px] text-gray-500">
              Specs: {productSpecs.width} x {productSpecs.height} | Thickness: {productSpecs.thickness} | Eyelets: {productSpecs.eyelets}
            </p>
          </div>
          <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
            {remainingAttempts} attempts left
          </span>
        </div>

        {errorNotice && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-md flex items-center justify-between">
            <span><strong>Notice:</strong> {errorNotice}</span>
            <button onClick={() => setErrorNotice(null)} className="text-red-500 hover:text-red-700 font-bold ml-2">✕</button>
          </div>
        )}

        {/* Mode Selector & Prompt Input */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
              Generation Mode
            </label>
            <div className="flex bg-gray-100 p-0.5 rounded-md border border-gray-200">
              <button
                type="button"
                onClick={() => setGenerationMode("background")}
                className={`text-[10px] px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  generationMode === "background" ? "bg-white text-sky-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Background Only
              </button>
              <button
                type="button"
                onClick={() => setGenerationMode("full")}
                className={`text-[10px] px-2.5 py-1 rounded font-semibold transition-all cursor-pointer ${
                  generationMode === "full" ? "bg-white text-sky-700 shadow-xs" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Full AI Sign
              </button>
            </div>
          </div>

          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              generationMode === "background"
                ? "Describe background artwork (e.g., modern yellow & black geometric diagonal pattern)..."
                : "Enter complete details to render on sign (e.g., Dr Stephen, California, Hours: 8 AM - 3 PM, Call: +123456789)..."
            }
            className="w-full text-xs p-2.5 bg-white text-gray-900 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 outline-none resize-none select-text"
          />
        </div>

        {/* Theme Styles */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
            Select Theme Style
          </label>
          <div className="flex flex-wrap gap-1.5">
            {stylePresets.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => setSelectedStyle(style)}
                className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
                  selectedStyle === style
                    ? "bg-sky-600 text-white font-bold"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading || !prompt || remainingAttempts === 0}
          className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm disabled:opacity-50 transition-all cursor-pointer"
        >
          {loading
            ? "Generating Artwork..."
            : generationMode === "background"
            ? "Generate Background Asset"
            : "Generate Full AI Sign"}
        </button>

        {/* Canvas & Editor Workspace */}
        {imageUrl && !loading && (
          <div className="bg-white rounded-md border border-gray-200 p-3 space-y-3 shadow-xs mt-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="bg-sky-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                <h2 className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">
                  {generationMode === "background" ? "Interactive Overlay Canvas" : "Full AI Sign Preview"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={triggerFullscreenLightbox}
                  className="text-[10px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded hover:bg-sky-100 transition-all cursor-pointer"
                >
                  🔍 View Fullscreen
                </button>
                <label className="flex items-center gap-1 text-[10px] font-medium text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPrintGuides}
                    onChange={(e) => setShowPrintGuides(e.target.checked)}
                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                  />
                  Bleed Guides
                </label>
              </div>
            </div>

            {/* Canvas Outer Wrapper */}
            <div className="bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center border border-gray-200 relative w-full overflow-hidden">
              <div className="text-center pb-2 font-bold text-[10px] text-gray-600 flex items-center justify-center gap-2">
                <span className="h-px w-10 bg-gray-400"></span>
                <span>Width: {productSpecs.width}</span>
                <span className="h-px w-10 bg-gray-400"></span>
              </div>

              <div className="grid grid-cols-[auto_1fr_auto] items-center justify-items-center w-full max-w-md gap-2">
                <div className="flex items-center justify-center h-full">
                  <span className="text-[10px] font-bold text-gray-600 -rotate-90 whitespace-nowrap select-none">
                    Height: {productSpecs.height}
                  </span>
                </div>

                <div className="w-full flex justify-center items-center">
                  <div
                    ref={canvasRef}
                    className="relative border border-solid border-gray-300 bg-white rounded shadow-sm overflow-hidden"
                    style={{
                      width: "100%",
                      maxWidth: aspectRatio > 1 ? "280px" : `${280 * aspectRatio}px`,
                      aspectRatio: `${aspectRatio}`,
                    }}
                  >
                    <img src={imageUrl} alt="AI Artwork" className="w-full h-full object-contain pointer-events-none" />

                    {showPrintGuides && (
                      <div className="absolute inset-1.5 border border-dashed border-red-500/70 pointer-events-none flex items-start justify-start p-0.5">
                        <span className="text-[7px] font-bold text-red-600 bg-white/90 px-0.5 rounded">5mm Safe Margin</span>
                      </div>
                    )}

                    {generationMode === "background" && (
                      <>
                        {/* Draggable Logo */}
                        {logoUrl && (
                          <div
                            onMouseDown={(e) => {
                              e.stopPropagation();
                              setActiveSelectionType("logo");
                              isDraggingLogo.current = true;
                            }}
                            className={`absolute cursor-grab active:cursor-grabbing p-1 rounded ${
                              activeSelectionType === "logo" ? "border-2 border-sky-500 ring-2 ring-sky-300/40" : "border border-dashed border-sky-400"
                            }`}
                            style={{
                              left: `${logoPos.x}%`,
                              top: `${logoPos.y}%`,
                              width: `${logoSize}%`,
                              transform: "translate(-50%, -50%)",
                            }}
                          >
                            <img src={logoUrl} alt="Logo Layer" className="w-full h-auto object-contain pointer-events-none" />
                            {activeSelectionType === "logo" && (
                              <div
                                onMouseDown={(e) => {
                                  e.stopPropagation();
                                  isResizingLogo.current = true;
                                  dragStartPos.current = { x: e.clientX, y: e.clientY, initialSize: logoSize };
                                }}
                                className="absolute -right-1.5 -bottom-1.5 w-3.5 h-3.5 bg-sky-600 border border-white rounded-full cursor-se-resize shadow-md"
                              />
                            )}
                          </div>
                        )}

                        {/* Multi Text Overlays */}
                        {textElements.map((el) => {
                          const isSelected = el.id === selectedTextId && activeSelectionType === "text";
                          return (
                            <div
                              key={el.id}
                              onMouseDown={(e) => {
                                e.stopPropagation();
                                setSelectedTextId(el.id);
                                setActiveSelectionType("text");
                                draggingId.current = el.id;
                              }}
                              className={`absolute cursor-grab active:cursor-grabbing px-2 py-0.5 rounded text-center whitespace-pre-wrap leading-tight transition-all ${
                                isSelected
                                  ? "border-2 border-sky-500 ring-2 ring-sky-300/40 bg-sky-50/20"
                                  : "border border-dashed border-transparent hover:border-sky-300"
                              }`}
                              style={{
                                left: `${el.x}%`,
                                top: `${el.y}%`,
                                transform: "translate(-50%, -50%)",
                                color: el.textColor,
                                fontSize: `${el.fontSize}px`,
                                fontFamily: el.fontFamily,
                              }}
                            >
                              <span className="font-bold drop-shadow-xs select-none">{el.text || "Empty Text"}</span>
                              {isSelected && (
                                <div
                                  onMouseDown={(e) => {
                                    e.stopPropagation();
                                    isResizingText.current = el.id;
                                    dragStartPos.current = { x: e.clientX, y: e.clientY, initialSize: el.fontSize };
                                  }}
                                  className="absolute -right-1.5 -bottom-1.5 w-3.5 h-3.5 bg-sky-600 border border-white rounded-full cursor-se-resize shadow-md"
                                />
                              )}
                            </div>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>

                <div className="w-4"></div>
              </div>
            </div>

            {/* Customizer Panel for Background Mode */}
            {generationMode === "background" && (
              <>
                <div className="bg-gray-50 p-2.5 rounded border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-200 pb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Manage Canvas Overlays</span>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={handleRemoveActiveElement}
                        className="text-[10px] bg-red-50 text-red-600 border border-red-200 font-bold px-2 py-0.5 rounded hover:bg-red-100 transition-all cursor-pointer"
                      >
                        Delete {activeSelectionType === "logo" ? "Logo" : "Text"}
                      </button>
                      <button
                        type="button"
                        onClick={handleAddTextElement}
                        className="text-[10px] bg-sky-600 text-white font-bold px-2 py-0.5 rounded hover:bg-sky-700 transition-all cursor-pointer"
                      >
                        + Add Text Layer
                      </button>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="flex flex-wrap gap-1">
                    {textElements.map((el, idx) => (
                      <button
                        key={el.id}
                        type="button"
                        onClick={() => {
                          setSelectedTextId(el.id);
                          setActiveSelectionType("text");
                        }}
                        className={`text-[10px] px-2 py-0.5 rounded font-medium border transition-all cursor-pointer ${
                          el.id === selectedTextId && activeSelectionType === "text"
                            ? "bg-sky-600 text-white border-sky-600 font-bold"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        Text #{idx + 1}
                      </button>
                    ))}
                    {logoUrl && (
                      <button
                        type="button"
                        onClick={() => setActiveSelectionType("logo")}
                        className={`text-[10px] px-2 py-0.5 rounded font-medium border transition-all cursor-pointer ${
                          activeSelectionType === "logo"
                            ? "bg-sky-600 text-white border-sky-600 font-bold"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        Logo Layer
                      </button>
                    )}
                  </div>

                  {/* Text Controls */}
                  {activeSelectionType === "text" && activeText && (
                    <div className="space-y-2 pt-1">
                      <label className="text-[10px] font-bold text-gray-600">Edit Selected Text (Enter = line break)</label>
                      <textarea
                        rows={2}
                        value={activeText.text}
                        onChange={(e) => updateActiveTextProp("text", e.target.value)}
                        className="w-full border border-gray-300 rounded p-1.5 text-xs text-gray-900 bg-white focus:ring-2 focus:ring-sky-500 outline-none resize-none select-text"
                      />
                      <div className="flex gap-1.5 items-center">
                        <select
                          value={activeText.fontFamily}
                          onChange={(e) => updateActiveTextProp("fontFamily", e.target.value)}
                          className="flex-1 border border-gray-300 rounded px-1.5 py-1 text-[11px] text-gray-800 bg-white"
                        >
                          <option value="Montserrat">Montserrat</option>
                          <option value="Arial">Arial</option>
                          <option value="Impact">Impact</option>
                          <option value="Times New Roman">Times New Roman</option>
                        </select>
                        <input
                          type="color"
                          value={activeText.textColor}
                          onChange={(e) => updateActiveTextProp("textColor", e.target.value)}
                          className="w-7 h-6 rounded border border-gray-300 cursor-pointer p-0.5 bg-white"
                          title="Text Color"
                        />
                        <input
                          type="number"
                          value={activeText.fontSize}
                          onChange={(e) => updateActiveTextProp("fontSize", Number(e.target.value))}
                          className="w-12 border border-gray-300 rounded px-1 text-[11px] text-center bg-white"
                          min={10}
                          max={72}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Logo Upload Box */}
                <div className="bg-gray-50 p-2 rounded space-y-1.5 border border-gray-200">
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Logo Upload</h3>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={handleLogoUpload}
                    className="w-full text-[10px] text-gray-600 file:mr-1.5 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-sky-100 file:text-sky-700 hover:file:bg-sky-200 cursor-pointer"
                  />
                  {logoWarning && (
                    <p className="text-[9px] text-amber-800 bg-amber-50 border border-amber-200 p-1 rounded">
                      ⚠️ {logoWarning}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-1.5 pt-1">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={remainingAttempts === 0}
                className="flex-1 py-1.5 rounded border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all cursor-pointer"
              >
                Regenerate Artwork
              </button>
              <button
                type="button"
                onClick={handleExportDesign}
                className="flex-1 py-1.5 rounded bg-sky-600 hover:bg-sky-700 text-xs font-bold text-white shadow-xs transition-all uppercase tracking-wider cursor-pointer"
              >
                Use This Design →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Local Modal Fallback */}
      {localLightboxUrl && (
        <div
          onClick={() => setLocalLightboxUrl(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-2xl max-h-[90vh] bg-white rounded-xl p-3 shadow-2xl flex flex-col items-center">
            <button
              onClick={() => setLocalLightboxUrl(null)}
              className="absolute top-2 right-2 bg-sky-600 text-white w-7 h-7 rounded-full font-bold text-sm flex items-center justify-center"
            >
              ✕
            </button>
            <img src={localLightboxUrl} alt="Preview" className="max-h-[80vh] w-auto rounded object-contain" />
            <span className="text-xs text-gray-500 font-medium mt-2">Click anywhere to close</span>
          </div>
        </div>
      )}
    </div>
  );
}