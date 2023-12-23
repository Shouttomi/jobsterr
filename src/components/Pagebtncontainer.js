import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSelector, useDispatch } from "react-redux";
import { changepage } from "../features/alljobs/alljobsSlice";

const Pagebtncontainer = () => {
  const { numOfPages, page } = useSelector((store) => store.alljobs);
  const dispatch = useDispatch();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextpage = () => {
    let newpage = page + 1 

    if(newpage>numOfPages){
      newpage = 1
    }


    dispatch(changepage(newpage))
  };

  const prevpage = () => {
    let newpage = page - 1 

    if(newpage<1){
      newpage = numOfPages
    }

    dispatch(changepage(newpage))
  };

  return (
    <Wrapper>
      <button type="button" className="prev-btn" onClick={prevpage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pagenumber) => {
          return (
            <button
              type="button"
              key={pagenumber}
              onClick={() => {
                dispatch(changepage(pagenumber));
              }}
              className={pagenumber === page ? "pageBtn active" : "pageBtn"}
            >
              {pagenumber}
            </button>
          );
        })}
      </div>

      <button type="button" className="prev-btn" onClick={nextpage}>
        <HiChevronDoubleRight />
        Next
      </button>
    </Wrapper>
  );
};
export default Pagebtncontainer;
