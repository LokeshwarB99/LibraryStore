import React from "react";
import Profile from "./Profile"

interface Props {
  params: { userId: number };
}

const Library = ({ params: { userId } }: Props) => {
  return (
    <>
      <Profile userId={userId} />
    </>
  );
};

export default Library;
