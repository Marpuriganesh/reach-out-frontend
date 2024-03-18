import LoginSignin from "./LoginSignin";
import Home from "./Home";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type PageProps = {
    path: string;
}

function PageMain(props: PageProps): JSX.Element {
    const [renderPage, setRenderPage] = useState<'/' | '/login' >(props.path === '/' ? '/' : '/login');

    useEffect(() => {
        if (props.path === '/') {
            setRenderPage('/');
        } else if (props.path === '/login') {
            setRenderPage('/login');
        } else {
            setRenderPage('/');
        }
    }, [props.path]);

    return (
        <>
            <AnimatePresence mode="wait">
                <motion.div key={renderPage}>
                    {renderPage === '/login' && (
                        <LoginSignin  />
                    )}
                    {renderPage === '/' && (
                        <Home />
                    )}
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default PageMain;
