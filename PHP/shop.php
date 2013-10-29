<?php
//logs onto connection con
$con=mysqli_connect("cust-mysql-123-14", "HW_items", "pr0m0ti0n", "HW_items");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }


$userid = $_GET["userID"];
// $userid = 81;

$result = mysqli_query($con,"SELECT * 
FROM ACTION 
INNER JOIN product ON action.ProductID = product.ProductID
INNER JOIN client ON product.SupplierID = client.supplierID
WHERE CustomerID = $userid
AND ACTION =  'like' 
GROUP BY product.ProductID
");

while($row = mysqli_fetch_array($result))
{

    $arr["id"]=$row['ProductID'];
    $arr["shop"]=$row['shop'];
    $arr["URL"]=$row['URL'];
    $arr["image_url"]=$row['image_URL'];
    $arr["item_url"]=$row['item_URL'];
    $array[]=$arr;
       
}

echo json_encode($array);


mysqli_close($con);


?>

