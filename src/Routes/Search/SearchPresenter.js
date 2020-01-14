import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";
import Loader from "../../Components/Loader";
import UserCard from "../../Components/UserCard";

const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div``;

const SearchPresenter = ({ searchTerm, loading, data }) => {
  if (searchTerm === undefined) {
    return (
      <Wrapper>
        <FatText text="Searching for something" />
      </Wrapper>
    );
  } else if (loading === true) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else if (data && data.searchUser && data.searchPost) {
    return (
      <Wrapper>
        <Section>
          {data.searchUser.length === 0 ? (
            <FatText text="No users Found" />
          ) : (
            data.searchUser.map(user => (
              <UserCard
                key={user.username}
                username={user.username}
                isFollowing={user.isFollowing}
                url={user.url}
                isSelf={user.isSelf}
              />
            ))
          )}
        </Section>
        <Section>
          {data.searchPost.length === 0 ? (
            <FatText text="No posts Found" />
          ) : (
            data.searchPost.map(post => null)
          )}
        </Section>
      </Wrapper>
    );
  }
};

// (
//   <Wrapper>
//     {searchTerm === undefined && }
//     {loading && <Loader />}
//     {!loading && data && data.searchUser && data.searchUser.length === 0 ? (
//       <FatText text="No user found" />
//     ) : (
//       "Found something"
//     )}
//     {!loading && data && data.searchPost && data.searchPost.length === 0 && (
//       <FatText text="No photos found" />
//     )}
//   </Wrapper>
// );

SearchPresenter.prototype = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool
};

export default SearchPresenter;
