import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {}
const Like = () => {
  const [status, setstatus] = useState(true);

  if (status)
    return (
      <AiFillHeart
        color="#ff6b81"
        size={30}
        onClick={() => {
          setstatus(false);
        }}
      />
    );

  return (
    <AiOutlineHeart
      size={30}
      onClick={() => {
        setstatus(true);
      }}
    />
  );
};

export default Like;
