<?php
include "db.php";

$fname = $_POST['first_name'];
$lname = $_POST['last_name'];
$username = $_POST['username'];
$password = $_POST['password'];
$confirm = $_POST['confirm_password'];

if ($password !== $confirm) {
    die("Passwords do not match.");
}

$hashed = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO users (first_name, last_name, username, password, is_account_created)
        VALUES ('$fname', '$lname', '$username', '$hashed', true)";

if ($conn->query($sql)) {
    echo "Account created successfully. <a href='login_page.html'>Login here</a>";
} else {
    echo "Error: " . $conn->error;
}
?>
