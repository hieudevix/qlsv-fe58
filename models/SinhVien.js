//Lưu ý tên lớp đối tượng class (prototype) phải viết hoa chữ cái đầu tiên (nguyên tắc)
var SinhVien = function (
  maSV,
  tenSV,
  loaiSV,
  dToan,
  dLy,
  dHoa,
  dRenLuyen,
  email,
  soDienThoai
) {
  this.maSinhVien = maSV;
  this.tenSinhVien = tenSV;
  this.loaiSinhVien = loaiSV;
  this.diemToan = dToan;
  this.diemLy = dLy;
  this.diemHoa = dHoa;
  this.diemRenLuyen = dRenLuyen;
  this.email = email;
  this.soDienThoai = soDienThoai;
  this.tinhDiemTrungBinh = function () {
    var diemTrungBinh =
      (Number(this.diemToan) + Number(this.diemLy) + Number(this.diemHoa)) / 3;
    return diemTrungBinh;
  };
  this.xepLoaiSinhVien = function () {
    var ketQuaXL = "";
    var diemTrungBinh = this.tinhDiemTrungBinh();
    if (this.diemRenLuyen < 5 || this.tinhDiemTrungBinh() < 5) {
      ketQuaXL = "Yếu";
    } else if (diemTrungBinh >= 5 && diemTrungBinh < 6) {
      ketQuaXL = "Trung bình";
    } else if (diemTrungBinh >= 6 && diemTrungBinh < 7) {
      ketQuaXL = "Trung bình khá";
    } else if (diemTrungBinh >= 7 && diemTrungBinh < 8) {
      ketQuaXL = "Khá";
    } else if (diemTrungBinh >= 8 && diemTrungBinh < 9) {
      ketQuaXL = "Giỏi";
    } else if (diemTrungBinh >= 9 && diemTrungBinh <= 10) {
      ketQuaXL = "Xuất sắc";
    } else {
      ketQuaXL = "Không hợp lệ!";
    }
    return ketQuaXL;
  };
};
