//Bước 1: Lấy thông tin người dùng từ các thẻ input => Sau khi người dùng bấm nút xác nhận

document.querySelector('#btnXacNhan').onclick = function (event) {
    //Lấy thông tin người dùng
    var maSinhVien = document.querySelector('#maSinhVien').value;
    var tenSinhVien = document.querySelector('#tenSinhVien').value;
    var loaiSinhVien = document.querySelector('#loaiSinhVien').value;
    var diemToan = document.querySelector('#diemToan').value;
    var diemLy = document.querySelector('#diemLy').value;
    var diemHoa = document.querySelector('#diemHoa').value;
    var diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    var diemTrungBinh = tinhDiemTrungBinh(diemToan, diemLy, diemHoa);
    var xepLoaiSV = xepLoai(diemTrungBinh,diemRenLuyen);
    //Hiển thị ra giao diện
    document.querySelector('#txtTenSinhVien').innerHTML = tenSinhVien;
    document.querySelector('#txtMaSinhVien').innerHTML = maSinhVien;
    document.querySelector('#txtLoaiSinhVien').innerHTML = loaiSinhVien;
    document.querySelector('#txtDiemTrungBinh').innerHTML = diemTrungBinh.toFixed(2);
    document.querySelector('#txtXepLoai').innerHTML = xepLoaiSV;
}
var tinhDiemTrungBinh = function (diemToan, diemLy, diemHoa) {
    var dtb = (Number(diemToan) + Number(diemLy) + Number(diemHoa)) / 3;
    return dtb;
}
var xepLoai = function (diemTB, diemRenLuyen) {
    var ketQuaXepLoai = '';
    if (diemRenLuyen < 5 || diemTB < 5) {
        ketQuaXepLoai = 'Yếu';
    } else if (diemTB >= 5 && diemTB < 6) {
        ketQuaXepLoai = 'Trung bình';
    } else if (diemTB >= 6 && diemTB < 7) {
        ketQuaXepLoai = 'Trung bình khá';
    } else if (diemTB >= 7 && diemTB < 8) {
        ketQuaXepLoai = 'Khá';
    } else if (diemTB >=8 && diemTB < 9) {
        ketQuaXepLoai = 'Giỏi';
    } else if (diemTB >= 9 && diemTB <= 10) {
        ketQuaXepLoai = 'Xuất sắc';
    } else {
        ketQuaXepLoai = 'Không hợp lệ!';
    }
    return ketQuaXepLoai;
}

//Công thức tính điểm trung bình
// Nếu diemRenLuyen < 5 => yếu
// Nếu diemRenLuyen >= 5
/*
    dtb < 5 => yếu
    5 <= dtb < 6 => Trung bình
    5 <= dtb < 6 => Trung bình 
    6 <= dtb < 7 => Trung bình khá 
    7 <= dtb < 8 => Khá 
    8 <= dtb < 9 => Giỏi 
    9 <= dtb <= 10 => Xuất sắc 
*/
