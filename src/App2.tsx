// import ListGroup from "./components/ListGroup/ListGroup";

// function App2() {
//   const cities = ["new-york", "london", "stockholm", "brussels", "hunza"];
//   const handleSelectItem = (item: string) => {
//     console.log(item);
//   };
//   return (
//     <p>
//       <ListGroup
//         items={cities}
//         heading={"List"}
//         onSelectItem={handleSelectItem}
//       />
//     </p>
//   );
// }

import React, { useState } from "react";
import { produce } from "immer";
import Like from "./components/Like";
import Expandable from "./components/Expandable";
//import Form from "./components/Form/Form-useForm";
import Form2 from "./components/Form/Form2";
import Form from "./components/Form/Form-useForm-zod";

const App2 = () => {
  const [bugs, setBugs] = useState([
    { id: 1, title: "bug 1", fixed: false },
    { id: 1, title: "bug 2", fixed: false },
  ]);

  const handleClickBug = () => {
    setBugs(
      produce((drafts) => {
        const bug = drafts.find((bug) => bug.id == 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  const [drink, setDrink] = useState({ title: "Americano", price: 5 });
  const handleClickDrink = () => {
    const newdrink = {
      ...drink,
      price: 6,
    };
    setDrink({ ...drink, price: 6 });
  };

  // <>
  //   {/* <div>
  //     {bugs.map((bug) => (
  //       <p key={bug.id}>
  //         {" "}
  //         {bug.title} {bug.fixed ? "fixed" : "new"}
  //       </p>
  //     ))}
  //     {drink.price}
  //     <button onClick={handleClickBug}> Click Me </button>
  //     <button onClick={handleClickDrink}> Click Me </button>
  //   </div> */}
  // </>
  const text =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In aspernatur incidunt repellat ullam delectus, doloribus nostrum explicabo facere enim nulla quasi distinctio voluptate dicta autem, cupiditate vero! Consequatur, perferendis ratione";
  // return (
  //   <Expandable
  //     children={text}
  //     maxchars={10}
  //     handleClick={function (): void {
  //       throw new Error("Function not implemented.");
  //     }}
  //   ></Expandable>
  // );

  return <Form />;
};

export default App2;
