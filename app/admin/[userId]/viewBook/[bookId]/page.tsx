import React from "react";
import ViewBook from "./ViewBook"
interface Props {
  params: { bookId: number,userId:number };
}

const Library = ({ params: { bookId,userId } }: Props) => {
  return <><ViewBook bookId={bookId} userId={userId} /></>;
};

export default Library;
