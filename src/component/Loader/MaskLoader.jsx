import { useEffect, useState } from "react";
import { Mask } from "antd-mobile";
import SpinLoader from "./SpinLoader";
import "./mask-loader.css";

const MaskLoader = ({ isVisible }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible]);

    return (
        <Mask visible={visible}>
            <div className="overlay-content">
                <SpinLoader />
            </div >
        </Mask>
    );
}

export default MaskLoader;