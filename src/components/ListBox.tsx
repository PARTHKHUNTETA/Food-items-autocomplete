interface ListBoxProps {
  items: { name: string }[];
  activeIndex: number | null;
  query: string;
  handleOnClick: (data: string) => void;
}

const ListBox = ({
  items,
  activeIndex,
  query,
  handleOnClick,
}: ListBoxProps) => {
    
  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <strong className="highlight" key={i}>
              {part}
            </strong>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <ul className="list-box-container">
      {items.map((item, index) => (
        <li
          onClick={() => handleOnClick(item.name)}
          className={`list-box-item ${
            index === activeIndex ? "active-item" : ""
          }`}
          key={index}
        >
          {highlightMatch(item.name, query)}
        </li>
      ))}
    </ul>
  );
};

export default ListBox;
