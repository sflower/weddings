<?php
//logs onto connection con
$con=mysqli_connect("cust-mysql-123-14", "HW_items", "pr0m0ti0n", "HW_items");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

  $client =  $_GET['client'];  //output: myquery
   $paid = $_GET['paid'];  //output: myquery



mysqli_query($con,"UPDATE product SET paid=$paid
WHERE SupplierID=$client");

 mysqli_close($con);


?>

