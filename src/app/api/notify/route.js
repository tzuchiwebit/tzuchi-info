import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const data = await request.json();

    await axios.post(
      `${process.env.LINE_MESSAGE_API}`,
      {
        to: process.env.LINE_GROUP_ID,
        messages: [
          {
            type: "text",
            text: data.message,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LINE_NOTIFY_TOKEN}`,
        },
      }
    );

    return NextResponse.json({
      received: data,
      status: "success",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
