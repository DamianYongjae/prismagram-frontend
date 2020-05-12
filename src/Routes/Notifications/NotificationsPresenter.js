import React from "react";
import Helmet from "rl-react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";
import NotificationsContainer from ".";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const NotiContainer = styled.div`
  max-width: 600px;
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
  width: 90%;
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

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Text = styled.span`
  font-size: 15px;
  padding-left: 3px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

export default ({ username, compare, userInfo, loading, done }) => {
  const getTimeDiff = (postTime, now) => {
    if (postTime.getMonth() === now.getMonth()) {
      if (postTime.getDate() === now.getDate()) {
        if (postTime.getHours() === now.getHours()) {
          if (postTime.getMinutes() === now.getMinutes()) {
            return "Just now";
          } else {
            return now.getMinutes() - postTime.getMinutes() + " minutes ago";
          }
        } else if (postTime.getHours() - now.getHours() === -1) {
          return "About an hour ago";
        } else {
          return "About " + now.getHours() - postTime.getHours() + " hours ago";
        }
      } else {
        return now.getDate() - postTime.getDate() + " days ago";
      }
    } else {
      return now.getDate() - postTime.getDate() + 30 + " days ago";
    }
  };

  if (!done) {
    if (loading) {
      return (
        <Wrapper>
          <Helmet>
            <title>Notification | Prismagram</title>
          </Helmet>
          <Loader />
        </Wrapper>
      );
    } else if (userInfo !== undefined && Object.keys(userInfo).length !== 0) {
      const { posts } = userInfo.seeUser;
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
      const now = new Date();
      const notiLimitDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - 30,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );

      notiList = notiList.filter(
        (list) =>
          list.user.username !== username &&
          list.createdAt > notiLimitDate.toISOString()
      );

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
                  <NotiContent key={`${list.createdAt}+${list.user.username}`}>
                    <InfoContainer>
                      <Link to={`/${list.user.username}`}>
                        <Avatar src={list.user.avatar}></Avatar>
                      </Link>
                      <Link to={`/${list.user.username}`}>
                        <Name>{list.user.username}</Name>
                      </Link>
                      <TextContainer>
                        <Text>
                          {list.__typename === "Comment"
                            ? " left comment on your photo."
                            : " liked your photo."}
                        </Text>
                        <Text
                          style={{
                            fontSize: 10,
                            color: "gray",
                          }}
                        >
                          {getTimeDiff(new Date(list.createdAt), new Date())}
                        </Text>
                      </TextContainer>
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
    } else {
      return <NotificationsContainer />;
    }
  } else {
    return <Loader />;
  }
};
