import React, { useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

function Loader() {
  let [loading, setLoading] = useState(true);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="sweet-loading text-center">
        <ScaleLoader
          color="#000"
          loading={loading}
          css=""
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}

export default Loader;
