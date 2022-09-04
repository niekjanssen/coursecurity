<?php
	if(isset($_GET['token'])){
		$token = $_GET['token'];
	}else{
		echo "Token Missing";
		exit();
	}
	$time = time();
	
	//Verify if the token supplied is in the queue, if so, remove from queue (give up spot)
	if(isset($queue->waiting->$token)){
		unset($queue->waiting->$token);
		header('location:/');
		exit();
	}
	function available(){
		// Get list of files in 'available' folder, indicating available instances
		$files = scandir("../q/available/");
		// Initialize array to hold instances
		$instances = array();
		foreach($files as $file){
			if(is_file("../q/available/".$file)){
				// If a file is older than 60 seconds (to give it time to initialize)
				// Add to the array of available instances
				$time = filemtime("../q/available/".$file);
				if((time()-$time) > 60) $instances[$time.$file]=strtoupper($file);
			}
		}
		// Sort by key (oldest instance first) and return
		ksort($instances);
		return (array_values($instances));
	}
	
	$available = available();
	$queue = json_decode(file_get_contents('queue.json'));
	$instance = strtoupper($token);
	$user = array_search($instance,(array) $queue->assigned);
	
	// Check if supplied token is currently assigned an instance
	if(isset($queue->assigned->$user)){
		// Remove the assignment and add instance placeholder to the restart folder
		unlink("../q/blocked/".$instance);
		touch("../q/restart/".$instance);
		unset($queue->assigned->$user);
		// Redirect user to final survey
		header('location:https://forms.office.com/Pages/ResponsePage.aspx?id=timivgh6hkC0THH1f3Fr2wted-hJcThNnaf7C_7iyehUMlVINUgxV1dEWERVOFVSTjBUNEQ4WFQ2Si4u');
	}else{
		// No instance assigned, don't know what's wrong, offer to go to survey
		echo "An Error Occured.<br><br>Do you need to go to the second half of the survey? Then click <a href=\"https://forms.office.com/Pages/ResponsePage.aspx?id=timivgh6hkC0THH1f3Fr2wted-hJcThNnaf7C_7iyehUMlVINUgxV1dEWERVOFVSTjBUNEQ4WFQ2Si4u\">here</a>";
	}
	// Update Queue
	file_put_contents('queue.json', json_encode($queue));
?>