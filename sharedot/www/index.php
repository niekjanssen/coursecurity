<?php 
    //Use Sessions for very unsafe but practical login-status
    session_start();
    
    /**
     * $root contains root folder for the application
     * On load the content of this folder will be shown
     */
    $root = '/home/files';

    // If any token is passed, treat user as logged in
    if(isset($_GET['token'])) {
        $_SESSION['login'] = true;      
    }

    //If not logged in, redirect to login page
    if(!isset($_SESSION['login'])){
        header("Location: https://home247.com");
    } elseif(!isset($_GET['path'])){
        header("Location: https://sharedot.com/?path=".$root);
    }


    /**
     * Function to convert filesize in bytes to a human readable version
     * Adapted from https://www.php.net/manual/en/function.filesize.php#106569
     * 
     * Converts bytes to largest possible human type (KB, MB, GB, TB etc.)
     */
    function human_filesize($filename) {
        $bytes = filesize($_GET['path'].'/'.$filename);
        $decimals=1;
        $sz = 'BKMGTP';
        $factor = floor((strlen($bytes) - 1) / 3);
        return sprintf("%.{$decimals}f", $bytes / pow(1024, $factor)) . @$sz[$factor];
    }

    /**
     * Function to map filename(extension) to icon that fits the file type
     * Adapted from https://github.com/call-me-Vlad/file-extension-to-fontawesome-icon
     */
    function icon($filename){
        $fileA = explode('.',$filename);
        $ext = end($fileA);
        $ext_to_fa = [
            'aif' => "fa-file-audio",
            'cda' => "fa-file-audio",
            'mid' => "fa-file-audio",
            'mp3' => "fa-file-audio",
            'mpa' => "fa-file-audio",
            'ogg' => "fa-file-audio",
            'wav' => "fa-file-audio",
            'flac' => "fa-file-audio",
            'wma' => "fa-file-audio",
            'wpl' => "fa-file-audio",
            '7z' => "fa-file-archive",
            'arj' => "fa-file-archive",
            'deb' => "fa-file-archive",
            'pkg' => "fa-file-archive",
            'rar' => "fa-file-archive",
            'rpm' => "fa-file-archive",
            'tar.gz' => "fa-file-archive",
            'z' => "fa-file-archive",
            'zip' => "fa-file-archive",
            'csv' => "fa-file-csv",
            'dat' => "fa-file-spreadsheet",
            'db' => "fa-file-spreadsheet",
            'log' => "fa-file-spreadsheet",
            'mdb' => "fa-file-spreadsheet",
            'sav' => "fa-file-spreadsheet",
            'sql' => "fa-file-spreadsheet",
            'tar' => "fa-file-spreadsheet",
            'xml' => "fa-file-spreadsheet",
            'ods' => "fa-file-spreadsheet",
            'xlr' => "fa-file-spreadsheet",
            'xls' => "fa-file-excel",
            'xlsx' => "fa-file-excel",
            'apk' => "fa-save",
            'bat' => "fa-save",
            'bin' => "fa-save",
            'cgi' => "fa-save",
            'com' => "fa-save",
            'exe' => "fa-save",
            'gadget' => "fa-save",
            'jar' => "fa-save",
            'wsf' => "fa-save",
            'bak' => "fa-save",
            'cab' => "fa-save",
            'cfg' => "fa-save",
            'cpl' => "fa-save",
            'cur' => "fa-save",
            'dll' => "fa-save",
            'dmp' => "fa-save",
            'drv' => "fa-save",
            'icns' => "fa-save",
            'ico' => "fa-save",
            'ini' => "fa-save",
            'lnk' => "fa-save",
            'msi' => "fa-save",
            'sys' => "fa-save",
            'tmp' => "fa-save",
            'fnt' => "fa-font",
            'fon' => "fa-font",
            'otf' => "fa-font",
            'ttf' => "fa-font",
            'ai' => "fa-file-image",
            'bmp' => "fa-file-image",
            'gif' => "fa-file-image",
            'ico' => "fa-file-image",
            'jpeg' => "fa-file-image",
            'jpg' => "fa-file-image",
            'png' => "fa-file-image",
            'ps' => "fa-file-image",
            'psd' => "fa-file-image",
            'svg' => "fa-file-image",
            'tif' => "fa-file-image",
            'tiff' => "fa-file-image",
            'bin' => "fa-file-code",
            'dmg' => "fa-file-code",
            'iso' => "fa-file-code",
            'toast' => "fa-file-code",
            'vcd' => "fa-file-code",
            'asp' => "fa-file-code",
            'cer' => "fa-file-certificate",
            'cert' => "fa-file-certificate",
            'cfm' => "fa-file-code",
            'cgi' => "fa-file-code",
            'css' => "fa-file-code",
            'htm' => "fa-file-code",
            'html' => "fa-file-code",
            'c' => "fa-file-code",
            'class' => "fa-file-code",
            'cpp' => "fa-file-code",
            'cs' => "fa-file-code",
            'h' => "fa-file-code",
            'java' => "fa-file-code",
            'sh' => "fa-file-code",
            'swift' => "fa-file-code",
            'vb' => "fa-file-code",
            'js' => "fa-file-code",
            'jsp' => "fa-file-code",
            'part' => "fa-file-code",
            'php' => "fa-file-code",
            'py' => "fa-file-code",
            'rss' => "fa-file-code",
            'xhtml' => "fa-file-code",
            'key' => "fa-file-powerpoint",
            'odp' => "fa-file-powerpoint",
            'pps' => "fa-file-powerpoint",
            'ppt' => "fa-file-powerpoint",
            'pptx' => "fa-file-powerpoint",
            '3g2' => "fa-file-video",
            '3gp' => "fa-file-video",
            'avi' => "fa-file-video",
            'flv' => "fa-file-video",
            'h264' => "fa-file-video",
            'm4v' => "fa-file-video",
            'mkv' => "fa-file-video",
            'mov' => "fa-file-video",
            'mp4' => "fa-file-video",
            'mpg' => "fa-file-video",
            'mpeg' => "fa-file-video",
            'rm' => "fa-file-video",
            'swf' => "fa-file-video",
            'vod' => "fa-file-video",
            'wmv' => "fa-file-video",
            'doc' => "fa-file-word",
            'docx' => "fa-file-word",
            'odt' => "fa-file-word",
            'rtf' => "fa-file-word",
            'tex' => "fa-file-word",
            'txt' => "fa-file-word",
            'wks' => "fa-file-word",
            'wps' => "fa-file-word",
            'wpd' => "fa-file-word",
            'pdf' => "fa-file-pdf"
            ];
        if(!isset($ext_to_fa[$ext])) return "fa-file-o"; //If unknown extension use generic icon
        return $ext_to_fa[strtolower($ext)].'-o';
    }

    /**
     * If the path passed is not a directory but a file: serve the file
     * Sets content-type header to correct value, serves the file and ignores the rest of the script
     */
    if(!is_dir($_GET['path']) && file_exists($_GET['path'])){
                // Set the content-type header
                header('Content-Type: '.mimeType($_GET['path']));
    
                // Read the file
                readfile($_GET['path']);
            
                exit();
    }


    
    function mimeType($path) {
        preg_match("|\.([a-z0-9]{2,4})$|i", $path, $fileSuffix);
    
        switch(strtolower($fileSuffix[1])) {
            case 'js' :
                return 'application/x-javascript';
            case 'json' :
                return 'application/json';
            case 'jpg' :
            case 'jpeg' :
            case 'jpe' :
                return 'image/jpg';
            case 'svg':
                return 'image/svg+xml';
            case 'png' :
            case 'gif' :
            case 'bmp' :
            case 'tiff' :
                return 'image/'.strtolower($fileSuffix[1]);
            case 'css' :
                return 'text/css';
            case 'xml' :
                return 'application/xml';
            case 'doc' :
            case 'docx' :
                return 'application/msword';
            case 'xls' :
            case 'xlt' :
            case 'xlm' :
            case 'xld' :
            case 'xla' :
            case 'xlc' :
            case 'xlw' :
            case 'xll' :
                return 'application/vnd.ms-excel';
            case 'ppt' :
            case 'pps' :
                return 'application/vnd.ms-powerpoint';
            case 'rtf' :
                return 'application/rtf';
            case 'pdf' :
                return 'application/pdf';
            case 'html' :
            case 'htm' :
            case 'php' :
                return 'text/html';
            case 'txt' :
                return 'text/plain';
            case 'mpeg' :
            case 'mpg' :
            case 'mpe' :
                return 'video/mpeg';
            case 'mp3' :
                return 'audio/mpeg3';
            case 'wav' :
                return 'audio/wav';
            case 'aiff' :
            case 'aif' :
                return 'audio/aiff';
            case 'avi' :
                return 'video/msvideo';
            case 'wmv' :
                return 'video/x-ms-wmv';
            case 'mov' :
                return 'video/quicktime';
            case 'zip' :
                return 'application/zip';
            case 'tar' :
                return 'application/x-tar';
            case 'swf' :
                return 'application/x-shockwave-flash';
            default :
                if(function_exists('mime_content_type')) {
                    $fileSuffix = mime_content_type($path);
                }
                return 'unknown/' . trim($fileSuffix[0], '.');
        }
    }

