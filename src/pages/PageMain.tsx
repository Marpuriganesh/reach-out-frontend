import LoginSignin from "./LoginSignin";
import Home from "./Home";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PageMain(): JSX.Element {
    const location = useLocation();
    const [renderPage, setRenderPage] = useState<'/home' | '/' >(location.pathname === '/home' ? '/home' : '/');

    useEffect(() => {
        if (location.pathname === '/home') {
            setRenderPage('/home');
        } else if (location.pathname === '/') {
            setRenderPage('/');
        } else {
            setRenderPage('/home');
        }
    }, [location.pathname]);

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div key={renderPage} style={{ height: '100%' , width: '100%'}}>
                    {renderPage === '/' && (
                        <LoginSignin/>
                    )}
                    {renderPage === '/home' && (
                        <Home />
                    )}
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default PageMain;
