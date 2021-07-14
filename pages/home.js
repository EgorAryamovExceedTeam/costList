import { HomeProvider } from "../context/HomeContext";
import HomePage from "../components/costs/HomePage";

export default function Home() {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
}
