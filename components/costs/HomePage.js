import CostBar from "./CostBar";
import CostTable from "./CostTable";
import Styles from "../../styles/Home.module.css";

const HomePage = () => {
  return (
    <div className={Styles.main} data-testid="home_page_container">
      <div className={Styles.header}>
        <h1 className={Styles.title}>Учет Расходов</h1>
      </div>
      <div className={Styles.table_and_bar_container}>
        <CostBar />
        <CostTable />
      </div>
    </div>
  );
};
export default HomePage;
