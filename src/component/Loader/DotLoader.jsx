import { DotLoading } from "antd-mobile";


const DotLoader = (props) => {
    const { color = props?.color || "white", ...rest } = props;
    
    return (
        <DotLoading color={color} {...rest} />
    );
}

export default DotLoader;