// // import { NextRequest, NextResponse } from 'next/server';
// // import { PutObjectCommand } from '@aws-sdk/client-s3';
// // import { r2Client } from '@/lib/r2';
// // import crypto from 'crypto';

// // // In-memory cache store for tracking guest IP data and authenticated Shopify accounts
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

// //   // Evaluates standard landscape vs portrait canvas outputs
// //   if (Math.abs(ratio - 1) < 0.15) return "1:1";
// //   if (ratio > 1) return "1200/800"; // Landscape target resolution
// //   return "800/1200"; // Portrait target resolution
// // }

// // export async function POST(req: NextRequest) {
// //   try {
// //     const body = await req.json();
// //     const { prompt, style, width, height, customerId } = body;

// //     if (!prompt) {
// //       return NextResponse.json({ error: "Prompt string is required." }, { status: 400 });
// //     }

// //     // 1. Resolve exact Client IP addressing safely through remote headers
// //     const forwardedFor = req.headers.get('x-forwarded-for');
// //     const clientIp = forwardedFor 
// //       ? forwardedFor.split(',')[0].trim() 
// //       : req.headers.get('x-real-ip') || 'anonymous';

// //     // Set configuration mappings depending on auth profile
// //     const rateLimitIdentifier = customerId ? `user:${customerId}` : `guest:${clientIp}`;
// //     const limitMax = customerId ? 10 : 3; 
// //     const windowMs = 15 * 60 * 1000; // 15 Minute tracking window

// //     const limitCheck = checkRateLimit(rateLimitIdentifier, limitMax, windowMs);
// //     if (!limitCheck.success) {
// //       return NextResponse.json(
// //         { error: "Generation rate limit reached. Please try again in 15 minutes." }, 
// //         { status: 429 }
// //       );
// //     }

// //     // 2. Local Input Text Moderation Layer
// //     const bannedKeywords = ["offensiveword1", "spamstring"]; 
// //     const isFlagged = bannedKeywords.some(word => prompt.toLowerCase().includes(word));
// //     if (isFlagged) {
// //       return NextResponse.json({ error: "Your prompt contains language flagged by our moderation rules." }, { status: 400 });
// //     }

// //     // 3. Dynamic Aspect Ratio Translation
// //     const targetRatioPreset = mapDimensionsToPreset(width, height);

// //     // 4. Temporary Simulated AI Design Generator Pipeline
// //     // This sandbox setup will be replaced directly with the Gemini Fetch code tomorrow
// //     const mockServiceUrl = `https://picsum.photos/${targetRatioPreset}`;
// //     const imageStreamResponse = await fetch(mockServiceUrl);
    
// //     if (!imageStreamResponse.ok) {
// //       throw new Error("Unable to capture valid asset binary from generation engine.");
// //     }

// //     const imageArrayBuffer = await imageStreamResponse.arrayBuffer();
// //     const fileBuffer = Buffer.from(imageArrayBuffer);

// //     // 5. Build Cryptographically Unique File Key names
// //     const fileHash = crypto.randomBytes(8).toString('hex');
// //     const destinationFileName = `design_${fileHash}.jpg`;

// //     // 6. Push finalized binary directly to Cloudflare R2 bucket storage
// //     await r2Client.send(
// //       new PutObjectCommand({
// //         Bucket: process.env.R2_BUCKET_NAME,
// //         Key: destinationFileName,
// //         Body: fileBuffer,
// //         ContentType: 'image/jpeg',
// //       })
// //     );

// //     // 7. Format clean public asset URLs back to frontend layout
// //     // Replace with your custom domain or public bucket routing once ready
// //     const publicAssetPath = `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${destinationFileName}`;

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

//   if (!record || now > record.resetTime) {
//     rateLimitCache.set(identifier, { count: 1, resetTime: now + windowMs });
//     return { success: true };
//   }

//   if (record.count >= limitMax) {
//     return { success: false };
//   }

//   record.count += 1;
//   return { success: true };
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
//     const clientIp = forwardedFor 
//       ? forwardedFor.split(',')[0].trim() 
//       : req.headers.get('x-real-ip') || 'anonymous';

//     const rateLimitIdentifier = customerId ? `user:${customerId}` : `guest:${clientIp}`;
//     const limitMax = customerId ? 10 : 3; 
//     const windowMs = 15 * 60 * 1000; 

