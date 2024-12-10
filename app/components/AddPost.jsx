"use client";

import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from 'next/navigation';

const AddPost = () => {
  const router = useRouter();
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [active, setActive] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send the form data to the server
    axios
      .post("/api/posts", inputs)
      .then((res) => {
        console.log(res);
        window.location.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setInputs({});
        setModalOpen(false);
        setActive(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="text-white p-3 cursor-pointer"
        style={{ background: "#6c3429" }}
      >
        Ad Free Video
      </button>

      <button
        onClick={() => push("/premium")}
        className="text-white p-3 cursor-pointer"
        style={{ marginLeft: "1em", background: "#6c3429" }}
      >
        Add New Premium Video
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form className="w-full mt-5" onSubmit={handleSubmit}>
          <textarea
            placeholder="Description"
            name="description"
            className="w-full p-2 my-5"
            value={inputs.description || ""}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Video Link"
            name="videoUrl"
            className="w-full p-2 my-5"
            value={inputs.videoUrl || ""}
            onChange={handleChange}
            required
          />
          <button 
            type="submit" 
            className="px-5 py-2" 
            style={{ background: "#6c3429", color: "white", display: "block", marginBlock: "inherit" }} 
            disabled={active}
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddPost;
