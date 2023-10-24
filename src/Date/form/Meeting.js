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

function Metting() {
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

  const [date, setDate] = useState([
    [
      { name: "long", old: 23 },
      { name: "hoang", old: 25 },
    ],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]);

  const [form, setForm] = useState({
    title: "",
    day: "",
    startTime: "",
    endTime: "",
    content: "",
  });

  const [calendar, setCarlendar] = useState([
    { id: 1, evene: [{ title: "tau thich mi", day: 1 }] },
    { id: 2, evene: [] },
    { id: 3, evene: [] },
    { id: 4, evene: [] },
    { id: 5, evene: [] },
    { id: 6, evene: [] },
    { id: 7, evene: [] },
    { id: 8, evene: [] },
    { id: 9, evene: [] },
    { id: 10, evene: [] },
    { id: 11, evene: [] },
    { id: 12, evene: [] },
    { id: 13, evene: [] },
    { id: 14, evene: [] },
    { id: 15, evene: [] },
    { id: 16, evene: [] },
    { id: 17, evene: [] },
    { id: 18, evene: [] },
    { id: 19, evene: [] },
    { id: 20, evene: [] },
    { id: 21, evene: [] },
  ]);
  // order sẽ giữ id của phần tử đang update
  const [order, setOrder] = useState();

  // phần tử giữ giá trị của day để xác định có thay đổi day không
  const [dayOccupy, setDayOccupy] = useState();

  console.log("calendar   ", calendar);

  const addItem = (id, element) => {
    const newCalendar = [...calendar];
    newCalendar[id].evene = [...calendar[id].evene, element];
    setCarlendar(newCalendar);
  };

  const editItem = (id, index, element) => {
    if (dayOccupy !== id) {
      //remove item ở day cũ
      console.log(" ngay cũ", dayOccupy);
      console.log(" id moi", id);
      const newCalendar = [...calendar];
      newCalendar[dayOccupy - 1].evene = newCalendar[
        dayOccupy - 1
      ].evene.filter((item, place) => place !== index);

      newCalendar[id].evene = [...calendar[id].evene, element];
      setCarlendar(newCalendar);
      // them item vào vị trí day mới
    } else {
      const newCalendar = [...calendar];
      newCalendar[id].evene = newCalendar[id].evene.map((item, locate) =>
        locate === index ? { ...item, ...element } : item
      );
      setCarlendar(newCalendar);
    }
  };

  const putValueToInput = (id, index, element) => {
    setDayOccupy(element.day);
    setOrder(index);
    setStateButton(true);
    const exForm = { ...form };
    exForm.title = element.title;
    exForm.day = element.day;
    exForm.startTime = element.startTime;
    exForm.endTime = element.endTime;
    exForm.content = element.content;
    setForm(exForm);
  };

  const handleResetForm = () => {
    const reset = { ...form };
    reset.title = "";
    reset.day = "";
    reset.startTime = "";
    reset.endTime = "";
    reset.content = "";
    setForm(reset);
    setStateButton(false);
  };

  const removeItem = (id, locate) => {
    const newCalendar = [...calendar];
    newCalendar[id].evene = newCalendar[id].evene.filter(
      (item, index) => index !== locate
    );
    setCarlendar(newCalendar);
  };

  const renderTable = () => {
    const table = [];
    for (let i = 0; i < 3; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        const index = i * 7 + j;
        if (index < calendar.length) {
          row.push(
            <td
              key={calendar[index].id}
              style={{
                maxWidth: 10,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Day : {calendar[index].id}
              {calendar[index].evene.map((item, locate) => (
                <div className="row">
                  <div className="col-md-6">
                    <span
                      style={{
                        maxWidth: 70,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "inline-block",
                      }}
                    >
                      {item.title} : {item.day}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span style={{ paddingTop: 5 }}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ fontSize: 13, cursor: "pointer" }}
                        onClick={() => putValueToInput(index, locate, item)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{
                          marginLeft: 8,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                        onClick={() => removeItem(index, locate)}
                      />
                    </span>
                  </div>
                </div>
              ))}
            </td>
          );
        } else {
          row.push(<td key={j}></td>);
        }
      }
      table.push(<tr key={i}>{row}</tr>);
    }
    return table;
  };

  const [error, setError] = useState({
    title: "",
    day: "",
    startTime: "",
    endTime: "",
    content: "",
  });
  const [id, setId] = useState();
  const [locate, setLocate] = useState();
  const [stateButton, setStateButton] = useState(false);
  // index chính là date nhập từ form và sẽ có element

  const addToSubarray = (index, element) => {
    const newArray = [...date];
    newArray[index] = [...newArray[index], element];
    setDate(newArray);
  };
  // id là vị trí trong mảng cần sưả, state là vị trí đối tượng trong mảng
  const updateToSubarray = (id, state, element) => {
    const newArray = [...date];
    newArray[id] = newArray[id].map((item, index) =>
      state === index ? { ...item, ...element } : item
    );

    setDate(newArray);

    console.log("thanh cong khong vay");
    // newArray[index] = [...newArray[index], element];
  };

  const deleteArray = (id, state, element) => {
    console.log("xoa mot phan tu");
    const newArray = [...date];
    newArray[id] = newArray[id].filter((item) => item !== element);
    setDate(newArray);
  };

  const handleTitle = (title) => {
    const obj = { ...form, title: title };
    setForm(obj);
  };
  const handleDay = (day) => {
    const obj = { ...form, day: day };
    setForm(obj);
  };
  const handleStarTime = (startTime) => {
    const obj = { ...form, startTime: startTime };
    setForm(obj);
  };
  const handleEndTime = (endTime) => {
    const obj = { ...form, endTime: endTime };
    setForm(obj);
  };
  const handleContent = (Content) => {
    const obj = { ...form, content: Content };
    setForm(obj);
  };
  const regexTitle = /^[A-Za-z0-9\s]+$/;
  const regexDay = /^(20|21|[1-9]|1[0-9])$/;

  const regexContent = /^[A-Za-z0-9\s]+$/;
  // chỉ chứa text số vfa khoảng trắng
  const regexAlphabetSpaceAndNumber = /^[a-zA-Z0-9\s]+$/;

  const validate = () => {
    const replaceError = { ...error };

    if (regexTitle.test(form.title)) {
      replaceError.title = "";
    } else {
      replaceError.title = "chuỗi ko đc để trống";
    }

    if (regexDay.test(form.day)) {
      replaceError.day = "";
    } else {
      replaceError.day = "lỗi day";
    }
    if (!form.startTime) {
      replaceError.startTime = "lỗi day";
    } else {
      replaceError.startTime = "";
    }
    if (!form.startTime || !form.endTime) {
      replaceError.endTime = "lỗi endate trống";
    } else if (form.startTime > form.endTime) {
      replaceError.endTime = " lỗix enDdate nhỏ";
    } else {
      replaceError.endTime = "";
    }
    if (regexContent.test(form.content)) {
      replaceError.content = "";
    } else {
      replaceError.content = "lỗi content";
    }
    setError(replaceError);

    if (
      !replaceError.content &&
      !replaceError.title &&
      !replaceError.day &&
      !replaceError.startTime &&
      !replaceError.endTime
    ) {
      //  thực hiệjn logic
      console.log("them phan tư vao mảng ");
      if (stateButton === false) {
        addItem(form.day - 1, form);
      } else {
        console.log("chrỉnh sưa thong tin");
        editItem(form.day - 1, order, form);
      }
    }
  };
  console.log("gia tri id dan dc update", id);

  const handleEdit = (id, item, index) => {
    const oldValue = { ...item };
    setForm(oldValue);
    setId(id);
    setLocate(index);
    setStateButton(true);
  };

  const handleUpdate = () => {};

  return (
    <div className="container" style={{ width: "100%", margin: 0, padding: 0 }}>
      <div className="row" style={{ width: 1380 }}>
        {/* // 1 hàng */}
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div class="form-group">
                <label for="email">Tittle</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  onChange={(e) => handleTitle(e.target.value)}
                  value={form.title}
                />
              </div>
              {error.title && (
                <span style={{ color: "red" }}>{error.title}</span>
              )}
            </div>
            <div className="col-sm-6">
              <div class="form-group">
                <label for="email">Day</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  value={form.day}
                  onChange={(e) => handleDay(e.target.value)}
                />
              </div>
              {error.day && <span style={{ color: "red" }}>{error.day}</span>}
            </div>
          </div>
        </div>
        {/* // 2 hang */}
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div class="form-group">
                <label for="email">Start time</label>
                <input
                  type="date"
                  class="form-control"
                  id="email"
                  onChange={(e) => handleStarTime(e.target.value)}
                  value={form.startTime}
                />
              </div>
              {error.startTime && (
                <span style={{ color: "red" }}>{error.startTime}</span>
              )}
            </div>
            <div className="col-sm-6">
              <div class="form-group">
                <label for="email">End time</label>
                <input
                  type="date"
                  class="form-control"
                  id="email"
                  value={form.endTime}
                  onChange={(e) => handleEndTime(e.target.value)}
                />
              </div>
              {error.endTime && (
                <span style={{ color: "red" }}>{error.endTime}</span>
              )}
            </div>
          </div>
        </div>

        {/* //3 hang */}

        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div class="form-group">
                <label for="email">Content</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  onChange={(e) => handleContent(e.target.value)}
                  value={form.content}
                />
              </div>
              {error.content && (
                <span style={{ color: "red" }}>{error.content}</span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="nut" style={{ display: "flex", marginBottom: 50 }}>
        <button
          style={{ backgroundColor: "green", marginLeft: 1000 }}
          onClick={handleResetForm}
        >
          Cancel{" "}
        </button>

        {!stateButton ? (
          <button
            style={{ backgroundColor: "blue", marginLeft: 30 }}
            onClick={validate}
          >
            Create{" "}
          </button>
        ) : (
          <button
            style={{ backgroundColor: "blue", marginLeft: 30 }}
            onClick={validate}
          >
            Update{" "}
          </button>
        )}
      </div>
      {/* //  phần về hiên thị ngày */}
      <div className="row" style={{ marginLeft: 120 }}>
        <table class="table table-bordered">
          <thead>
            <tr className="tieude" style={{ marginBottom: 50 }}>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wesday</th>
              <th>thursday</th>
              <th>friday</th>
              <th>Staturdate</th>
              <th>Sunday</th>
            </tr>
          </thead>
        </table>

        <table class="table table-bordered">
          <thead></thead>
          <tbody>{renderTable()}</tbody>
        </table>
      </div>
    </div>
  );
}
export default Metting;
