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
import cors from 'cors'; // Import thư viện CORS
import Pagination from "react-paginate";
import ReactPaginate from "react-paginate";
import listdata from './danhsachhoadon.json';
import {deleteRequest, getRequest ,putRequest} from '../axios/httpRequest'
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


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
    faArrowRotateLeft,
    faMagnifyingGlassLocation
} from "@fortawesome/free-solid-svg-icons";
import { FaHome } from "react-icons/fa";

function Phama(props) {
    const navigate = useNavigate();
    const [toa, setToa] = useState();
    console.log('data',listdata);
    const changeRouter = (path, data) => {
        navigate(path, { state: data });
      }
    const themClick=()=>{
        
        if(loaiHoaDon!=='huy'){
            changeRouter("/medical", { name: "John Doe" });
        }else{
            changeRouter("/cancel", { name: "John Doe" });
        }
        
    }
    const [listHD,setListHD]=useState()
    const [listData,setListData]=useState()
    const [ab,setAb]=useState({"list":[1,2]})
    // useEffect(() => {
        
    //     axios.get('http://localhost:8080/medical')
    //     .then(response => {
    //         console.log('response',response.data);
    //         setListData(response.data)
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
       
    //   }, []);
    const recordIdsToDelete = [1, 2, 3]; // Ví dụ danh sách ID cần xóa
    const name = useLocation().state?.name ?? "";
   
      useEffect(() => {
        
       // const { name } = useParams();
       if(name!=""){
        toast("Them hoa don thanh cong !");
       }
        
        const fetchApi = async () => {
            try {
               
                const result = await getRequest("http://localhost:8080/medical")
                console.log('response',result);
                setListData(result)
            
            } catch (error) {
                const objErr = JSON.parse(JSON.stringify(error))
                
            }
 
        }
        fetchApi();
    }, [])
   


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
         
        },
      });
      const onSubmit = (data) => {
        console.log('input',data);
        
       };
       const tuNgay=watch("tuNgay")
       const denNgay=watch("denNgay")
       const tuGio=watch("tuGio")
       const denGio=watch("denGio")
       const loaiHoaDon=watch("hoaDon")
       const allElement=watch(["tuNgay","denNgay","tuGio","denGio","hoaDon"])


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
  console.log('select ',listData);

  const handleDelete = () => {

    const fetchApi = async () => {
        console.log('test');
        const result = await deleteRequest('http://localhost:8080/medical', selectedRows);
        setListData(result)
        console.log('delete',result);
    };

   fetchApi();
  };

