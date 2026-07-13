import type { PanchangaDay } from "../types";
import styles from "../kirat-calendar.module.css";

export function YenyemTable({ p }: { p: PanchangaDay | undefined }) {
  const dayRows = Array.from({ length: 8 }, (_, i) => i + 1);
  const nightRows = Array.from({ length: 8 }, (_, i) => i + 1);

  return (
    <>
      <table className={styles.yenyemDetailsTable}>
        <tbody>
          <tr>
            <th colSpan={3} style={{ fontSize: 18, color: "#9900ff", textAlign: "center" }}>
              Yenyem
            </th>
          </tr>
          <tr>
            <th colSpan={3} style={{ fontSize: 14, color: "#990099", textAlign: "center" }}>
              Day Yenyem (Lendat)
            </th>
          </tr>
          {dayRows.map((i) => (
            <tr key={i}>
              <th>
                {p?.[`dayYemY${i}`] || "-"}
                <p>{p?.[`dayYemyEng${i}`] || "-"}</p>
              </th>
              <td>🕒 {p?.[`dayYemYT${i}`] || "-"}</td>
              <td>{p?.[`dayYemyResult${i}`] || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className={styles.yenyemDetailsTable}>
        <tbody>
          <tr>
            <th colSpan={3} style={{ fontSize: 14, color: "#990099", textAlign: "center" }}>
              Night Yenyem (Sendat)
            </th>
          </tr>
          {nightRows.map((i) => (
            <tr key={i}>
              <th>
                {p?.[`nightYemY${i}`] || "-"}
                <p>{p?.[`nightYemyEng${i}`] || "-"}</p>
              </th>
              <td>🕒 {p?.[`nightYemYT${i}`] || "-"}</td>
              <td>{p?.[`nightYemyResult${i}`] || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function SenlendatTable({ p }: { p: PanchangaDay | undefined }) {
  const slots = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <>
      <table className={styles.senlendatDetailsTable} style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <tbody>
          <tr>
            <th colSpan={4} style={{ fontSize: 18, color: "#9900ff", textAlign: "center" }}>
              Senlendat
            </th>
          </tr>
          <tr>
            <th colSpan={4} style={{ fontSize: 14, color: "#990099", textAlign: "center" }}>
              Day Senlendat
            </th>
          </tr>
          <tr>
            <th style={{ width: "30%" }}>Senlendat</th>
            <th style={{ width: "30%", textAlign: "center" }}>Start</th>
            <th style={{ width: "10%", textAlign: "center" }}>To</th>
            <th style={{ width: "30%", textAlign: "center" }}>End</th>
          </tr>
          {slots.map((i) => (
            <tr key={i}>
              <th>{p?.[`daySenlen${i}`] || "-"}</th>
              <td>🕒 {p?.[`daySenlendatStart${i}`] || "-"}</td>
              <td>-</td>
              <td>🕒 {p?.[`daySenlendatEnd${i}`] || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className={styles.senlendatDetailsTable} style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <tbody>
          <tr>
            <th colSpan={4} style={{ fontSize: 14, color: "#990099", textAlign: "center" }}>
              Night Senlendat
            </th>
          </tr>
          <tr>
            <th style={{ width: "30%" }}>Senlendat</th>
            <th style={{ width: "30%", textAlign: "center" }}>Start</th>
            <th style={{ width: "10%", textAlign: "center" }}>To</th>
            <th style={{ width: "30%", textAlign: "center" }}>End</th>
          </tr>
          {slots.map((i) => (
            <tr key={i}>
              <th>{p?.[`nightSenlen${i}`] || "-"}</th>
              <td>🕒 {p?.[`nightSenlendatStart${i}`] || "-"}</td>
              <td>-</td>
              <td>🕒 {p?.[`nightSenlendatEnd${i}`] || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export function NotesTable() {
  return (
    <table className={styles.detailsTable}>
      <tbody>
        <tr>
          <td>
            <b>Notes:</b>
            <ol style={{ padding: 10 }}>
              <li>Kirat day is from Sunrise time to next day Sunrise time.</li>
              <li>All Yenlon calculations use Sunrise time.</li>
              <li>
                All the given times are in 24+ hour system (Example: 28:30 can be read as 04:30 AM of the next
                day).
              </li>
            </ol>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
