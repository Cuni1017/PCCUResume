import { User } from "@/redux/slices/user";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@mui/material";

const Profile = ({ user }: { user: User }) => {
  const { signout } = useAuth();

  return (
    <div className="flex items-center">
      <div className="mr-1">Hello! {user.username}</div>
      <Button onClick={signout} color="primary">
        登出
      </Button>
    </div>
  );
};

export default Profile;
