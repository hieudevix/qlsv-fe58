// console.log(axios);

// var objectAjax = {
//   url: "./data/arrSinhVien.json", // Đường dẫn đến file chứa dữ liệu hoặc api do backend xung cấp
//   method: "GET", //do backend cung cấp
// };

// //Gọi ajax = axios => trả về promise
// var promise = axios(objectAjax);

// // Xử lý khi request thành công
// promise.then(function (result) {
//   console.log(result.data);
//   document.querySelector("#data").innerHTML = result.data[0].tenSV;
// });

// // Xử lý khi request thất bại
// promise.catch(function (err) {
//   console.log(err);
// });

// var objectAjax = {
//   url: "./data/xmlSinhVien.xml",
//   method: "GET",
//   response: "document",
// };

// var promise = axios(objectAjax);
// promise.then(function (result) {
//   console.log("result", result.data);
// });
// var sinhVien1 = result.data.querySelector("SinhVien").getAttribute("maSV");
// console.log("tên sinh vien", sinhVien1);
// console.log("mã sinh vien", maSV);
// promise.catch(function (err) {
//   console.log("err");
// });
var renderTable = function (arrSinhVien) {
  var content = "";
  for (var i = 0; i < arrSinhVien.length; i++) {
    //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên trong mảng
    var sv = arrSinhVien[i];
    // var sv = new SinhVien(
    //   sinhVien.maSinhVien,
    //   sinhVien.tenSinhVien,
    //   sinhVien.loaiSinhVien,
    //   sinhVien.diemToan,
    //   sinhVien.diemHoa,
    //   sinhVien.diemLy,
    //   sinhVien.diemRenLuyen,
    //   sinhVien.email,
    //   sinhVien.soDienThoai
    // );
    //từ sinh viên tạo ra thẻ tr tương ứng
    content += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>${sv.diemRenLuyen}</td>
                <td><button class="btn btn-danger" onclick="xoaSinhVien('${sv.maSinhVien}')" >Xoá</button></td>
                <td><button class="btn btn-danger" onclick="chinhSua('${sv.maSinhVien}')" >Chỉnh sửa</button></td>
            </tr>
        `;
  }
  document.querySelector("#tblSinhVien").innerHTML = content;
};

var renderSinhVien = function () {
  // var objectAjax = {};

  var promise = axios({
    url: "http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien", //Backend cung cấp đường dẫn api
    method: "GET", //Backend cung cấp method
    responseType: "json", //Backend cung cấp dữ liệu trả về
  });

  //Xử lý thành công
  promise.then(function (result) {
    console.log("result", result.data);
    //Hiển thị thông tin sinh viên lên table
    renderTable(result.data);
  });
  //Xử lý thất bại
  promise.catch(function (error) {
    console.log("2");
  });
  console.log("3");
};
//Gọi hàm thực thi ajax
renderSinhVien();

//=====================POST:Thêm sinh viên serve qua api  của backend cung cấp ===========================
document.querySelector("#btnXacNhan").onclick = function () {
  var sinhVien = new SinhVien();
  sinhVien.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sinhVien.maSinhVien = document.querySelector("#maSinhVien").value;
  sinhVien.email = document.querySelector("#email").value;
  sinhVien.soDienThoai = document.querySelector("#soDienThoai").value;
  sinhVien.diemToan = document.querySelector("#diemToan").value;
  sinhVien.diemHoa = document.querySelector("#diemHoa").value;
  sinhVien.diemLy = document.querySelector("#diemLy").value;
  sinhVien.diemRenLuyen = document.querySelector("#diemRenLuyen").value;

  console.log("sinhVien", sinhVien);

  //Gọi api để đưa dữ liệu về serve lưu trữ
  var promise = axios({
    url: "http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien", //api backend cung cấp
    method: "POST", //method backend cung cấp
    data: sinhVien,
    responseType: "json",
  });

  promise.then(function (result) {
    console.log("Xử lý thành công", result.data);
    renderSinhVien();
  });
  promise.catch(function (error) {
    console.log("Xử lý thất bại", error);
  });
};

// ======================DELETE: với api backend cung câp
window.xoaSinhVien = function (maSinhVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`,
    method: "DELETE",
    //responseType : 'json'
  });
  // Xử lý thành công
  promise.then(function (result) {
    console.log("result", result.data);
    renderSinhVien();
  });
  // Xử lý thất bại
  promise.catch(function (error) {
    console.log("error", error.response.data);
  });
};

//=============================Chỉnh sửa=============================
window.chinhSua = function (maSinhVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
    method: "GET",
  })
    .then(function (result) {
      console.log("result", result);
      var sv = result.data;
      // load lai control phia tren
      document.querySelector("#maSinhVien").value = sv.maSinhVien;
      document.querySelector("#tenSinhVien").value = sv.tenSinhVien;
      document.querySelector("#email").value = sv.email;
      document.querySelector("#soDienThoai").value = sv.soDienThoai;
      document.querySelector("#diemToan").value = sv.diemToan;
      document.querySelector("#diemHoa").value = sv.diemHoa;
      document.querySelector("#diemLy").value = sv.diemLy;
      document.querySelector("#diemRenLuyen").value = sv.diemRenLuyen;
    })
    .catch(function (error) {
      console.log("Error", error);
    });
};

//====================CẬP NHẬT THÔNG TIN==================
document.querySelector("#btnCapNhatSinhVien").onclick = function () {
  //Lấy thông tin từ người dùng nhập vào
  var sinhVien = new SinhVien();
  sinhVien.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sinhVien.maSinhVien = document.querySelector("#maSinhVien").value;
  sinhVien.email = document.querySelector("#email").value;
  sinhVien.soDienThoai = document.querySelector("#soDienThoai").value;
  sinhVien.diemToan = document.querySelector("#diemToan").value;
  sinhVien.diemHoa = document.querySelector("#diemHoa").value;
  sinhVien.diemLy = document.querySelector("#diemLy").value;
  sinhVien.diemRenLuyen = document.querySelector("#diemRenLuyen").value;

  var promise = axios({
    url: `http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sinhVien.maSinhVien}`,
    method: "PUT",
    data: sinhVien,
  });

  promise.then(function (result) {
    console.log("ket qua", result.data);
    renderSinhVien();
  });
  promise.catch(function (error) {
    console.log("Error", error.response.data);
  });
};
