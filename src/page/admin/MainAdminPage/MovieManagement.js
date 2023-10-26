import React, { useEffect, useState } from 'react'
import { Form, Input, Switch, Image, message } from 'antd';
import { Button, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import { getMovieDetail, getMovieList, getMovieListSearchByName } from '../../../api/mainApi';
import { getDataMovieAddNew, getDataMovieDeleteIfNoShowTime, getDataMovieUpdated } from '../../../api/adminApi';

export default function MovieManagement() {
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const [form] = Form.useForm();
  const [movieInfo, setMovieInfo] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [movieSearchList, setMovieSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);
  // Lấy dữ liệu API
  const fetchDataMovieList = async () => {
    try {
      let response = await getMovieList();
      setMovieList(response.data.content);
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };
  const fetchDataMovieSearch = async (searchValue) => {
    try {
      if (searchValue === undefined || searchValue === '' || searchValue === null) return;
      let response = await getMovieListSearchByName(searchValue);
      const updatedMovieSearchList = response.data.content;
      setMovieSearchList(updatedMovieSearchList);
      setIsSearch(true);
      message.success(`Có ${updatedMovieSearchList.length} kết quả tìm kiếm tương tự`)
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };
  const fetchDataMovieInfo = async (maPhim) => {
    try {
      let response = await getMovieDetail(maPhim);
      let movie = response.data.content;
      let upDatedMovie = {
        tenPhim: movie.tenPhim,
        trailer: movie.trailer,
        moTa: movie.moTa,
        ngayKhoiChieu: movie.ngayKhoiChieu,
        sapChieu: movie.sapChieu,
        dangChieu: movie.dangChieu,
        hot: movie.hot,
        maNhom: movie.maNhom,
        hinhAnh: movie.hinhAnh,
      }
      setMovieInfo(upDatedMovie);
      form.setFieldsValue(upDatedMovie);
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };

  const handleSearchCancel = () => { window.location.reload(); };
  // Thêm modal
  const showAddModal = () => { setIsAddModalOpen(true); };
  const showFixModal = async (maPhim) => {

    try {
      await fetchDataMovieInfo(maPhim);
      setIsFixModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddCancel = () => { setIsAddModalOpen(false); };
  const handleFixCancel = () => { setIsFixModalOpen(false); };

  // Thêm Phim
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMovieAdd = async (values) => {
    const formAdd = new FormData();
    formAdd.append("tenPhim", values.tenPhim);
    formAdd.append("trailer", values.trailer);
    formAdd.append("moTa", values.moTa);
    formAdd.append("ngayKhoiChieu", values.ngayKhoiChieu);
    formAdd.append("sapChieu", values.sapChieu);
    formAdd.append("dangChieu", values.dangChieu);
    formAdd.append("hot", values.hot);
    formAdd.append("maNhom", values.maNhom);
    formAdd.append("hinhAnh", selectedFile, selectedFile.name);
    if (selectedFile) {
      formAdd.append("hinhAnh", selectedFile, selectedFile.name);
    }
    try {
      await getDataMovieAddNew(formAdd);
      message.success("Thêm Phim thành công");
    } catch (error) {
      message.error(error.response.data.content);
      console.log(error);
    }
  };
  const handleMovieFix = async (values) => {
    const formFix = new FormData();
    formFix.append("tenPhim", values.tenPhim);
    formFix.append("trailer", values.trailer);
    formFix.append("moTa", values.moTa);
    formFix.append("ngayKhoiChieu", values.ngayKhoiChieu);
    formFix.append("sapChieu", values.sapChieu);
    formFix.append("dangChieu", values.dangChieu);
    formFix.append("hot", values.hot);
    formFix.append("maNhom", values.maNhom);
    if (selectedFile) {
      formFix.append("hinhAnh", selectedFile, selectedFile.name);
    }
    try {
      await getDataMovieUpdated(formFix);
      message.success("Cập nhật thông tin phim thành công");
    } catch (error) {
      message.error('Đã có lỗi xảy ra!!!');
      console.log(error);
    }
  };
  const handleMovieDel = async (maPhim) => {
    try {
      await getDataMovieDeleteIfNoShowTime(maPhim);
      message.success("Xóa phim thành công");
    } catch (error) {
      message.error(error.response.data.content);
      console.log(error);
    }
  };

  // render danh sách
  const renderList = () => {
    let list = isSearch ? movieSearchList : movieList;
    return (
      <table className='table text-center'>
        <thead>
          <tr>
            <th>STT</th>
            <th>MÃ PHIM</th>
            <th>HÌNH ẢNH</th>
            <th>TÊN PHIM</th>
            <th>MÔ TẢ</th>
            <th>NGÀY KHỞI CHIẾU</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>{list.map((movie, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{movie.maPhim}</td>
              <td><Image width={50} height={80} src={movie.hinhAnh} alt='' /></td>
              <td>{movie.tenPhim}</td>
              <td>{movie.moTa.substring(0, 30)}{movie.moTa.length > 30 ? '...' : ''}</td>
              <td>{movie.ngayKhoiChieu.substring(0, 10)}</td>
              <td>
                <button className='mr-1 btn btn-warning' onClick={() => { showFixModal(movie.maPhim) }}>Fix</button>
                <button className='btn btn-danger' onClick={() => { handleMovieDel(movie.maPhim) }}>Del</button>
              </td>
            </tr>
          )
        })
        }</tbody>
      </table>
    )

  }
  useEffect(() => {
    fetchDataMovieList();
    fetchDataMovieSearch();
  }, []);
  useEffect(() => {
    setSelectedImage(movieInfo.hinhAnh);
  }, [movieInfo]);
  return (
    <div>
      <div className='ModalAddMovie'>
        <Modal width={800} title="Thêm Phim" open={isAddModalOpen} onCancel={handleAddCancel}>
          <Form className='mx-auto my-5 border p-5 text-center'
            {...formItemLayout}
            form={form}
            name="FormAddMovie"
            onFinish={handleMovieAdd}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
            initialValues={{ sapChieu: false, dangChieu: false, hot: false }}
          >
            <Form.Item name="tenPhim"
              label="tenPhim"
              initialValue={'Người đàn ông mang tên Ove'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên phim',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="trailer"
              label="trailer"
              initialValue={'https://www.phimconggiao.com/phim-nguoi-dan-ong-mang-ten-ove/'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trailer của bạn!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item name="moTa"
              label="moTa"
              initialValue={'Phim A Man Called Ove 2015 kể về một người đàn ông góa vợ 59 tuổi Ove Lindahl (Rolf Lassgård), Ông là bị trầm cảm sau cái chết của người vợ của mình. Vợ ông tên Sonja, một giáo viên, người chết vì ung thư sáu tháng trước. Sau khi làm việc tại các công ty trong 43 năm, ông được nghỉ hưu.'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mô tả!',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item name="ngayKhoiChieu"
              label="ngayKhoiChieu"
              initialValue={'26/10/2023'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày khởi chiếu!',
                },
              ]}
            >
              <Input placeholder='example: 10/10/2022' />
            </Form.Item>
            <Form.Item name="sapChieu"
              label="sapChieu"
            >
              <Switch defaultChecked={false} />
            </Form.Item>
            <Form.Item name="dangChieu"
              label="dangChieu">
              <Switch defaultChecked={false} />
            </Form.Item>
            <Form.Item name="hot"
              label="hot">
              <Switch defaultChecked={false} />
            </Form.Item>
            <Form.Item name="maNhom"
              label="maNhom"
              initialValue={'GP01'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhóm!',
                  whitespace: true,
                },
              ]}>
              <Input placeholder={'GP01'} />
            </Form.Item>
            <Form.Item name="hinhAnh" label="hinhAnh"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn hình ảnh!',
                  whitespace: true,
                },
              ]}>

              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Selected Image"
                  style={{ maxWidth: '100%', maxHeight: '200px' }}
                />
              )}
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Thêm Phim
            </Button>
          </Form>
        </Modal>
      </div>
      <div className='ModalFixMovie'>
        <Modal width={800} title="Cập Nhật Phim" open={isFixModalOpen} onCancel={handleFixCancel}>
          <Form className='mx-auto my-5 border p-5 text-center'
            {...formItemLayout}
            form={form}
            name="FormFixMovie"
            onFinish={handleMovieFix}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
            initialValues={movieInfo}
          >
            <Form.Item name="tenPhim"
              label="tenPhim"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên phim',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="trailer"
              label="trailer"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trailer của bạn!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item name="moTa"
              label="moTa"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mô tả!',
                },
              ]}
              hasFeedback
            >
              <Input />
            </Form.Item>
            <Form.Item name="ngayKhoiChieu"
              label="ngayKhoiChieu"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập ngày khởi chiếu!',
                },
              ]}
            >
              <Input placeholder='example: 10/10/2022' />
            </Form.Item>
            <Form.Item name="sapChieu"
              label="sapChieu">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item name="dangChieu"
              label="dangChieu">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item name="hot"
              label="hot">
              <Switch defaultChecked />
            </Form.Item>
            <Form.Item name="maNhom"
              label="maNhom"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhóm!',
                  whitespace: true,
                },
              ]}>
              <Input placeholder={'GP01'} />
            </Form.Item>
            <Form.Item name="hinhAnh" label="hinhAnh">
              <Image
                src={selectedImage}
                alt="Selected Image"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Cập Nhật Phim
            </Button>
          </Form>
        </Modal>
      </div>
      <div className="row m-3">
        <div className="col-10">
          <Search
            enterButton size="large" onSearch={fetchDataMovieSearch}
            placeholder="input search text(phone number/name)"
          />
          <button className='btn btn-danger' onClick={() => { handleSearchCancel() }}>CancleSearch</button>
        </div>
        <div className="col-2"><button onClick={showAddModal} className='btn btn-success'>Thêm phim mới</button></div>
      </div>
      {renderList()}
    </div>
  )
}
