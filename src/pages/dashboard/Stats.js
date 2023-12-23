import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showstats } from "../../features/alljobs/alljobsSlice";
import { Statscontainer, Loading, Chartscontainer } from "../../components";

const Stats = () => {
 
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.alljobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showstats());
    //eslint-disable-next-line
  }, []);

 
 
  return <>
  
  <Statscontainer/>

  {monthlyApplications.length > 0 && <Chartscontainer/>}

  </>;
};
export default Stats;
