<?php
$filename="jdata.csv"; //jdata.csv
$jdata = new stdClass();

if (($handle = fopen($filename, "r")) !== FALSE) {
$jdata->header_en=decode(fgets($handle, 1000));
$jdata->header_ru=decode(fgets($handle, 1000));
	    while (($data = fgets($handle, 1000)) !== FALSE) {
			$data = decode($data);
			$data = array_combine($jdata->header_en, $data);
			$jdata->in[] = $data;
    }
    fclose($handle);
}
function decode($str) {
	return explode(";",trim(iconv("windows-1251","UTF-8//IGNORE", $str)));
}
echo json_encode($jdata, JSON_UNESCAPED_UNICODE);
?>