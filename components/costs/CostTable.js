import { useContext } from "react";
import Link from "next/link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { HomeContext } from "../../context/HomeContext";
import styles from "../../styles/CostTable.module.css";

const CostTable = () => {
  const { notes } = useContext(HomeContext);
  return (
    <div className={styles.container}>
      <TableContainer component={Paper}>
        <Table className={styles.table_container} data-testid="table_container">
          <TableHead>
            <TableRow
              className={styles.table_head_row}
              data-testid="table_head_row"
            >
              <TableCell align="center">Позиция</TableCell>
              <TableCell align="center">Магазин</TableCell>
              <TableCell align="center">Дата покупки </TableCell>
              <TableCell align="center">Сумма покупки p.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notes?.map((item, index) => (
              <Link href={`/note/${item.id}`} key={`note-${item.id}`}>
                <TableRow
                  key={`note-${item.id}`}
                  className={styles.table_body_row}
                  data-testid={`note-${index}`}
                >
                  <TableCell
                    align="center"
                    data-testid={`index_of_note_${index}`}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={`item_${index}_score_name_in_table`}
                  >
                    {item.score}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={`item_${index}_date_in_table`}
                  >
                    {item.date}
                  </TableCell>
                  <TableCell
                    align="center"
                    data-testid={`item_${index}_cost_value_in_table`}
                  >
                    {item.cost}
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CostTable;
