import Top from "./Top";
import Banner from "./Banner";
import Footer from "./Footer";

const DefaultLayout = ({className, children}) => {
    return (
        <>
            <div className="container border-0">
                <Top />
                <Banner />
                <div>{children}</div>
                <Footer />
            </div>
        </>
    );
}

export default DefaultLayout;