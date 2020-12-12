import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h1>
        The file you're looking for, couldn't be found on our server. Please
        check the url.
      </h1>
      <Link to="/" className="link">
        Go to Homepage
      </Link>
    </div>
  );
};

export default Error404;
