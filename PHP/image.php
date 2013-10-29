<?php
//logs onto connection con
$con=mysqli_connect("cust-mysql-123-14", "HW_items", "pr0m0ti0n", "HW_items");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

//finds the most liked items and checks if they have been rated and not filtered

$filter = $_GET['filter'];
$user = $_GET['user'];
$search = $_GET['search'];
// $filter = 'Cakes';
// $user = 9999;
// $search = 1;



$result2 = mysqli_query($con,"SELECT * 
FROM action
WHERE CustomerID=$user");

$productArray[]=9999999;

 while($row2 = mysqli_fetch_array($result2))
  {
  $productArray[]=$row2['ProductID'];
  }

if ($filter == 'All') 
{
$result = mysqli_query($con,"SELECT * 
FROM product
WHERE ProductID NOT IN ('".join("','", $productArray)."')
AND paid = true
ORDER BY RAND()
LIMIT 30
"); 
}
else
{
$result = mysqli_query($con,"SELECT * 
FROM product
WHERE Category = '$filter'
AND ProductID NOT IN ('".join("','", $productArray)."')
AND paid = true
ORDER BY RAND()
LIMIT 30
");
}

if ($filter == 'All') 
{
$result3 = mysqli_query($con,"SELECT * 
FROM product
WHERE ProductID NOT IN ('".join("','", $productArray)."')
AND paid = false
ORDER BY RAND()
LIMIT 30
"); 
}
else
{
$result3 = mysqli_query($con,"SELECT * 
FROM product
WHERE Category = '$filter'
AND ProductID NOT IN ('".join("','", $productArray)."')
AND paid = false
ORDER BY RAND()
LIMIT 30
");
}


// while($row = mysqli_fetch_array($result))
//   {

//   $maxID=$row['ProductID'];
//   }

// for ($i = 0; $i <= 20; $i++) {
//   $idNumber =rand(1, $maxID);

// $result = mysqli_query($con,"SELECT * FROM product
// WHERE ProductID=$idNumber");

while($row = mysqli_fetch_array($result))
  {
    unset($arr);
    $arr["image"]=$row['image_URL'];
    $arr["id"]=$row['ProductID'];
    $arr["height"]=$row['image_height'];
    $arr["width"]=$row['image_width'];
    $arr["price"]=$row['price'];
    $arr["name"]=$row['Name'];
    $arr["category"]=$row['Category'];
    $arr["url"]=$row['item_URL'];
    $supllierID1=$row['SupplierID'];

    $result2 = mysqli_query($con,"SELECT * FROM client
    WHERE supplierID= $supllierID1");

    while($row2 = mysqli_fetch_array($result2))
    {
      $arr["supplierID"]=$row2['shop'];
      $arr["supplierURL"]=$row2['URL'];
    }
    $arra[] = $arr;  
  }

  while($row = mysqli_fetch_array($result3))
  {
    unset($arr);
    $arr["image"]=$row['image_URL'];
    $arr["id"]=$row['ProductID'];
    $arr["height"]=$row['image_height'];
    $arr["width"]=$row['image_width'];
    $arr["price"]=$row['price'];
    $arr["name"]=$row['Name'];
    $arr["category"]=$row['Category'];
    $arr["url"]=$row['item_URL'];
    $supllierID1=$row['SupplierID'];

    $result2 = mysqli_query($con,"SELECT * FROM client
    WHERE supplierID= $supllierID1");

    while($row2 = mysqli_fetch_array($result2))
    {
      $arr["supplierID"]=$row2['shop'];
      $arr["supplierURL"]=$row2['URL'];
    }
    $arra[] = $arr;  
  }
    
if ($search!="") 
{
  //adds an extra image in of the item searched for
  $result3 = mysqli_query($con,"SELECT * 
  FROM product
  WHERE ProductID NOT IN ('".join("','", $productArray)."')
  AND ProductID = $search
  ");

  while($row = mysqli_fetch_array($result3))
  {
    unset($arr);
    $arr["image"]=$row['image_URL'];
    $arr["id"]=$row['ProductID'];
    $arr["height"]=$row['image_height'];
    $arr["width"]=$row['image_width'];
    $arr["price"]=$row['price'];
    $arr["name"]=$row['Name'];
    $arr["category"]=$row['Category'];
    $arr["url"]=$row['item_URL'];
    $supllierID1=$row['SupplierID'];

    $result4 = mysqli_query($con,"SELECT * FROM client
    WHERE supplierID= $supllierID1");

    while($row2 = mysqli_fetch_array($result4))
    {
      $arr["supplierID"]=$row2['shop'];
      $arr["supplierURL"]=$row2['URL'];
    }
    $arra[0] = $arr;  
  }

}
// }

echo json_encode($arra);
// selects a random id number


mysqli_close($con);


?>

