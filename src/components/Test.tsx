import React, { useState } from "react";
import { produce } from "immer";

const Fun = () => {
  //   const [pizza, setPizza]= useState({
  //     name: 'spicy pepperoni',
  //     toppings: ['mushroom']
  //   });

  //   const handleClick=()=>{
  //     setPizza({
  //         ...pizza,
  //         toppings: [...pizza.toppings, 'onions']
  //     });
  //   }

  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "product 1", quantity: 1 },
      { id: 2, title: "product 2", quantity: 1 },
    ],
  });

  setCart({
    ...cart,
    items: cart.items.map((item) =>
      item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
    ),
  });
  //////////////////////////////////////////////////////////////////
  const [bugs, setBugs] = useState([
    { id: 1, title: "bug 1", fixed: true },
    { id: 1, title: "bug 2", fixed: false },
  ]);

  // const handleClickBug = () => {
  //   setBugs(
  //     bugs.map((bug) => (bug.id == 1 ? { ...bug, fixed: true } : bug)) // fixed is set true in the bug that is shallow copied
  //   );
  // };

  // correct way of manipulating using set function using immer library
  const handleClickBug = () => {
    setBugs(
      produce((drafts) => {
        const bug = drafts.find((bug) => bug.id == 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  ///////////////////////////////////////////////////////////////////
  const [tags, setTags] = useState(["happy", "cheerful"]);

  const handleClickTag = () => {
    // Add
    setTags([...tags, "sad"]);

    // Remove
    setTags(tags.filter((tag) => tag != "happy"));

    // Update
    setTags(tags.map((tag) => (tag == "happy" ? "happiness" : "tag")));

    //setTags(
    //  tags.map((tag) => (tag == 'happy' ? { ...tag, fixed: true } : tag)) // fixed is set true in the bug that is shallow copied
    //);
  };

  return <div></div>;
};

export default Fun;
