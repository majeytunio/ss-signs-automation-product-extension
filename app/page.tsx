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
  
  // Lightbox Modal State
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  // Dynamic Shopify options
  const [dynWidth, setDynWidth] = useState("600");
  const [dynHeight, setDynHeight] = useState("900");
  const [dynThickness, setDynThickness] = useState("5mm");
  const [dynEyelets, setDynEyelets] = useState("No");

  const containerRef = useRef<HTMLDivElement>(null);

  const syncHeightWithShopify = () => {
    if (containerRef.current) {
      const height = containerRef.current.scrollHeight;
      window.parent.postMessage({ type: "SET_HEIGHT", height }, "*");
    }
  };

  const syncProductImageWithShopify = (imgUrl: string) => {
    if (!imgUrl) return;
    const payload = { type: "UPDATE_PRODUCT_IMAGE", imageUrl: imgUrl };

    if (window.parent && window.parent !== window) {
      window.parent.postMessage(payload, "*");
    } else if (window.top) {
      window.top.postMessage(payload, "*");
    }
  };

  useEffect(() => {
    syncHeightWithShopify();
    window.addEventListener("resize", syncHeightWithShopify);

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
        throw new Error(data.error || "Failed to generate custom sign artwork.");
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
      console.error("UI Generation Fault:", err);
      setError(err.message || "Unable to reach generation server.");
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

  const wNum = parseFloat(dynWidth) || 600;
  const hNum = parseFloat(dynHeight) || 900;
  const aspectRatio = wNum / hNum;

  return (
    <>
      {/* Load Montserrat Font directly inside iframe scope */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        body, input, textarea, button, select {
          font-family: 'Montserrat', sans-serif !important;
        }
      `}</style>

      <div ref={containerRef} className="bg-white overflow-hidden min-h-full antialiased text-gray-900 w-full py-2">
        
        {/* Header Panel */}
        <div className="bg-white border-b border-gray-200 pb-3 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-base font-bold text-gray-900 tracking-tight">AI Sign Designer</h1>
            <p className="text-[11px] text-gray-500">
              Current Specs: {dynWidth}mm x {dynHeight}mm | Thickness: {dynThickness} | Eyelets: {dynEyelets}
            </p>
          </div>
          
          {remainingAttempts !== null && (
            <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold self-start sm:self-center border transition-all ${
              remainingAttempts === 0 
                ? "bg-red-50 border-red-200 text-red-700" 
                : "bg-gray-100 border-gray-300 text-gray-800"
            }`}>
              {remainingAttempts === 0 
                ? "0 generations remaining" 
                : `${remainingAttempts} ${remainingAttempts === 1 ? "generation" : "generations"} remaining`}
            </div>
          )}
        </div>

        <div className="w-full space-y-4">

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-xs">
              <span className="font-semibold">Notice:</span> {error}
            </div>
          )}

          {/* 1. Prompt Input Box */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="bg-gray-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">1</span>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Describe your sign</h2>
            </div>
            <textarea
              rows={3}
              value={prompt}
              disabled={remainingAttempts === 0 || loading}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={remainingAttempts === 0 ? "No generations remaining." : "e.g. Caution sign reading 'DANGER INSIDE' in bold lettering..."}
              className={`w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-gray-900 transition-all ${
                remainingAttempts === 0 ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
              }`}
            />
          </div>

          {/* 2. Style Matrix */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="bg-gray-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">2</span>
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Select design theme style</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STYLES.map((style) => (
                <button
                  key={style}
                  disabled={remainingAttempts === 0 || loading}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all ${
                    selectedStyle === style
                      ? "bg-gray-900 text-white border-gray-900"
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
            className={`w-full py-3 rounded-lg font-bold text-xs tracking-wider uppercase transition-all ${
              !prompt || !selectedStyle || loading || remainingAttempts === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gray-900 hover:bg-black text-white shadow-sm"
            }`}
          >
            {loading ? "Compiling Layout..." : "Generate Custom Design Asset"}
          </button>

          {loading && (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 p-8 flex flex-col items-center justify-center gap-2 animate-pulse">
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              <p className="text-[11px] font-medium text-gray-500">Generating mockup assets...</p>
            </div>
          )}

          {/* 3. Output Canvas with Border-Hugging Rulers & Zoom Button */}
          {imageUrl && !loading && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="bg-gray-900 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
                  <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Your generated layout output mockup</h2>
                </div>
                <button
                  onClick={() => setModalImageUrl(imageUrl)}
                  className="text-[11px] font-semibold text-gray-700 hover:text-black flex items-center gap-1 underline"
                >
                  🔍 Full Screen Preview
                </button>
              </div>

              <div className="bg-gray-50 rounded-lg p-8 flex items-center justify-center border border-gray-100">
                <div 
                  className="relative p-5 border border-dashed border-gray-300 bg-white rounded shadow-inner flex items-center justify-center group"
                  style={{
                    width: "100%",
                    maxWidth: aspectRatio > 1 ? "360px" : `${360 * aspectRatio}px`,
                    aspectRatio: `${aspectRatio}`
                  }}
                >
                  {/* Top Ruler */}
                  <div className="absolute -top-5 left-5 right-5 flex flex-col items-center">
                    <div className="w-full h-px bg-red-500 relative">
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-[9px] font-bold text-red-500 bg-white px-1 mt-0.5 shadow-sm rounded border border-gray-100">
                      {dynWidth}mm
                    </span>
                  </div>

                  {/* Right Ruler */}
                  <div className="absolute -right-6 top-5 bottom-5 flex items-center">
                    <div className="h-full w-px bg-red-500 relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full" />
                    </div>
                    <span className="text-[9px] font-bold text-red-500 bg-white px-0.5 py-0.5 shadow-sm rounded border border-gray-100 [writing-mode:vertical-lr] ml-0.5">
                      {dynHeight}mm
                    </span>
                  </div>

                  <img
                    src={imageUrl}
                    alt="AI Generated Design"
                    onLoad={syncHeightWithShopify}
                    className="w-full h-full object-contain rounded cursor-pointer"
                    onClick={() => setModalImageUrl(imageUrl)}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <button
                  onClick={handleGenerate}
                  disabled={remainingAttempts === 0}
                  className="flex-1 py-2 rounded-md border border-gray-300 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-all"
                >
                  Regenerate Alternative
                </button>
                <button
                  type="button"
                  onClick={() => syncProductImageWithShopify(imageUrl)}
                  className="flex-1 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow transition-all uppercase tracking-wider"
                >
                  Use This Design →
                </button>
              </div>
            </div>
          )}

          {/* 4. Generation History Drawer with Zoom Support */}
          {history.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-2 shadow-sm">
              <h3 className="font-bold text-gray-900 text-xs uppercase tracking-wider">Your previous generations</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {history.map((item) => (
                  <div key={item.id} className="relative group">
                    <button
                      onClick={() => handleSelectHistoryItem(item)}
                      className={`w-full aspect-square rounded overflow-hidden border-2 transition-all ${
                        imageUrl === item.url ? "border-gray-900 scale-95 opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={item.url} alt="History thumbnail" className="w-full h-full object-cover" />
                    </button>
                    <button
                      onClick={() => setModalImageUrl(item.url)}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded p-0.5 text-[9px] opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Enlarge preview"
                    >
                      🔍
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* 5. Full Screen Lightbox Modal */}
        {modalImageUrl && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setModalImageUrl(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg p-2 overflow-hidden shadow-2xl flex flex-col items-center">
              <button
                onClick={() => setModalImageUrl(null)}
                className="absolute top-3 right-3 bg-gray-900 text-white w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center hover:bg-black"
              >
                ✕
              </button>
              <img
                src={modalImageUrl}
                alt="Enlarged Design Artwork"
                className="max-w-full max-h-[80vh] object-contain rounded"
              />
              <p className="text-xs text-gray-500 mt-2 font-medium">Click anywhere outside to close</p>
            </div>
          </div>
        )}

      </div>
    </>
  );
}