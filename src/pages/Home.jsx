import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
function Home() {
  console.log(import.meta.env.VITE_TEST_KEY)
  return (
    <motion.div
    initial={{ y:"100vh"}}
    animate={{ y:"0vh",transition: { duration: 0.5 } }}
    exit={{ y:"100vh",transition: { duration: 0.3 } }}
    >
    <div>Home</div>
    <Link to="/login">Login</Link>
    </motion.div>
  )
}

export default Home