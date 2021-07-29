import { useState, useContext, useEffect } from "react";
import moment from "moment";
import { useMutation } from "@apollo/client";
import CreateNote from "./CreateNote";
import { HomeContext } from "../../context/HomeContext";
import { ADD_COST } from "../../utils/constants";

const CostsBar = () => {
  const { setNotes, sum } = useContext(HomeContext);
  const [note, setNote] = useState();
  const [errors, setErrors] = useState({ score: false, cost: false });

  const [addCost] = useMutation(ADD_COST);

  // save note in state and in localStorage
  const handleClick = () => {
    addCost({
      variables: {
        score: note.score,
        date: moment(new Date()).format("DD.MM.YYYY"),
        cost: +note.cost,
      },
    }).then((result) => {
      setNotes(result.data.addCost);
    });
    setNote({ score: "", cost: "" });
  };

  return (
    <CreateNote
      note={note}
      setNote={setNote}
      errors={errors}
      setErrors={setErrors}
      sum={sum}
      handleClick={handleClick}
    />
  );
};
export default CostsBar;
