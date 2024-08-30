import { BiLogOut, BiGridAlt, BiFile, BiWallet } from "react-icons/bi";

export const MENU_ARR = [
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: <BiGridAlt />,
        key: "dashboard"
    },
    {
        name: "Expense",
        url: "/expense",
        icon: <BiWallet />,
        key: "expense"
    },
    {
        name: "Report",
        url: "",
        icon: <BiFile />,
        key: "report"
    },
    {
        name: "Logout",
        url: "/login",
        icon: <BiLogOut />,
        key: "logout"
    }
];