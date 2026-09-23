import React, { useState } from "react";

function Terms({ onAccept }) {
  const [accepted, setAccepted] =
    useState(false);

  return (
    <div className="page">
      <div className="terms-card">
        <h1>Terms & Conditions</h1>

        <ol>
          <li>
            The candidate must use the registered
            OTR number.
          </li>

          <li>
            The examination contains 25 questions.
          </li>

          <li>
            Each question has four options.
          </li>

          <li>
            Only one answer can be selected.
          </li>

          <li>
            Questions and options may appear in
            different orders for different candidates.
          </li>

          <li>
            Once submitted, the examination cannot
            be modified.
          </li>
        </ol>

        <label className="accept-box">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) =>
              setAccepted(
                e.target.checked
              )
            }
          />

          I accept the Terms and Conditions
        </label>

        <button
          disabled={!accepted}
          onClick={onAccept}
        >
          Start Examination
        </button>
      </div>
    </div>
  );
}

export default Terms;