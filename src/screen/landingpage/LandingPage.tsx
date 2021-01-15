import React from "react";
import {useHistory} from "react-router-dom";
import Button from "../components/Button/Button";

const LandingPage = () => {
  const history = useHistory();

  return (
    <div>
      <Button text={"Try it out!"} onClick={() => history.push("/application")}/>
    </div>
  );
}

export default LandingPage;