<?php
	include "dbconfig.php";
	$firstname = mysqli_real_escape_string($con,$_POST['firstname']);
	$lastname = mysqli_real_escape_string($con,$_POST['lastname']);
	$mail = mysqli_real_escape_string($con,$_POST['mail']);
	$phone = mysqli_real_escape_string($con,$_POST['phone']);
	$dob = mysqli_real_escape_string($con,$_POST['dob']);
	$age = mysqli_real_escape_string($con,$_POST['age']);
	$gender = mysqli_real_escape_string($con,$_POST['gender']);
	$password = mysqli_real_escape_string($con,$_POST['password']);

	$sql_query = mysqli_prepare($con,"SELECT count(*) as cntUser FROM users WHERE email=?");
	mysqli_stmt_bind_param($sql_query ,'s',$mail);
	mysqli_stmt_execute($sql_query);
	mysqli_stmt_bind_result($sql_query,$count);
	mysqli_stmt_fetch($sql_query);
    if($count > 0){
        echo 2;
    }else{
		$jsonFile = "data.json";
		$arr_data = array();
		if(file_exists($jsonFile)==false){
			$contents = '';
			file_put_contents($jsonFile, $contents);
		}
		try{
			$userData = array(
				'firstname' => $firstname,
				'lastname' => $lastname,
				'email' => $mail,
				'phone' => $phone,
				'dob' => $dob,
				'age' => $age,
				'gender' => $gender,
				'password' => $password
			);
			$jsondata = file_get_contents($jsonFile);
			$arr_data = json_decode($jsondata, true);
			$userJson = json_encode($userData);
			if($arr_data == null){
				$arr_data = array($userJson);
			}
			else{
				array_push($arr_data, $userJson);
			}
			$jsondata = json_encode($arr_data , JSON_PRETTY_PRINT);
			file_put_contents($jsonFile, $jsondata);
			$sql_query = "INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `phone`, `dob`, `age`, `gender`, `password`) VALUES (NULL, ?, ?,?, ?, ?, ?, ?, ?);";
			if($stmt = mysqli_prepare($con,$sql_query))
			{
				mysqli_stmt_bind_param($stmt, 'sssssiss',$firstname,$lastname,$mail,$phone,$dob,$age,$gender,$password);
				mysqli_stmt_execute($stmt);
				echo 1;
			}
			else
			{
				echo 0;
			}
			
		}
		catch(Exception $e){
			echo $e->getMessage();
		}
	}
?>
