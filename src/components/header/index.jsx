import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Get_thum, Thumdown, ThumEmpty, Thumup } from "../asyncs/thum";
import { ThumBooleans } from "../constant";

const currentLesson = {
  title: "Study Planner",
};
const currentCategory = {
  slug: "route",
};

const lesson = {
  category_lesson_image: "",
};
const POP_ACTIVE_CLASS = "popover-active";

export const Header = () => {
  const [popActive, setPopActive] = useState("");
  const [thumStatus, setThumStatus] = useState("");

  const removeActivePop = () => {
    setPopActive("");
  };

  const setActivePop = () => {
    setPopActive(POP_ACTIVE_CLASS);
  };

  const fetchThumStatus = async () => {
    const thumResponse = await Get_thum();
    setThumStatus(thumResponse?.[ThumBooleans.field]);
  };

  const thumDown = async (e) => {
    const thumbResponse =
      thumStatus !== ThumBooleans.NO ? await Thumdown() : await ThumEmpty();
    setThumStatus(thumbResponse?.[ThumBooleans.field]);
    removeActivePop();
  };

  const thumbUp = async (e) => {
    const thumbResponse =
      thumStatus !== ThumBooleans.YES ? await Thumup() : await ThumEmpty();
    setThumStatus(thumbResponse?.[ThumBooleans.field]);
    removeActivePop();
  };

  useEffect(() => {
    fetchThumStatus();
  }, []);

  return (
    <header className="header" onMouseLeave={removeActivePop}>
      <nav className="top-bar navbar navbar-light">
        <div className="container-fluid">
          <Link
            to={"/" + currentCategory.slug}
            className="top-bar-button btn btn-primary"
            tabIndex={1}
          >
            Return
          </Link>
          <p className="top-bar-title">{currentLesson.title}</p>
          <form
            className={`top-bar-thumbs ${popActive}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <button className="thumbs" onMouseOver={setActivePop}>
              <span
                className={`thumb thumb-up ${
                  thumStatus === ThumBooleans.YES && "active"
                }`}
                tabIndex={2}
                onFocus={setActivePop}
              />
              <span
                className={`thumb thumb-down ${
                  thumStatus === ThumBooleans.NO && "active"
                }`}
                tabIndex={3}
              />
            </button>
            <div className="thumbs-popup">
              <button
                className={`btn btn-primary ${
                  thumStatus === ThumBooleans.YES && "active"
                }`}
                onClick={thumbUp}
                tabIndex={4}
              >
                YES
              </button>
              <button
                className={`btn btn-primary ${
                  thumStatus === ThumBooleans.NO && "active"
                }`}
                onClick={thumDown}
                tabIndex={5}
              >
                NO
              </button>
            </div>
          </form>
        </div>
      </nav>
      <div
        className="header-featured-image"
        style={{ backgroundImage: `${lesson.category_lesson_image}` }}
      />
    </header>
  );
};
