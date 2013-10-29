<?php
//logs onto connection con
$con=mysqli_connect("cust-mysql-123-14", "HW_items", "pr0m0ti0n", "HW_items");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$email = $_GET["email"];
$password = $_GET["password"];
$userid = $_GET["userID"];

$result = mysqli_query($con,"SELECT * FROM User
WHERE email='$email'");

if(mysqli_num_rows($result)!=0)
{

    

while($row = mysqli_fetch_array($result))
  {
    if ($row['password']==$password) {
      $user=$row['userID'];
      //changes all new cookies to old cookies

      mysqli_query($con,"UPDATE action SET CustomerID='$user'
      WHERE customerID = '$userid' ");
      $arr["userID"] = $user;

    }
    else
    {
      $arr["userID"]='incorrect';
    }
  }

}
else
{

  $arr["userID"]='none';

}


//return no user if can't find it

echo json_encode($arr);
//selects a random id number


mysqli_close($con);


?>

