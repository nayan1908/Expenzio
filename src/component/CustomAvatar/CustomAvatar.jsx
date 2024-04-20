import { Avatar } from "antd-mobile";

const CustomAvatar = ({ src = "", name = "" }) => {
    return (
        <Avatar src={src} alt={name} />
    );
}

export default CustomAvatar;