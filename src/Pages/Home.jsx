import React from "react";
import QuestionPapersTable from "../Components/home/QuestionPapersTable";
import QuestionPapersTableWithUnkownYear from "../Components/home/QuestionPapersTableWithUnkownYear";

function Home() {
  return (
    <div>
      <h2>Year wise Question Paper</h2>
      <QuestionPapersTable />
      <br></br>
      <br></br>
      <br></br>

      <h2>All Category Detail</h2>
      <QuestionPapersTableWithUnkownYear></QuestionPapersTableWithUnkownYear>
    </div>
  );
}

export default Home;
