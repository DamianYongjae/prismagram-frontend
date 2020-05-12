import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";

const Post = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 500px;
  margin-bottom: 25px;
  user-select: none;
  a {
    color: inherit;
  }
`;

const PostSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  ${(props) => props.theme.whiteBox};
  background-color: none;
  width: 100%;
  max-width: 900px;
  height: 80vh;
  margin-bottom: 25px;
  user-select: none;
  a {
    color: inherit;
  }
`;
const MetaSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  height: 100%;
  width: 40%;
  padding: 20px;
  border-left: 1px solid ${(props) => props.theme.lightGreyColor};
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 550px;
  height: 80vh;
  position: relative;
  top: 140px;
  left: 342px;
  background-images: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const CommentArea = styled.div`
  border-top: 1px solid ${(props) => props.theme.lightGreyColor};
  border-bottom: 1px solid ${(props) => props.theme.lightGreyColor};

  padding-top: 10px;
  height: 65%;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Caption = styled.div`
  display: block;
  margin-bottom: 10px;
`;

const Files = styled.div`
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.img`
  max-width: 100%;
  width: 100%;
  height: 500px;
  position: relative;
  top: 0;
  background-images: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${(props) => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${(props) => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  font-size: 14px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  caption,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  isSingle,
}) => {
  const regularPost = () => (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <Link to={`/${username}`}>
            <FatText text={username}></FatText>
          </Link>
          <Location>{location}</Location>
        </UserColumn>
      </Header>
      <Files>
        {files &&
          files.map((file, index) => (
            <File
              key={file.id}
              id={file.id}
              src={file.url}
              showing={index === currentItem}
            />
          ))}
      </Files>
      <Meta>
        <Caption>{caption}</Caption>
        <Buttons>
          <Button onClick={toggleLike} key={"like"}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button key={"comment"}>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        {comments && (
          <Comments>
            {comments.map((comment) => (
              <Comment key={comment.id}>
                <Link to={`/${comment.user.username}`}>
                  <FatText text={comment.user.username}></FatText>
                </Link>
                {comment.text}
              </Comment>
            ))}
            {selfComments.map((comment) => (
              <Comment key={comment.id}>
                <FatText text={comment.user.username}></FatText>
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}

        <Timestamp>{createdAt}</Timestamp>
        <Textarea
          placeholder={"Add a comment..."}
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyPress={onKeyPress}
        />
      </Meta>
    </Post>
  );

  const singlePost = () => (
    <PostSection>
      <ImageSection>
        {files &&
          files.map((file, index) => (
            <Image
              key={file.id}
              id={file.id}
              src={file.url}
              showing={index === currentItem}
            />
          ))}
      </ImageSection>
      <MetaSection>
        <Header>
          <Avatar size="sm" url={avatar} />
          <UserColumn>
            <Link to={`/${username}`}>
              <FatText text={username}></FatText>
            </Link>
            <Location>{location}</Location>
          </UserColumn>
        </Header>
        <CommentArea>
          <Caption>{caption}</Caption>
          {comments && (
            <Comments>
              {comments.map((comment) => (
                <Comment key={comment.id}>
                  <Link to={`/${comment.user.username}`}>
                    <FatText text={comment.user.username}></FatText>
                  </Link>
                  {comment.text}
                </Comment>
              ))}
              {selfComments.map((comment) => (
                <Comment key={comment.id}>
                  <FatText text={comment.user.username}></FatText>
                  {comment.text}
                </Comment>
              ))}
            </Comments>
          )}
        </CommentArea>
        <Buttons>
          <Button onClick={toggleLike} key={"like"}>
            {isLiked ? <HeartFull /> : <HeartEmpty />}
          </Button>
          <Button key={"comment"}>
            <CommentIcon />
          </Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />

        <Timestamp>{createdAt}</Timestamp>
        <Textarea
          placeholder={"Add a comment..."}
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyPress={onKeyPress}
        />
      </MetaSection>
    </PostSection>
  );

  return isSingle ? singlePost() : regularPost();
};
