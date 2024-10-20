// CvMosaic.jsx
// Mosaique de cv à partir de CvPreview
import React from "react";
import CvPreview from "./CvPreview.jsx";


export default function CvMosaic({cvs}) {
  // Ensure cvs is an array
  const cvsArray = Array.isArray(cvs) ? cvs : [];

  console.log(cvsArray);

  if (cvsArray.length === 0) {
    return (
        <div className="text-center">Aucun CV trouvé</div>
    );
  }

  return (
      <>
        {cvsArray.map((cv, index) => (<>
            <CvPreview key={"CVMOSAIC"+index} username={cv.UserCV.username} id_cv={cv._id} />

            </>
  ))}
      </>
  );
}