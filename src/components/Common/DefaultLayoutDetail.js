import Top from "./Top";
import Footer from "./Footer";
import "./DefaultLayout.css"
const DefaultLayoutDetail = ({className, children }) => {
    return (
        <>
            <Top />
            <div className={className}>{children}</div>
            <Footer />
        </>
    );
};

export default DefaultLayoutDetail;