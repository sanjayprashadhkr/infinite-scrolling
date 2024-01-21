import React, { useState, useEffect } from "react";
import { MyComponent } from "./MyComponent";
import { Loader } from "./Loader";

function App() {
  const [components, setComponents] = useState(Array.from({ length: 5 }));
  const [isLoading, setIsLoading] = useState(false);

  // Function to simulate data fetching
  const fetchMoreData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setComponents((prevComponents) => [
        ...prevComponents,
        ...Array.from({ length: 5 }),
      ]);
      setIsLoading(false);
    }, 1500);
  };

  // Handler for the scroll event
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchMoreData();
  };

  // Adding and removing the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div
      className="App"
      style={{
        width: "500px",
        margin: "0 auto",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {components.map((_, index) => (
        <MyComponent key={index} />
      ))}
      {isLoading && <Loader />}
    </div>
  );
}

export default App;
