import { useState, useContext, useEffect } from "react";
import moment from "moment";
import { TextField, Button } from "@material-ui/core";
import { gql, useMutation } from "@apollo/client";
import { HomeContext } from "../../context/HomeContext";
import styles from "../../styles/CostBar.module.css";

const CostsBar = () => {
  const { notes, setNotes, sum } = useContext(HomeContext);

  const [score, setScore] = useState("");
  const [cost, setCost] = useState("");
  const [scoreNameErr, setScoreNameErr] = useState(false);
  const [costErr, setCostErr] = useState(false);
  const [errorFlag, setErrorFlag] = useState({ score: false, cost: false });

  useEffect(() => {
    setErrorFlag(scoreNameErr || setScoreNameErr);
  }, [scoreNameErr, costErr]);

  const ADD_COST = gql`
    mutation ($score: String, $date: String, $cost: Int) {
      addCost(score: $score, date: $date, cost: $cost) {
        id
        score
        date
        cost
      }
    }
  `;

  const [addCost] = useMutation(ADD_COST);

  // save note in state and in localStorage
  const handleClick = () => {
    addCost({
      variables: {
        score: score,
        date: moment(new Date()).format("DD.MM.YYYY"),
        cost: +cost,
      },
    }).then((result) => {
      setNotes(result.data.addCost);
    });
    setScore("");
    setCost("");
  };

  // change value of score field
  const handleChangeScore = (currentScoreName) => {
    setScore(currentScoreName);
    const flag = currentScoreName.match(/(^\W+$)/gim);
    setErrorFlag((prev) => ({ ...prev, score: flag }));
  };

  // change value of cost field
  const handleChangeCost = (currentCostValue) => {
    setCost(currentCostValue);
    const regexp = new RegExp(/(^[1-9]+\d*$)/, "gim");
    let flag = !currentCostValue.match(regexp);
    flag = flag && currentCostValue.length > 0;
    setErrorFlag((prev) => ({ ...prev, cost: flag }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.textfields_container}>
        <div className={styles.input_divs}>
          <TextField
            className={styles.input}
            value={score}
            onChange={(e) => handleChangeScore(e.target.value)}
            placeholder="Куда было потрачено"
            variant="outlined"
            error={errorFlag?.score}
            data-testid="score_name"
          />
          {errorFlag?.score && (
            <span
              className={styles.error_message}
              data-testid="score_error_message"
            >
              Incorrect value
            </span>
          )}
        </div>
        <div className={styles.input_divs}>
          <TextField
            className={styles.input}
            value={cost}
            onChange={(e) => handleChangeCost(e.target.value)}
            placeholder="Сколько было потрачено"
            variant="outlined"
            error={errorFlag?.cost}
            data-testid="cost_value"
          />
          {errorFlag?.cost && (
            <span
              className={styles.error_message}
              data-testid="cost_value_error_message"
            >
              Incorrect value
            </span>
          )}
        </div>
        <div className={styles.add_button}>
          <Button
            onClick={handleClick}
            disabled={!(score && cost) || errorFlag?.score || errorFlag?.cost}
            variant="outlined"
            data-testid="add_new_note_btn"
          >
            Добавить
          </Button>
        </div>
      </div>
      <div className={styles.sum}>
        <span className={styles.sum}>{`${sum} p.`}</span>
      </div>
    </div>
  );
};
export default CostsBar;
