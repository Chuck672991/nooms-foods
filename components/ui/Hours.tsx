import type { Hours } from "@/restaurants/types";

/**
 * Opening hours. Shows the one-line `headline` (+ note) by default, or a full
 * weekly table when the restaurant supplies a `schedule`.
 */
export function HoursBlock({
  hours,
  noteClassName = "mt-2 block text-sm text-foreground/55",
}: {
  hours: Hours;
  noteClassName?: string;
}) {
  if (hours.schedule?.length) {
    return (
      <>
        <table className="w-full text-left">
          <caption className="sr-only">Opening hours</caption>
          <tbody>
            {hours.schedule.map((row) => (
              <tr key={row.days} className="align-baseline">
                <th scope="row" className="py-0.5 pr-6 font-normal text-foreground/70">
                  {row.days}
                </th>
                <td className="py-0.5 text-foreground">{row.hours}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {hours.note ? <span className={noteClassName}>{hours.note}</span> : null}
      </>
    );
  }
  return (
    <>
      {hours.headline}
      {hours.note ? <span className={noteClassName}>{hours.note}</span> : null}
    </>
  );
}