?>
<html>
<!-- Inspiration for at filemanger system is developed using the bootstrap library with inspiration from following source: https://www.bootdey.com/snippets/view/documents-list -->
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="/style.css" rel="stylesheet">
        <link href="/fonts.css" rel="stylesheet">
        <link href="/bootstrap.css" rel="stylesheet">
        <title>PIA | ShareDot</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">
                    <img src="pia.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
                </a>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-sm-4">
                    <div class="panel panel-dark-outline tabs-panel">
                        <div class="panel-body tab-content">
                            <div class="tab-pane active documents-panel">
                                <h4 class="no-margin-top">Folders</h4>
                                <ul class="folders list-unstyled">
<?php $arrFiles = scandir($_GET['path']);
                                        echo "                                    Current Folder: /".substr($_GET['path'], strlen($root)+1)."\n";
                                        echo "                                    <li><a href=\"/?path=".$root."\"> <i class=\"fa fa-home\"></i> </a></li>\n";                                    
                                        $parentPath = dirname($_GET['path']);
                                        if(strlen($parentPath) >= strlen($root) && substr($parentPath, 0, strlen($root)) == $root) echo "                                    <li><a href=\"/?path=".$parentPath."\"> <i class=\"fa fa-arrow-left\"></i> </a></li>\n";
                                        foreach ($arrFiles as $file) {
                                            if ($file!="." && $file!="..") {
                                                echo is_dir($_GET['path'].'/'.$file) ? "                                    <li class=\" boldHover\"><a href=\"/?path=".$_GET['path']."/".$file."\"> <i class=\"fa fa-folder\"></i>".$file."</a> </li>\n" : "" ;
                                            }
                                        }
?>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-8 tab-content no-bg no-border">
                    <div class="tab-pane active documents documents-panel">
<?php
                        $arrFiles = scandir($_GET['path']);
                        foreach ($arrFiles as $file) {
                            if ($file!="." && $file!="..") {
                                if(!is_dir($_GET['path'].'/'.$file)){
?>  
                            <a href="?path=<?php echo $_GET['path'].'/'.$file;?>" target="_blank" class="document dark">
                                <div class="document-body borderHover">
                                    <i class="fa <?php echo icon($file);?>"></i>
                                </div>
                                <div class="document-footer">
                                    <span class="document-name"><?php echo $file;?></span>
                                    <span class="document-description"><?php echo human_filesize($file);?>B</span>
                                </div>
                                </a>
<?php
                                }

                            }
                        }
                    ?>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>