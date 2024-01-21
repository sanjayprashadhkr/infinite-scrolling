import React, { useEffect, useState } from "react";
import { Loader } from "./Loader";
// Define an interface for the quote data
interface Quote {
  content: string;
  // Add other properties if needed, like author, etc.
}

export const MyComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Use the Quote interface to type quotesData
  const [quotesData, setQuotesData] = useState<Quote | null>(null);
  let [color, setColor] = useState("#ff8787");

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      try {
        const response = await fetch("https://api.quotable.io/random");
        const data: Quote = await response.json();
        console.log(data);
        setQuotesData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ced4da",
        width: "500px",
        height: "100px",
        marginTop: "100px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? <Loader /> : <div>{quotesData?.content}</div>}
    </div>
  );
};
