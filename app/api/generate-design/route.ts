// // // import { NextResponse } from "next/server";

// // // // Cloudflare AI Gateway Config
// // // const CF_ACCOUNT_TAG = "68e7acb6589eb10258980ce7ed08ab48";
// // // const CF_GATEWAY_ID = "nano-banana";
// // // const CF_API_TOKEN = process.env.CLOUDFLARE_AI_GATEWAY_TOKEN; // Set in Vercel / environment variables

// // // // Universal OpenAI-compatible endpoint route provided by Cloudflare AI Gateway Unified Billing
// // // const AI_GATEWAY_URL = `https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_TAG}/${CF_GATEWAY_ID}/compat/chat/completions`;

// // // export async function POST(req: Request) {
// // //   try {
// // //     const { prompt, style, width, height } = await req.json();

// // //     if (!prompt || !style) {
// // //       return NextResponse.json(
// // //         { error: "Prompt and style parameters are required." },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     if (!CF_API_TOKEN) {
// // //       console.error("Missing CLOUDFLARE_AI_GATEWAY_TOKEN in environment variables.");
// // //       return NextResponse.json(
// // //         { error: "Server AI Gateway configuration missing." },
// // //         { status: 500 }
// // //       );
// // //     }

// // //     // Construct structured prompt incorporating aspect ratio & physical specs
// // //     const engineeredPrompt = `High quality sign artwork layout design. Style: ${style}. Description: ${prompt}. Aspect Dimensions: ${width}mm width x ${height}mm height. Sharp vector typography, high contrast, ready for print.`;

// // //     const response = await fetch(AI_GATEWAY_URL, {
// // //       method: "POST",
// // //       headers: {
// // //         "Authorization": `Bearer ${CF_API_TOKEN}`,
// // //         "Content-Type": "application/json",
// // //         "cf-aig-metadata": JSON.stringify({ project: "SS-Signs-AI-Designer" }),
// // //       },
// // //       body: JSON.stringify({
// // //         model: "google/nano-banana-2-lite",
// // //         messages: [
// // //           {
// // //             role: "user",
// // //             content: engineeredPrompt,
// // //           },
// // //         ],
// // //         // Additional model-specific inference parameters
// // //         temperature: 0.7,
// // //       }),
// // //     });

// // //     if (!response.ok) {
// // //       const errorText = await response.text();
// // //       console.error("Cloudflare AI Gateway Error Response:", errorText);
// // //       return NextResponse.json(
// // //         { error: "Failed to generate design through Cloudflare AI Gateway." },
// // //         { status: response.status }
// // //       );
// // //     }

// // //     const data = await response.json();
    
// // //     // Extract generated image URL or base64 response structure
// // //     const generatedAssetUrl = data.choices?.[0]?.message?.content || data.result?.image_url;

// // //     return NextResponse.json({
// // //       success: true,
// // //       designUrl: generatedAssetUrl,
// // //     });

// // //   } catch (error: any) {
// // //     console.error("AI Generation Pipeline Exception:", error);
// // //     return NextResponse.json(
// // //       { error: error.message || "Internal server error in AI pipeline." },
// // //       { status: 500 }
// // //     );
// // //   }
// // // }




















// // import { NextResponse } from "next/server";

// // // Cloudflare AI Gateway Credentials
// // const CF_ACCOUNT_TAG = "68e7acb6589eb10258980ce7ed08ab48";
// // const CF_GATEWAY_ID = "nano-banana";
// // const CF_API_TOKEN = process.env.CLOUDFLARE_AI_GATEWAY_TOKEN;

// // // Universal OpenAI Compatibility Gateway Endpoint
// // const AI_GATEWAY_URL = `https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_TAG}/${CF_GATEWAY_ID}/compat/chat/completions`;

// // export async function POST(req: Request) {
// //   try {
// //     const { prompt, style, width, height } = await req.json();

// //     if (!prompt || !style) {
// //       return NextResponse.json(
// //         { error: "Prompt and style parameters are required." },
// //         { status: 400 }
// //       );
// //     }

// //     if (!CF_API_TOKEN) {
// //       console.error("Missing CLOUDFLARE_AI_GATEWAY_TOKEN in environment variables.");
// //       return NextResponse.json(
// //         { error: "Server AI Gateway token configuration missing." },
// //         { status: 500 }
// //       );
// //     }

