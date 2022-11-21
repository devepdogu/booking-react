import { useRef, useEffect } from "react";
import { useCalendar, useDrawer } from "src/store";
import { Button } from "src/components";
import { X, CalendarCheck } from "phosphor-react";
import styles from "./styles.module.scss";
import { format } from "multi-date";

import { MONTH_LIST } from "src/config";
export function Drawer() {
  const { opened, setOpened } = useDrawer();
  const drawerRef = useRef();
  const priceMoreRef = useRef();
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
    dates,
  } = useCalendar();
  if (!opened) return;
  const totalData = getSelectedDatePrices();
  const days = getSelectedDateRanges();

  const handlePay = (paytype) => {
    const arr = days.reduce((p, c) => [...p, c.date], []);
    if (dates.checkout !== "") arr.pop();
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
  const checkin = new Date(dates.checkin);
  const checkout = new Date(
    dates.checkout !== ""
      ? dates.checkout
      : new Date(
          checkin.getFullYear(),
          checkin.getMonth(),
          checkin.getDate() + 1
        )
  );
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
          <div className={styles.dayItem}>
            {checkin.getDate()} {MONTH_LIST[checkin.getMonth()]}
          </div>
          <div className={styles.bodyArrow}>
            <div>
              <span
                onMouseEnter={() =>
                  priceMoreRef.current.classList.add(styles.arrowShowMore)
                }
                onMouseLeave={() =>
                  priceMoreRef.current.classList.remove(styles.arrowShowMore)
                }
              >
                {totalData.count} Gece
              </span>
              {totalData.count > 1 && days && (
                <div className={styles.arrowMoreInfo} ref={priceMoreRef}>
                  {days.map((day, i) => {
                    const date = new Date(day.date);
                    return (
                      <div key={i} className={styles.moreInfoDay}>
                        <CalendarCheck weight="bold" />
                        <p>
                          {date.getDate()} {MONTH_LIST[date.getMonth()]}{" "}
                          <span>(₺{day.price})</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={styles.dayItem}>
            {checkout.getDate()} {MONTH_LIST[checkout.getMonth()]}
          </div>
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
