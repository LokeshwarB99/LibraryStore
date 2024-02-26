import React from "react";
import AdminSignup from "./AdminSignup";
interface Props {
  params: { userId: number };
}

const Library = ({ params: { userId } }: Props) => {
  return (
    <>
      <AdminSignup userId={userId} />
    </>
  );
};

export default Library;
