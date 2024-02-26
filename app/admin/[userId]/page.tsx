import React from "react";
import SearchBar from "./SearchBar";
interface Props {
  params: { userId: number };
}

const Library = ({ params: { userId } }: Props) => {
  return (
    <>
      <SearchBar userId={userId} />
    </>
  );
};

export default Library;
