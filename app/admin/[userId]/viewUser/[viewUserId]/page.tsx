import React from "react";
import ViewUser from "./ViewUser";
interface Props {
  params: { viewUserId: number; userId: number };
}

const Library = ({ params: { viewUserId, userId } }: Props) => {
  return (
    <>
      <ViewUser viewUserId={viewUserId} userId={userId} />
    </>
  );
};

export default Library;
