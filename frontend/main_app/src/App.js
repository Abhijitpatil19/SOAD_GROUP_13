import React, {
  memo,
  lazy,
  Suspense,
  useState,
  useRef,
  createContext,
  useEffect,
} from "react";

import "./App.css";
import "./styles/styles.css";
import "./styles/margins.css";
import "./styles/paddings.css";
import "./styles/displays.css";

import PropTypes from "prop-types";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";
import Fallback from "./components/errorBoundary/Fallback";
import isAuthenticated from "./utils/isAuthenticated";

// importing utilities functions and routes
import routes from "./routes";

// components imports
import SideDrawer from "./components/header/sideDrawer/SideDrawer";
import BackdropDark from "./components/layouts/backdrops/BackdropDark";

// Global context provider
import { GlobalProvider } from "./contexts/Provider";

const TopMessage = lazy(() => import("./components/header/TopMessage"));
const Header = lazy(() => import("./components/header/Header"));

// creating global contexts
export const locationContext = createContext();
export const searchBarContext = createContext();

// RenderRoute (helper for app component)
const RenderRoute = (route) => {
  const history = useHistory();
  const { addToast } = useToasts();

  // setting individual title
  document.title = route.title || "Workgent";

  // checks whether route needs authentication or not
  if (route.needsAuth && !isAuthenticated()) {
    const url = "/login?destination=" + route.path;
    history.push(url);
    addToast("Please login before continuing.", {
      appearance: "info",
      autoDismiss: true,
    });
  }
  return (
    <Route
      path={route.path}
      exact={route.exact ? true : false}
      strict={route.strict ? true : false}
      render={(props) => <route.component {...props} />}
    ></Route>
  );
};

