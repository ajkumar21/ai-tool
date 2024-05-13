import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI()

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { messages } = body

        if (!userId) return new NextResponse("Unauthorized", { status: 401})
        if (!openai) return new NextResponse("Open AI config failed", { status: 500})
        if (!messages) return new NextResponse("Messages are required", {status: 400})
        
        const response = await openai.chat.completions.create({ model: "gpt-3.5-turbo", messages});
        return NextResponse.json(response.choices[0].message);

    }catch (err) {
        console.log(`Conversation error: ${err}`)
        return new NextResponse("Internal error", {status: 500})
    }
}