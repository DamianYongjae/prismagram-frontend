import React, { useState } from "react";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";
import { EDIT_PROFILE } from "./EditProfileQueries";
import EditProfilePresenter from "./EditProfilePresenter";

export default () => {
  const [confirm, setConfirm] = useState("");
  const newUsername = useInput("");
  const newFirstName = useInput("");
  const newLastName = useInput("");
  const newBio = useInput("");
  const newEmail = useInput("");
  const newAvatar = useInput("");

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
