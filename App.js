import React, { useState } from "react";

import OTRLogin from "./OTRLogin";
import ContestantDetails from "./ContestantDetails";
import Terms from "./Terms";
import Exam from "./Exam";
import Result from "./Result";
import Certificate from "./Certificate";

import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [contestant, setContestant] = useState(null);
  const [result, setResult] = useState(null);

  function login(candidate) {
    setContestant(candidate);
    setPage("details");
  }

  function finishExam(examResult) {
    setResult(examResult);
    setPage("result");
  }

  if (page === "login") {
    return <OTRLogin onLogin={login} />;
  }

  if (page === "details") {
    return (
      <ContestantDetails
        contestant={contestant}
        onNext={() => setPage("terms")}
      />
    );
  }

  if (page === "terms") {
    return (
      <Terms
        onAccept={() => setPage("exam")}
      />
    );
  }

  if (page === "exam") {
    return (
      <Exam
        contestant={contestant}
        onExamFinish={finishExam}
      />
    );
  }

  if (page === "result") {
    return (
      <Result
        contestant={contestant}
        result={result}
        onCertificate={() =>
          setPage("certificate")
        }
        onHome={() => {
          setContestant(null);
          setResult(null);
          setPage("login");
        }}
      />
    );
  }

  if (page === "certificate") {
    return (
      <Certificate
        contestant={contestant}
        result={result}
        onBack={() => setPage("result")}
      />
    );
  }

  return null;
}

export default App;