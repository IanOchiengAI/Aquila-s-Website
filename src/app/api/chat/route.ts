import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are a friendly, professional AI concierge for OYANGE — a premium photography studio based in Nairobi, Kenya, run by Aquila Oyange.

BRAND CONTEXT:
- Aquila is a Travel & Portrait Photographer based in Nairobi, Kenya
- Style: Cinematic, high-key, natural light photography
- Specialties: Travel, Portrait, Outdoor, Events, Couples, Graduation, Product

PACKAGES & PRICING:
- Hikes and Safaris: KES 12,000 — Unlimited pictures, nicely edited, reel included, online gallery, ~single day
- Outdoors: KES 5,000 — 2 hour session, 20 pictures, online gallery, professional editing  
- Events: KES 6,000 — Coverage per hour, unlimited pictures, basic editing, online gallery

BOOKING:
- Direct them to the Inquire page at /inquire to book
- Or email: hello@oyange.studio

GUIDELINES:
- Be warm, approachable, and professional
- Keep responses concise (2-3 sentences max)
- If asked about something you don't know, suggest they reach out via the Inquire page
- Use a friendly, confident tone that matches a premium brand
- Never make up packages or pricing not listed above
- You may suggest which package fits their needs based on their description`;

export async function POST(req: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey || apiKey === "your_gemini_api_key_here") {
            return Response.json(
                { reply: "The AI concierge is being set up. In the meantime, feel free to visit our Inquire page or email hello@oyange.studio!" },
                { status: 200 }
            );
        }

        const { message, history } = await req.json();

        if (!message || typeof message !== "string") {
            return Response.json({ error: "Message is required" }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const chat = model.startChat({
            history: [
                { role: "user", parts: [{ text: "You are the OYANGE photography concierge. Follow the system instructions." }] },
                { role: "model", parts: [{ text: "Understood! I'm ready to help visitors learn about OYANGE photography services. How can I assist?" }] },
                ...(history || []).map((msg: { role: string; text: string }) => ({
                    role: msg.role === "assistant" ? "model" : "user",
                    parts: [{ text: msg.text }],
                })),
            ],
            generationConfig: {
                maxOutputTokens: 200,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(SYSTEM_PROMPT + "\n\nUser question: " + message);
        const reply = result.response.text();

        return Response.json({ reply });
    } catch (error) {
        console.error("Gemini API error:", error);
        return Response.json(
            { reply: "I'm having a moment — please try again, or visit our Inquire page to connect directly!" },
            { status: 200 }
        );
    }
}
