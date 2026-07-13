import { KIRAT_RASHI_LEGEND, SENLENDAT_LEGEND, YENYEM_LEGEND } from "../data/legend";
import styles from "../kirat-calendar.module.css";

export function YamdhangsangLegendTable() {
  return (
    <>
      <table className={styles.yenyemDetailsTable}>
        <tbody>
          <tr>
            <th colSpan={2} style={{ fontSize: 18, color: "#9900ff", textAlign: "center" }}>
              Yenyem — Name &amp; Meaning
            </th>
          </tr>
          {YENYEM_LEGEND.map((item) => (
            <tr key={item.name}>
              <th>{item.name}</th>
              <td>{item.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className={styles.senlendatDetailsTable}>
        <tbody>
          <tr>
            <th colSpan={2} style={{ fontSize: 18, color: "#9900ff", textAlign: "center" }}>
              Senlendat — Name &amp; Governed Activity
            </th>
          </tr>
          {SENLENDAT_LEGEND.map((item) => (
            <tr key={item.name}>
              <th>{item.name}</th>
              <td>{item.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: "#999966", marginTop: 8 }}>
        Note: each Yenyem/Senlendat period repeats through the day and night in the order shown above; check a
        specific date&apos;s detail panel for that day&apos;s exact timings.
      </p>
    </>
  );
}

export function PlanetsLegendTable() {
  return (
    <>
      <table className={styles.detailsTable}>
        <tbody>
          <tr>
            <th colSpan={2} style={{ fontSize: 18, color: "#9900ff", textAlign: "center" }}>
              Kirat Rashi — Name &amp; Zodiac Sign
            </th>
          </tr>
          {KIRAT_RASHI_LEGEND.map((item) => (
            <tr key={item.name}>
              <th>{item.name}</th>
              <td>{item.sign}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className={styles.detailsTable}>
        <tbody>
          <tr>
            <th>Kirat Wanma (Season)</th>
            <td>Hangwanma — Grishma (Summer)</td>
          </tr>
          <tr>
            <th>Kirat Namba (Weekday Ruler)</th>
            <td>Thenamba</td>
          </tr>
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: "#999966", marginTop: 8 }}>
        Note: this is a partial reference built from names seen in the Panchanga data so far; more Rashi, Wanma,
        and Namba names will be added as they are confirmed.
      </p>
    </>
  );
}
