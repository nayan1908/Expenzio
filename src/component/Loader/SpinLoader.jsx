import { SpinLoading } from "antd-mobile";

const SpinLoader = (props) => {
    return (
        <div style={{ display: "flex", justifyContent: "center", margin: "5%" }}>
            <SpinLoading {...props} />
        </div>
    );
}

export default SpinLoader;