import { lazy } from "react"

const login = lazy(() => import("../pages/auth/Login"));
const register = lazy(() => import("../pages/auth/Register"));
const dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const expense = lazy(() => import("../pages/expense/Expense"));
const addExpense = lazy(() => import("../pages/expense/AddExpense"));

const ROUTES = [
    {
        path: "/",
        component : login,
        key: "/login",
        allowWithOutLogin : true
    },
    {
        path: "/login",
        component : login,
        key: "login",
        allowWithOutLogin : true
    },
    {
        path: "/register",
        component: register,
        key: "register",
        allowWithOutLogin: true
    },
    {
        path: "/dashboard",
        component: dashboard,
        key: "dashboard",
        allowWithOutLogin: false
    },
    {
        path: "/expense",
        component: expense,
        key: "expense",
        allowWithOutLogin: false
    },
    {
        path: "/expense/add",
        component: addExpense,
        key: "add_expense",
        allowWithOutLogin: false
    }
];

export default ROUTES;