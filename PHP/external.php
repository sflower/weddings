<?php
//logs onto connection con
$con=mysqli_connect("cust-mysql-123-14", "HW_items", "pr0m0ti0n", "HW_items");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$item = $_GET["item"];
$shop = $_GET["shop"];
$userid = $_GET["userID"];



mysqli_query($con,"INSERT INTO external (user, shop, item)
VALUES ('$userid','$shop','$item')");

mysqli_close($con);


?>

