// import ListGroup from "./components/ListGroup";

// function App() {
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

// export default App;
import React, { useState } from "react";
import Button from "./components/Button/Button";
import Alert from "./components/Alert";
// import Alert from "./components/Alert";

// const App = () => {
//   return (
//     <div>
//       <Alert>
//         {" "}
//         Hello <span> World </span>
//       </Alert>
//     </div>
//   );
// };

const App = () => {
  const [alertVisibility, setalertVisibility] = useState(false);
  return (
    <div>
      {alertVisibility && (
        <Alert
          onClose={() => {
            setalertVisibility(false);
          }}
        >
          my alert
        </Alert>
      )}
      <Button
        onClick={() => {
          setalertVisibility(true);
        }}
        color="secondary"
      >
        My Button
      </Button>
    </div>
  );
};

export default App;
