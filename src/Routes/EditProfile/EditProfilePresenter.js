import React from "react";
import Helmet from "rl-react-helmet";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Input from "../../Components/Input";
import { ME_QUERY } from "./EditProfileQueries";
import Button from "../../Components/Button";
import TextareaAutosize from "react-autosize-textarea";
import { Link, Redirect } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const Main = styled.main`
  padding-top: 30px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.lightGreyColor};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 50px;
  font-size: 18px;
  gap: 10px;
  &:first-child {
    height: 80px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  font-weight: 600;
`;

const Value = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 10px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  font-size: 18px;
  resize: none;
  padding-left: 15px;
  &:focus {
    outline: none;
  }
`;

const Username = styled.span`
  font-size: 25px;
  display: flex;
  align-items: center;
  padding-left: 5px;
`;

const EditInput = styled(Input)`
  background-color: white;
  font-size: 18px;
  padding-bottom: 1px;
  width: 100%;
  border: none;
  &:focus {
    outline: none;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 30px;
  Button {
    width: 120px;
    height: 40px;
    &:last-child {
      background-color: red;
    }
  }
`;

export default ({
  newUsername,
  newFirstName,
  newLastName,
  newEmail,
  newBio,
  newAvatar,
  confirm,
  onSubmit,
}) => {
  const { data, loading } = useQuery(ME_QUERY);

  if (!loading) {
    const {
      me: { avatar, username, fullName, bio, email, lastName, firstName },
    } = data;
    if (confirm === "") {
      return (
        <Wrapper>
          <Helmet>
            <title>Edit Profile | Prismagram</title>
          </Helmet>
          <Main>
            <Content>
              <List>
                <ListItem>
                  <Title>
                    <Avatar size="md" url={avatar} />
                  </Title>
                  <Value>
                    <Username>{username}</Username>
                  </Value>
                </ListItem>
                <ListItem>
                  <Title>Name</Title>
                  <Value>{fullName}</Value>
                </ListItem>
                <ListItem>
                  <Title>Username</Title>
                  <Value>
                    <EditInput
                      placeholder={username}
                      value={newUsername.value}
                      onChange={newUsername.onChange}
                    />
                  </Value>
                </ListItem>
                <ListItem>
                  <Title>First Name</Title>
                  <Value>
                    <EditInput
                      placeholder={firstName}
                      value={newFirstName.value}
                      onChange={newFirstName.onChange}
                    />
                  </Value>
                </ListItem>
                <ListItem>
                  <Title>Last Name</Title>
                  <Value>
                    <EditInput
                      placeholder={lastName}
                      value={newLastName.value}
                      onChange={newLastName.onChange}
                    />
                  </Value>
                </ListItem>
                <ListItem>
                  <Title>E-Mail</Title>
                  <Value>
                    <EditInput
                      placeholder={email}
                      value={newEmail.value}
                      onChange={newEmail.onChange}
                    />
                  </Value>
                </ListItem>
                <ListItem>
                  <Title>Avatar</Title>
                  <Value>
                    <EditInput
                      placeholder={avatar}
                      value={newAvatar.value}
                      onChange={newAvatar.onChange}
                    />
                  </Value>
                </ListItem>
                <ListItem>
                  <Title>Bio</Title>
                  <Value>
                    <Textarea
                      placeholder={bio}
                      value={newBio.value}
                      onChange={newBio.onChange}
                    />
                  </Value>
                </ListItem>
              </List>
            </Content>
            <ButtonRow>
              <Button text="Confirm" onClick={onSubmit} />

              <Link to={`/${username}`}>
                <Button text="Cancel" />
              </Link>
            </ButtonRow>
          </Main>
        </Wrapper>
      );
    } else {
      return <Redirect to="/" />;
    }
  } else {
    return <Loader />;
  }
};
