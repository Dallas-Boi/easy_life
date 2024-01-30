// Made Wednesday, Janaury 24th, 2024
const navAppsList = [
    {title: "Chat Room", link: "/lifeApps/chatroom"},
    {title: "Chat-GPT", link: "/ai"}
]
// The List of items for the profile nav menu
const navProfileList_log = [
    {title: "Profile", link: "/acc/profile"},
    {title: "Logout", link: "/acc/logout"}
]
// The List of items for the profile nav menu ( Logged out )
const navProfileList_out = [
    {title: "Sign Up", link: "/acc/signup"},
    {title: "LogIn", link: "/acc/login"}
]

// It will return the items with the index and link (Makes code easier to fix)
const NavItems = (props: any) => {
    return (
        <li className="nav-item" key={props.index}>
            <a className="nav-item-link" href={props.apps.link}>{props.apps.title}</a>
        </li>
    )
}

// When Called it will give a nav Menu with all the apps in "navAppsList"
export const NavApps = () => {
    return (
        <nav className="dropNav">
            Apps
            <ul className="dropList">
                {navAppsList.map((apps, index) => {
                    return <NavItems index={index} apps={apps} />
                })}
            </ul>
        </nav>
    )
}

// Returns the Navigations for the profile if logged in
export const NavName = (props: any) => {
    var useList = [] // The list to use
    if (props.data == "logged") {useList = navProfileList_log}
    else if (props.data == "sign") {useList = navProfileList_out}
    // Returns the items with the items in "useList"
    return (
        <ul className="dropList">
            {useList.map((apps, index) => {
                return <NavItems index={index} apps={apps} />
            })}
        </ul>
    )
}