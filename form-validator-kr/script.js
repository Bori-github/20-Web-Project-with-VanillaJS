const form = document.getElementById("form");
const userid = document.getElementById("userid");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const username = document.getElementById("username");
const phone = document.getElementById("phone");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}
// Show success outline
function showSuccess(input) {
  const formControl = input.parentElement.parentElement;
  formControl.className = "form-control success";
}

// Check requied field
function checkRequired(inputArr) {
  const reRequired = /.{1,}/;
  inputArr.forEach(function (input) {
    if (!reRequired.test(input.value.trim())) {
      showError(input, `필수 입력정보입니다.`);
    } else {
      showSuccess(input);
    }
  });
}

// Check id is valid
function checkId(input) {
  const reId = /^[a-z0-9-_]{5,20}$/;
  if (!reId.test(input.value.trim())) {
    showError(
      input,
      `5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.`
    );
  } else {
    showSuccess(input);
  }
}

// Check password is valid
function checkPw(input) {
  const rePw =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,32}$/;
  if (!rePw.test(input.value.trim())) {
    showError(input, `8~32자 영문 대 소문자, 숫자, 특수문자를 사용하세요.`);
  } else {
    showSuccess(input);
  }
}

// Check password match
function checkPwsMatch(pw1, pw2) {
  if (pw1.value !== pw2.value) {
    showError(pw2, `비밀번호가 일치하지 않습니다.`);
  }
}

// Check name is valid
function checkName(input) {
  const reName = /^[가-힣a-zA-Z]+$/;
  if (!reName.test(input.value.trim())) {
    showError(
      input,
      `한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)`
    );
  } else {
    showSuccess(input);
  }
}

// Check phone is valid
function checkPhone(input) {
  const rePhone = /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/;
  const phoneNum = input.value.trim();
  if (!rePhone.test(phoneNum) | (phoneNum.length > 11)) {
    showError(
      input,
      `잘못된 형식의 전화번호입니다. 정확한 전화번호를 입력해 주세요.`
    );
  } else {
    showSuccess(input);
  }
}

// Event listner
form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([userid, password, password2, username, phone]);
  checkId(userid);
  checkPw(password);
  checkPwsMatch(password, password2);
  checkName(username);
  checkPhone(phone);
});
