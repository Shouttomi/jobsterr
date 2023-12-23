import Statitem from './Statitem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/StatsContainer';
import { useSelector } from 'react-redux';

const Statscontainer = () => {

    const {stats} = useSelector((store) => store.alljobs)

    const defaultstats = [
        {
          title: 'pending applications',
          count: stats.pending || 0,
          icon: <FaSuitcaseRolling />,
          color: '#e9b949',
          bcg: '#fcefc7',
        },
        {
          title: 'interviews scheduled',
          count: stats.interview || 0,
          icon: <FaCalendarCheck />,
          color: '#647acb',
          bcg: '#e0e8f9',
        },
        {
          title: 'jobs declined',
          count: stats.declined || 0,
          icon: <FaBug />,
          color: '#d66a6a',
          bcg: '#ffeeee',
        },
      ];

  return (
    <Wrapper>
        {defaultstats.map((item,index)=>{
            return <Statitem key = {index} {...item}/>
        })}
    </Wrapper>
  )
}
export default Statscontainer