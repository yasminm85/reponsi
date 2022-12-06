<?php 
require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$pesan = [];
$nama = trim($data['nama']);
$alamat = trim($data['alamat']);


if ($nama != '' and $alamat != '') {
	$query = mysqli_query($koneksi,"insert into data_diri (nama,alamat) values('$nama','$alamat')");

}else{
	$query = mysqli_query($koneksi,"delete from data_diri where id='$id'");
}


// if ($query) {
// 	http_response_code(201);
// 	$pesan['status'] = 'sukses';
// }else{
// 	http_response_code(422);
// 	$pesan['status'] = 'gagal';
// }

echo json_encode($pesan);
echo mysqli_error($koneksi);

?>