<?php
//logs onto connection con
$con=mysqli_connect("cust-mysql-123-14", "HW_items", "pr0m0ti0n", "HW_items");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$productid = $_GET["productID"];
$action = $_GET["event"];
$userid = $_GET["userID"];



mysqli_query($con,"INSERT INTO action (CustomerID, Action, ProductID)
VALUES ('$userid','$action','$productid')");

mysqli_close($con);


?>

