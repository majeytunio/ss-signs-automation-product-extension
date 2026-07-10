// // // import { NextRequest, NextResponse } from 'next/server';
// // // import { PutObjectCommand } from '@aws-sdk/client-s3';
// // // import { r2Client } from '@/lib/r2';
// // // import crypto from 'crypto';

// // // // In-memory cache store for tracking guest IP data and authenticated Shopify accounts
// // // const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

// // // function checkRateLimit(identifier: string, limitMax: number, windowMs: number) {
// // //   const now = Date.now();
// // //   const record = rateLimitCache.get(identifier);

// // //   if (!record || now > record.resetTime) {
// // //     rateLimitCache.set(identifier, { count: 1, resetTime: now + windowMs });
// // //     return { success: true };
// // //   }

// // //   if (record.count >= limitMax) {
// // //     return { success: false };
// // //   }

// // //   record.count += 1;
// // //   return { success: true };
// // // }

// // // function mapDimensionsToPreset(width: string, height: string): string {
// // //   const w = parseInt(width) || 600;
// // //   const h = parseInt(height) || 900;
// // //   const ratio = w / h;

// // //   // Evaluates standard landscape vs portrait canvas outputs
// // //   if (Math.abs(ratio - 1) < 0.15) return "1:1";
// // //   if (ratio > 1) return "1200/800"; // Landscape target resolution
// // //   return "800/1200"; // Portrait target resolution
// // // }

// // // export async function POST(req: NextRequest) {
// // //   try {
// // //     const body = await req.json();
// // //     const { prompt, style, width, height, customerId } = body;

// // //     if (!prompt) {
// // //       return NextResponse.json({ error: "Prompt string is required." }, { status: 400 });
// // //     }

// // //     // 1. Resolve exact Client IP addressing safely through remote headers
// // //     const forwardedFor = req.headers.get('x-forwarded-for');
// // //     const clientIp = forwardedFor 
// // //       ? forwardedFor.split(',')[0].trim() 
// // //       : req.headers.get('x-real-ip') || 'anonymous';

// // //     // Set configuration mappings depending on auth profile
// // //     const rateLimitIdentifier = customerId ? `user:${customerId}` : `guest:${clientIp}`;
// // //     const limitMax = customerId ? 10 : 3; 
// // //     const windowMs = 15 * 60 * 1000; // 15 Minute tracking window

// // //     const limitCheck = checkRateLimit(rateLimitIdentifier, limitMax, windowMs);
// // //     if (!limitCheck.success) {
// // //       return NextResponse.json(
// // //         { error: "Generation rate limit reached. Please try again in 15 minutes." }, 
// // //         { status: 429 }
// // //       );
// // //     }

// // //     // 2. Local Input Text Moderation Layer
// // //     const bannedKeywords = ["offensiveword1", "spamstring"]; 
// // //     const isFlagged = bannedKeywords.some(word => prompt.toLowerCase().includes(word));
// // //     if (isFlagged) {
// // //       return NextResponse.json({ error: "Your prompt contains language flagged by our moderation rules." }, { status: 400 });
// // //     }

// // //     // 3. Dynamic Aspect Ratio Translation
// // //     const targetRatioPreset = mapDimensionsToPreset(width, height);

// // //     // 4. Temporary Simulated AI Design Generator Pipeline
// // //     // This sandbox setup will be replaced directly with the Gemini Fetch code tomorrow
// // //     const mockServiceUrl = `https://picsum.photos/${targetRatioPreset}`;
// // //     const imageStreamResponse = await fetch(mockServiceUrl);
    
// // //     if (!imageStreamResponse.ok) {
// // //       throw new Error("Unable to capture valid asset binary from generation engine.");
// // //     }

// // //     const imageArrayBuffer = await imageStreamResponse.arrayBuffer();
// // //     const fileBuffer = Buffer.from(imageArrayBuffer);

// // //     // 5. Build Cryptographically Unique File Key names
// // //     const fileHash = crypto.randomBytes(8).toString('hex');
// // //     const destinationFileName = `design_${fileHash}.jpg`;

