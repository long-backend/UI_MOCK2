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

import Pagination from "react-paginate";
import ReactPaginate from "react-paginate";
import data from './data.json'
import {deleteRequest, getRequest ,putRequest,postRequest} from '../axios/httpRequest'
import { useNavigate } from "react-router-dom";

import {
    faFaceAngry,
    faRectangleXmark,
    faPenSquare,
    faCheck,
    faTrash,
    faEdit,
    faCartPlus,
    faTruckFieldUn,
    faArrowTrendUp,
    faCirclePlus,
    faCircleXmark,
    faArrowRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";

function Medical(props) {
    const [medical,setMedical]= useState([]);
    const navigate = useNavigate();
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
      }
      useEffect(() => {
        // Kiểm tra xem biến đã tồn tại trong localStorage chưa
        if (!localStorage.getItem('tenBien')) {
          // Nếu chưa tồn tại, khởi tạo nó với giá trị "HDXT0001"
          console.log('da ton tai');
         // localStorage.setItem('tenBien', 'HDXT0001');
        } else {
            let value= localStorage.getItem('tenBien');
            const matches = value.match(/^([A-Z]+)(\d+)$/);
            if (matches && matches.length === 3) {
              const prefix = matches[1];
              const number = parseInt(matches[2], 10);
              console.log('number',number);
              if (!isNaN(number)) {
                const newNumber = number + 1;
                console.log('newNumber',newNumber);
                const newString = prefix + newNumber.toString().padStart(4, '0');
                console.log('newString',newString);
                localStorage.setItem('tenBien', newString);
                console.log(`Giá trị đã cộng lên: ${newString}`);
              }
            }
        }
      }, []);
   

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
        defaultValues: {"nhanVien":"Xuân long","ngayLap":new Date().toISOString().substr(0, 10),"soHD":localStorage.getItem('tenBien')
        
         
        },
      });
// lưu dữ liệu vào loalstorage
  

// lưu dữ liệu vào loalstorage



      
      const onSubmit = (data) => {
        const setErrorField = async (resultInput) => {
            const obj = resultInput || {};
            for (const key in obj) {
              setError(key, {
                type: "custom",
                message: obj[key],
              });
            }
          }

        if (medical.length === 0) {
            setError('custom', { message: 'Vui lòng thêm thông tin thuốc' });
            return;
          }

          // Kiểm tra xem biến đã tồn tại trong localStorage chưa
        if (!localStorage.getItem('maHoaDon')) {
            // Nếu chưa tồn tại, khởi tạo nó với giá trị "HDXT0001"
            console.log('da ton tai');
            localStorage.setItem('maHoaDon', 'HT0001');
          } else {
              let value= localStorage.getItem('maHoaDon');
              const matches = value.match(/^([A-Z]+)(\d+)$/);
              if (matches && matches.length === 3) {
                const prefix = matches[1];
                const number = parseInt(matches[2], 10);
                console.log('number',number);
                if (!isNaN(number)) {
                  const newNumber = number + 1;
                  console.log('newNumber',newNumber);
                  const newString = prefix + newNumber.toString().padStart(4, '0');
                  console.log('newString',newString);
                  localStorage.setItem('maHoaDon', newString);
                  console.log(`Giá trị đã cộng lên: ${newString}`);
                }
              }
          }

       console.log('data',data);
       const tonghop={...data, list:medical,maHoaDon:localStorage.getItem('maHoaDon')}
    
    const fetchApi = async () => {
        try {
          const result = await postRequest("http://localhost:8080/medical", tonghop);
          changeRouter("/phama", { name: "John Doe" });
          //changeRouter("/list-hdbh", { status: 'success', message: 'Thêm thành công' });
        } catch (error) {
            if (!localStorage.getItem('maHoaDon')) {
                // Nếu chưa tồn tại, khởi tạo nó với giá trị "HDXT0001"
                console.log('da ton tai');
                localStorage.setItem('maHoaDon', 'HT0001');
              } else {
                  let value= localStorage.getItem('maHoaDon');
                  const matches = value.match(/^([A-Z]+)(\d+)$/);
                  if (matches && matches.length === 3) {
                    const prefix = matches[1];
                    const number = parseInt(matches[2], 10);
                    console.log('number',number);
                    if (!isNaN(number)) {
                      const newNumber = number - 1;
                      console.log('newNumber',newNumber);
                      const newString = prefix + newNumber.toString().padStart(4, '0');
                      console.log('newString',newString);
                      localStorage.setItem('maHoaDon', newString);
                      console.log(`Giá trị đã cộng lên: ${newString}`);
                    }
                  }
              }
          console.log(error);
          const cloneErr = { ...error.response.data }
          await setErrorField(cloneErr);
        }
      };
      fetchApi();
      };


    //   nút trở về 

    const back = ()=>{
        changeRouter("/phama", { });
    }
    //   nút trở về 

             // xóa thuốc
