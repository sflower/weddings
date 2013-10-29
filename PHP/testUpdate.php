<?php
//logs onto connection con
$user = $_GET['userID'];
// $user = 263;


$con=mysqli_connect("cust-mysql-123-14", "HW_items", "pr0m0ti0n", "HW_items");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

mysqli_query($con,"UPDATE user 
SET test=1 WHERE userID = '$user'");

mysqli_close($con);


?>

