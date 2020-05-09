import React from "react";
import styled from "styled-components";
import { Helmet } from "rl-react-helmet";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import Button from "../../Components/Button";
import SquarePost from "../../Components/SquarePost";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderColumn = styled.div``;

const Username = styled.span`
  font-size: 26px;
  margin-bottom: 10px;
  display: block;
  padding-right: 5px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px;
`;

const Count = styled.li`
  font-size: 14px;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;
const Bio = styled.p`
  margin: 10px 0;
`;

const Posts = styled.div`
  padding-top: 40px;
  padding-left: 40px;
  display: grid;
  grid-template-columns: repeat(4, 150px);
  grid-template-rows: 150px;
  grid-auto-rows: 150px;
  gap: 5px;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 260px;
  gap: 5px;
  place-item: center center;
  Button {
    background-color: white;
    color: black;
    border: 1px solid ${(props) => props.theme.lightGreyColor};
  }
`;

export default ({ data, loading, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (!loading && data && data.seeUser) {
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts,
      },
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Prismagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <Avatar size="lg" url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>
              {isSelf ? (
                <ButtonRow>
                  <Link
                    to={{
                      pathname: "/editProfile",
                      state: {
                        data,
                      },
                    }}
                  >
                    <Button text="Edit Profile" />
                  </Link>
                  <Button onClick={() => logOut()} text="Log Out" />
                </ButtonRow>
              ) : (
                <FollowButton id={id} isFollowing={isFollowing} />
              )}
            </UsernameRow>
            <Counts>
              <Count>
                <FatText text={String(postsCount)} /> posts
              </Count>
              <Count>
                <FatText text={String(followersCount)} /> followers
              </Count>
              <Count>
                <FatText text={String(followingCount)} /> followings
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map((post) => (
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
  }
  return null;
};
