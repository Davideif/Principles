// POST api/sign-up
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

    if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }   

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: newUser, error } = await supabase
      .from("users")
      .insert({ name, email, password: hashedPassword })
      .select("*")
      .single();

    if (error) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });  
    }

    return NextResponse.json({ user: { id: newUser.id, name: newUser.name, email: newUser.email } }, { status: 201 });
}   

