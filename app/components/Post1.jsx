"use client";

import Modal from "./Modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Post = ({ post }) => {
  const router = useRouter();

  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);
  const [active, setActive] = useState(false);
  const [active1, setActive1] = useState(false);
  const [firstSelectValue, setFirstSelectValue] = useState("");
  const [value1, setValue1] = useState("");
  const [imgs, setImgs] = useState([""]);

  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEditSubmit = (e) => {
    e.preventDefault();

    setActive(true);
    axios
      .patch(`/api/posts1/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        setActive(false);
        window.location.replace("/dashboard");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostToEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeletePost = (id) => {
    axios
      .delete(`/api/posts1/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpenModalEdit(false);
        window.location.replace("/dashboard");
      });
  };

  const handleImgChange = (url) => {
    if (url) {
      setImgs(url);
    }
  };

  const handleFirstSelectChange = (event) => {
    const selectedValue = event.target.value;
    setFirstSelectValue(selectedValue);
    setActive1(true);
  };

  useEffect(() => {
    if (firstSelectValue) {
      setPostToEdit((prevState) => ({ ...prevState, gender: "" + firstSelectValue }));
    }
  }, [firstSelectValue]);

  useEffect(() => {
    if (!imgs.includes("")) {
      setPostToEdit((prevState) => ({ ...prevState, videoUrl: imgs }));
    }
  }, [imgs]);

  return (
    <div className="bg-slate-200 p-3 min-h-full min-w-full" key={post.id}>
      <b>Gender: {post.gender}</b>
      <br />
      <b>Height: {post.height}</b>
      <br />
      <b>Weight: {post.weight}</b>
      <br />
      <b>Age: {post.age}</b>
      <br />

      <iframe
              width="100%"
              height="200"
              src={post.videoUrl} 
              frameBorder="0"
              allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

      <div className="pt-5">
        <button
          className="text-blue-700 mr-3"
          onClick={() => setOpenModalEdit(true)}
        >
          Edit
        </button>

        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form className="w-full mt-3" onSubmit={handleEditSubmit}>
            <select
              name="age"
              className="w-full p-2"
              value={postToEdit.age || ""}
              onChange={handleChange}
              required
            >
              <option value="">Select age range</option>
              <option value="18-25">18-25</option>
              <option value="26-45">26-45</option>
              <option value="46+">46+</option>
            </select>

            <input
              type="text"
              placeholder="Weight"
              name="weight"
              className="w-full p-2"
              value={postToEdit.weight || ""}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Height"
              name="height"
              className="w-full p-2 my-3"
              value={postToEdit.height || value1}
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              value={firstSelectValue}
              onChange={handleFirstSelectChange}
              className="w-full p-2"
            >
              <option value="0">--Choose Gender--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <button
              type="submit"
              className="px-5 py-2 mt-3"
              style={{ background: "#ab695d" }}
              disabled={active}
            >
              Submit
            </button>
          </form>
        </Modal>

        <button
          onClick={() => setOpenModalDelete(true)}
          className="text-red-700 mr-3"
        >
          Delete
        </button>

        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h1 className="text-2xl pb-3">
            Are you sure, You want to delete this post?
          </h1>

          <div>
            <button
              onClick={() => handleDeletePost(post.id)}
              className="text-blue-700 font-bold mr-5"
            >
              YES
            </button>
            <button
              onClick={() => setOpenModalDelete(false)}
              className="text-red-700 font-bold mr-5"
            >
              No
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Post;
