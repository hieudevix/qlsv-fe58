// //Lưu thông tin lớp học
// var ma = 'FE58';
// var ten = 'Front end 58';
// //Lưu thông tin 1 học viên
// var ma = 'GV001';
// var ten = 'Khải';

// var lopHoc = {
//     ma:'FE58',
//     ten:'Front end 58',
//     hienThiThongTin: function () {
//         console.log('Mã lớp học:', this.ma);
//         console.log('Tên lớp học:', this.ten);
//     }
// }

// //Cách truy xuất biến trong đối tượng (thuộc tính)
// //Cách 1 [ten_doi_tuong].tenThuocTinh
// console.log(lopHoc.ma);
// //Cách 2 [ten_doi_tuong]['ten_thuoc_tinh']
// console.log(lopHoc['ma'])

// lopHoc.hienThiThongTin();
// lopHoc['hienThiThongTin']();

// var giangVien = {
//     ma:'GV001',
//     ten:'Khải',
//     hienThiThongTin: function () {
//         console.log('Mã giảng viên', this.ma);
//         console.log('Tên giảng viên', this.ten);
//     }
// }

// giangVien.hienThiThongTin();
// giangVien['hienThiThongTin']();

// var sinhVien = new SinhVien();
// sinhVien.maSinhVien = 1;
// sinhVien.tenSinhVien = 'Nguyễn Văn A';
// console.log('sv1',sinhVien);

// var sinhVien2 = new SinhVien();
// sinhVien2.maSinhVien = 2;
// sinhVien2.tenSinhVien = 'Nguyễn Văn Tèo';
// console.log('sv2',sinhVien2);

var arrSinhVien = [];

var validate = new Validation();

document.querySelector("#btnXacNhan").onclick = function (event) {
  var sinhVien = new SinhVien();
  //Lấy thông tin từ người dùng nhập vào gán vào đối tượng
  sinhVien.maSinhVien = document.querySelector("#maSinhVien").value;
  sinhVien.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sinhVien.diemToan = document.querySelector("#diemToan").value;
  sinhVien.diemLy = document.querySelector("#diemLy").value;
  sinhVien.diemHoa = document.querySelector("#diemHoa").value;
  sinhVien.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  sinhVien.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  sinhVien.email = document.querySelector("#email").value;
  sinhVien.soDienThoai = document.querySelector("#soDienThoai").value;
  //Hiển thị dữ liệu lên giao diện
  document.querySelector(
    "#txtDiemTrungBinh"
  ).innerHTML = sinhVien.tinhDiemTrungBinh();
  document.querySelector("#txtXepLoai").innerHTML = sinhVien.xepLoaiSinhVien();
  document.querySelector("#txtTenSinhVien").innerHTML = sinhVien.tenSinhVien;
  document.querySelector("#txtMaSinhVien").innerHTML = sinhVien.maSinhVien;
  document.querySelector("#txtLoaiSinhVien").innerHTML = sinhVien.loaiSinhVien;

  // =========== Kiểm tra dữ liệu hợp lệ trước khi thêm vào mảng ============
  var valid = true;
  //1. Kiểm tra rổng
  valid &=
    validate.kiemTraRong(
      "#maSinhVien",
      "Mã sinh viên",
      "#kiemTraRong_maSinhVien"
    ) &
    validate.kiemTraRong(
      "#tenSinhVien",
      "Tên sinh viên",
      "#kiemTraRong_tenSinhVien"
    ) &
    validate.kiemTraRong(
      "#diemRenLuyen",
      "Diem Ren Luyen",
      "#kiemTraRong_diemRenLuyen"
    );

  valid &=
    validate.kiemTraTatCaSo(
      "#maSinhVien",
      "Mã sinh viên",
      "#kiemTraSo_maSinhVien"
    ) &
    validate.kiemTraTatCaSo("#diemToan", "Điểm toán", "#kiemTraSo_diemToan") &
    validate.kiemTraTatCaSo("#diemHoa", "Điểm hóa", "#kiemTraSo_diemHoa") &
    validate.kiemTraTatCaSo("#diemLy", "Điểm hóa", "#kiemTraSo_diemLy") &
    validate.kiemTraTatCaSo(
      "#soDienThoai",
      "Số diện thoại",
      "#kiemTraSo_soDienThoai"
    );

  valid &= validate.kiemTraEmail("#email", "Email", "#kiemDinhDang_email");

  valid &=
    validate.kiemTraGiaTri(
      "#diemToan",
      "Điểm toán",
      "#kiemTraGiaTri_diemToan",
      0,
      10
    ) &
    validate.kiemTraGiaTri(
      "#diemHoa",
      "Điểm hóa",
      "#kiemTraGiaTri_diemHoa",
      0,
      10
    ) &
    validate.kiemTraGiaTri(
      "#diemLy",
      "Điểm lý",
      "#kiemTraGiaTri_diemLy",
      0,
      10
    ) &
    validate.kiemTraGiaTri(
      "#diemRenLuyen",
      "Điểm rèn luyện",
      "#kiemTraGiaTri_diemRenLuyen",
      0,
      10
    );
  valid &= validate.kiemTraDoDai(
    "#maSinhVien",
    "Mã sinh viên",
    "#kiemTraDoDai_maSinhVien",
    4,
    6
  );

  //   if (!valid) {
  //     console.log("v", valid);
  //     return;
  //   }

  // Mỗi lần click thêm sinh viên => lấy đối tượng sinh viên lưu vào mảng
  arrSinhVien.push(sinhVien);
  luuStorage();
  //Sau khi thêm sinh viên vào mảng => lấy mảng sinh viên tạo ra chuỗi thẻ tr rồi in lên giao diện
  renderTableSinhVien(arrSinhVien);

  console.log("mangSinhVien", arrSinhVien);
};

