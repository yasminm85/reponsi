import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Http } from '@capacitor-community/http';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
})
export class UserEditPage implements OnInit {
  nama: any;
  alamat: any;
  id: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-shadow
    public LoadingController: LoadingController,
  ) { this.route.params.subscribe((param: any) => {
    this.id = param.id;
    console.log(this.id);
    this.ambilTask(this.id);
  }); }

  ngOnInit() {
  }
  ambilTask(id) {
    // eslint-disable-next-line no-underscore-dangle
    this._apiService.ambilTask(id).subscribe((res: any) => {
      console.log('sukses', res);
      // eslint-disable-next-line prefer-const
      let user = res;
      //console.log(mahasiswa);
      this.nama = user.nama;
      this.alamat = user.alamat;
    }, (error: any) => {
      console.log('error', error);
      alert('gagal ambil data');
    });
  }


  editTask() {
    // eslint-disable-next-line no-underscore-dangle, prefer-const
    let url = this._apiService.apiURL() + '/edit.php';
    Http.request({
      method: 'POST',
      // eslint-disable-next-line object-shorthand
      url: url,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      headers: { 'Content-Type': 'application/json' },
      data: {
        id: this.id,
        nama: this.nama,
        alamat: this.alamat,
      },
    }).then((data) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Edit Target',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/user');
    }, (err) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Edit Target',
        buttons: ['OK']
      }).then(res => {
        res.present();
      });
    });
  }


}