const [selectedRows, setSelectedRows] = useState([]);
const handleRowClick = (tenThuoc) => {
    if (selectedRows.includes(tenThuoc)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== tenThuoc));
      console.log('đã được chọn để bỏ xóa',tenThuoc);
    } else {
      setSelectedRows([...selectedRows, tenThuoc]);
      console.log('đã được chọn để xóa',tenThuoc);
    }
  };

  const handleDelete = () => {
    //const updatedData = medical.filter((item) => !selectedRows.includes(item.id));
    const updatedData = medical.filter((item) => !selectedRows.includes(item.tenThuoc));
console.log('update data',updatedData);
    setMedical(updatedData);
    setSelectedRows([]);
  };

// xóa thuốc
      console.log(errors);
      const tenThuoc = watch("tenThuoc");

      useEffect(() => {
        clearErrors("custom");
        if(tenThuoc !== undefined && tenThuoc !=="" ) {
            

            if (medical.find((item) => item.tenThuoc === tenThuoc)=== undefined) {
                // Tên không tồn tại, lấy đối tượng ra
                const object = data.find((item) => item.tenThuoc === tenThuoc);
                // In ra tên của đối tượng
                 console.log('doi tuong',object);
                const listMedical=[...medical,object]
                setMedical(listMedical)
              } 
      
    }
      }, [tenThuoc]);

      //set tổng tiền
      useEffect(() => {
        let tongTien=0;
        medical.map((item,index) =>{
            tongTien=tongTien+item.thanhTien;
        })
        setValue("tongTien",tongTien)
 
      }, [medical]);



      console.log('tenthuoc',tenThuoc);

      console.log('data',data);

    return (
        <div>
            <h2 style={{ margin: "auto", textAlign: "center" }}>
                Quản lý cửa hàng thuốc tây
            </h2>
            <hr
                style={{ borderTopColor: "rgb(141, 128, 128)", borderTopWidth: "2px" }}
            />
            <ul className="nav nav-tabs" style={{borderBottom:'2px solid gray'}}>
                <li className="nav-item" >
                    <a className="nav-link " href="#">
                        <b>Hệ thống</b>
                    </a>
                    
                </li>
                <li className="nav-item" style={{borderLeft:'2px solid gray',borderTop:'2px solid gray',borderRight:'2px solid gray',borderBottom:'0px'}}>
                <div className="cha" style={{position:'relative'}}>
                <div className="com">
                <a className="nav-link active  " style={{borderBottom:'0px'}} href="#">
                        <b>Chức năng</b>
                    </a>
                </div>

                
                    <div className="chen" style={{width:'114px',backgroundColor:'white',height:'3px',position:'absolute'
                    }}>

                    </div>
                </div>
                    
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">
                        <b>Quản lý thông tin</b>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">
                        <b>Tra cứu</b>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">
                        <b>Báo cáo</b>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">
                        <b>Trợ giúp</b>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <b>Link</b>
                    </a>
                </li>
            </ul>
            <div className="icon" style={{ marginTop: "20px", marginLeft: "30px" }}>
                <ul style={{ listStyleType: "none", display: "flex" }}>
                    <li style={{ marginRight: "70px" }}>
                        <FontAwesomeIcon
                            icon={faCartPlus}
                            style={{
                                marginLeft: 8,
                                fontSize: 30,
                                cursor: "pointer",
                                color: "#03A9F4",
                            }}
                        />
                        <h6 style={{ marginLeft: "-21px", marginTop: "10px" }}>
                            QL Bán hàng
                        </h6>
                    </li>
                    <li style={{ marginRight: "70px" }}>
                        <FontAwesomeIcon
                            icon={faTruckFieldUn}
                            style={{
                                marginLeft: 8,
                                fontSize: 30,
                                cursor: "pointer",
                                color: "#03A9F4",
                            }}
                        />
                        <h6 style={{ marginLeft: "-22px" }}>QL Nhập kho</h6>
                    </li>
                    <li>
                        <FontAwesomeIcon
                            icon={faArrowTrendUp}
                            style={{
                                marginLeft: 8,
                                fontSize: 30,
                                cursor: "pointer",
                                color: "#03A9F4",
                            }}
                        />
                        <h6 style={{ marginLeft: "-24px" }}>QL Xuất kho</h6>
                    </li>
                </ul>
            </div>
            <hr
                style={{ borderTopColor: "rgb(141, 128, 128)", borderTopWidth: "2px" }}
            />
            <div className="row">
                <div
                    className="col-md-2 form-group p-0"
                    style={{ border: "3px solid black", height: "1219px" }}
                >
                    <div
                        className="chon"
                        style={{ marginLeft: "40px", marginTop: "10px" }}
                    >
                        <h6
                            style={{ margin: "auto", textAlign: "center", display: "flex" }}
                        >
                            Chọn nhanh
                            <p style={{ marginTop: "-3px", marginLeft: "68px" }}>
                                <i
                                    className="fa fa-caret-left"
                                    aria-hidden="true"
                                    style={{ fontSize: "30px" }}
                                ></i>
                            </p>
                        </h6>
                    </div>
                    <hr
                        style={{
                            borderTopColor: "rgb(141, 128, 128)",
                            borderTopWidth: "3px",
                            width: "100%",
                            // marginTop: "13px",
                            // marginLeft: "-5px",
                        }}
                    />
                    {/* menu */}
                    <div className="menu">
                        <ul style={{ listStyleType: "none" }}>
                            <li>
                                <b>F2 - Bán hàng</b>
                            </li>
                            <li>
                                <b>F3 - Nhập kho</b>
                            </li>
                            <li>
                                <b>F4 - Xuất hoàn trả</b>
                            </li>
                            <li>
                                <b>F5 - Xuất hủy</b>
                            </li>
                            </ul>
                            <div>
                            <hr
                            className="p-0 "
                                style={{
                                    borderTopColor: "rgb(141, 128, 128)",
                                    borderTopWidth: "3px",
                                    width: "100%",
                                    
                                }}
                            />
                            </div>
                            <ul style={{ listStyleType: "none" }}>
                            <li>
                                <b>F6 - Xuất tra cứu</b>
                            </li>
                            </ul>
                            
                            <hr
                                style={{
                                    borderTopColor: "rgb(141, 128, 128)",
                                    borderTopWidth: "3px",
                                    width: "100%",
                                    
                                }}
                            />
                            <ul style={{ listStyleType: "none" }}>
                            <li>
                                <b>F7 - Hệ thông báo cáo</b>
                            </li>
                            <li>
                                <b>F8 - Nhật ký bán hàng</b>
                            </li>
                            <li>
                                <b>F9 - Đóng xuất</b>
                            </li>
                        </ul>
                    </div>
                    {/* menu */}
                </div>
                <div
                    className="col-md-10 form-group"
                    style={{ border: "3px solid black", height: "1045" }}
                >
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <b>Trang chủ</b>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">
                                <b>QL Xuất kho</b>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" href="#">
                                <b>Hóa đơn Xuất kho</b>
                            </a>
                        </li>
                    </ul>
                    <div className="main" style={{ marginTop: "15px" }}>
                        <h5>Thông tin hóa đơn</h5>
                        <hr
                            style={{ width: "px", height: "2px", color: "black" }}
                            color="black"
                        />
                        <div className="thongtin" style={{marginTop:'40px'}}>
                            <form class="container"  onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-5 form-group">
                                    <div className="row">
                                    <div className="col-md-4 form-group">
                                    <label htmlFor="selectBox1">
                                            <b>Loại hóa đơn</b>
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <select
                                            className="form-control"
                                            id="loaiHoaDon"
                                            name="loaiHoaDon"
                                            style={{ border: "3px solid gray" }}
                                            {...register("loaiHoaDon", {
                  required: "Vui long nhap",
                 
                })}
                                        >
                                    
                     
                                            <option value="tra">Xuất hoàn trả</option>
                                        </select>
                                        {errors.loaiHoaDon  && (
                      <p className="text-danger ps-1 m-0">
                        {errors.loaiHoaDon.message}
                      </p>
                    )}
                                    </div>
                                    </div>
                                        
                                        
                                    </div>
                                    <div className="col-md-1 form-group"></div>
                                    <div className="col-md-6 form-group">
                                    <div className="row">
                                    <div className="col-md-4 form-group">
                                    <label htmlFor="selectBox2">
                                            <b>Tên nhà cung cấp</b>
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <select
                                            className="form-control"
                                            id="tenNhaCungCap"
                                            name="tenNhaCungCap"
                                            style={{ border: "3px solid gray" }}
                                            {...register("tenNhaCungCap", {
                  required: "Vui lòng chọn nhà cung cấp",
                 
                })}
                                        >
                                            <option value="">--Chọn nhà cung cấp--</option>
                                            <option value="Traphaco">Traphaco</option>
                                            <option value="Sannofi">Sannofi</option>
                                            <option value="Imexoharm">Imexoharm</option>
                                            <option value="Pymerpharco">Pymerpharco</option>
                                            <option value="Domesco">Domesco</option>
                                            <option value="TVpharm">TVpharm</option>
                                            <option value="OPC">OPC</option>
                                        </select>
                                        {errors.tenNhaCungCap  && (
                      <p className="text-danger ps-1 m-0">
                        {errors.tenNhaCungCap.message}
                      </p>
                    )}
                                    </div>

                                    </div>
                                        
                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 form-group">
                                    <div className="row">
                                    <div className="col-md-4 form-group">
                                    <label htmlFor="dateInput">
                                            <b>Số HĐ</b>
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input
                                         disabled
                                            type="text"
                                            className="form-control"
                                            id="soHD"
                                            name="soHD"
                                            style={{ border: "3px solid gray" }}
                                            {...register("soHD", {
                  required: "yeu cau nhap",
                 
                })}
                                        />
                                    </div>

                                    </div>

                                        
                                        
                                    </div>
                                    <div className="col-md-1 form-group"></div>
                                    <div className="col-md-6 form-group">
                                    <div className="row">
                                    <div className="col-md-4 form-group">
                                    <label htmlFor="textInput1">
                                            <b>Địa chỉ</b>
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input
                                            type="text"
                                            className="form-control"
                                            id="diaChi"
                                            name="diaChi"
                                            placeholder="Nhập địa chỉ"
                                            style={{ border: "3px solid gray" }}
                                            {...register("diaChi", {
                  required: "Vui lòng nhập địa chỉ", minLength: {
      value: 2,
      message: 'Địa chỉ từ 2 ký tự đến 50 ký tự' // JS only: <p>error message</p> TS only support string
    },maxLength : {
        value: 50,
        message: 'Địa chỉ từ 2 ký tự đến 50 ký tự' // JS only: <p>error message</p> TS only support string
      },pattern:{
        value:/^[a-zA-Z0-9\u0041-\u005A\u0061-\u007A\u00C0-\u1EF9\s]*$/,message:'Địa chỉ không được chứa ký tự đặc biệt'
      }
                 
                })}
                                        />
                                        {errors.diaChi  && (
                      <p className="text-danger ps-1 m-0">
                        {errors.diaChi.message}
                      </p>
                    )}
                                    </div>

                                    </div>

                                        
                                        
                                         
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 form-group">
                                    
<div className="row">
                                    <div className="col-md-4 form-group">
                                    <label htmlFor="textInput2">
                                            <b>Ngày lập</b>
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input
                                        disabled
                                            type="date"
                                            className="form-control"
                                            id="ngayLap"
                                            name="ngayLap"
                                            style={{ border: "3px solid gray" }}
                                            
                                            {...register("ngayLap", {
                  
                  
                 
                })}
                                        />
                                    </div>

                                    </div>
                                        
                                        
                                    </div>
                                    <div className="col-md-1 form-group"></div>
                                    <div className="col-md-6 form-group">
                                    <div className="row">
                                    <div className="col-md-4 form-group">
                                    <label htmlFor="textInput3">
                                            <b>Lý do</b>
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input
                                            type="text"
                                            className="form-control"
                                            id="lyDo"
                                            name="lyDo"
                                            placeholder="Nhập lý do"
                                            style={{ border: "3px solid gray" }}
                                            {...register("lyDo", {
                  required: "Vui lòng nhập lý do", minLength: {
      value: 2,
      message: 'Lý do từ 2 ký tự đến 50 ký tự' // JS only: <p>error message</p> TS only support string
    },maxLength : {
        value: 50,
        message: 'Lý do từ 2 ký tự đến 50 ký tự' // JS only: <p>error message</p> TS only support string
      },pattern:{
        value:/^[a-zA-Z0-9\u0041-\u005A\u0061-\u007A\u00C0-\u1EF9\s]*$/,message:'Lý do không được chứa ký tự đặc biệt'
      }
                 
                })}
                                        />
                                        {errors.lyDo  && (
                      <p className="text-danger ps-1 m-0">
                        {errors.lyDo.message}
                      </p>
                    )}
                                    </div>

                                    </div>

                                        
                                        
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 form-group">
                                    <div className="row">
                                    <div className="col-md-4 form-group">
                                    <label htmlFor="textInput4">
                                            <b>Nhân viên</b>
                                        </label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input
                                         disabled
                                            type="text"
                                            className="form-control"
                                            id="nhanVien"
                                            name="nhanVien"
                                            style={{ border: "3px solid gray" }}
                                           
                                            {...register("nhanVien", {
                
                 
                })}
                                        />
                                    </div>

                                    </div>

                                        
                                       
                                    </div>
                                </div>
                                <div className="space" style={{ marginTop: "30px",overflowX:"scroll" }}>
                                    <h3>Danh sách thuốc</h3>
                                    <hr
                                        style={{ width: "px", height: "2px", color: "black" }}
                                        color="black"
                                    />
                                    <table
                                        className="table table-bordered"
                                        style={{ textAlign: "center", verticalAlign: "middle" }}
                                    >
                                        <thead className="table-dark">
                                            <tr style={{ backgroundColor: "rgb(212, 208, 208)",color:"black" }}>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        borderLeft: "3px solid black",
                                                    }}
                                                >
                                                    Tên thuốc
                                                </th>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        width: "200px",
                                                    }}
                                                >
                                                    Đơn vị tính
                                                </th>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        width: "200px",
                                                    }}
                                                >
                                                    Số lượng
                                                </th>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        width: "200px",
                                                    }}
                                                >
                                                    Đơn giá
                                                </th>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        width: "200px",
                                                    }}
                                                >
                                                    %CK
                                                </th>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        width: "120px",
                                                    }}
                                                >
                                                    Tên CK
                                                </th>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        width: "200px",
                                                    }}
                                                >
                                                    VAT
                                                </th>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        width: "200px",
                                                    }}
                                                >
                                                    Thành tiền
                                                </th>
                                                <th
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderTop: "3px solid black",
                                                        width: "200px",
                                                    }}
                                                >
                                                    Hạn Dùng
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderLeft: "3px solid black",
                                                        width: "168px",
                                                    }}
                                                >
                                                    <select
                                                        style={{
                                                            width: "216px",
                                                            paddingLeft: "52px",
                                                            display: "inline-block",
                                                            border:'3px solid gray'
                                                        }}
                                                        
                                                        {...register("tenThuoc")}
                                                        className="form-control"
                                                        id="tenThuoc"
                                                        name="tenThuoc"
                                                    >
                                                        <option value="">---Chọn thuốc---</option>
                                                        {data &&
                                                            data
                .map((item, index) => (
                    <option key={index} value={item.name}>{item.tenThuoc}</option>
                ))}
                                                        
                                                    </select>
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderLeft: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                ></td>
                                            </tr>

                                            {medical &&
                    medical
                .map((item, index) => (
                    <tr onClick={() => handleRowClick(item.tenThuoc)}  key={index} style={{ backgroundColor: index % 2 !== 0 ? 'rgb(212, 208, 208)' : '',cursor:"pointer"  }}>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderLeft: "3px solid black",
                                                        color:selectedRows.includes(item.tenThuoc) ? 'red' : ''
                                                    }}
                                                >
                                                    {item.tenThuoc}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                >
                                                    {item.donViTinh}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                >
                                                    {item.soLuong}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                >
                                                    {item.donGia}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                >
                                                    {item.ck}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                >
                                                    {item.tienCK}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                >
                                                    {item.vat}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                >
                                                    {item.thanhTien}
                                                </td>
                                                <td
                                                    className="text-center"
                                                    style={{ borderRight: "3px solid black" }}
                                                >
                                                    {item.hanDung}
                                                </td>
                                            </tr>
                ))}

                                            
                                           
                                            <tr>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                        borderLeft: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                    }}
                                                ></td>
                                                <td
                                                    className="text-center"
                                                    style={{
                                                        borderRight: "3px solid black",
                                                        borderBottom: "3px solid black",
                                                    }}
                                                ></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {errors.custom && <p className="text-danger m-0">{errors.custom.message}</p>}
                                </div>
                                <div className="row">
                                    <div className="col-md-6 form-group"></div>
                                    <div className="col-md-6 form-group">
                                        <div className="row">
                                            <div className="col-md-3 form-group">
                                                
                                            </div>
                                            <div className="col-md-3 form-group">
                                                <label
                                                    htmlFor="textInput4"
                                                    style={{
                                                        // marginLeft: "171px",
                                                        marginTop: "20px",
                                                        // paddingLeft: "11px",
                                                    }}
                                                >
                                                    <b>Tổng tiền</b>
                                                </label>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="tongTien"
                                                    name="tongTien"
                                                    {...register("tongTien")}
                                                    style={{
                                                        border: "3px solid gray",
                                                        // width: "228px",
                                                        textAlign: "right",
                                                        marginTop: "15px",
                                                        // marginLeft: "25px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr
                            style={{ width: "px", height: "2px", color: "black" }}
                            color="black"
                        />
                        <div className="but" style={{ textAlign: "right",marginBottom:'20px' }}>
                            <button type="submit" className="btn btn-success" style={{marginRight:'20px'}}>
                            <FontAwesomeIcon
                            icon={faCirclePlus}
                            style={{
                                marginLeft: 8,
                                fontSize: 16,
                                cursor: "pointer",
                                color: "#rgb(218 226 230)",
                            }}
                        />  Hoàn tất
                            </button>
                            <button onClick={handleDelete} type="button" className="btn btn-danger" style={{marginRight:'20px'}}>
                                {" "}
                                <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{
                                marginLeft: 8,
                                fontSize: 16,
                                cursor: "pointer",
                                color: "#rgb(218 226 230)",
                            }}
                        />  Xóa
                                thuốc
                            </button>
                            <button type="button" className="btn btn-primary" onClick={back}>
                                {" "}
                                <FontAwesomeIcon
                            icon={faArrowRotateLeft}
                            style={{
                                marginLeft: 8,
                                fontSize: 16,
                                cursor: "pointer",
                                color: "#rgb(218 226 230)",
                            }}
                        />  Trở về
                            </button>
                        </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Medical;
