import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { ApplyUser } from "../page";
import MyDialog from "@/app/components/MyDialog";

interface Props {
  users: ApplyUser[];
  onClick: (user: ApplyUser) => void;
}

const AvatarStack = ({ users, onClick }: Props) => {
  const renderedAvatars = users.map((user) => (
    <IconButton key={user.userId} onClick={() => onClick(user)}>
      <Avatar
        alt={user.studentRealName}
        src={user.studentImageUrl ? user.studentImageUrl : " "}
      />
    </IconButton>
  ));

  return <div className="flex flex-wrap gap-2">{renderedAvatars}</div>;
};

export default AvatarStack;
