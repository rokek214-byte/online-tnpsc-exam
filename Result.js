import React from "react";

function Result({
  contestant,
  result,
  onCertificate,
  onHome,
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

  return (
    <div className="page">
      <div className="result-card">
        <h1>
          Examination Result
        </h1>

        <div className="result-summary">
          <h2>
            {contestant.name}
          </h2>

          <p>
            OTR:{" "}
            <b>
              {result.otr}
            </b>
          </p>

          <p>
            Score:{" "}
            <b>
              {result.score}
              /
              {result.total}
            </b>
          </p>

          <p>
            Percentage:{" "}
            <b>
              {result.percentage}%
            </b>
          </p>

          <p className="rank">
            Rank:{" "}
            <b>
              {rank}
            </b>
          </p>
        </div>

        <button
          onClick={
            onCertificate
          }
        >
          View Certificate
        </button>

        <h2>
          Rank-Wise Results
        </h2>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>
                  Rank
                </th>

                <th>
                  OTR
                </th>

                <th>
                  Name
                </th>

                <th>
                  Score
                </th>

                <th>
                  Percentage
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedResults.map(
                (
                  item,
                  index
                ) => (
                  <tr
                    key={
                      item.otr
                    }
                  >
                    <td>
                      {index +
                        1}
                    </td>

                    <td>
                      {
                        item.otr
                      }
                    </td>

                    <td>
                      {
                        item.name
                      }
                    </td>

                    <td>
                      {
                        item.score
                      }
                      /
                      {
                        item.total
                      }
                    </td>

                    <td>
                      {
                        item.percentage
                      }%
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={onHome}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default Result;