function App() {
  // local state management
  const [isTopMsgVisible, setIsTopMsgVisible] = useState(true);
  const [headerPosTop, setHeaderPosTop] = useState("26px");
  const [bodyMarginTop, setBodyMarginTop] = useState("74px");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [location, setLocation] = useState({
    address: localStorage.getItem("address")
      ? localStorage.getItem("address")
      : "",
    lat: localStorage.getItem("lat") ? localStorage.getItem("lat") : undefined,
    long: localStorage.getItem("long")
      ? localStorage.getItem("long")
      : undefined,
  });
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(true);
  const [searchBarVisibleClass, setSearchBarVisibleClass] = useState(
    isSearchBarVisible
      ? "search_visible_body h-100 w-100"
      : "search_hidden_body h-100 w-100"
  );
  const [searchBarClass, setSearchBarClass] = useState(
    isSearchBarVisible
      ? "search_bar_visible pos_abs fcc w-100"
      : "search_bar_hidden pos_abs fcc w-100"
  );
  const [scrollingDown, setScrollingDown] = useState(false);

  // destructuring object based states
  const { address, lat, long } = location;

  // hide searchbar onScroll
  useEffect(() => {
    const threshold = 8;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollingDown(scrollY > lastScrollY ? () => true : () => false);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
      if (isSearchBarVisible && scrollingDown) {
        setIsSearchBarVisible(() => false);
        setSearchBarVisibleClass(() => "search_hidden_body h-100 w-100");
        setSearchBarClass(() => "search_bar_hidden pos_abs fcc w-100");
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollingDown]);

  // drawerClickHandler
  const drawerClickHandler = () => {
    setIsDrawerOpen(() => {
      return { isDrawerOpen: !isDrawerOpen };
    });
  };

  // --- backdrop and slide sideDrawer functionality ---
  let alpha = 0.75;

  // detecting backdrop and sideDrawer main divs
  const sideDrawerRef = useRef(null);
  const backdropRef = useRef(null);

  //backdrop click handler
  const backdropClickHandler = () => {
    setIsDrawerOpen(false);
  };

  // handling backdrop
  let backDropDark = undefined;

  if (isDrawerOpen) {
    backDropDark = (
      <BackdropDark
        backdropRef={backdropRef}
        alpha={alpha}
        click={backdropClickHandler}
      />
    );
  }

  // touch and swipe events function
  // side_drawer is in child component as of now
  const sideDrawer = sideDrawerRef.current;

  let startingX = null;

  // fun handleTouchStart
  const handleTouchStart = (e) => {
    startingX = e.touches[0].clientX;
  };

  // fun handleTouchMove
  const handleTouchMove = (e) => {
    const backdrop = backdropRef.current;

    if (backdrop) {
      // DEFINING touch parameters
      let touch = e.touches[0];
      let change = startingX - touch.clientX;

      // handling backdrop TRANSPARENCY parameters
      let getScreenWidth = window.innerWidth;
      let swipeRange = startingX;
      if (getScreenWidth > 428) {
        // calculate on 300px
        alpha = (touch.clientX / startingX) * 0.75;
      } else {
        // calculate on 70% of screen width
        alpha = (touch.clientX / swipeRange) * 0.75;
      }

      // if swipes right in home screen - do nothing
      if (change < 0) {
        return;
      } else {
        backdrop.style.background = `rgba(0, 0, 0, ${alpha})`;
        sideDrawer.style.left = "-" + change + "px";
        sideDrawer.style.transition = "all 0s";
      }
    }
  };

  // fun handleTouchEnd
  const handleTouchEnd = (e) => {
    var change = startingX - e.changedTouches[0].clientX;
    var threshold = window.innerWidth / 5;
    if (change < threshold) {
      sideDrawer.style.left = 0;
      sideDrawer.style.transition = "all ease-in 0.15s";
    } else {
      // perform backdrop click
      backdropClickHandler();
      // set left to 0 - dafault value
      sideDrawer.style.left = "0";
      sideDrawer.style.transition = "all ease-in 0.15s";
    }
  };

  // -----------------------------------------

  return (
    <div className="App">
      <GlobalProvider>
        <locationContext.Provider
          value={{
            address,
            lat,
            long,
            location,
            setLocation,
          }}
        >
          <searchBarContext.Provider
            value={{
              isSearchBarVisible,
              setIsSearchBarVisible,
              searchBarVisibleClass,
              setSearchBarVisibleClass,
              searchBarClass,
              setSearchBarClass,
            }}
          >
            <div className="App-header">
              <ErrorBoundary>
                <Suspense fallback={<Fallback />}>
                  {/* <LoadingBar
              className="w-100 bg_pink_grad"
              shadow={false}
              color={"#e52e71"}
              loaderSpeed={500}
              progress={progress}
              onLoaderFinished={() => setProgress(0)}
            /> */}
                  {isTopMsgVisible && (
                    <TopMessage
                      isTopMsgVisible={isTopMsgVisible}
                      setIsTopMsgVisible={setIsTopMsgVisible}
                      setHeaderPosTop={setHeaderPosTop}
                      setBodyMarginTop={setBodyMarginTop}
                    />
                  )}
                  <Header
                    headerPosTop={headerPosTop}
                    drawerClickHandler={drawerClickHandler}
                  />
                  <div
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    <SideDrawer
                      sideDrawerRef={sideDrawerRef}
                      isDrawerOpen={isDrawerOpen}
                      setIsDrawerOpen={setIsDrawerOpen}
                    />
                    {backDropDark}
                  </div>
                </Suspense>
              </ErrorBoundary>
            </div>
            <div style={{ marginTop: bodyMarginTop }} className="App-body">
              <div className={searchBarVisibleClass}>
                <ErrorBoundary>
                  <Suspense fallback={<Fallback />}>
                    <Switch>
                      {routes.map((route, index) => (
                        <RenderRoute {...route} key={index} />
                      ))}
                      <Redirect to="/error_404">Page not found</Redirect>
                    </Switch>
                  </Suspense>
                </ErrorBoundary>
              </div>
            </div>
          </searchBarContext.Provider>
        </locationContext.Provider>
      </GlobalProvider>
    </div>
  );
}

// defining propTypes
App.propTypes = {
  isTopMsgVisible: PropTypes.bool,
  headerPosTop: PropTypes.string,
  bodyMarginTop: PropTypes.string,
};

export default memo(App);
