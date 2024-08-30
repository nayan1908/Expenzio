import { ErrorBlock } from "antd-mobile";

const NoRecord = (props) => {
    const { title = null, description = "No record" } = props;

    return (
        <ErrorBlock
            title={title}
            description={description}
            status="empty"
            fullPage={true}
        />
    );
}

export default NoRecord;