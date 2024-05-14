import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI()

export async function POST(req: Request) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { prompt, amount="1", resolution:size="256x256" } = body

        if (!userId) return new NextResponse("Unauthorized", { status: 401})
        if (!openai) return new NextResponse("Open AI config failed", { status: 500})
        if (!prompt) return new NextResponse("Image prompt is required", {status: 400})
        if (!amount) return new NextResponse("Amount is required", {status: 400})
        if (!size) return new NextResponse("Resolution is required", {status: 400})

        const response = await openai.images.generate({ prompt, n:parseInt(amount),size });
        return NextResponse.json(response.data);

    }catch (err) {
        console.log(`Image generation error: ${err}`)
        return new NextResponse("Internal error", {status: 500})
    }
}