// // //     // 6. Push finalized binary directly to Cloudflare R2 bucket storage
// // //     await r2Client.send(
// // //       new PutObjectCommand({
// // //         Bucket: process.env.R2_BUCKET_NAME,
// // //         Key: destinationFileName,
// // //         Body: fileBuffer,
// // //         ContentType: 'image/jpeg',
// // //       })
// // //     );

// // //     // 7. Format clean public asset URLs back to frontend layout
// // //     // Replace with your custom domain or public bucket routing once ready
// // //     const publicAssetPath = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${destinationFileName}`;

// // //     return NextResponse.json({
// // //       success: true,
// // //       designUrl: publicAssetPath,
// // //       fileName: destinationFileName,
// // //       details: {
// // //         dimensions: `${width}mm x ${height}mm`,
// // //         stylePreset: style
// // //       }
// // //     });

// // //   } catch (error: any) {
// // //     console.error("API Processing Fault:", error.message || error);
// // //     return NextResponse.json({ error: "Server encountered an error processing design layout." }, { status: 500 });
// // //   }
// // // }










// // import { NextRequest, NextResponse } from 'next/server';
// // import { PutObjectCommand } from '@aws-sdk/client-s3';
// // import { r2Client } from '@/lib/r2';
// // import crypto from 'crypto';

// // const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

// // function checkRateLimit(identifier: string, limitMax: number, windowMs: number) {
// //   const now = Date.now();
// //   const record = rateLimitCache.get(identifier);

// //   if (!record || now > record.resetTime) {
// //     rateLimitCache.set(identifier, { count: 1, resetTime: now + windowMs });
// //     return { success: true };
// //   }

// //   if (record.count >= limitMax) {
// //     return { success: false };
// //   }

// //   record.count += 1;
// //   return { success: true };
// // }

// // function mapDimensionsToPreset(width: string, height: string): string {
// //   const w = parseInt(width) || 600;
// //   const h = parseInt(height) || 900;
// //   const ratio = w / h;

// //   if (Math.abs(ratio - 1) < 0.15) return "1:1";
// //   if (ratio > 1) return "1200/800"; 
// //   return "800/1200"; 
// // }

// // export async function POST(req: NextRequest) {
// //   try {
// //     const body = await req.json();
// //     const { prompt, style, width, height, customerId } = body;

// //     if (!prompt) {
// //       return NextResponse.json({ error: "Prompt string is required." }, { status: 400 });
// //     }

// //     const forwardedFor = req.headers.get('x-forwarded-for');
// //     const clientIp = forwardedFor 
// //       ? forwardedFor.split(',')[0].trim() 
// //       : req.headers.get('x-real-ip') || 'anonymous';

// //     const rateLimitIdentifier = customerId ? `user:${customerId}` : `guest:${clientIp}`;
// //     const limitMax = customerId ? 10 : 3; 
// //     const windowMs = 15 * 60 * 1000; 

// //     const limitCheck = checkRateLimit(rateLimitIdentifier, limitMax, windowMs);
// //     if (!limitCheck.success) {
// //       return NextResponse.json(
// //         { error: "Generation rate limit reached. Please try again in 15 minutes." }, 
// //         { status: 429 }
// //       );
// //     }

// //     const bannedKeywords = ["offensiveword1", "spamstring"]; 
// //     const isFlagged = bannedKeywords.some(word => prompt.toLowerCase().includes(word));
// //     if (isFlagged) {
// //       return NextResponse.json({ error: "Your prompt contains language flagged by our moderation rules." }, { status: 400 });
// //     }

// //     const targetRatioPreset = mapDimensionsToPreset(width, height);

// //     // Placeholder Sandbox Image Generator Pipeline
// //     const mockServiceUrl = `https://picsum.photos/${targetRatioPreset}`;
// //     const imageStreamResponse = await fetch(mockServiceUrl);
    
// //     if (!imageStreamResponse.ok) {
// //       throw new Error("Unable to capture valid asset binary from generation engine.");
// //     }

// //     const imageArrayBuffer = await imageStreamResponse.arrayBuffer();
// //     const fileBuffer = Buffer.from(imageArrayBuffer);

