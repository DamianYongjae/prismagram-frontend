import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import { ME } from "../../SharedQuery";
import NotificationsPresenter from "./NotificationsPresenter";
import Loader from "../../Components/Loader";
import { Redirect } from "react-router-dom";

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

export default () => {
  const { data: user, loading: done } = useQuery(ME);

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

  if (!done && Object.keys(user).length !== 0) {
    const { data: userInfo, loading } = useQuery(NOTI_QUERY, {
      variables: {
        username: user.me.username,
      },
    });
    if (!loading) {
      return (
        <NotificationsPresenter
          loading={loading}
          done={done}
          username={user.me.username}
          compare={compare}
          userInfo={userInfo}
        />
      );
    } else {
      return <Loader />;
    }
  } else {
    return <Redirect to="/" />;
  }
};
