import { Calendar, Drawer } from "./components";
import styles from "./styles/main.module.scss";
import { useCalendar } from "src/store";
function App() {
  const { priceDates } = useCalendar();
  return (
    <div className={styles.App}>
      <Calendar detail={priceDates} />
      <Drawer />
    </div>
  );
}

export default App;
