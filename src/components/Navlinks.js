import { NavLink } from "react-router-dom";
import links from "../utils/Links";


const Navlinks = ({togglesidebar}) => {
  return (
    <div className="nav-links">
            {links.map((link) => {
              const { text, path, id, icon } = link;

              return (
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  key={id}
                  onClick={togglesidebar}
                >
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
  )
}
export default Navlinks