"use client";
import { contactAPI } from "@/actions/actions";
import { useState, ChangeEvent, FormEvent, KeyboardEvent } from "react";

interface APIResponse {
  message: string;
}

const SearchBar = () => {
  const [value, setValue] = useState<string>("");
  const [, setResponse] = useState<APIResponse | null>(null);
  const [history, setHistory] = useState<APIResponse[]>([]);

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    try {
      const res = await contactAPI(value);
      if (typeof res.message === "string") {
        const newResponse: APIResponse = {
          message: res.message,
        };
        setResponse({ message: res.message });
        setHistory((prevHistory) => [...prevHistory, newResponse]);
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

      {/* {response && (
        <div className="mt-4 p-4  bg-[#1F2222] rounded">
          <pre className="text-white">{response.message}</pre>
        </div>
      )} */}
      <h3 className="text-white mb-2">Command History:</h3>
      {history.length > 0 && ( // Show history only if there's more than one response
        <div className="mt-4 p-4 bg-[#1F2222] rounded">
          {history.slice(0).map(
            (
              item,
              index // Exclude the latest response from history
            ) => (
              <div key={index} className="mt-2">
                {/* <span className="text-gray-400">
                  {new Date(item.timestamp).toLocaleString()}:{" "}
                </span> */}
                <pre className="text-white inline">{item.message}</pre>
              </div>
            )
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
