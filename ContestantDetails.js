import React from "react";

function ContestantDetails({
  contestant,
  onNext,
}) {
  return (
    <div className="page">
      <div className="details-card">
        <h1>Contestant Details</h1>

        <div className="detail-row">
          <b>OTR Number</b>
          <span>{contestant.otr}</span>
        </div>

        <div className="detail-row">
          <b>Name</b>
          <span>{contestant.name}</span>
        </div>

        <div className="detail-row">
          <b>Date of Birth</b>
          <span>{contestant.dob}</span>
        </div>

        <div className="detail-row">
          <b>Gender</b>
          <span>{contestant.gender}</span>
        </div>

        <div className="detail-row">
          <b>Email</b>
          <span>{contestant.email}</span>
        </div>

        <div className="detail-row">
          <b>Mobile</b>
          <span>{contestant.mobile}</span>
        </div>

        <div className="detail-row">
          <b>Qualification</b>
          <span>{contestant.qualification}</span>
        </div>

        <div className="detail-row">
          <b>Address</b>
          <span>{contestant.address}</span>
        </div>

        <button onClick={onNext}>
          Continue to Terms
        </button>
      </div>
    </div>
  );
}

export default ContestantDetails;