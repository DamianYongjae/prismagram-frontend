import React from "react";
import Helmet from "rl-react-helmet";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { withRouter } from "react-router-dom";
import Loader from "../Components/Loader";
import { FEED_QUERY } from "./Feed";
import SquarePost from "../Components/SquarePost";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const Posts = styled.div`
  padding-top: 40px;
  display: grid;
  grid-template-columns: repeat(4, 200px);
  grid-template-rows: 200px;
  grid-auto-rows: 200px;
  gap: 5px;
`;

export default withRouter(() => {
  const { data, loading } = useQuery(FEED_QUERY);

  return (
    <Wrapper>
      <Helmet>
        <title>Explore | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      <Posts>
        {!loading &&
          data &&
          data.seeFeed &&
          data.seeFeed.map((post) => (
            <SquarePost
              key={post.id}
              id={post.id}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              file={post.files[0]}
            />
          ))}
      </Posts>
    </Wrapper>
  );
});