//     const limitCheck = checkRateLimit(rateLimitIdentifier, limitMax, windowMs);
//     if (!limitCheck.success) {
//       return NextResponse.json(
//         { error: "Generation rate limit reached. Please try again in 15 minutes." }, 
//         { status: 429 }
//       );
//     }

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

//     // Pulled cleanly straight from your configuration settings variables
//     const publicSubdomain = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || `https://pub-3a2b466633674ea3b71441fcfb8b3b54.r2.dev`;
//     const publicAssetPath = `${publicSubdomain}/${destinationFileName}`;

//     return NextResponse.json({
//       success: true,
//       designUrl: publicAssetPath,
//       fileName: destinationFileName,
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
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { r2Client } from '@/lib/r2';
import crypto from 'crypto';

const rateLimitCache = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, limitMax: number, windowMs: number) {
  const now = Date.now();
  const record = rateLimitCache.get(identifier);

  // Clean slate: first request or window expired
  if (!record || now > record.resetTime) {
    rateLimitCache.set(identifier, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limitMax - 1 };
  }

  // Strictly blocked if they hit or exceed max limit
  if (record.count >= limitMax) {
    return { success: false, remaining: 0 };
  }

  record.count += 1;
  return { success: true, remaining: limitMax - record.count };
}

function mapDimensionsToPreset(width: string, height: string): string {
  const w = parseInt(width) || 600;
  const h = parseInt(height) || 900;
  const ratio = w / h;

  if (Math.abs(ratio - 1) < 0.15) return "1:1";
  if (ratio > 1) return "1200/800"; 
  return "800/1200"; 
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, style, width, height, customerId } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt string is required." }, { status: 400 });
    }

    const forwardedFor = req.headers.get('x-forwarded-for');
    let clientIp = forwardedFor 
      ? forwardedFor.split(',')[0].trim() 
      : req.headers.get('x-real-ip') || '';

    if (!clientIp || clientIp === '::1' || clientIp === '127.0.0.1') {
      clientIp = 'local-dev-session';
    }

    const rateLimitIdentifier = customerId ? `user:${customerId}` : `guest:${clientIp}`;
    const limitMax = customerId ? 10 : 3; 
    const windowMs = 15 * 60 * 1000; 

    const limitCheck = checkRateLimit(rateLimitIdentifier, limitMax, windowMs);
    
    if (!limitCheck.success) {
      return NextResponse.json(
        { 
          error: "Generation rate limit reached. Please try again in 15 minutes.",
          remainingAttempts: 0 
        }, 
        { status: 429 }
      );
    }

    // Input Moderation Layer
    const bannedKeywords = ["offensiveword1", "spamstring"]; 
    const isFlagged = bannedKeywords.some(word => prompt.toLowerCase().includes(word));
    if (isFlagged) {
      return NextResponse.json({ error: "Your prompt contains language flagged by our moderation rules." }, { status: 400 });
    }

    const targetRatioPreset = mapDimensionsToPreset(width, height);

    // Placeholder Sandbox Image Generator Pipeline
    const mockServiceUrl = `https://picsum.photos/${targetRatioPreset}`;
    const imageStreamResponse = await fetch(mockServiceUrl);
    
    if (!imageStreamResponse.ok) {
      throw new Error("Unable to capture valid asset binary from generation engine.");
    }

    const imageArrayBuffer = await imageStreamResponse.arrayBuffer();
    const fileBuffer = Buffer.from(imageArrayBuffer);

    const fileHash = crypto.randomBytes(8).toString('hex');
    const destinationFileName = `design_${fileHash}.jpg`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: destinationFileName,
        Body: fileBuffer,
        ContentType: 'image/jpeg',
      })
    );

    const publicSubdomain = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || `https://pub-3a2b466633674ea3b71441fcfb8b3b54.r2.dev`;
    const publicAssetPath = `${publicSubdomain}/${destinationFileName}`;

    return NextResponse.json({
      success: true,
      designUrl: publicAssetPath,
      fileName: destinationFileName,
      remainingAttempts: limitCheck.remaining, // Sent directly back to update UI counters
      details: {
        dimensions: `${width}mm x ${height}mm`,
        stylePreset: style
      }
    });

  } catch (error: any) {
    console.error("API Processing Fault:", error.message || error);
    return NextResponse.json({ error: "Server encountered an error processing design layout." }, { status: 500 });
  }
}