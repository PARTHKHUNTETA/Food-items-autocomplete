import "./App.css";
import SearchBox from "./components/SearchBox";

function App() {
  const transformData = (data: any) => data.recipes;
  const dataPromise = (query: string, signal: AbortSignal) =>
    fetch(`https://dummyjson.com/recipes/search?q=${query}&limit=10`, {
      signal,
    });

  return (
    <div className="wrapper">
      <SearchBox
        name="dishName"
        id="dishName"
        placeHolder="Search The Dish Name"
        label="Recipe Finder"
        autoComplete={true}
        styles={{
          label: "recipe-label",
          input: "input-field",
        }}
        onErrorMessage={() => <div>Something Went Wrong. Please try again.</div>}
        onNoDataMessage={() => <div>Sorry No Dish Found</div>}
        transformData={transformData}
        dataPromise={dataPromise}
        debounceWait={100}
      />
    </div>
  );
}

export default App;
