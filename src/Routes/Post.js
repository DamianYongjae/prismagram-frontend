import React from "react";
import Helmet from "rl-react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { withRouter, useLocation } from "react-router-dom";
import Loader from "../Components/Loader";
import Post from "../Components/Post";

export const POST_QUERY = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

export default withRouter(() => {
  let id = useLocation().search.split("=")[1];
  const { data, loading } = useQuery(POST_QUERY, {
    variables: {
      id,
    },
  });
  return (
    <Wrapper>
      <Helmet>
        <title>Post | Prismagram</title>
      </Helmet>
      {loading && <Loader />}
      {!loading && data && data.seeFullPost && (
        <Post
          key={data.seeFullPost.id}
          id={data.seeFullPost.id}
          location={data.seeFullPost.location}
          caption={data.seeFullPost.caption}
          user={data.seeFullPost.user}
          files={data.seeFullPost.files}
          likeCount={data.seeFullPost.likeCount}
          isLiked={data.seeFullPost.isLiked}
          comments={data.seeFullPost.comments}
          createdAt={data.seeFullPost.createdAt}
          isSingle={true}
        />
      )}
    </Wrapper>
  );
});