// //     // Engineer design prompt incorporating dimensions and structural layout parameters
// //     const engineeredPrompt = `High quality sign artwork layout design. Style: ${style}. Description: ${prompt}. Aspect Dimensions: ${width}mm width x ${height}mm height. Sharp vector typography, high contrast, ready for print.`;

// //     // Headers configured for Cloudflare AI Gateway multi-tenant spend-limit routing
// //     const headers: Record<string, string> = {
// //       "Authorization": `Bearer ${CF_API_TOKEN}`,
// //       "cf-aig-account-id": CF_ACCOUNT_TAG,
// //       "cf-aig-authorization": `Bearer ${CF_API_TOKEN}`,
// //       "Content-Type": "application/json",
// //       "cf-aig-metadata": JSON.stringify({
// //         project: "SS-Signs-AI-Designer",
// //         environment: process.env.NODE_ENV || "development",
// //       }),
// //     };

// //     // Array of potential model route identifiers to ensure spend-limit resolution
// //     const modelCandidates = [
// //       "google-ai-studio/nano-banana-2-lite",
// //       "google/nano-banana-2-lite",
// //       "@cf/google/nano-banana-2-lite",
// //     ];

// //     let response: Response | null = null;
// //     let lastErrorText = "";

// //     // Iterate through supported provider mapping prefixes
// //     for (const modelCandidate of modelCandidates) {
// //       const payload = {
// //         model: modelCandidate,
// //         messages: [
// //           {
// //             role: "user",
// //             content: engineeredPrompt,
// //           },
// //         ],
// //         temperature: 0.7,
// //       };

// //       response = await fetch(AI_GATEWAY_URL, {
// //         method: "POST",
// //         headers,
// //         body: JSON.stringify(payload),
// //       });

// //       if (response.ok) {
// //         break; // Successfully resolved provider and spend-limit mapping
// //       }

// //       lastErrorText = await response.text();
// //       console.warn(
// //         `Cloudflare AI Gateway trial for model '${modelCandidate}' failed with status ${response.status}:`,
// //         lastErrorText
// //       );
// //     }

// //     if (!response || !response.ok) {
// //       console.error("Cloudflare AI Gateway Resolution Error:", lastErrorText);
// //       return NextResponse.json(
// //         {
// //           error: "Failed to generate design through Cloudflare AI Gateway.",
// //           details: lastErrorText,
// //         },
// //         { status: response ? response.status : 500 }
// //       );
// //     }

// //     const data = await response.json();

// //     // Extract generated image URL / content payload
// //     const generatedAssetUrl =
// //       data.choices?.[0]?.message?.content ||
// //       data.result?.image_url ||
// //       data.candidates?.[0]?.content?.parts?.[0]?.text;

// //     return NextResponse.json({
// //       success: true,
// //       designUrl: generatedAssetUrl,
// //     });
// //   } catch (error: any) {
// //     console.error("AI Generation Pipeline Exception:", error);
// //     return NextResponse.json(
// //       { error: error.message || "Internal server error in AI pipeline." },
// //       { status: 500 }
// //     );
// //   }
// // }

























// import { NextResponse } from "next/server";

// const CF_ACCOUNT_TAG = "68e7acb6589eb10258980ce7ed08ab48";
// const CF_GATEWAY_ID = "nano-banana";
// const PROJECT_ID = "ai-corflute-designer-506422";
// const MODEL_NAME = "gemini-3.1-flash-lite-image";

// // Full Vertex AI Endpoint routed via Cloudflare AI Gateway
// const AI_GATEWAY_URL = `https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_TAG}/${CF_GATEWAY_ID}/google-vertex-ai/v1/projects/${PROJECT_ID}/locations/global/publishers/google/models/${MODEL_NAME}:generateContent`;

// export async function POST(req: Request) {
//   try {
//     const { prompt, style, width, height } = await req.json();

//     if (!prompt || !style) {
//       return NextResponse.json(
//         { error: "Prompt and style parameters are required." },
//         { status: 400 }
//       );
//     }

//     const aigToken = process.env.CLOUDFLARE_AI_GATEWAY_TOKEN;

//     if (!aigToken) {
//       console.error("Missing CLOUDFLARE_AI_GATEWAY_TOKEN in environment variables.");
//       return NextResponse.json(
//         { error: "Server AI Gateway token configuration missing." },
//         { status: 500 }
//       );
//     }

