import { Component } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { PopoverComponent } from "./../popover/popover.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  url: string = "http://localhost:1337/parse/functions/createRegister/";
  parseApplicationId: string = "c4mPu$z05t3Nib1310T53rV3r";

  volAgua: number;
  caudal: number;
  dbo5: number;
  sst: number;
  dbo5_2: number;
  sst_2: number;
  myDate: Date = new Date();

  constructor(
    public popoverController: PopoverController,
    public http: HttpClient,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  async presentAlertConfirm() {
    console.log(new Date());
    const alert = await this.alertController.create({
      header: "Confirmar envío de registro",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {}
        },
        {
          text: "Confirmar",
          handler: () => {
            let data = {
              id_device: "11",
              timestamp: new Date(),
              lat: 3.3722586,
              long: -76.54794559,
              VVert: this.volAgua,
              caudalVert: this.caudal,
              dbo5: this.dbo5,
              sst: this.sst,
              dbo5_2: this.dbo5_2,
              sst_2: this.sst_2
            };
            this.SendRegister(data);
          }
        }
      ]
    });
    await alert.present();
  }

  SendRegister(data: any) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("X-Parse-Application-Id", this.parseApplicationId);

    this.http.post(this.url, JSON.stringify(data), { headers }).subscribe(
      val => {
        console.log("POST call successful value returned in body", val);
      },
      response => {
        console.log("POST call in error", response);
        this.presentToast("Error en el envío del dato" + response);
      },
      () => {
        console.log("The POST observable is now completed.");
        this.presentToast("Datos enviados correctamente");
      }
    );
    console.log(data);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }
}
