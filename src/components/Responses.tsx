import { useLayoutEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

import Loading from "./LoadingScreen";
import { ResponsesController } from "../Controllers/ResponsesController";
import { LoginController } from "../Controllers/LoginController";

export default function Responses({
  setAuthenticated,
}: {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const responseController = new ResponsesController();
  const loginController = new LoginController(setAuthenticated);

  const userMessagesRef = collection(db, "userMessages");
  const sortMethMapper = {
    timestamp: "Timestamp",
    firstName: "First Name",
  };
  const sortOrderMapper = {
    asc: "Ascending",
    desc: "Descending",
  };

  const [docs, setDocs] = useState<DocsArr>([]);
  const [currentTime, _setCurrentTime] = useState(
    dayjs().format("DD MMM, YY (hh:mm A)")
  );
  const [sortingMeth, setSortingMeth] = useState<"timestamp" | "firstName">(
    "timestamp"
  );
  const [openSortMeth, setOpenSortMeth] = useState(false);
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("desc");
  const [openSortOrder, setOpenSortOrder] = useState(false);

  useLayoutEffect(() => {
    Loading(true);
    getDocs(userMessagesRef)
      .then((result) => {
        const tempResult: DocsArr = [];
        result.forEach((doc) => {
          tempResult.push(doc.data() as MessageDoc);
        });

        tempResult.sort((a, b) => {
          const aSec = dayjs(a.timestamp, "DD MMM, YY (hh:mm A)");
          const bSec = dayjs(b.timestamp, "DD MMM, YY (hh:mm A)");
          return bSec.diff(aSec);
        });

        setDocs(tempResult);
      })
      .finally(() => Loading(false));
  }, []);

  return (
    <main className="p-4">
      <div className="grid md:grid-cols-3 grid-cols-2 items-center mt-6">
        <h1 className="lg:col-start-2 lg:col-span-1 md:col-span-2 md:text-5xl text-4xl font-bold text-center mx-auto grow">
          Portfolio Responses
        </h1>
        <button
          className="ml-auto text-lg border rounded-md px-4 hover:bg-stone-200 hover:text-stone-900 duration-200 py-2"
          onClick={() => loginController.logOut()}
        >
          Logout
        </button>
      </div>
      <div className="mt-8 flex md:flex-row flex-col md:justify-between justify-center md:items-center items-start gap-4 flex-wrap">
        <span className="text-xl">
          {docs.length} responses as of {currentTime}
        </span>
        <div className="flex items-center gap-8">
          <span className="dropdown-label" data-label="Sort By">
            <button
              onClick={() => setOpenSortMeth((prevVal) => !prevVal)}
              className={`border-2 border-stone-400 flex gap-4 items-center justify-between pl-4 pr-2 py-2 ${
                openSortMeth ? "rounded-t-md" : "rounded-md"
              }`}
            >
              {sortMethMapper[sortingMeth]}
              <span className="material-symbols-outlined">expand_more</span>
            </button>
            {openSortMeth && (
              <div className="absolute -bottom-[265%] w-[inherit] z-10 flex flex-col bg-neutral-900 border-2 py-3 rounded-b-md">
                <button
                  onClick={() => {
                    setSortingMeth("timestamp");
                    responseController.handleByChange(
                      "timestamp",
                      setDocs,
                      sortingOrder
                    );
                    setOpenSortMeth(false);
                  }}
                  className="px-4 py-2 hover:bg-neutral-700 flex w-full"
                >
                  Timestamp
                </button>
                <button
                  onClick={() => {
                    setSortingMeth("firstName");
                    responseController.handleByChange(
                      "firstName",
                      setDocs,
                      sortingOrder
                    );
                    setOpenSortMeth(false);
                  }}
                  className="px-4 py-2 hover:bg-neutral-700 flex w-full"
                >
                  First Name
                </button>
              </div>
            )}
          </span>
          <span className="dropdown-label" data-label="Sort Order">
            <button
              onClick={() => setOpenSortOrder((prevVal) => !prevVal)}
              className={`border-2 border-stone-400 flex gap-4 items-center justify-between pl-4 pr-2 py-2 ${
                openSortOrder ? "rounded-t-md" : "rounded-md"
              }`}
            >
              {sortOrderMapper[sortingOrder]}
              <span className="material-symbols-outlined">expand_more</span>
            </button>
            {openSortOrder && (
              <div className="absolute -bottom-[270%] z-10 flex flex-col bg-neutral-900 border-2 py-3 rounded-b-md">
                <button
                  onClick={() => {
                    setSortingOrder("asc");
                    responseController.handleOrderChange(
                      "asc",
                      setDocs,
                      sortingMeth
                    );
                    setOpenSortOrder(false);
                  }}
                  className="px-4 py-2 hover:bg-neutral-700 flex w-full"
                >
                  Ascending
                </button>
                <button
                  onClick={() => {
                    setSortingOrder("desc");
                    responseController.handleOrderChange(
                      "desc",
                      setDocs,
                      sortingMeth
                    );
                    setOpenSortOrder(false);
                  }}
                  className="px-4 py-2 hover:bg-neutral-700 flex w-full"
                >
                  Descending
                </button>
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="mt-14 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {docs &&
          docs.map((doc, indx) => {
            return (
              <div
                className="flex flex-col justify-between gap-6 md:min-h-72 md:max-h-96 min-h-52 max-h-72 bg-neutral-800 p-4 rounded-md relative"
                key={indx}
              >
                <p className="md:text-3xl text-2xl font-semibold">
                  {doc.firstName} {doc.lastName}
                </p>
                <p className="grow overflow-auto md:text-base text-sm text-neutral-300">
                  {doc.message}
                </p>
                <p className="flex justify-between items-center text-neutral-300 text-sm flex-wrap gap-2">
                  <a
                    href={`mailto:${doc.email}`}
                    target="_blank"
                    className="underline"
                  >
                    {doc.email}
                  </a>
                  <span className="">{doc.timestamp}</span>
                </p>
                <span className="absolute -top-5 right-5 text-8xl font-semibold text-neutral-700 pointer-events-none">
                  {indx + 1}
                </span>
              </div>
            );
          })}
      </div>
    </main>
  );
}
