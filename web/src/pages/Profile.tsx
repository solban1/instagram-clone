import { useEffect } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();
  return (
    <div className="center">
      <div>{username}</div>
    </div>
  );
};

export default Profile;
