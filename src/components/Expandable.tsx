import React, { Children, useState } from "react";

interface Props {
  children: string;
  maxchars: number;
  handleClick: () => void;
}
const Expandable = ({ children, maxchars }: Props) => {
  const [isExpandable, setIsExpandable] = useState(false);

  
    if (children.length <= maxchars) return <p> {children}</p>;

    const text = isExpandable ? children : children.substring(0, maxchars);

    return (
      <div>
        {" "}
        <p> {text} </p>{" "}
        <button
          onClick={() => {
            setIsExpandable(!isExpandable);
          }}
        >
          {" "}
          {isExpandable ? "less" : "more"}{" "}
        </button>{" "}
      </div>
    );
  
};

export default Expandable;
