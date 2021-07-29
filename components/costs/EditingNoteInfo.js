import Link from "next/link";
import { TextField, Button } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import styles from "../../styles/Note.module.css";
import {
  handleChangeScore,
  handleChangeCost,
} from "../../utils/manyUsedFunctions";

const EditingNoteInfo = ({
  currentNote: note,
  setCurrentNote: setNote,
  errors,
  setErrors,
  handleChangeDate,
  saveChanges,
  cancelChanges,
}) => {
  return (
    <>
      <div
        className={styles.note_info_edit_body}
        data-testid="note_info_edit_body"
      >
        <div className={styles.note_info_edit_textfied}>
          <TextField
            className={styles.text_field}
            variant="outlined"
            value={note?.score}
            onChange={(e) =>
              handleChangeScore(e.target.value, setNote, setErrors)
            }
            error={errors?.score}
            data-testid="note_score_info_textfield"
          />
          {errors?.score && (
            <span
              data-testid="note_info_score_edit_field_error"
              className={styles.error_message}
            >
              Incorrect Value
            </span>
          )}
        </div>
        <div className={styles.note_info_edit_textfied}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="date"
              inputVariant="outlined"
              className={styles.text_field}
              value={note?.date}
              onChange={(date) => handleChangeDate(date)}
              format="dd.MM.yyyy"
              mask={"__.__.____"}
              data-testid="note_date_info_textfield"
              helperText=""
            />
            {errors?.date && (
              <span
                data-testid="note_info_score_edit_field_error"
                className={styles.error_message}
              >
                Invalid Date format
              </span>
            )}
          </MuiPickersUtilsProvider>
        </div>
        <div className={styles.note_info_edit_textfied}>
          <TextField
            className={styles.text_field}
            variant="outlined"
            value={note?.cost}
            onChange={(e) =>
              handleChangeCost(e.target.value, setNote, setErrors)
            }
            error={errors?.cost}
            data-testid="note_cost_info_textfield"
          />
          {errors?.cost && (
            <span
              data-testid="note_info_score_edit_field_error"
              className={styles.error_message}
            >
              Invalid Number format
            </span>
          )}
        </div>
      </div>
      <div className={styles.buttons_container}>
        <div>
          <Link href="/home">
            <a className={styles.link_to_home} data-testid="go_to_homepage">
              На гланую
            </a>
          </Link>
        </div>
        <div className={styles.buttons}>
          <Button
            disabled={
              !(note?.score && note?.date && note?.cost) ||
              errors?.score ||
              errors?.date ||
              errors?.cost
            }
            onClick={saveChanges}
            variant="outlined"
            data-testid="save_change_button"
          >
            Сохранить
          </Button>
          <Button
            onClick={cancelChanges}
            variant="outlined"
            data-testid="cancel_change_button"
          >
            Отмена
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditingNoteInfo;
