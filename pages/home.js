import { useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import CircularProgress from "@material-ui/core/CircularProgress";
import HomePage from "../components/costs/HomePage";
import { HomeContext } from "../context/HomeContext";
import styles from "../styles/Home.module.css";

const GET_ALL_NOTES = gql`
  query {
    costs {
      id
      score
      date
      cost
    }
  }
`;

export default function Home() {
  const { setNotes } = useContext(HomeContext);
  const { loading, error, data, refetch } = useQuery(GET_ALL_NOTES, {
    fetchPolicy: "network-only",
  });
  useEffect(() => {
    if (!loading && data) {
      setNotes(data.costs);
    }
  }, [data, loading]);

  if (loading)
    return (
      <div className={styles.loading}>
        <CircularProgress size={60} />
      </div>
    );
  return <HomePage />;
}