// xóa thuốc

      useEffect(() => {

        const abc= ()=>{
            const  filterData =  listData.filter((hoaDon) => {
                // Điều kiện tìm kiếm
                // Điều kiện tìm kiếm
  if (loaiHoaDon && hoaDon.loaiHoaDon !== loaiHoaDon) {
    return false;
  }
  if (tuNgay && hoaDon.ngayLap < tuNgay) {
    return false;
  }
  if (denNgay && hoaDon.ngayLap > denNgay) {
    return false;
  }
  if (tuGio && hoaDon.gioLap < tuGio) {
    return false;
  }
  if (denGio && hoaDon.gioLap > denGio) {
    return false;
  }
  return true;
              });
              const kk=filterData;
              console.log('addddd',kk);
              setListHD(kk)
        }
        if(listData){
            abc()
        }
        
      }, [tuNgay,denNgay,tuGio,denGio,loaiHoaDon,listData]);

      console.log('filter data',listHD);
      const [totalPage, setTotalPage] = useState(0);
      const [currentPage, setCurrentPage] = useState(0);

      useEffect(() => {
        if(listHD){
            setTotalPage(listHD.length);
            setTotalPage(Math.ceil(listHD.length / 5));
          }
       
      }, [listHD]);
      
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    console.log("phan trang ", event.selected);


  };

    return (
        <div>
        <ToastContainer />
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
                    style={{ border: "3px solid black", height: "1045px" }}
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
                    {/* // main */}
                    <div className="main" style={{ marginTop: '15px' }}>
  <h5>Bộ lọc</h5>
  <hr
                            style={{ width: "px", height: "2px", color: "black" }}
                            color="black"
                        />
  <div className="thongtin" style={{marginTop:'40px'}}>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-3 form-group">
         
<div className="row">
                                    <div className="col-md-4 form-group">
                                    <label for="dateInput"><b>Từ ngày</b></label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input type="date" className="form-control" id="tuNgay" 
          name="tuNgay"
          {...register("tuNgay", {
                  required: "yeu cau nhap",
                 
                })}
          style={{ border: '3px solid gray' }} />
                                    </div>

                                    </div>

          
          
        </div>
        <div className="col-md-3 form-group">
        
<div className="row">
                                    <div className="col-md-4 form-group">
                                    <label for="dateInput"><b>Đến ngày</b></label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input type="date" className="form-control" id="denNgay" 
          name="denNgay"
          {...register("denNgay", {
                  required: "yeu cau nhap",
                 
                })}
          style={{ border: '3px solid gray' }} />
                                    </div>

                                    </div>
          
          
        </div>
        <div className="col-md-3 form-group">
        <div className="row">
                                    <div className="col-md-4 form-group">
                                    <label for="dateInput"><b>Từ giờ</b></label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input type="time" className="form-control" id="tuGio" 
          name="tuGio"

          {...register("tuGio", {
                  required: "yeu cau nhap",
                 
                })}
          style={{ border: '3px solid gray' }} />
                                    </div>

                                    </div>
         
         
        </div>
        <div className="col-md-3 form-group">
        <div className="row">
                                    <div className="col-md-4 form-group">
                                    <label for="dateInput"><b>Đến giờ</b></label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <input type="time" className="form-control" id="denGio"
          name="denGio"
          {...register("denGio", {
                  required: "yeu cau nhap",
                 
                })}
           style={{ border: '3px solid gray' }} />
                                    </div>

                                    </div>
          
          
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 form-group">
        
<div className="row">
                                    <div className="col-md-4 form-group">
                                    <label for="selectBox2"><b>Loại hóa đơn</b></label>
                                    </div>
                                    <div className="col-md-8 form-group">
                                    <select className="form-control" id="hoaDon" 
          name="hoaDon"
          {...register("hoaDon", {
                  required: "yeu cau nhap",
                 
                })}
          style={{ border: '3px solid gray' }}>
            <option value="">--Loai hoa don--</option>
            <option value="huy">Xuat huy</option>
            <option value="tra">Hoan tra</option>
          </select>
                                    </div>

                                    </div>
          
          
        </div>
        <div className="col-md-3 form-group">
          {/* Điền trường thông tin khác nếu cần */}
        </div>
        <div className="col-md-3 form-group">
          {/* Điền trường thông tin khác nếu cần */}
        </div>
        <div className="col-md-1 form-group">
          {/* Điền trường thông tin khác nếu cần */}
        </div>
        <div className="col-md-2 form-group">
          <label for="textInput1" style={{ marginLeft: '210px' }}><b></b></label>
          <div style={{ marginTop: '10px'}}>
            <button type="button" className="btn btn-success"
            > 
            <FontAwesomeIcon
                            icon={faMagnifyingGlassLocation}
                            style={{
                                marginLeft: 8,
                                marginRight:8,
                                fontSize: 16,
                                cursor: "pointer",
                                color: "#rgb(218 226 230)",
                            }}/>
           
                Xem</button>
          </div>
        </div>
      </div>
      <h3>Danh sách hóa đơn</h3>
      <hr
                            style={{ width: "px", height: "2px", color: "black" }}
                            color="black"
                        />

                        <div className="space" style={{overflowX:"scroll"}}>
      <table className="table table-bordered" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
        <thead className="table-dark">
          <tr style={{ backgroundColor: 'rgb(212, 208, 208)',color:'black' }}>
            <th className="text-center" style={{ borderRight: '3px solid black', borderTop: '3px solid black', borderLeft: '3px solid black', width: '200px' }}>Mã HĐ</th>
            <th className="text-center" style={{ borderRight: '3px solid black', borderTop: '3px solid black', width: '200px' }}>Ngày lập</th>
            <th className="text-center" style={{ borderRight: '3px solid black', borderTop: '3px solid black', width: '200px' }}>Giờ lập</th>
            <th className="text-center" style={{ borderRight: '3px solid black', borderTop: '3px solid black', width: '200px' }}>Người lập</th>
            <th className="text-center" style={{ borderRight: '3px solid black', borderTop: '3px solid black', width: '200px' }}>Tổng tiền</th>
            <th className="text-center" style={{ borderRight: '3px solid black', borderTop: '3px solid black', width: '200px' }}>Tên nhà cung cấp</th>
            <th className="text-center" style={{ borderRight: '3px solid black', borderTop: '3px solid black', width: '200px' }}>Lý do hoàn trả</th>
          </tr>
        </thead>
        <tbody>
        {listHD &&
            listHD.slice(currentPage * 5, (currentPage + 1) * 5)
                .map((item, index) => (
                    <tr key={index} onClick={() => handleRowClick(item.maHoaDon)} style={{cursor:'pointer',backgroundColor: index % 2 !== 0 ? 'rgb(212, 208, 208)' : ''}} >
            <td className="text-center" style={{ borderRight: '3px solid black', borderLeft: '3px solid black'
            ,color:selectedRows.includes(item.maHoaDon) ? 'red' : '' }}>{item.maHoaDon}</td>
            <td className="text-center" style={{ borderRight: '3px solid black' }}>{item.ngayLap}</td>
            <td className="text-center" style={{ borderRight: '3px solid black' }}>{item.gioLap}</td>
            <td className="text-center" style={{ borderRight: '3px solid black' }}>{item.nhanVien}</td>
            <td className="text-center" style={{ borderRight: '3px solid black' }}>{item.tongTien}</td>
            <td className="text-center" style={{ borderRight: '3px solid black' }}>{item.tenNhaCungCap}</td>
            <td className="text-center" style={{ borderRight: '3px solid black' }}>{item.lyDo}</td>
          </tr>
                ))}
          
          
          
          
          <tr>
            <td className="text-center" style={{ borderRight: '3px solid black', borderLeft: '3px solid black',borderBottom:'3px solid black' }}></td>
            <td className="text-center" style={{ borderRight: '3px solid black',borderBottom:'3px solid black' }}></td>
            <td className="text-center" style={{ borderRight: '3px solid black',borderBottom:'3px solid black' }}></td>
            <td className="text-center" style={{ borderRight: '3px solid black',borderBottom:'3px solid black' }}></td>
            <td className="text-center" style={{ borderRight: '3px solid black',borderBottom:'3px solid black' }}></td>
            <td className="text-center" style={{ borderRight: '3px solid black',borderBottom:'3px solid black' }}></td>
            <td className="text-center" style={{ borderRight: '3px solid black',borderBottom:'3px solid black' }}></td>
          </tr>
          {/* Các dòng dữ liệu khác tương tự */}
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
{/* button */}

<hr
                            style={{ width: "px", height: "2px", color: "black" }}
                            color="black"
                        />
  <div className="but" style={{ textAlign: "right", }}>
                            <button onClick={themClick} type="button" className="btn btn-success" style={{marginRight:'20px'}}>
                            <FontAwesomeIcon
                            icon={faCirclePlus}
                            style={{
                                marginLeft: 8,
                                fontSize: 16,
                                cursor: "pointer",
                                color: "#rgb(218 226 230)",
                            }}
                        />  Thêm
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
                            <button type="button" className="btn btn-primary">
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
{/* button */}

    </form>
  </div>
  <div className="row">
    <div className="col-md-6 form-group">
      {/* Điền trường thông tin khác nếu cần */}
    </div>
  </div>
  
</div>

                    {/* end main */}
                </div>
            </div>
        </div>
    );
}

export default Phama;
