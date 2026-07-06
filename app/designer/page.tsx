// "use client";
// import { useState } from "react";

// const STYLES = [
//   "Bold & High Contrast",
//   "Clean & Minimal",
//   "Real Estate",
//   "Construction",
//   "Retail & Sale",
//   "Outdoor / Weather Proof",
// ];

// export default function DesignerPage() {
//   const [prompt, setPrompt] = useState("");
//   const [selectedStyle, setSelectedStyle] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState("");

//   const handleGenerate = async () => {
//     if (!prompt || !selectedStyle) return;
//     setLoading(true);
//     setImageUrl("");

//     // Placeholder — real Gemini call goes here later
//     await new Promise((r) => setTimeout(r, 2000));
//     setImageUrl("https://placehold.co/800x600/1a56a0/ffffff?text=AI+Generated+Sign");
//     setLoading(false);
//   };

//   return (
//     <main className="min-h-screen bg-gray-50">
      
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 px-6 py-4">
//         <h1 className="text-xl font-bold text-gray-900">AI Sign Designer</h1>
//         <p className="text-sm text-gray-500 mt-0.5">
//           Describe your sign and let AI generate a starting design for you
//         </p>
//       </div>

//       <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

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
//             onChange={(e) => setPrompt(e.target.value)}
//             placeholder="e.g. Bold red and white open house sign for a real estate agent, Saturday 10am–12pm, 123 Example Street"
//             className="w-full border border-gray-300 rounded-lg px-4 py-3 
//             text-sm text-gray-800 placeholder-gray-400 resize-none
//             focus:outline-none focus:ring-2 focus:ring-blue-500"
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
//                 onClick={() => setSelectedStyle(style)}
//                 className={`px-4 py-2 rounded-full text-sm font-medium border 
//                 transition-all duration-150
//                 ${selectedStyle === style
//                   ? "bg-blue-600 text-white border-blue-600"
//                   : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
//                 }`}
//               >
//                 {style}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Generate Button */}
//         <button
//           onClick={handleGenerate}
//           disabled={!prompt || !selectedStyle || loading}
//           className={`w-full py-3 rounded-xl font-semibold text-white 
//           transition-all duration-150
//           ${!prompt || !selectedStyle || loading
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
//                 className="flex-1 py-2.5 rounded-lg border border-gray-300 
//                 text-sm font-medium text-gray-700 hover:bg-gray-50 
//                 transition-all duration-150"
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
//     </main>
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

export default function DesignerPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Dynamic Iframe Height Synchronizer ---
  useEffect(() => {
    const sendHeight = () => {
      if (containerRef.current) {
        // Capture the full footprint of the content element
        const height = containerRef.current.scrollHeight;
        window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
      }
    };

    // 1. Send initial layout height
    sendHeight();

    // 2. Handle window or container resizing
    window.addEventListener("resize", sendHeight);

    // 3. Observe changes (e.g., loading state turning on, image arriving)
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
  // ------------------------------------------

  const handleGenerate = async () => {
    if (!prompt || !selectedStyle) return;
    setLoading(true);
    setImageUrl("");

    // Placeholder — real Gemini call goes here later
    await new Promise((r) => setTimeout(r, 2000));
    setImageUrl("https://placehold.co/800x600/1a56a0/ffffff?text=AI+Generated+Sign");
    setLoading(false);
  };

  return (
    // Replaced min-screen wrapper to allow fluid inline fitting within Shopify 
    // <div ref={containerRef} className="bg-transparent overflow-hidden">
    <div ref={containerRef} className="bg-white overflow-hidden min-h-full">
          
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">AI Sign Designer</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Describe your sign and let AI generate a starting design for you
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

        {/* Step 1 - Prompt */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold 
            rounded-full w-5 h-5 flex items-center justify-center">1</span>
            <h2 className="font-semibold text-gray-800">Describe your sign</h2>
          </div>
          <textarea
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. Bold red and white open house sign for a real estate agent, Saturday 10am–12pm, 123 Example Street"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 
            text-sm text-gray-800 placeholder-gray-400 resize-none
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400">
            The more detail you give, the better the result.
          </p>
        </div>

        {/* Step 2 - Style */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold 
            rounded-full w-5 h-5 flex items-center justify-center">2</span>
            <h2 className="font-semibold text-gray-800">Pick a style</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-4 py-2 rounded-full text-sm font-medium border 
                transition-all duration-150
                ${selectedStyle === style
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!prompt || !selectedStyle || loading}
          className={`w-full py-3 rounded-xl font-semibold text-white 
          transition-all duration-150
          ${!prompt || !selectedStyle || loading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:scale-95"
          }`}
        >
          {loading ? "Generating your design..." : "Generate Design"}
        </button>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 
          flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent 
            rounded-full animate-spin" />
            <p className="text-sm text-gray-500">
              AI is generating your sign design...
            </p>
          </div>
        )}

        {/* Preview */}
        {imageUrl && !loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-xs font-bold 
              rounded-full w-5 h-5 flex items-center justify-center">3</span>
              <h2 className="font-semibold text-gray-800">Your generated design</h2>
            </div>

            <img
              src={imageUrl}
              alt="Generated sign design"
              className="w-full rounded-lg border border-gray-100"
            />

            <div className="flex gap-3">
              <button
                onClick={handleGenerate}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 
                text-sm font-medium text-gray-700 hover:bg-gray-50 
                transition-all duration-150"
              >
                Regenerate
              </button>
              <button
                className="flex-1 py-2.5 rounded-lg bg-blue-600 
                text-sm font-medium text-white hover:bg-blue-700 
                transition-all duration-150"
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