var renderTableSinhVien = function (mangSinhVien) {
  var content = "";
  for (var i = 0; i < mangSinhVien.length; i++) {
    //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên trong mảng
    var sinhVien = mangSinhVien[i];
    var sv = new SinhVien(
      sinhVien.maSinhVien,
      sinhVien.tenSinhVien,
      sinhVien.loaiSinhVien,
      sinhVien.diemToan,
      sinhVien.diemHoa,
      sinhVien.diemLy,
      sinhVien.diemRenLuyen,
      sinhVien.email,
      sinhVien.soDienThoai
    );

    content += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${
                  sv.maSinhVien
                }')" >Xoá</button></td>
                <td><button class="btn btn-danger" onclick="chinhSua('${
                  sv.maSinhVien
                }')" >Chỉnh sửa</button></td>
            </tr>
        `;
  }
  document.querySelector("#tblSinhVien").innerHTML = content;
};
var chinhSua = function (maSinhVien) {
  for (var i = 0; i < arrSinhVien.length; i++) {
    var sv = arrSinhVien[i];
    if (sv.maSinhVien == maSinhVien) {
      // load lai control phia tren
      document.querySelector("#maSinhVien").value = sv.maSinhVien;
      document.querySelector("#tenSinhVien").value = sv.tenSinhVien;
      document.querySelector("#email").value = sv.email;
      document.querySelector("#soDienThoai").value = sv.soDienThoai;
      document.querySelector("#diemToan").value = sv.diemToan;
      document.querySelector("#diemHoa").value = sv.diemHoa;
      document.querySelector("#diemLy").value = sv.diemLy;
      document.querySelector("#diemRenLuyen").value = sv.diemRenLuyen;
    }
  }
};

window.xoaSinhVien = function (maSV) {
  for (var i = arrSinhVien.length - 1; i >= 0; i--) {
    var sv = arrSinhVien[i];
    if (sv.maSinhVien === maSV) {
      arrSinhVien.splice(i, 1);
    }
  }
  //Gọi hàm tạo lại bảng
  luuStorage();
  renderTableSinhVien(arrSinhVien);
};

// var arr = [1, 2, 3];
// var arr = new Array();
// console.log(typeof arr)

//Tạo thẻ js

// var trSinhVien = document.createElement('tr');
// trSinhVien.className="text-center";
// var tdMaSinhVien = document.createElement('td');
// tdMaSinhVien.innerHTML = sinhVien.maSinhVien;

// var tdTenSinhVien = document.createElement('td');
// tdTenSinhVien.innerHTML = sinhVien.tenSinhVien;

// var tdLoaiSinhVien = document.createElement('td');
// tdLoaiSinhVien.innerHTML = sinhVien.loaiSinhVien;

// var tdDiemTrungBinh = document.createElement('td');
// tdDiemTrungBinh.innerHTML = sinhVien.tinhDiemTrungBinh();

// var tdXepLoai = document.createElement('td');
// tdXepLoai.innerHTML = sinhVien.xepLoaiSinhVien();

// var tdChucNang = document.createElement('td');

// var buttonXoa = document.createElement('button');
// buttonXoa.innerHTML = 'Xoá';
// buttonXoa.className = 'btn btn-danger';
// //Định nghĩa sự kiện click khi tạo button
// buttonXoa.onclick = function (event) { //Biến event là javascript trả ra cho từng sự kiện
//     let btnXoa = event.target; //event.target chính là thẻ xảy ra sự kiện
//     //Từ thẻ con => dom đến thẻ cha
//     // let tdCN = btnXoa.parentNode;
//     let trSV = btnXoa.closest('tr');
//     trSV.remove();
// }
// tdChucNang.appendChild(buttonXoa);
// //Đưa thẻ td vào thẻ tr
// trSinhVien.appendChild(tdMaSinhVien);
// trSinhVien.appendChild(tdTenSinhVien);
// trSinhVien.appendChild(tdLoaiSinhVien);
// trSinhVien.appendChild(tdDiemTrungBinh);
// trSinhVien.appendChild(tdXepLoai);
// trSinhVien.appendChild(tdChucNang);
// //Đưa thẻ tr vào tbody
// document.querySelector('#tblSinhVien').appendChild(trSinhVien);

var luuStorage = function () {
  // Biến đổi mảng (arrSinhVien) thành chuỗi
  var chuoiArrSinhVien = JSON.stringify(arrSinhVien);
  // Lưu vào localstorage
  localStorage.setItem("arrSinhVien", chuoiArrSinhVien);
};
var layDaTaStorage = function () {
  //Kiểm tra  có storage đó hay không
  if (localStorage.getItem("arrSinhVien")) {
    // Dữ liệu lấy từ localStorage đó là dạng chuỗi
    var chuoiArrSinhVien = localStorage.getItem("arrSinhVien");
    // Chuyển chuỗi json về object json
    arrSinhVien = JSON.parse(chuoiArrSinhVien);
    renderTableSinhVien(arrSinhVien);
  }
};
layDaTaStorage();

document.querySelector("#btnCapNhatSinhVien").onclick = function () {
  //lấy thông tin người dùng gán vào đối tượng sinh viên
  var sinhVienCapNhat = new SinhVien();
  sinhVienCapNhat.maSinhVien = document.querySelector("#maSinhVien").value;
  sinhVienCapNhat.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sinhVienCapNhat.diemToan = document.querySelector("#diemToan").value;
  sinhVienCapNhat.diemLy = document.querySelector("#diemLy").value;
  sinhVienCapNhat.diemHoa = document.querySelector("#diemHoa").value;
  sinhVienCapNhat.diemRenLuyen = document.querySelector("#diemRenLuyen").value;
  sinhVienCapNhat.loaiSinhVien = document.querySelector("#loaiSinhVien").value;
  sinhVienCapNhat.email = document.querySelector("#email").value;
  sinhVienCapNhat.soDienThoai = document.querySelector("#soDienThoai").value;

  // lấy sinh viên sau khi cập nhật gán cho sv trong mảng3
  for (i = 0; i < arrSinhVien.length; i++) {
    var sv = arrSinhVien[i];
    if (sv.maSinhVien === sinhVienCapNhat.maSinhVien) {
      sv.maSinhVien = sinhVienCapNhat.maSinhVien;
      sv.tenSinhVien = sinhVienCapNhat.tenSinhVien;
      sv.loaiSinhVien = sinhVienCapNhat.loaiSinhVien;
      sv.diemToan = sinhVienCapNhat.diemToan;
      sv.diemLy = sinhVienCapNhat.diemLy;
      sv.diemHoa = sinhVienCapNhat.diemHoa;
      sv.diemRenLuyen = sinhVienCapNhat.diemRenLuyen;
      sv.soDienThoai = sinhVienCapNhat.soDienThoai;
      sv.email = sinhVienCapNhat.email;
    }
  }
  //gọi render trong table
  renderTableSinhVien(arrSinhVien);
  luuStorage();
};