// //     const fileHash = crypto.randomBytes(8).toString('hex');
// //     const destinationFileName = `design_${fileHash}.jpg`;

// //     await r2Client.send(
// //       new PutObjectCommand({
// //         Bucket: process.env.R2_BUCKET_NAME,
// //         Key: destinationFileName,
// //         Body: fileBuffer,
// //         ContentType: 'image/jpeg',
// //       })
// //     );

// //     // Pulled cleanly straight from your configuration settings variables
// //     const publicSubdomain = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || `https://pub-3a2b466633674ea3b71441fcfb8b3b54.r2.dev`;
// //     const publicAssetPath = `${publicSubdomain}/${destinationFileName}`;

// //     return NextResponse.json({
// //       success: true,
// //       designUrl: publicAssetPath,
// //       fileName: destinationFileName,
// //       details: {
// //         dimensions: `${width}mm x ${height}mm`,
// //         stylePreset: style
// //       }
// //     });

// //   } catch (error: any) {
// //     console.error("API Processing Fault:", error.message || error);
// //     return NextResponse.json({ error: "Server encountered an error processing design layout." }, { status: 500 });
// //   }
// // }




















// import { NextRequest, NextResponse } from 'next/server';
// import { PutObjectCommand } from '@aws-sdk/client-s3';
// import { r2Client } from '@/lib/r2';
// import crypto from 'crypto';

// const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

// function checkRateLimit(identifier: string, limitMax: number, windowMs: number) {
//   const now = Date.now();
//   const record = rateLimitCache.get(identifier);

//   // Clean slate: first request or window expired
//   if (!record || now > record.resetTime) {
//     rateLimitCache.set(identifier, { count: 1, resetTime: now + windowMs });
//     return { success: true, remaining: limitMax - 1 };
//   }

//   // Strictly blocked if they hit or exceed max limit
//   if (record.count >= limitMax) {
//     return { success: false, remaining: 0 };
//   }

//   record.count += 1;
//   return { success: true, remaining: limitMax - record.count };
// }

// function mapDimensionsToPreset(width: string, height: string): string {
//   const w = parseInt(width) || 600;
//   const h = parseInt(height) || 900;
//   const ratio = w / h;

//   if (Math.abs(ratio - 1) < 0.15) return "1:1";
//   if (ratio > 1) return "1200/800"; 
//   return "800/1200"; 
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { prompt, style, width, height, customerId } = body;

//     if (!prompt) {
//       return NextResponse.json({ error: "Prompt string is required." }, { status: 400 });
//     }

//     const forwardedFor = req.headers.get('x-forwarded-for');
//     let clientIp = forwardedFor 
//       ? forwardedFor.split(',')[0].trim() 
//       : req.headers.get('x-real-ip') || '';

//     if (!clientIp || clientIp === '::1' || clientIp === '127.0.0.1') {
//       clientIp = 'local-dev-session';
//     }

//     const rateLimitIdentifier = customerId ? `user:${customerId}` : `guest:${clientIp}`;
//     const limitMax = customerId ? 10 : 3; 
//     const windowMs = 15 * 60 * 1000; 

//     const limitCheck = checkRateLimit(rateLimitIdentifier, limitMax, windowMs);
    
//     if (!limitCheck.success) {
//       return NextResponse.json(
//         { 
//           error: "Generation rate limit reached. Please try again in 15 minutes.",
//           remainingAttempts: 0 
//         }, 
//         { status: 429 }
//       );
//     }

//     // Input Moderation Layer
//     const bannedKeywords = ["offensiveword1", "spamstring"]; 
//     const isFlagged = bannedKeywords.some(word => prompt.toLowerCase().includes(word));
//     if (isFlagged) {
//       return NextResponse.json({ error: "Your prompt contains language flagged by our moderation rules." }, { status: 400 });
//     }

//     const targetRatioPreset = mapDimensionsToPreset(width, height);

//     // Placeholder Sandbox Image Generator Pipeline
//     const mockServiceUrl = `https://picsum.photos/${targetRatioPreset}`;
//     const imageStreamResponse = await fetch(mockServiceUrl);
    
