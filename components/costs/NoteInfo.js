import { useState, useEffect, useContext } from "react";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import Link from "next/link";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  TextField,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { HomeContext } from "../../context/HomeContext";
import styles from "../../styles/Note.module.css";
import { useKeyPress } from "../../hooks/useKeyPress";
import { DialogActions } from "@material-ui/core";

const DELETE_COST = gql`
  mutation ($id: ID) {
    deleteCost(id: $id) {
      id
      score
      date
      cost
    }
  }
`;

const GET_INFO_ABOUT_COST = gql`
  query ($id: ID!) {
    cost(id: $id) {
      id
      score
      date
      cost
    }
  }
`;

const UPDATE_INFO_ABOUT_COST = gql`
  mutation ($id: ID!, $score: String, $date: String, $cost: Int) {
    updateCost(id: $id, score: $score, date: $date, cost: $cost) {
      id
      score
      date
      cost
    }
  }
`;

const NoteInfo = () => {
  const router = useRouter();
  const { id } = router.query;

  const [currentNote, setCurrentNote] = useState();
  const [editStatus, setEditStatus] = useState(false);
  const [errors, setErrors] = useState({
    score: false,
    date: false,
    cost: false,
  });

  const [openModal, setOpenModal] = useState(false);
  const { setNotes } = useContext(HomeContext);

  const openEdit = useKeyPress("Control", "r");
  const closeEdit = useKeyPress("Control", "q");

  const { loading, error, data } = useQuery(GET_INFO_ABOUT_COST, {
    variables: { id },
  });

  const { cost: note } = data || {};

  useEffect(() => {
    if (loading) console.log("loading");
    if (error) console.log("error:", error.message);
  }, [loading, error]);

  useEffect(() => {
    if (openEdit) setEditStatus(true);
    if (closeEdit) setEditStatus(false);
  }, [openEdit, closeEdit]);

  useEffect(() => {
    if (note) {
      setCurrentNote({
        score: note.score,
        date: new Date(note.date.split(".").reverse().join("-")),
        cost: note.cost,
      });
    }
  }, [note]);

  const handleChangeScore = (currentScoreName) => {
    setCurrentNote((prev) => ({ ...prev, score: currentScoreName }));
    const regexp = new RegExp(/(^\W$)/, "gim");
    const flag = currentScoreName.match(regexp);
    setErrors((prev) => ({ ...prev, score: flag }));
  };

  const handleChangeCost = (currentCostValue) => {
    setCurrentNote((prev) => ({ ...prev, cost: currentCostValue }));
    const regexp = new RegExp(/(^[1-9]+\d*$)/, "gim");
    const flag = !currentCostValue.match(regexp);
    setErrors((prev) => ({ ...prev, cost: flag }));
  };
  // update cost value
  const [updateCost] = useMutation(UPDATE_INFO_ABOUT_COST);

  const saveChanges = () => {
    if (errors.score || errors.cost || currentNote.date === "Invalid Date") {
      alert("Invalid value(s)");
      return;
    }
    updateCost({
      variables: {
        id: id,
        score: currentNote.score,
        date: moment(currentNote.date).format("DD.MM.YYYY"),
        cost: +currentNote.cost,
      },
    }).then((result) => {
      setNotes(result.data.updateCost);
      alert("Note was updated successfully");
      router.push("/home");
    });
  };

  // CANCEL CHANGES
  const cancelChanges = () => {
    setCurrentNote({
      score: note.score,
      date: note.date,
      cost: note.cost,
    });
    setEditStatus(false);
  };

  const [deleteCost] = useMutation(DELETE_COST);

  const deleteNote = () => {
    deleteCost({ variables: { id } })
      .then((result) => {
        setNotes((prev) => {
          return prev.filter((value) => value.id !== id);
        });
        router.push("/home");
        setOpenModal(false);
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className={styles.page_container} data-testid="note_container">
      <div className={styles.container}>
        <div className={styles.info_about_note_header}>
          <span>Информация о покупке</span>
        </div>
        {editStatus ? (
          <>
            <TextField
              className={styles.text_field}
              variant="outlined"
              value={currentNote?.score}
              onChange={(e) => handleChangeScore(e.target.value)}
              error={errors.score}
            />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="date"
                inputVariant="outlined"
                className={styles.text_field}
                value={currentNote?.date}
                onChange={(date) => {
                  setCurrentNote((prev) => ({ ...prev, date: date }));
                }}
                format="dd.MM.yyyy"
                mask={"__.__.____"}
              />
            </MuiPickersUtilsProvider>
            <TextField
              className={styles.text_field}
              variant="outlined"
              value={currentNote?.cost}
              onChange={(e) => handleChangeCost(e.target.value)}
              error={errors.cost}
            />
            <div className={styles.buttons_container}>
              <div>
                <Link href="/home">
                  <a className={styles.link_to_home}>Назад</a>
                </Link>
              </div>
              <div className={styles.buttons}>
                <Button
                  disabled={
                    !(
                      currentNote?.score &&
                      currentNote?.date &&
                      currentNote?.cost
                    )
                  }
                  onClick={() => saveChanges()}
                  variant="outlined"
                >
                  Сохранить
                </Button>
                <Button onClick={cancelChanges} variant="outlined">
                  Назад
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={styles.info_about_note_body}>
              <span>Магазин: {note?.score}</span>
              <span>Дата: {note?.date}</span>
              <span>Cумма покупки: {note?.cost} p.</span>
            </div>

            <div className={styles.buttons_container}>
              <div>
                <Link href="/home">
                  <a className={styles.link_to_home}>На главную</a>
                </Link>
              </div>
              <div className={styles.buttons}>
                <Button variant="outlined" onClick={() => setEditStatus(true)}>
                  Изменить
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setOpenModal(true)}
                  data-testid="test"
                >
                  Удалить
                </Button>
              </div>
            </div>
            <Dialog open={openModal} className={styles.delete_modal_window}>
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
                <Button onClick={deleteNote} variant="outlined">
                  Удалить
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteInfo;
