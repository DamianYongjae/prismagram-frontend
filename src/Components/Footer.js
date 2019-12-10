import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  margin: 50px 0px;
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${props => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${props => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem key={0}>
        <Link href="#">about us</Link>
      </ListItem>
      <ListItem key={1}>
        <Link href="#">support</Link>
      </ListItem>
      <ListItem key={2}>
        <Link href="#">press</Link>
      </ListItem>
      <ListItem key={3}>
        <Link href="#">api</Link>
      </ListItem>
      <ListItem key={4}>
        <Link href="#">jobs</Link>
      </ListItem>
      <ListItem key={5}>
        <Link href="#">privacy</Link>
      </ListItem>
      <ListItem key={6}>
        <Link href="#">terms</Link>
      </ListItem>
      <ListItem key={7}>
        <Link href="#">directory</Link>
      </ListItem>
      <ListItem key={8}>
        <Link href="#">profiles</Link>
      </ListItem>
      <ListItem key={9}>
        <Link href="#">hashtags</Link>
      </ListItem>
      <ListItem key={10}>
        <Link href="#">language</Link>
      </ListItem>
    </List>
    <Copyright>Instaclone {new Date().getFullYear()} &copy;</Copyright>
  </Footer>
);
