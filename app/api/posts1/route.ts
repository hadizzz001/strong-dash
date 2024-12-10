

import prisma from "../../../prisma";
import { NextResponse } from "next/server";

export async function main() {
    try {
        await prisma.$connect();
    }
    catch (err) {
        return Error("Database connect unsuccessful")
    }
}

export const GET = async (req: Request, res: NextResponse) => {
    try {
        console.time('start')
        await main();
        const posts = await prisma.video.findMany();
        console.timeEnd('start')



        return NextResponse.json({ message: "Success", posts }, { status: 200 });

    }
    catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
};




export const POST = async (req: Request, res: NextResponse) => {
    try {
        const { videoUrl, age, gender, height,weight, description } = await req.json(); 
        await main();
        const post = await prisma.video.createMany({
            data: { videoUrl, age, gender, height,weight, description }
        });
        return NextResponse.json({ message: "Success", post }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 });
    }
    finally {
        await prisma.$disconnect();
    }
};