//     if (!imageStreamResponse.ok) {
//       throw new Error("Unable to capture valid asset binary from generation engine.");
//     }

//     const imageArrayBuffer = await imageStreamResponse.arrayBuffer();
//     const fileBuffer = Buffer.from(imageArrayBuffer);

//     const fileHash = crypto.randomBytes(8).toString('hex');
//     const destinationFileName = `design_${fileHash}.jpg`;

//     await r2Client.send(
//       new PutObjectCommand({
//         Bucket: process.env.R2_BUCKET_NAME,
//         Key: destinationFileName,
//         Body: fileBuffer,
//         ContentType: 'image/jpeg',
//       })
//     );

//     const publicSubdomain = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || `https://pub-3a2b466633674ea3b71441fcfb8b3b54.r2.dev`;
//     const publicAssetPath = `${publicSubdomain}/${destinationFileName}`;

//     return NextResponse.json({
//       success: true,
//       designUrl: publicAssetPath,
//       fileName: destinationFileName,
//       remainingAttempts: limitCheck.remaining, // Sent directly back to update UI counters
//       details: {
//         dimensions: `${width}mm x ${height}mm`,
//         stylePreset: style
//       }
//     });

//   } catch (error: any) {
//     console.error("API Processing Fault:", error.message || error);
//     return NextResponse.json({ error: "Server encountered an error processing design layout." }, { status: 500 });
//   }
// }



















import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';

// Initialize Cloudflare R2 Client via S3 protocol compatibility layer
const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

// Local in-memory cache to handle basic guest IP session checking
const guestRateLimitCache = new Map<string, { count: number; resetTime: number }>();

/**
 * Handles basic IP rate limit checks for guests
 */
function checkGuestRateLimit(ip: string, limitMax: number, windowMs: number) {
  const now = Date.now();
  const record = guestRateLimitCache.get(ip);

  if (!record || now > record.resetTime) {
    guestRateLimitCache.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limitMax - 1 };
  }

  if (record.count >= limitMax) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: limitMax - record.count };
}

/**
 * Handles communication with Shopify REST API to fetch/update customer remaining attempts metafields
 */
async function handleShopifyCustomerAllowance(customerId: string, action: 'READ' | 'DECREMENT'): Promise<{ success: boolean; allowance: number }> {
  const shopDomain = process.env.SHOPIFY_STORE_DOMAIN || 'shop.ss-signs.com.au';
  const accessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN;

  // Fallback structural safety in case token configurations are not active yet
  if (!accessToken) {
    console.warn("Notice: SHOPIFY_ADMIN_API_ACCESS_TOKEN not detected inside environment configuration. Defaulting fallback allowances.");
    return { success: true, allowance: 10 };
  }

  const url = `https://${shopDomain}/admin/api/2024-04/customers/${customerId}/metafields.json`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw new Error(`Shopify GET failure status: ${res.status}`);
    const data = await res.json();
    
    const allowanceMetafield = data.metafields?.find(
      (m: any) => m.namespace === "ai_designer" && m.key === "generation_allowance"
    );

    let currentAllowance = allowanceMetafield ? parseInt(allowanceMetafield.value, 10) : 10;

    if (action === 'READ') {
      return { success: true, allowance: currentAllowance };
    }

    if (action === 'DECREMENT') {
      if (currentAllowance <= 0) {
        return { success: false, allowance: 0 };
      }
      
      const updatedAllowance = currentAllowance - 1;

      // Update structural balance back to Shopify database storage
      const updateRes = await fetch(url, {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          metafield: {
            namespace: "ai_designer",
            key: "generation_allowance",
            value: updatedAllowance.toString(),
            type: "single_line_text_field"
          }
        }),
      });

      if (!updateRes.ok) throw new Error(`Shopify POST write failure status: ${updateRes.status}`);

      return { success: true, allowance: updatedAllowance };
    }

    return { success: false, allowance: 0 };
  } catch (error) {
    console.error("Shopify Metafield Integration Error:", error);
    return { success: false, allowance: 0 };
  }
}

