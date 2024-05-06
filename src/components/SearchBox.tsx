import React, { useState } from "react";
import useFetchData from "../utils/useFetch";
import ListBox from "./ListBox";

interface SearchBoxProps {
  id: string;
  placeHolder: string;
  name: string;
  label: string;
  autoComplete: boolean;
  styles: {
    label: string;
    input: string;
  };
  onErrorMessage: () => JSX.Element;
  onNoDataMessage: () => JSX.Element;
  transformData: (data: any) => any;
  dataPromise: (query: string, signal: AbortSignal) => Promise<Response>;
  debounceWait: number;
}
const SearchBox = ({
  id,
  placeHolder,
  name,
  label,
  autoComplete,
  styles,
  onErrorMessage,
  onNoDataMessage,
  transformData,
  dataPromise,
  debounceWait,
}: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
  const [data, setData, error] = useFetchData(
    query,
    transformData,
    dataPromise,
    debounceWait,
    isAutoComplete
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // user enter
      if (activeIndex === null) return;

      setQuery(data[activeIndex].name);
      setData(null);
      setActiveIndex(null);
      setIsAutoComplete(false);

      return;
    }
    setIsAutoComplete(true);

    if (!data || data.length === 0) return;

    if (e.key === "ArrowDown") {
      // move down
      setActiveIndex((prevIndex) =>
        prevIndex === null || prevIndex === data.length - 1 ? 0 : prevIndex + 1
      );
    } else if (e.key === "ArrowUp") {
      // move up
      setActiveIndex((prevIndex) =>
        !prevIndex ? data.length - 1 : prevIndex - 1
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleOnClick = (data: string) => {
    setQuery(data);
    setData(null);
    setActiveIndex(null);
    setIsAutoComplete(false);
  };

  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <br />
      <input
        id={id}
        className={styles.input}
        placeholder={placeHolder}
        value={query}
        onChange={handleInputChange}
        autoComplete="off"
        onKeyUp={handleKeyUp}
      />
      {data && data.length > 0 && (
        <ListBox
          items={data}
          activeIndex={activeIndex}
          query={query}
          handleOnClick={handleOnClick}
        />
      )}
      {query && data && data.length === 0 && onNoDataMessage()}
      {error && onErrorMessage()}
    </div>
  );
};

export default SearchBox;
