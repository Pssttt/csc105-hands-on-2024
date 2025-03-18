import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const FavouriteDetail = () => {
  const { favId } = useParams();
  const [searchParams] = useSearchParams();
  return (
    <>
      <p>
        Your favourite post is <b>{searchParams.get("q")}</b>. Post ID is{" "}
        <b>{favId}</b>. Size is <b>{searchParams.get("size")}</b>.
      </p>
    </>
  );
};

export default FavouriteDetail;
