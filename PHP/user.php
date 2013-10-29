<?php
//logs onto connection con
$search = $_GET['search'];
$test = 0;
if ($search == 'test') {
	$test=1;
}
$con=mysqli_connect("cust-mysql-123-14", "HW_items", "pr0m0ti0n", "HW_items");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($con,"SELECT * 
FROM user
WHERE userID = ( 
SELECT MAX( userID ) 
FROM user )");

while($row = mysqli_fetch_array($result))
  {
  
  $arr["userID"]=$row['userID']+1;
  
  }

$id = $arr["userID"]; 

mysqli_query($con,"INSERT INTO user (userID,test)
VALUES ('$id','$test')");

echo json_encode($arr);
//selects a random id number


mysqli_close($con);


?>

