<?php
include "dbconfig.php";
$uname = mysqli_real_escape_string($con,$_POST['username']);
$password = mysqli_real_escape_string($con,$_POST['password']);


if ($uname != "" && $password != ""){
    $sql_query = mysqli_prepare($con,"SELECT count(*) as cntUser FROM users WHERE email=? and password=?");
	mysqli_stmt_bind_param($sql_query,'ss',$uname,$password);
	mysqli_stmt_execute($sql_query);
	mysqli_stmt_bind_result($sql_query,$count);
	mysqli_stmt_fetch($sql_query);
    if($count > 0){
        echo 1;
    }else{
        echo 0;
    }
}
?>