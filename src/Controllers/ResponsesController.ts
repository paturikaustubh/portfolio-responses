import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";
dayjs.extend(customParseFormat);
dayjs.extend(duration);

export class ResponsesController {
  public handleByChange = (
    value: "timestamp" | "firstName",
    setDocs: React.Dispatch<React.SetStateAction<DocsArr>>,
    sortingOrder: "asc" | "desc"
  ) => {
    if (value === "timestamp") {
      setDocs((prevDocs) => {
        return prevDocs.sort((a, b) => {
          const aSec = dayjs(a.timestamp, "DD MMM, YY (hh:mm A)");
          const bSec = dayjs(b.timestamp, "DD MMM, YY (hh:mm A)");
          return aSec.diff(bSec) * (sortingOrder === "asc" ? 1 : -1);
        });
      });
      return;
    }
    setDocs((prevDocs) => {
      return prevDocs.sort((a, b) => {
        return (
          a.firstName.localeCompare(b.firstName) *
          (sortingOrder === "asc" ? 1 : -1)
        );
      });
    });
    return;
  };

  public handleOrderChange = (
    value: "asc" | "desc",
    setDocs: React.Dispatch<React.SetStateAction<DocsArr>>,
    sortingMeth: "timestamp" | "firstName"
  ) => {
    if (sortingMeth === "timestamp") {
      setDocs((prevDocs) => {
        return prevDocs.sort((a, b) => {
          const aSec = dayjs(a.timestamp, "DD MMM, YY (hh:mm A)");
          const bSec = dayjs(b.timestamp, "DD MMM, YY (hh:mm A)");
          return aSec.diff(bSec) * (value === "asc" ? 1 : -1);
        });
      });
      return;
    }
    setDocs((prevDocs) => {
      return prevDocs.sort((a, b) => {
        return (
          a.firstName.localeCompare(b.firstName) * (value === "asc" ? 1 : -1)
        );
      });
    });
    return;
  };
}
