import React, { useEffect, useState } from 'react'
import {
  getDataUser, getDataUserAddNew, getDataUserDelete,
  getDataUserInfoUpdated, getDataUserList, getDataUserSearch
} from '../../../api/adminApi';
import { Form, Input, Select, Tag, message } from 'antd';
import { Button, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

export default function UserManagement() {
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
  const [userInfo, setUserInfo] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userSearchList, setUserSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFixModalOpen, setIsFixModalOpen] = useState(false);
  // Lấy dữ liệu API
  const fetchDataUserList = async () => {
    try {
      let response = await getDataUserList();
      setUserList(response.data.content);
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };
  const fetchDataUserSearch = async (searchValue) => {
    try {
      if (searchValue === undefined || searchValue === '' || searchValue === null) return;
      let response = await getDataUserSearch(searchValue);
      const updatedUserSearchList = response.data.content;
      setUserSearchList(updatedUserSearchList);
      setIsSearch(true);
      message.success(`Có ${updatedUserSearchList.length} kết quả tìm kiếm tương tự`)
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };
  const fetchDataUserInfo = async (tenTaiKhoan) => {
    try {
      let response = await getDataUser(tenTaiKhoan);
      let user = response.data.content;
      let upDatedUser = {
        taiKhoan: user.taiKhoan,
        hoTen: user.hoTen,
        matKhau: user.matKhau,
        email: user.email,
        soDt: user.soDT,
        maNhom: user.maNhom,
        maLoaiNguoiDung: user.maLoaiNguoiDung,
      }
      setUserInfo(upDatedUser);
      form.setFieldsValue(upDatedUser);
    } catch {
      message.error("Đã có lỗi xảy ra");
    }
  };

  const handleSearchCancel = () => { window.location.reload(); };
  // Thêm modal
  const showAddModal = () => { setIsAddModalOpen(true); };
  const showFixModal = async (tenTaiKhoan) => {
    try {
      await fetchDataUserInfo(tenTaiKhoan);
      setIsFixModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddCancel = () => { setIsAddModalOpen(false); };
  const handleFixCancel = () => { setIsFixModalOpen(false); };

  // Thêm người dùng
  const handleUserAdd = async (values) => {
    try {
      await getDataUserAddNew(values);
      message.success("Thêm người dùng thành công");
      handleAddCancel();
    } catch (error) {
      message.error(error.response.data.content);
      console.log(error);
    }
  };
  const handleUserFix = async (values) => {
    try {
      await getDataUserInfoUpdated(values);
      message.success("Cập nhật thông tin người dùng thành công");
      handleFixCancel();
    } catch (error) {
      message.error(error.response.data.content);
      console.log(error);
    }
  };
  const handleUserDel = async (tenTaiKhoan) => {
    try {
      await getDataUserDelete(tenTaiKhoan);
      message.success("Xóa tài khoản người dùng thành công");
    } catch (error) {
      message.error(error.response.data.content);
      console.log(error);
    }
  };

  // render danh sách
  const renderList = () => {
    let list = isSearch ? userSearchList : userList;
    return (
      <table className='table text-center'>
        <thead>
          <tr>
            <th>STT</th>
            <th>TÀI KHOẢN</th>
            <th>HỌ TÊN</th>
            <th>LOẠI NGƯỜI DÙNG</th>
            <th>SỐ ĐIỆN THOẠI</th>
            <th>EMAIL</th>
            <th>THAO TÁC</th>
          </tr>
        </thead>
        <tbody>{list.map((user, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.taiKhoan.substring(0, 30)}{user.taiKhoan.length > 30 ? '...' : ''}</td>
              <td>{user.hoTen.substring(0, 30)}{user.hoTen.length > 30 ? '...' : ''}</td>
              <td><Tag color={user.maLoaiNguoiDung === 'KhachHang' ? 'green' : 'red'}>{user.maLoaiNguoiDung === 'KhachHang' ? 'Khách Hàng' : 'QTV'}</Tag></td>
              <td>{user.soDT}</td>
              <td>{user.email}</td>
              <td>
                <button className='mr-1 btn btn-warning' onClick={() => { showFixModal(user.taiKhoan) }}><FormOutlined /></button>
                <button className='btn btn-danger' onClick={() => { handleUserDel(user.taiKhoan) }}><DeleteOutlined /></button>
              </td>
            </tr>
          )
        })
        }</tbody>
      </table>
    )

  }

  useEffect(() => {
    fetchDataUserList();
    fetchDataUserSearch();
  }, []);
  return (
    <div>
      <div className='ModalAddUser'>
        <Modal width={900} title="Thêm Tài Khoản" open={isAddModalOpen} onCancel={handleAddCancel}
          footer={null}
        >
          <Form className='mx-auto my-5 border p-3 text-center'
            {...formItemLayout}
            form={form}
            name="FormAddUser"
            onFinish={handleUserAdd}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >
            <Form.Item name="taiKhoan"
              label="Tên Tài Khoản"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên tài khoản',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="hoTen"
              label="Họ Và Tên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên của bạn!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item name="matKhau"
              label="Mật Khẩu"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="email"
              label="Địa Chỉ Email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="soDt"
              label="Số Điện Thoại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item name="maNhom"
              label="maNhom"
              initialValue={'GP09'}
              className='hidden'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhóm!',
                  whitespace: true,
                },
              ]}>
              <Input placeholder={'GP09'} />
            </Form.Item>
            <Form.Item name="maLoaiNguoiDung"
              label="maLoaiNguoiDung"
              // className='hidden'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhóm!',
                  whitespace: true,
                },
              ]}>
              <Select
                defaultValue="KhachHang"
                style={{ width: 120 }}
                allowClear
                options={[{ value: 'KhachHang', label: 'Khách Hàng' }, { value: 'QuanTri', label: 'Quản Trị' }]}
              />
            </Form.Item>
            <Button className='btn btn-red pb-1' htmlType="submit">
              Thêm người dùng
            </Button>
          </Form>
        </Modal>
      </div>
      <div className='ModalFixUser'>
        <Modal width={800} title="Cập Nhật Tài Khoản" open={isFixModalOpen} onCancel={handleFixCancel}
          footer={null}
        >
          <Form name="Cập Nhật Thông Tin Người Dùng" onFinish={handleUserFix}
            className='mx-auto my-5 border p-5 text-center'
            {...formItemLayout} form={form} scrollToFirstError
            style={{
              maxWidth: 600,
            }}
            initialValues={userInfo}
          >
            <Form.Item name="taiKhoan"
              label="Tên Tài Khoản"
              tooltip="Bạn muốn được gọi là?"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên tài khoản',
                  whitespace: true,
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item name="hoTen"
              label="Họ Và Tên"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập họ tên của bạn!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item name="matKhau"
              label="Mật Khẩu"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="email"
              label="Địa Chỉ Email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="soDt"
              label="Số Điện Thoại"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                  whitespace: true,
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item name="maNhom"
              label="Mã Nhóm"
              className='hidden'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mã nhóm!',
                  whitespace: true,
                },
              ]}>
              <Input placeholder={'GP09'} disabled />
            </Form.Item>
            <Form.Item name="maLoaiNguoiDung"
              label="Mã Loại Người Dùng">
              <Select
                initialvalues='KhachHang'
                style={{ width: 332 }}
                options={[
                  { value: 'KhachHang', label: 'Khách Hàng' },
                  { value: 'QuanTri', label: 'Quản Trị Viên' },
                ]}
              />
            </Form.Item>
            <Button className='btn btn-red' htmlType="submit">
              Cập Nhật
            </Button>
          </Form>
        </Modal>
      </div>
      <div className="m-3">
        <div className="text-right mb-2"><button onClick={showAddModal} className='btn btn-success'>Thêm người dùng</button></div>
        <div className="flex">
          <Search
            enterButton
            size="large" onSearch={fetchDataUserSearch}
            placeholder="input search text(phone number/name)"
            className='bg-blue-500 overflow-hidden rounded-lg'
          />
          <button className={`btn btn-danger ${isSearch ? 'block' : 'hidden'}`} onClick={() => { handleSearchCancel() }}>CancleSearch</button>
        </div>

      </div>
      {renderList()}
    </div>
  )
}
