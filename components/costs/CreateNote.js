import { TextField, Button } from "@material-ui/core";
import styles from "../../styles/CostBar.module.css";
import {
  handleChangeScore,
  handleChangeCost,
} from "../../utils/manyUsedFunctions";

const CreateNote = ({ note, setNote, errors, setErrors, sum, handleClick }) => {
  return (
    <div className={styles.container}>
      <div className={styles.textfields_container}>
        <div className={styles.input_divs}>
          <TextField
            className={styles.input}
            value={note?.score}
            onChange={(e) =>
              handleChangeScore(e.target.value, setNote, setErrors)
            }
            placeholder="Куда было потрачено"
            variant="outlined"
            error={errors?.score}
            data-testid="score_name"
          />
          {errors?.score && (
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
            value={note?.cost}
            onChange={(e) =>
              handleChangeCost(e.target.value, setNote, setErrors)
            }
            placeholder="Сколько было потрачено"
            variant="outlined"
            error={errors?.cost}
            data-testid="cost_value"
          />
          {errors?.cost && (
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
            disabled={
              !(note?.score && note?.cost) || errors?.score || errors?.cost
            }
            variant="outlined"
            data-testid="add_new_note_btn"
          >
            Добавить
          </Button>
        </div>
      </div>
      <div className={styles.sum}>
        <span className={styles.sum}>{sum} p.</span>
      </div>
    </div>
  );
};

export default CreateNote;
