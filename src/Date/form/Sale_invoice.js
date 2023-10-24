import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import $, { removeData } from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.js";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  faFaceAngry,
  faRectangleXmark,
  faPenSquare,
  faCheck,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";

function Invoice() {
  useEffect(() => {
    // Gọi API để lấy danh sách
    axios
      .get("http://localhost:8081/new?page=1&limit=2")
      .then((res) => {
        // Lưu danh sách vào trạng thái
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .post("http://localhost:8081/new", {
        title: "test",
        content: "test",
        categoryCode: "chinh-tri",
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  const data = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
    { id: 4, name: "Date" },
    { id: 5, name: "Elderberry" },
  ];
  const [phone, setPhone] = useState([]);
  const [input, setInput] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [forms, setForms] = useState([
    {
      name: "",
      age: "",
      address: "",
      hometown: "",
    },
  ]);

  const abc = () => {
    const ed = forms.map((item) => {
      console.log(item.hometown);
      return;
    });
  };
  const addForm = () => {
    setForms((forms) => [
      ...forms,
      {
        name: "",
        age: "",
        address: "",
        hometown: "",
      },
    ]);
  };

  const handleSDT = (value) => {
    const val = value;
    setInput(val);
    let newSDT = [...data];
    if (val == "") {
      setPhone([]);
    }
    const example = newSDT.filter((item, place) => {
      return item.name.includes(val);
    });

    setPhone(example);
  };

  const putValueToInput = (item) => {
    setInput(item);
  };

  const hangdlePhone = () => {
    console.log("aaaaa");
    data.forEach((item, index) => {
      console.log("input ", input);
      console.log("name ", item.name);
      if (input === item.name) {
        setInput1(item.id);
        setInput2(item.name);
        console.log("bbbb");
      }
    });
  };

  return (
    <div className="container" style={{ width: "100%", margin: 0, padding: 0 }}>
      <div style={{ position: "relative" }}>
        <div className="row" style={{ width: 1380, marginLeft: "10px" }}>
          <div className="col-sm-6">
            <div className="row">
              <div className="col-sm-8">
                <label>
                  SĐT
                  <input
                    list="browsers"
                    name="myBrowser"
                    onChange={(e) => putValueToInput(e.target.value)}
                    value={input}
                  />
                </label>
                <datalist
                  id="browsers"
                  style={{ maxHeight: "40px", overflow: "auto" }}
                >
                  {data.map((item, index) => (
                    <option value={item.name} />
                  ))}
                </datalist>
              </div>
              <div className="col-sm-4">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={hangdlePhone}
                >
                  Primary
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="email">sdt</label>
              <input
                type="email"
                class="form-control"
                id="email"
                onChange={(e) => handleSDT(e.target.value)}
                value={input}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            width: 660,
            borderRadius: "10px",
            marginTop: "-13px",
            marginLeft: "24px",
            position: "absolute",
            backgroundColor: "red",
            zIndex: 10,
          }}
        >
          <ul>
            {phone.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row" style={{ width: 1380, marginLeft: "10px" }}>
        <div className="col-sm-6">
          <div class="form-group">
            <label for="email">sdt</label>
            <input
              type="email"
              class="form-control"
              id="email"
              value={input1}
            />
          </div>
        </div>
      </div>
      <div className="row" style={{ width: 1380, marginLeft: "10px" }}>
        <div className="col-sm-6">
          <div class="form-group">
            <label for="email">Tittle</label>
            <input
              type="email"
              class="form-control"
              id="email"
              value={input2}
            />
          </div>
        </div>
      </div>
      {forms.map((form, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Tên"
            name="name"
            onChange={(event) => (form.name = event.target.value)}
          />
          <input
            type="number"
            placeholder="Tuổi"
            name="age"
            onChange={(event) => (form.age = event.target.value)}
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            name="address"
            onChange={(event) => (form.address = event.target.value)}
          />
          <input
            type="text"
            placeholder="Quê quán"
            name="hometown"
            onChange={(event) => (form.hometown = event.target.value)}
          />
          <button type="button" class="btn btn-primary" onClick={abc}>
            test
          </button>
          <button type="button" class="btn btn-primary" onClick={addForm}>
            add
          </button>
        </div>
      ))}
    </div>
  );
}
export default Invoice;
