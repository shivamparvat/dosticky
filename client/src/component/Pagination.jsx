import "./Pagination.css";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useState } from "react";

function Pagination() {
  const showPageButton = 5;
  const [prenext, setPreNext] = useState(1);
  const [page, setPage] = useState(1);
  const allPageCount = 0;
  const increase = Math.ceil(allPageCount / showPageButton);
  const prePress = () => {
    if (prenext <= 1) return;
    // setPage(((prenext - 1) * showPageButton )+ 1);
    setPreNext(prenext - 1);
  };
  const Nextpress = () => {
    if (prenext >= increase) return;
    setPreNext(prenext + 1);
    // setPage(prenext * showPageButton + 1);
  };

  return (
    <div className="PaginationCainatiner">
      <div className="Pagination">
        {allPageCount > 5 ? (
          <div className="prenext" onClick={() => prePress()}>
            <GrPrevious />
          </div>
        ) : (
          <></>
        )}
        {new Array(allPageCount).fill(1).map((item, value) => (
          <>
            {console.log(page)}
            {value + 1 <= prenext * showPageButton &&
            value + 1 > (prenext - 1) * showPageButton ? (
              <div
                key={value}
                onClick={() => setPage(value + 1)}
                className="number"
              >
                {value + 1}
              </div>
            ) : (
              <></>
            )}
          </>
        ))}
        {allPageCount > 5 ? (
          <div className="prenext" onClick={() => Nextpress()}>
            <GrNext />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Pagination;
