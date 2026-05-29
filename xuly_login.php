<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email_user = trim($_POST['txtEmail']);
    $password_user = trim($_POST['txtPassword']);

    $tai_khoan_chuan = "admin@gmail.com";
    $mat_khau_chuan = "123456";

    if (empty($email_user) || empty($password_user)) {
        echo "<script>
                alert('Vui lòng không được bỏ trống Email hoặc Mật khẩu!');
                window.history.back();
              </script>";
        exit(); 
    }
    if ($email_user === $tai_khoan_chuan && $password_user === $mat_khau_chuan) {
        
        echo "<script>
                alert('Đăng nhập thành công! Chào mừng admin.');
                window.location.href = 'index.html';
              </script>";
              
    } else {
        echo "<script>
                alert('Tài khoản hoặc mật khẩu không chính xác!');
                window.history.back();
              </script>";
    }
} else {
    header("Location: login.html");
    exit();
}
?>