//     const engineeredPrompt = `High quality sign artwork layout design. Style: ${style}. Description: ${prompt}. Aspect Dimensions: ${width}mm width x ${height}mm height. Sharp vector typography, high contrast, ready for print.`;

//     const response = await fetch(AI_GATEWAY_URL, {
//       method: "POST",
//       headers: {
//         "cf-aig-authorization": `Bearer ${aigToken}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             role: "user",
//             parts: [{ text: engineeredPrompt }],
//           },
//         ],
//         generationConfig: {
//           responseModalities: ["IMAGE"],
//         },
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Cloudflare AI Gateway Error:", errorText);
//       return NextResponse.json(
//         { error: "Failed to generate design through Cloudflare AI Gateway.", details: errorText },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
    
//     // Extract base64 image data returned by Vertex AI
//     const base64Image = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
//     const mimeType = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || "image/jpeg";

//     if (!base64Image) {
//       return NextResponse.json(
//         { error: "No image payload returned from model." },
//         { status: 500 }
//       );
//     }

//     const designUrl = `data:${mimeType};base64,${base64Image}`;

//     return NextResponse.json({
//       success: true,
//       designUrl,
//     });
//   } catch (error: any) {
//     console.error("AI Generation Pipeline Exception:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal server error in AI pipeline." },
//       { status: 500 }
//     );
//   }
// }






















import { NextResponse } from "next/server";

const CF_ACCOUNT_TAG = "68e7acb6589eb10258980ce7ed08ab48";
const CF_GATEWAY_ID = "nano-banana";
const PROJECT_ID = "ai-corflute-designer-506422";
const MODEL_NAME = "gemini-3.1-flash-lite-image";

// Full Vertex AI Endpoint routed via Cloudflare AI Gateway
const AI_GATEWAY_URL = `https://gateway.ai.cloudflare.com/v1/${CF_ACCOUNT_TAG}/${CF_GATEWAY_ID}/google-vertex-ai/v1/projects/${PROJECT_ID}/locations/global/publishers/google/models/${MODEL_NAME}:generateContent`;

export async function POST(req: Request) {
  try {
    const { prompt, style, width, height } = await req.json();

    if (!prompt || !style) {
      return NextResponse.json(
        { error: "Prompt and style parameters are required." },
        { status: 400 }
      );
    }

    const aigToken = process.env.CLOUDFLARE_AI_GATEWAY_TOKEN;

    if (!aigToken) {
      console.error("Missing CLOUDFLARE_AI_GATEWAY_TOKEN in environment variables.");
      return NextResponse.json(
        { error: "Server AI Gateway token configuration missing." },
        { status: 500 }
      );
    }

    // Strip out text-related keywords from user input
    const cleanedPrompt = prompt
      .replace(/saying|text|words|title|heading|write|lettering|labelled|reads/gi, "")
      .trim();

    // Re-engineered Prompt: Enforces blank background output without typography
    const engineeredPrompt = `Clean background artwork layout for a sign, dimensions ${width}mm width x ${height}mm height. Style: ${style}. Visual details: ${cleanedPrompt}. STRICT MANDATE: BLANK BACKGROUND TEMPLATE ONLY. NO text, NO letters, NO words, NO typography, NO numbers, NO readable symbols. Decorative background graphics, borders, textures, and clean color palettes only.`;

    const response = await fetch(AI_GATEWAY_URL, {
      method: "POST",
      headers: {
        "cf-aig-authorization": `Bearer ${aigToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: engineeredPrompt }],
          },
        ],
        generationConfig: {
          responseModalities: ["IMAGE"],
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudflare AI Gateway Error:", errorText);
      return NextResponse.json(
        { error: "Failed to generate design through Cloudflare AI Gateway.", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract base64 image data returned by Vertex AI
    const base64Image = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    const mimeType = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || "image/jpeg";

    if (!base64Image) {
      return NextResponse.json(
        { error: "No image payload returned from model." },
        { status: 500 }
      );
    }

    const designUrl = `data:${mimeType};base64,${base64Image}`;

    return NextResponse.json({
      success: true,
      designUrl,
    });
  } catch (error: any) {
    console.error("AI Generation Pipeline Exception:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error in AI pipeline." },
      { status: 500 }
    );
  }
}