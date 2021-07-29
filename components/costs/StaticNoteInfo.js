import Link from "next/link";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import styles from "../../styles/Note.module.css";

const StaticNoteInfo = ({
  note,
  openModal,
  setOpenModal,
  deleteNote,
  setEditStatus,
}) => {
  return (
    <>
      <div
        className={styles.info_about_note_body}
        data-testid="info_about_note_body"
      >
        <span data-testid="note_info_score_span">Магазин: {note?.score}</span>
        <span data-testid="note_info_date_span">Дата: {note?.date}</span>
        <span data-testid="note_info_cost_span">
          Cумма покупки: {note?.cost} p.
        </span>
      </div>

      <div className={styles.buttons_container}>
        <div>
          <Link href="/home">
            <a className={styles.link_to_home} data-testid="go_to_homepage">
              На главную
            </a>
          </Link>
        </div>
        <div className={styles.buttons}>
          <Button
            variant="outlined"
            onClick={() => setEditStatus(true)}
            data-testid="change_note_info_button"
          >
            Изменить
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenModal(true)}
            data-testid="delete_button"
          >
            Удалить
          </Button>
        </div>
      </div>
      <Dialog
        open={openModal}
        className={styles.delete_modal_window}
        data-testid="delete_modal_window"
      >
        <DialogTitle>Удалить запись</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы действительно хотите удалить запись?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} variant="outlined">
            Назад
          </Button>
          <Button
            onClick={deleteNote}
            variant="outlined"
            data-testid="delete_button_in_modal_window"
          >
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StaticNoteInfo;