/**
 * Maps input sizing calculations cleanly to closest 1:1, landscape, or portrait model presets
 */
function mapDimensionsToPreset(width: string, height: string): string {
  const w = parseInt(width, 10) || 600;
  const h = parseInt(height, 10) || 900;
  const ratio = w / h;

  if (Math.abs(ratio - 1) < 0.15) return "800/800"; // Square 1:1 mapping standard
  if (ratio > 1) return "1200/800";                  // Landscape mapping standard
  return "800/1200";                                 // Portrait mapping standard
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, style, width, height, customerId } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Missing required generation prompt parameter." }, { status: 400 });
    }

    let remainingAttempts = 3;

    // --- EXECUTE DUAL-TIER RATE LIMITING LAYER ---
    if (customerId) {
      const checkStatus = await handleShopifyCustomerAllowance(customerId, 'READ');
      if (checkStatus.allowance <= 0) {
        return NextResponse.json(
          { error: "Your generation balance has run out. Place a sign order to earn extra generations!", remainingAttempts: 0 },
          { status: 429 }
        );
      }
      remainingAttempts = checkStatus.allowance;
    } else {
      const forwardedFor = req.headers.get('x-forwarded-for');
      let clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip') || '';
      if (!clientIp || clientIp === '::1' || clientIp === '127.0.0.1') {
        clientIp = 'local-dev-session';
      }

      const limitCheck = checkGuestRateLimit(clientIp, 3, 15 * 60 * 1000);
      if (!limitCheck.success) {
        return NextResponse.json(
          { error: "Guest limit reached. Please wait 15 minutes or log into your Shopify account.", remainingAttempts: 0 }, 
          { status: 429 }
        );
      }
      remainingAttempts = limitCheck.remaining;
    }

    // --- INPUT MODERATION FILTERING LAYER ---
    const bannedKeywords = ["offensiveword", "spamstringtext"]; 
    const isFlagged = bannedKeywords.some(word => prompt.toLowerCase().includes(word));
    if (isFlagged) {
      return NextResponse.json({ error: "Prompt flagged. Content violates moderation compliance standards." }, { status: 400 });
    }

    // --- RUNNING EXPERIMENTAL SANDBOX STORAGE SYNC PIPELINE ---
    const targetSizePreset = mapDimensionsToPreset(width, height);
    const mockServiceUrl = `https://picsum.photos/${targetSizePreset}`;
    
    const imageStreamResponse = await fetch(mockServiceUrl);
    if (!imageStreamResponse.ok) {
      throw new Error("Unable to securely stream assets from generation engine endpoint.");
    }

    const imageArrayBuffer = await imageStreamResponse.arrayBuffer();
    const fileBuffer = Buffer.from(imageArrayBuffer);

    const fileHash = crypto.randomBytes(8).toString('hex');
    const destinationFileName = `design_${fileHash}.jpg`;

    // Send generation binary payload directly into active Cloudflare vault
    await r2Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || 'ai-sign-designs-dev',
        Key: destinationFileName,
        Body: fileBuffer,
        ContentType: 'image/jpeg',
      })
    );

    // --- DECREMENT BALANCES ON SUCCESSFUL EXECUTIONS ---
    if (customerId) {
      const reductionResult = await handleShopifyCustomerAllowance(customerId, 'DECREMENT');
      remainingAttempts = reductionResult.allowance;
    }

    const publicSubdomain = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || `https://pub-3a2b466633674ea3b71441fcfb8b3b54.r2.dev`;
    const publicAssetPath = `${publicSubdomain}/${destinationFileName}`;

    return NextResponse.json({
      success: true,
      designUrl: publicAssetPath,
      fileName: destinationFileName,
      remainingAttempts,
      details: {
        dimensions: `${width}mm x ${height}mm`,
        stylePreset: style
      }
    });

  } catch (error: any) {
    console.error("Critical Runtime Endpoint Exception:", error);
    return NextResponse.json({ error: "Internal server error occurred while processing layout assets." }, { status: 500 });
  }
}