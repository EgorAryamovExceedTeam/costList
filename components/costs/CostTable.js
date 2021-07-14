import { useContext, useState } from "react";
import moment from "moment";
import { TextField } from "@material-ui/core";
import { HomeContext } from "../../context/HomeContext";

const CostTable = () => {
  const { notes, setNotes, sum, setSum } = useContext(HomeContext);
  const [scoreChangeIndex, setScoreChangeIndex] = useState(-1);
  const [dateChangeIndex, setDateChangeIndex] = useState(-1);
  const [costChangeIndex, setCostChangeIndex] = useState(-1);
  const [scoreName, setScoreName] = useState();
  const [currentDate, setCurrentDate] = useState();
  const [cost, setCost] = useState();

  const saveScoreName = (currentName, index) => {
    const notesArr = [...notes];
    notesArr[index].score = currentName;
    setNotes([...notesArr]);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    setChangeScore(false);
    // setScoreName("");
  };

  const saveDate = (date, index) => {
    const notesArr = [...notes];
    notesArr[index].date = moment(date).format("DD.MM.YYYY");
    setNotes([...notesArr]);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    setChangeDate(false);
  };

  const saveCost = (currentCost, index) => {
    const notesArr = [...notes];
    let currentSum = sum;
    currentSum -= notesArr[index].cost;
    notesArr[index].cost = +currentCost;
    setSum(curreSum + +currentCost);
    setNotes([...notesArr]);
    localStorage.setItem("notes", JSON.stringify(notesArr));
    setChangeCost(false);
  };

  const handleChangeScore = (scoreName, status) => {
    setChangeScore(status);
    // setScoreName(scoreName);
  };

  return (
    <>
      <ul className="notes-list">
        {notes.map((item, index) => {
          return (
            <li key={`note-${index}`}>
              {`${index + 1})`}
              {scoreChangeIndex === index ? (
                <TextField
                  variant="outlined"
                  autoFocus
                  value={scoreName}
                  onChange={(e) => setScoreName(e.target.value)}
                  onBlur={(e) => saveScoreName(e.target.value, index)}
                />
              ) : (
                <p
                  className="score"
                  onDoubleClick={() => handleChangeScore(item.score, index)}
                >
                  {`Магазин ${item.score}`}
                </p>
              )}
              {dateChangeIndex === index ? (
                <TextField
                  variant="outlined"
                  value={currentDate}
                  onChange={(date) => setCurrentDate(date, index)}
                  onBlur={(date) => saveDate(date)}
                />
              ) : (
                <p
                  className="date"
                  onDoubleClick={() => handleChangeDate(item.date, index)}
                >
                  {moment(new Date()).format("DD.MM.YYYY")}
                </p>
              )}
              {costChangeIndex === index ? (
                <TextField
                  variant="outlined"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  onBlur={(e) => saveCost(e.target.value)}
                />
              ) : (
                <p
                  className="cost"
                  onDoubleClick={() => handleChangeCost(item.cost, index)}
                >
                  {`${item.cost} p`}
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CostTable;
