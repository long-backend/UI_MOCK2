import React from "react";
import PropTypes from "prop-types";
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
import { set, useForm } from "react-hook-form";
import data from "./data.json";

import Pagination from "react-paginate";
import ReactPaginate from "react-paginate";

import {
  faFaceAngry,
  faRectangleXmark,
  faPenSquare,
  faCheck,
  faTrash,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";

function Todo(props) {

  const [medical,setMedical]= useState([]);
  const [selectValue, setSelectValue] = useState(null);

  const tableStyle = {
    borderCollapse: 'separate',
    borderSpacing: 0,
    width: '100%',
  };

  const cellStyle = {
    borderRight: '2px solid #000', // Đường kẻ đứng đậm
    borderBottom: '1px solid #ccc', // Đường kẻ ngang mờ đi
    padding: '8px',
  };

  const lastCellStyle = {
    borderRight: 'none', // Loại bỏ đường kẻ dọc ở cột cuối cùng
  };
  console.log("data ", data);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    unregister,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      name: "long",
      age: 23,
      birth: "2023-10-10",
      message: "try hard again",
      email: "xlong20052000@gmail.com",
    },
  });
let a=0;

 const country = watch("country");

  
  useEffect(() => {
    console.log('country ban dau',country);
    console.log('country ban dau',country === undefined);
    if(country !== undefined && country !=="" ) {
  console.log('vooooooo');
  const listMedical=[...medical,{"name": "John Doe",
  "email": "johndoe@example.com",
  "age": 23,
  "date":"2023-01-10",
  "special":"noodle",
  "country" : "Hoi An",
  "message":"try hard again"}]
  setMedical(listMedical)
  setSelectValue(country)
}
  }, [country]);
  console.log('medical',medical);

  useEffect(() => {
    setTotal(data.length);
    setTotalPage(Math.ceil(data.length / 5));
  }, []);

  const onSubmit = (data) => {
    console.log( 'du lieu',data);
    console.log( 'list',medical);
    const tonghop={...data, list:medical}
    console.log('tong hop',tonghop);
  };
  console.log('error',errors);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    console.log("phan trang ", event.selected);
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: "rgb(226 217 217)", borderRadius: "10px" }}
        class="container"
      >
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                {...register("name", {
                  required: "yeu cau nhap",
                  minLength: {
                    value: 1,
                    message: "error message", // JS only: <p>error message</p> TS only support string
                  },
                })}
                type="text"
                class="form-control"
                id="name"
                name="name"
                placeholder="Your name"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                {...register("email", {
                  required: "yeu cau nhap",
                  minLength: {
                    value: 1,
                    message: "error message", // JS only: <p>error message</p> TS only support string
                  },
                })}
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Your email"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Age</label>
              <input
                {...register("age", {
                  required: "yeu cau nhap",
                  minLength: {
                    value: 1,
                    message: "error message", // JS only: <p>error message</p> TS only support string
                  },
                })}
                type="number"
                class="form-control"
                id="age"
                name="age"
                placeholder="Your name"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="email">Date of birth</label>
              <input
                {...register("birth", {
                  required: "yeu cau nhap",
                  minLength: {
                    value: 1,
                    message: "error message", // JS only: <p>error message</p> TS only support string
                  },
                })}
                type="Date"
                class="form-control"
                id="birth"
                name="birth"
                placeholder="Your email"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="name">Age</label>
              <select
                className="form-control"
                id="country"
                name="country"
              
              >
                <option value="">---Chọn country---</option>
                <option value="Hoi An">Hoi AN</option>
                <option value="Quang Nam">Quang Nam</option>
                <option value="Khac">Khác</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label for="email">Special</label>
              <input
                {...register("special", {
                  
                })}
                type="text"
                disabled="true"
                class="form-control"
                id="special"
                name="special"
                placeholder="Your email"
              />
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            {...register("message", {
              required: "yeu cau nhap",
              minLength: {
                value: 10,
                message: "error message", // JS only: <p>error message</p> TS only support string
              },
            })}
            class="form-control"
            id="message"
            name="message"
            rows="5"
            placeholder="Your message"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>

        <div className="mock" style={{marginTop:'30px'}}>
      <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-center"style={{ borderRight: '3px solid red',borderLeft:'3px solid red',borderTop:'3px solid red' }} > Name</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red' }}> Email</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red' }}>Age</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red'}}>Born</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red' }}>Country</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red' }}>Special</th>
            </tr>
          </thead>
          <tbody>
           
                  <tr >
                    <td className="text-center" style={{ borderRight: '3px solid red',borderLeft:'3px solid red',width:'168px' }}  >

                    <select 
                    
                    style={{width:'216px',paddingLeft:'52px',display:'inline-block'}}
                className="form-control "
                id="country"
                name="country"
                 
                {...register("country")}
              >
                <option value="">---Chọn country---</option>
                <option value="Hoi An">Hoi AN</option>
                <option value="Quang Nam">Quang Nam</option>
                <option value="Da nang">Da nang</option>
                <option value="Khac">Khác</option>
              </select>
                    </td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}></td>
                  </tr>
                  {medical &&
                    medical
                .map((item, index) => (
                  <tr >
                    <td className="text-center" style={{ borderRight: '3px solid red',borderLeft:'3px solid red' }}  >{item.name}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.age}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.email}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.date}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.country}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.message}</td>
                  </tr>
                ))}
                    
              
                <tr >
                    <td className="text-center" style={{ borderRight: '3px solid red',borderLeft:'3px solid red',borderBottom:'3px solid red' }}  ></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                  </tr>
          </tbody>
        </table>

      </div>
      </form>
      {/* table */}
      <div className="table" style={{ marginTop: "20px" }}>
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th className="text-center"style={{ borderRight: '3px solid red',borderLeft:'3px solid red',borderTop:'3px solid red' }} > Name</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red' }}> Email</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red' }}>Age</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red'}}>Born</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red' }}>Country</th>
              <th className="text-center" style={{ borderRight: '3px solid red',borderTop:'3px solid red' }}>Special</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data
                .slice(currentPage * 5, (currentPage + 1) * 5)
                .map((item, index) => (
                  <tr >
                    <td className="text-center" style={{ borderRight: '3px solid red',borderLeft:'3px solid red' }}  >{item.name}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.age}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.email}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.date}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.country}</td>
                    <td className="text-center" style={{ borderRight: '3px solid red' }}>{item.message}</td>
                  </tr>
                ))}
                <tr >
                    <td className="text-center" style={{ borderRight: '3px solid red',borderLeft:'3px solid red',borderBottom:'3px solid red' }}  ></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                    <td className="text-center" style={{ borderRight: '3px solid red',borderBottom:'3px solid red'  }}></td>
                  </tr>
          </tbody>
        </table>
      </div>

      {/* phân trang */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        pageCount={totalPage}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
     
    </div>
  );
}

export default Todo;
