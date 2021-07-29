import moment from "moment";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import StaticNoteInfo from "./StaticNoteInfo";
import EditingNoteInfo from "./EditingNoteInfo";
import styles from "../../styles/Note.module.css";
import { useKeyPress } from "../../hooks/useKeyPress";
import { HomeContext } from "../../context/HomeContext";
import {
  DELETE_COST,
  GET_INFO_ABOUT_COST,
  UPDATE_INFO_ABOUT_COST,
} from "../../utils/constants";

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

  // listen event loading or error when wait data from server
  useEffect(() => {
    if (loading) console.log("loading");
    if (error) console.log("error:", error.message);
  }, [loading, error]);

  //  listen shortcuts on edit or cancel edit
  useEffect(() => {
    if (openEdit) setEditStatus(true);
    if (closeEdit) {
      return cancelChanges();
    }
  }, [openEdit, closeEdit]);

  //  wait while server send data about note
  useEffect(() => {
    if (note) {
      setCurrentNote({
        score: note.score,
        date: new Date(note.date.split(".").reverse().join("-")),
        cost: note.cost,
      });
    }
  }, [note]);

  // handle change date input
  const handleChangeDate = (currentDate) => {
    setCurrentNote((prev) => ({ ...prev, date: currentDate }));
    let flag = currentDate == "Invalid Date";
    setErrors((prev) => ({ ...prev, date: flag }));
  };

  // update cost value
  const [updateCost] = useMutation(UPDATE_INFO_ABOUT_COST);

  const saveChanges = () => {
    console.log("date:", currentNote.date);
    if (errors.score || errors.cost || currentNote.date == "Invalid Date") {
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
      router.push("/home");
    });
  };

  // cancel changes
  const cancelChanges = () => {
    setCurrentNote({
      score: note.score,
      date: note.date.split(".").reverse().join("-"),
      cost: note.cost,
    });
    setEditStatus(false);
  };
  const [deleteCost] = useMutation(DELETE_COST);

  const deleteNote = () => {
    deleteCost({ variables: { id } })
      .then((result) => {
        setNotes((prev) => {
          return prev?.filter((value) => value.id !== id);
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
          <EditingNoteInfo
            currentNote={currentNote}
            setCurrentNote={setCurrentNote}
            errors={errors}
            setErrors={setErrors}
            handleChangeDate={handleChangeDate}
            saveChanges={saveChanges}
            cancelChanges={cancelChanges}
          />
        ) : (
          <StaticNoteInfo
            note={note}
            openModal={openModal}
            setOpenModal={setOpenModal}
            deleteNote={deleteNote}
            setEditStatus={setEditStatus}
          />
        )}
      </div>
    </div>
  );
};

export default NoteInfo;
