import { useState } from "react";
import styles from "./ListGroup.module.css";

interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setselectedIndex] = useState(-1);

  return (
    // react knows that '<></>' is Fragment wrap
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p> no item</p>}
      <ul className={[styles.listGroup, styles.container].join(" ")}>
        {items.map((item, index) => (
          <li
            className={
              selectedIndex == index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={item}
            onClick={() => {
              setselectedIndex(index);
              //onSelectItem(item);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;

// props: input passed to the a component, similar to functional args; IMMUTABLE
// state: data mamaged by component, similar to local variables; MUTABLE
