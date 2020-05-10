import React from "react";
import Helmet from "rl-react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import { ME } from "../SharedQuery";
import { Link } from "react-router-dom";

export const NOTI_QUERY = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      posts {
        id
        comments {
          createdAt
          post {
            id
            files {
              id
              url
            }
          }
          user {
            username
            avatar
          }
        }
        likes {
          createdAt
          post {
            id
            files {
              id
              url
            }
          }
          user {
            username
            avatar
          }
        }
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const NotiContainer = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-itmes: center;
`;

const NotiContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.lightGreyColor};
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin: 10px;
`;

const Name = styled.span`
  color: ${(props) => props.theme.blueColor};
  font-weight: 600;
  font-size: 15px;
`;

const Text = styled.span`
  font-size: 15px;
  padding-left: 3px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

export default (props) => {
  const { data: user } = useQuery(ME);

  function compare(a, b) {
    const date1 = a.createdAt;
    const date2 = b.createdAt;

    let comparison = 0;

    if (date1 < date2) {
      comparison = 1;
    } else if (date1 > date2) {
      comparison = -1;
    }
    return comparison;
  }

  if (user !== undefined) {
    const username = user.me.username;
    const { data, loading } = useQuery(NOTI_QUERY, {
      variables: {
        username,
      },
    });
    if (loading) {
      return (
        <Wrapper>
          <Helmet>
            <title>Notification | Prismagram</title>
          </Helmet>
          <Loader />
        </Wrapper>
      );
    } else {
      const { posts } = data.seeUser;
      const commentList = [];
      const likeList = [];

      posts.map((post) => {
        post.comments.map((comment) => {
          return commentList.push(comment);
        });
        post.likes.map((like) => {
          return likeList.push(like);
        });
        return true;
      });

      let notiList = commentList.concat(likeList).sort(compare);

      notiList = notiList.filter((list) => list.user.username !== username);

      return (
        <Wrapper>
          <Helmet>
            <title>Notification | Prismagram</title>
          </Helmet>
          <NotiContainer>
            {notiList.length === 0 ? (
              <Wrapper style={{ border: "none" }}>No notifications!</Wrapper>
            ) : (
              notiList.map((list) => {
                return (
                  <NotiContent key={list.createdAt}>
                    <InfoContainer>
                      <Link to={`/${list.user.username}`}>
                        <Avatar src={list.user.avatar}></Avatar>
                      </Link>
                      <Link to={`/${list.user.username}`}>
                        <Name>{list.user.username}</Name>
                      </Link>
                      <Text>
                        {list.__typename === "Comment"
                          ? " left comment on your photo."
                          : " liked your photo."}
                      </Text>
                    </InfoContainer>
                    <Link to={`/postId?id=${list.post.id}`}>
                      <Image src={list.post.files[0].url} />
                    </Link>
                  </NotiContent>
                );
              })
            )}
          </NotiContainer>
        </Wrapper>
      );
    }
  } else {
    return <Loader />;
  }
};
