import LoginSignin from "./LoginSignin";
import Home from "./Home";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type PageProps = {
    path: string;
}

function PageMain(props: PageProps): JSX.Element {
    const [renderPage, setRenderPage] = useState<'/' | '/login' | '/signin'>(props.path === '/' ? '/' : '/login');

    useEffect(() => {
        if (props.path === '/') {
            setRenderPage('/');
        } else if (props.path === '/login' || props.path === '/signin') {
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
                        <LoginSignin path={props.path} />
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
