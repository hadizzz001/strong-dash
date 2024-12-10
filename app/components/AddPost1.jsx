"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import { useRouter } from 'next/navigation';

const AddPost = () => {
  const { push } = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = useState({
    description: "",
    videoUrl: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });
  const [active, setActive] = useState(false);
  const [imgs, setImgs] = useState([]); // Initialize as empty array
  const [files, setFiles] = useState([]);

  const handleFileChangeEvent = (e) => {
    const successfulFiles = e.allEntries.filter((file) => file.status === "success");
    setFiles(successfulFiles);
    const cdnUrls = successfulFiles.map(file => file.cdnUrl);
    setImgs(cdnUrls);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    setInputs((prevState) => ({
      ...prevState,
      videoUrl: imgs, // This keeps videoUrl synced with the selected images if necessary
    }));
  }, [imgs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!inputs.videoUrl.trim()) {
      alert("Please provide a video URL");
    } else if (!inputs.description.trim()) {
      alert("Please provide a description");
    } else if (!inputs.age.trim()) {
      alert("Please select an age range");
    } else if (!inputs.gender.trim()) {
      alert("Please select a gender");
    } else if (!inputs.height.trim()) {
      alert("Please provide a height");
    } else if (!inputs.weight.trim()) {
      alert("Please provide a weight");
    } else {
      setActive(true);
      axios
        .post("/api/posts1", inputs)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
        .finally(() => {
          setInputs({
            description: "",
            videoUrl: "",
            age: "",
            gender: "",
            height: "",
            weight: "",
          });
          setModalOpen(false);
          setActive(false);
          window.location.replace("/premium");
        });
    }
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="text-white p-3 cursor-pointer"
        style={{ background: "#ab695d" }}
      >
        Add Video
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form className="w-full mt-3" onSubmit={handleSubmit}>
          <textarea
            name="description"
            value={inputs.description}
            onChange={handleInputChange}
            placeholder="Enter a description"
            className="w-full p-2 mt-3 border rounded"
            rows="3"
          ></textarea>

          <input
            type="text"
            name="videoUrl"
            value={inputs.videoUrl}
            onChange={handleInputChange}
            placeholder="Enter video URL"
            className="w-full p-2 mt-3 border rounded"
          />

          <select
            name="age"
            value={inputs.age}
            onChange={handleInputChange}
            className="w-full p-2 mt-3 border rounded"
          >
            <option value="">Select age range</option>
            <option value="18-25">18-25</option>
            <option value="26-45">26-45</option>
            <option value="46+">46+</option>
          </select>

          <select
            name="gender"
            value={inputs.gender}
            onChange={handleInputChange}
            className="w-full p-2 mt-3 border rounded"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option> 
          </select>

          <input
            type="text"
            name="height"
            value={inputs.height}
            onChange={handleInputChange}
            placeholder="Enter height"
            className="w-full p-2 mt-3 border rounded"
          />

          <input
            type="text"
            name="weight"
            value={inputs.weight}
            onChange={handleInputChange}
            placeholder="Enter weight"
            className="w-full p-2 mt-3 border rounded"
          />

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
    </div>
  );
};

export default AddPost;
