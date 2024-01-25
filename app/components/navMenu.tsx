// Made Wednesday, Janaury 24th, 2024
const navAppsList = [
    {title: "Chat Room", link: "/chatroom"},
    {title: "Chat-GPT", link: "/ai"}
]

// When Called it will give a nav Menu with all the apps in "navAppsList"
export const NavApps = () => {
    return (
        <nav className="dropNav">
            Apps
            <ul className="dropList">
            {navAppsList.map((apps, index) => {
                return (
                    <li className="nav-item" key={index}>
                        <a className="nav-item-link" href={apps.link}>{apps.title}</a>
                    </li>
                );
            })}
            </ul>
        </nav>
    )
}