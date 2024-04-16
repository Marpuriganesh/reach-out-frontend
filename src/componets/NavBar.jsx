
import {Link} from 'react-router-dom'
import './css files/NavBar.css'
import ReachOutLogoH from './assets/reach_out_horizontal_white.svg';



function NavBar(props) {

    const {className,...props_extra} = props;
  return (
    <>
    <nav className={className} {...props_extra}>
      <img alt='' src={ReachOutLogoH} id='logo'/>
    <li>
    <Link to='/home' title='How this works?' className='a'>ⓘ</Link>
    </li>
    
    </nav>
    </>
  )
}

export default NavBar