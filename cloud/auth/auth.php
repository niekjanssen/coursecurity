<?php
//Never Cache the Authentication
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

try{
	$text = '';			//Concatination of headers that might identify which instance the authentication is requested for
	$option = false; 	//Is there a chance that the authentication will be granted (false if none of the headers are found)
	$valid = false;		//Is the authentication granted?
	//Verify if Original URI / Request Headers are passed and store them in $text
	//If present set $option to true
	if(isset($_SERVER['HTTP_X_ORIGINAL_URI']) && isset($_SERVER['HTTP_X_ORIGINAL_REQUEST'])){
		$text .= $_SERVER['HTTP_X_ORIGINAL_REQUEST'].$_SERVER['HTTP_X_ORIGINAL_URI'];
		$option = true;
	} 
	//Verify if a Referer Header is passed and store them in $text
	//If present set $option to true
	if(isset($_SERVER['HTTP_X_ORIGINAL_REF'])){
		$text .= $_SERVER['HTTP_X_ORIGINAL_REF'];
		$option = true;
	}
	
	//If there is a possibility of granting the authentication
	if($option){
		//Regex trying to find the instance identifier and token by searching for the headers
		preg_match('/([a-z])\.coursecurity.*?token=([a-zA-Z0-9]{32,32})/m',$text, $result);
		
		//If the headers contain /websockify the token will not be present, only peform an IP match
		if(str_contains($text, 'websockify')){
			if(file_get_contents('./'.$ins.'.txt')==$_SERVER['HTTP_X_ORIGINAL_IP']) $valid = true;
		}else{
			//If not websockify, check whether both the instance ID and Token are found
			if(isset($result)){
				if(isset($result[1]) && isset($result[2])){
					//Normalize the results
					$ins = strtoupper($result[1]);
					$tkn = strtolower($result[2]);
					
					//If token is too short the authentication will never be possible
					if(strlen($tkn) < 15) $option = false;
				}else{
					//If not both present, authentication will never be possible
					$option = false;
				}
			}else{
				//If there are no regex results, authentication will never be possible
				$option = false;
			}

			//IF checking for authentication makes sense
			if($option){
				//Verify that the instance is currently assigned to ANYONE
				if(file_exists("../q/blocked/".$ins)){
					//Verify that instance is currently assigned with the passed Token
					if(file_get_contents("../q/blocked/".$ins) == $tkn){
						//Grant Authorization
						$valid = true;
						//Store the IP, so websocket requests can be authenticated too
						file_put_contents('./'.$ins.'.txt', $_SERVER['HTTP_X_ORIGINAL_IP']);
					}
				}
			}
		}
	}
}finally{
	if($valid){
		//Return 200 OK if authenticated
		http_response_code(200);
	}else{
		//Return 403 FORBIDDEN if not authenticated (for any reason)
		http_response_code(403);
	}
}


?>