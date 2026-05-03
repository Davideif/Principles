import { NextRequest,NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


//POST api/principles
export async function POST(req: NextRequest) {
    try {
        const { content, source, tags } = await req.json();
        const session = await getServerSession(authOptions);
        console.log("Session in POST /api/principles:", session);

        if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        }

        if (!content || typeof content !== "string") {
            return NextResponse.json({ error: "Content is required and must be a string." }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("principles")
            .insert({ content, source, tags, user_id: session.user.id })
            .select("*")
            .single(); 


        if (error) {
            console.error("Supabase error:", error);
            return NextResponse.json({ error: "Failed to add principle." }, { status: 500 });
        }
            return NextResponse.json({ principle: data }, { status: 201 });

    } catch (err) {
            console.error("Error in POST /api/principles:", err);
            return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
        }

    }
