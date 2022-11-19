import { useRef, useEffect, useMemo } from "react";
import { useCalendar, useDrawer } from "src/store";
import { Button } from "src/components";
import { X, CalendarPlus } from "phosphor-react";
import styles from "./styles.module.scss";

export function Drawer() {
  const { opened, setOpened } = useDrawer();
  const drawerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) =>
      drawerRef.current === event.target && setOpened(false);
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerRef]);

  const {
    getSelectedDatePrices,
    setBlocks,
    setDates,
    setPendingPayments,
    getSelectedDateRanges,
  } = useCalendar();
  if (!opened) return;
  const totalData = getSelectedDatePrices();
  const days = getSelectedDateRanges();

  const handlePay = (paytype) => {
    const arr = days.reduce((p, c) => [...p, c.date], []);
    switch (paytype) {
      case "done":
        setBlocks(arr);
        break;
      case "pending":
        setPendingPayments(arr);
        break;
    }
    setOpened();
    setDates({ checkin: "", checkout: "" });
  };

  return (
    <div className={styles.drawerContainer} ref={drawerRef}>
      <div className={styles.drawerWrapper}>
        <div className={styles.drawerClose} onClick={() => setOpened(false)}>
          <X />
        </div>
        <p className={styles.drawerTitle}>
          Satın al <small>({totalData.count} gece)</small>
        </p>

        <div className={styles.drawerBody}>
          {days &&
            days.map((day, i) => (
              <div key={i} className={styles.drawerDay}>
                <CalendarPlus weight="bold" />
                <p>
                  {day.date} <span>(₺{day.price})</span>
                </p>
              </div>
            ))}
        </div>

        <div className={styles.drawerActions}>
          <Button
            disabled={totalData.total === 0}
            onClickHandle={() => handlePay("pending")}
            className={styles.choosepayment}
          >
            <>
              Ödeme Yap
              <span>₺{totalData.total}</span>
            </>
          </Button>
          <Button
            disabled={totalData.total === 0}
            onClickHandle={() => handlePay("done")}
          >
            <>
              Satın Al
              <span>₺{totalData.total}</span>
            </>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
