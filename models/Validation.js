//Xây dựng class để kiểm tra dữ liệu

var Validation = function () {
  //.trim() loại bỏ khoảng trống đầu và cuối của chuỗi
  this.kiemTraRong = function (selector, name, error_selector) {
    if (document.querySelector(selector).value.trim() === "") {
      document.querySelector(error_selector).innerHTML =
        name + "Không được bỏ trống !";
      return false;
    }

    document.querySelector(error_selector).innerHTML = "";
    return true;
  };
  this.kiemTraEmail = function (selector, name, error_selector) {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(document.querySelector(selector).value)) {
      document.querySelector(error_selector).innerHTML = "";
      return true;
    }
    document.querySelector(error_selector).innerHTML =
      "Email không đúng định dạng";

    return false;
  };
  this.kiemTraTatCaSo = function (selector, name, error_selector) {
    var regex = /^[0-9]+$/;
    // Kiểm tra đúng định dạng return true;
    if (regex.test(document.querySelector(selector).value)) {
      document.querySelector(error_selector).innerHTML = "";
      return true;
    }
    document.querySelector(error_selector).innerHTML = name + "phai la so";
    return false;
  };
  this.kiemTraDoDai = function (
    selector,
    name,
    error_selector,
    minLength,
    maxLength
  ) {
    var value = document.querySelector(selector).value;
    if (value.length < minLength || value.length > maxLength) {
      document.querySelector(
        selector
      ).innerHTML = `${name} từ ${minLength} đến ${maxLength}`;
      return false;
    }
    document.querySelector(error_selector).innerHTML = "";
    return true;
  };

  this.kiemTraGiaTri = function (
    selector,
    name,
    error_selector,
    min_value,
    max_value
  ) {
    var value = document.querySelector(selector).value;
    if (Number(value) < min_value || Number(value) > max_value) {
      document.querySelector(
        selector
      ).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
      return false;
    }
    document.querySelector(error_selector).innerHTML = "";
    return true;
  };
};
