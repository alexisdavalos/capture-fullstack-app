import React, { useEffect } from "react";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Test = () => {
  const dispatch = useDispatch();
  const details = useSelector(state => state.sync.formInfo.details);
  const title = useSelector(state => state.sync.formInfo.title);
  const story = useSelector(state => state.sync.formInfo.story);
  const formInfo = useSelector(state => state.sync.formInfo);
  console.log("my info", details);

  useEffect(() => {
    Axios.get("https://expatjournalbackend.herokuapp.com/api/posts").then(res =>
      console.log("I want this", res)
    );
  }, []);

  const handleChange = e => {
    dispatch({
      type: "FORM_DATA",
      name: e.target.name,
      value: e.target.value
    });
  };
  const addObject = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("api/posts", formInfo)
      .then(res => console.log(res.data));
  };

  return (
    <div>
      <form onSubmit={addObject}>
        <label>
          Title
          <input
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
          />
        </label>
        <label>
          Story
          <input
            name="story"
            type="text"
            value={story}
            onChange={handleChange}
          />
        </label>
        <label>
          Details
          <input
            name="details"
            type="text"
            value={details}
            onChange={handleChange}
          />
        </label>
        <button>ADD!</button>
      </form>
    </div>
  );
};

export default Test;
