import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { ApplyUser } from "../page";
import MyDialog from "@/app/components/MyDialog";

interface Props {
  users: ApplyUser[];
}

const AvatarStack = ({ users }: Props) => {
  const handleClick = () => {
    // setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <IconButton onClick={handleClick}>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </IconButton>
      <IconButton>
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
      </IconButton>
      <IconButton>
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </IconButton>
    </div>
  );
};

export default AvatarStack;
