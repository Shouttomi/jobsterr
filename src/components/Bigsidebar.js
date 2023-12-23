import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "../components/Logo";
import Navlinks from "./Navlinks";
import { useSelector } from "react-redux";

const Bigsidebar = () => {
  const { issidebaropen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          issidebaropen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks/>
        </div>
      </div>
    </Wrapper>
  );
};
export default Bigsidebar;
