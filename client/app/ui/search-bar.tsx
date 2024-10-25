"use client";
import { contactAPI } from "@/actions/actions";
import { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";

interface APIResponse {
  message: string;
}

const SearchBar = () => {
  const [value, setValue] = useState<string>("");
  const [response, setResponse] = useState<APIResponse | null>(null);

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    try {
      const res = await contactAPI(value);
      if (typeof res.message === "string") {
        setResponse({ message: res.message });
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setResponse({
        message: "An error occurred while processing your request.",
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <textarea
        className="bg-[#1F2222] w-full rounded-md mt-4 ring-1 focus:ring-2 ring-slate-500 outline-none focus:outline-none p-4 font-sans caret-superDuper h-full"
        placeholder="Enter bash commands"
        required
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      {response && (
        <div className="mt-4 p-4  bg-[#1F2222] rounded">
          <pre className="text-white">{response.message}</pre>
        </div>
      )}
    </form>
  );
};

export default SearchBar;


