const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Cấu hình kết nối SQL Server
const dbConfig = { 
  user: 'admin',
  password: '123456',
  server: 'DESKTOP-SCBJNQ7', // hoặc IP máy chủ
  database: 'Test_js',
  options: {
    encrypt: true, // Cần đặt thành true nếu dùng TLS/SSL
    trustServerCertificate: true // Cho phép sử dụng chứng chỉ tự ký
  }
};

// Kết nối database
sql.connect(dbConfig, err => {
  if (err) {
    console.log('Kết nối thất bại:', err);
    return;
  }
  console.log('Kết nối thành công đến SQL Server.');
});

// Endpoint: Lấy danh sách tài sản
app.get('/taisan', async (req, res) => {
  try {
    const result = await sql.query`SELECT * FROM DSTaiSan`;
    res.json(result.recordset);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Endpoint: Thêm tài sản mới
app.post('/taisan', async (req, res) => {
    const {
      DT_QLTS_TS_PBQL, DT_QLTS_TS_NhomTaiSan, DT_QLTS_TS_LoaiTaiSan, 
      DT_QLTS_TS_TenTaiSan, DT_QLTS_TS_PhongHienTai, DT_QLTS_TS_TenPhongHienTai, 
      DT_QLTS_TS_MaTaiSan, DT_QLTS_TS_NamSanXuat, DT_QLTS_TS_NgayDuaVaoSuDung, 
      DT_QLTS_TS_XuatXu, DT_QLTS_TS_ThuongHieu, DT_QLTS_TS_NguonGoc, 
      DT_QLTS_TS_TinhTrang, DT_QLTS_TS_Model, DT_QLTS_TS_SerialNumber, 
      DT_QLTS_TS_KichThuoc_Dai, DT_QLTS_TS_KichThuoc_Rong, DT_QLTS_TS_KichThuoc_Cao, 
      DT_QLTS_TS_GiayToKemTheo_TenFile, DT_QLTS_TS_GiayToKemTheo_DataFile, 
      DT_QLTS_TS_TS_GhiChu, DT_QLTS_TS_NhapKho_MaNhanSu, DT_QLTS_TS_NhapKho_TenKho, 
      DT_QLTS_TS_NhapKho_TenKho_Ten, DT_QLTS_TS_NhapKho_DonViTinh
    } = req.body;
  
    const asset = {
      DT_QLTS_TS_PBQL, DT_QLTS_TS_NhomTaiSan, DT_QLTS_TS_LoaiTaiSan, 
      DT_QLTS_TS_TenTaiSan, DT_QLTS_TS_PhongHienTai, DT_QLTS_TS_TenPhongHienTai, 
      DT_QLTS_TS_MaTaiSan, DT_QLTS_TS_NamSanXuat, DT_QLTS_TS_NgayDuaVaoSuDung, 
      DT_QLTS_TS_XuatXu, DT_QLTS_TS_ThuongHieu, DT_QLTS_TS_NguonGoc, 
      DT_QLTS_TS_TinhTrang, DT_QLTS_TS_Model, DT_QLTS_TS_SerialNumber, 
      DT_QLTS_TS_KichThuoc_Dai, DT_QLTS_TS_KichThuoc_Rong, DT_QLTS_TS_KichThuoc_Cao, 
      DT_QLTS_TS_GiayToKemTheo_TenFile, DT_QLTS_TS_GiayToKemTheo_DataFile, 
      DT_QLTS_TS_TS_GhiChu, DT_QLTS_TS_NhapKho_MaNhanSu, DT_QLTS_TS_NhapKho_TenKho, 
      DT_QLTS_TS_NhapKho_TenKho_Ten, DT_QLTS_TS_NhapKho_DonViTinh
    };
  
    try {
      const columns = Object.keys(asset).join(', ');
      const values = Object.values(asset).map((_, index) => `@param${index}`).join(', ');
  
      const request = new sql.Request();
      Object.values(asset).forEach((value, index) => {
        request.input(`param${index}`, value);
      });
  
      const query = `INSERT INTO DSTaiSan (${columns}) VALUES (${values})`;
      await request.query(query);
      res.status(201).json({ message: 'Thêm tài sản thành công' });
    } catch (error) {
      res.status(500).send(error);
    }
  });

// Endpoint: Cập nhật thông tin tài sản
app.put('/taisan/:id', async (req, res) => {
    const { id } = req.params;
    const {
      DT_QLTS_TS_PBQL, DT_QLTS_TS_NhomTaiSan, DT_QLTS_TS_LoaiTaiSan,
      DT_QLTS_TS_TenTaiSan, DT_QLTS_TS_PhongHienTai, DT_QLTS_TS_TenPhongHienTai,
      DT_QLTS_TS_MaTaiSan, DT_QLTS_TS_NamSanXuat, DT_QLTS_TS_NgayDuaVaoSuDung,
      DT_QLTS_TS_XuatXu, DT_QLTS_TS_ThuongHieu, DT_QLTS_TS_NguonGoc,
      DT_QLTS_TS_TinhTrang, DT_QLTS_TS_Model, DT_QLTS_TS_SerialNumber,
      DT_QLTS_TS_KichThuoc_Dai, DT_QLTS_TS_KichThuoc_Rong, DT_QLTS_TS_KichThuoc_Cao,
      DT_QLTS_TS_GiayToKemTheo_TenFile, DT_QLTS_TS_GiayToKemTheo_DataFile,
      DT_QLTS_TS_TS_GhiChu, DT_QLTS_TS_NhapKho_MaNhanSu, DT_QLTS_TS_NhapKho_TenKho,
      DT_QLTS_TS_NhapKho_TenKho_Ten, DT_QLTS_TS_NhapKho_DonViTinh
    } = req.body;
  
    const updates = {
      DT_QLTS_TS_PBQL, DT_QLTS_TS_NhomTaiSan, DT_QLTS_TS_LoaiTaiSan,
      DT_QLTS_TS_TenTaiSan, DT_QLTS_TS_PhongHienTai, DT_QLTS_TS_TenPhongHienTai,
      DT_QLTS_TS_MaTaiSan, DT_QLTS_TS_NamSanXuat, DT_QLTS_TS_NgayDuaVaoSuDung,
      DT_QLTS_TS_XuatXu, DT_QLTS_TS_ThuongHieu, DT_QLTS_TS_NguonGoc,
      DT_QLTS_TS_TinhTrang, DT_QLTS_TS_Model, DT_QLTS_TS_SerialNumber,
      DT_QLTS_TS_KichThuoc_Dai, DT_QLTS_TS_KichThuoc_Rong, DT_QLTS_TS_KichThuoc_Cao,
      DT_QLTS_TS_GiayToKemTheo_TenFile, DT_QLTS_TS_GiayToKemTheo_DataFile,
      DT_QLTS_TS_TS_GhiChu, DT_QLTS_TS_NhapKho_MaNhanSu, DT_QLTS_TS_NhapKho_TenKho,
      DT_QLTS_TS_NhapKho_TenKho_Ten, DT_QLTS_TS_NhapKho_DonViTinh
    };
  
    const setClause = Object.keys(updates)
      .map((key, index) => `${key} = @param${index}`)
      .join(', ');
  
    try {
      const request = new sql.Request();
      Object.values(updates).forEach((value, index) => {
        request.input(`param${index}`, value);
      });
      request.input('id', id);
  
      const query = `UPDATE DSTaiSan SET ${setClause} WHERE DT_QLTS_TS_ID = @id`;
      await request.query(query);
      res.json({ message: 'Cập nhật tài sản thành công' });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

// Endpoint: Xóa tài sản
app.delete('/taisan/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const request = new sql.Request();
      request.input('id', id);
      await request.query(`DELETE FROM DSTaiSan WHERE DT_QLTS_TS_ID = @id`);
      res.json({ message: 'Xóa tài sản thành công' });
    } catch (error) {
      res.status(500).send(error);
    }
  });
  

const port = 3000;
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
