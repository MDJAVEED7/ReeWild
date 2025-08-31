import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getDishNameFromImage(imageBuffer: Buffer): Promise<string> {
  try {
    const base64Image = imageBuffer.toString("base64");

    const response: any = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          type: "message",
          role: "user",
          content: [
            { type: "input_text", text: "Identify the dish name in this image." },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${base64Image}`,
              detail: "high", // required property
            },
          ],
        },
      ],
    });

    const message = response.output?.find(
      (item: any) => item.type === "message" && Array.isArray(item.content)
    );

    const dishName = message?.content
      ?.filter((c: any) => c.type === "output_text")
      ?.map((c: any) => c.text)
      .join("\n");

    return dishName?.trim() || "Unknown Dish";
  } catch (err: any) {
    console.error("OpenAI image recognition error:", err.message);
    return "Unknown Dish";
  }
}
