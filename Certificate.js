import React from "react";

function Certificate({
  contestant,
  result,
  onBack,
}) {
  const results =
    JSON.parse(
      localStorage.getItem(
        "tnpscResults"
      )
    ) || [];

  const sortedResults =
    [...results].sort(
      (a, b) => {
        if (
          b.score !==
          a.score
        ) {
          return (
            b.score -
            a.score
          );
        }

        return a.name.localeCompare(
          b.name
        );
      }
    );

  const rank =
    sortedResults.findIndex(
      (item) =>
        item.otr ===
        contestant.otr
    ) + 1;

  function printCertificate() {
    window.print();
  }

  return (
    <div className="certificate-page">
      <div className="certificate">
        <div className="certificate-inner">
          <div className="certificate-logo">
            TNPSC
          </div>

          <h1>
            CERTIFICATE OF
            EXAMINATION
          </h1>

          <p>
            This certificate is proudly
            presented to
          </p>

          <h2 className="candidate-name">
            {contestant.name}
          </h2>

          <p>
            OTR Number:{" "}
            <b>
              {contestant.otr}
            </b>
          </p>

          <p>
            for successfully participating
            in the
          </p>

          <h2>
            TNPSC GROUP 4 ONLINE
            EXAMINATION
          </h2>

          <div className="certificate-info">
            <div>
              <b>
                Date of Birth
              </b>

              <span>
                {contestant.dob}
              </span>
            </div>

            <div>
              <b>
                Gender
              </b>

              <span>
                {contestant.gender}
              </span>
            </div>

            <div>
              <b>
                Qualification
              </b>

              <span>
                {
                  contestant.qualification
                }
              </span>
            </div>

            <div>
              <b>
                Email
              </b>

              <span>
                {contestant.email}
              </span>
            </div>

            <div>
              <b>
                Mobile
              </b>

              <span>
                {contestant.mobile}
              </span>
            </div>

            <div>
              <b>
                Address
              </b>

              <span>
                {contestant.address}
              </span>
            </div>

            <div>
              <b>
                Score
              </b>

              <span>
                {result.score} /{" "}
                {result.total}
              </span>
            </div>

            <div>
              <b>
                Percentage
              </b>

              <span>
                {result.percentage}%
              </span>
            </div>

            <div>
              <b>
                Rank
              </b>

              <span>
                {rank}
              </span>
            </div>

            <div>
              <b>
                Examination Date
              </b>

              <span>
                {result.date}
              </span>
            </div>
          </div>

          <div className="certificate-signatures">
            <div>
              __________________
              <br />
              Candidate
            </div>

            <div>
              __________________
              <br />
              Examination Authority
            </div>
          </div>
        </div>
      </div>

      <div className="certificate-buttons">
        <button
          onClick={
            printCertificate
          }
        >
          Download Certificate
        </button>

        <button
          onClick={onBack}
        >
          Back to Result
        </button>
      </div>
    </div>
  );
}

export default Certificate;