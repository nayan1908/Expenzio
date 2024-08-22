import { BiLogOut, BiGridAlt, BiFile, BiWallet } from "react-icons/bi";

export const MENU_ARR = [
    {
        name: "Dashboard",
        url: "/dashboard",
        icon: <BiGridAlt />
    },
    {
        name: "Expense",
        url: "/expense",
        icon: <BiWallet />
    },
    {
        name: "Report",
        url: "",
        icon: <BiFile />
    },
    {
        name: "Logout",
        url: "/login",
        icon: <BiLogOut />
    }
];