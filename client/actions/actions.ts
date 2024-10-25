// app/actions/getData.ts
"use server";

import { cache } from "react";

export const contactAPI = cache(async (message: string) => {
  try {
    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
});
