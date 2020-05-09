import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import { EDIT_PROFILE } from "./EditProfileQueries";
import EditProfilePresenter from "./EditProfilePresenter";
import { Link } from "react-router-dom";

export default (props) => {
  if (props.location.state === undefined) {
    return <Link to="/" />;
  }
  const user = props.location.state.data.seeUser;
  const [confirm, setConfirm] = useState("");
  const newUsername = useInput(user.username);
  const newFirstName = useInput(user.firstName);
  const newLastName = useInput(user.lastName);
  const newBio = useInput(user.bio);
  const newEmail = useInput(user.email);
  const newAvatar = useInput(user.avatar);

  const [editProfileMutation] = useMutation(EDIT_PROFILE, {
    variables: {
      email: newEmail.value,
      username: newUsername.value,
      firstName: newFirstName.value,
      lastName: newLastName.value,
      bio: newBio.value,
      avatar: newAvatar.value,
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (
      newEmail.value !== "" &&
      newUsername.value !== "" &&
      newFirstName.value !== "" &&
      newLastName.value !== "" &&
      newBio.value !== "" &&
      newAvatar.value !== ""
    ) {
      try {
        const data = await editProfileMutation();
        if (data === null) {
          toast.error("Can't edit profile");
        } else {
          toast.success("Editing profile success!!");
          setTimeout(() => setConfirm(data.data.editUser.username), 2000);
        }
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error("All field are required");
    }
  };

  return (
    <EditProfilePresenter
      newUsername={newUsername}
      newFirstName={newFirstName}
      newLastName={newLastName}
      newEmail={newEmail}
      newBio={newBio}
      newAvatar={newAvatar}
      confirm={confirm}
      onSubmit={onSubmit}
    />
  );
};
