import { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import { HomeContext } from "../../context/HomeContext";
import moment from "moment";

const CostsBar = () => {
  const { notes, setNotes, sum, setSum } = useContext(HomeContext);

  const [score, setScore] = useState("");
  const [cost, setCost] = useState('');
  const [scoreNameErr, setScoreNameErr] = useState(false);
  const [costErr, setCostErr] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    setErrorFlag(scoreNameErr || setScoreNameErr);
  }, [scoreNameErr, costErr]);

  // save note in state and in localStorage
  const handleClick = () => {
    const notesArr = [...notes];
    notesArr.push({
      score: score,
      date: moment(new Date()).format("dd.MM.YYYY"),
      cost: +cost,
    });
    setNotes([...notesArr]);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    setSum(sum + +cost);
    setScore('');
    setCost('');
  };

  // change value of score field
  const handleChangeScore = (currentScoreName) => {
    setScore(currentScoreName);
    const regexp = new RegExp(/(^\W$)/, "gim");
    const flag = currentScoreName.match(regexp);
    setScoreNameErr(currentScoreName.length > 0 && flag);
  };

  // change value of cost field
  const handleChangeCost = (currentCostValue) => {
    setCost(currentCostValue);
    const regexp = new RegExp(/(^[1-9]+\d*$)/, "gim");
    const flag = !currentCostValue.match(regexp);
    setCostErr(currentCostValue.length > 0 && flag);
  };
  return (
    <>
      <div className="container">
        <div className="create-note-bar">
          <div className="score-div">
            <p>Куда было потрачено:</p>
            <TextField
              className="where-costs"
              value={score}
              onChange={(e) => handleChangeScore(e.target.value)}
              placeholder="Куда было потрачено"
              variant="outlined"
              error={scoreNameErr}
              helperText={scoreNameErr ? "Incorrect value" : ""}
            />
          </div>
          <div className="how-much-cost-div">
            <p>Сколько было потрачено:</p>
            <TextField
              className="how-much-cost"
              value={cost}
              onChange={(e) => handleChangeCost(e.target.value)}
              placeholder="Сколько было потрачено"
              variant="outlined"
              error={costErr}
              helperText={costErr ? "Incorrect value" : ""}
            />
          </div>
          <Button
            className="send-data"
            onClick={() => handleClick()}
            disabled={!(score && cost) || errorFlag}
          >
            Добавить
          </Button>
        </div>
        <p className="sum">{`${sum} p.`}</p>
      </div>
    </>
  );
};
export default CostsBar;
