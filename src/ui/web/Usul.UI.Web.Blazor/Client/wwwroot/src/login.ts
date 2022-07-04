import Swal from "sweetalert2";
import Pristine from "pristinejs";
import { assemblyName } from "./index";

export class loginForm {
    private _loginform: HTMLFormElement;
    private _cusername: HTMLInputElement;
    private _cpassword: HTMLInputElement;

    constructor() {

        this._loginform = <HTMLFormElement>document.getElementById("loginForm");
        this._cusername = <HTMLInputElement>document.getElementById("cusername");
        this._cpassword = <HTMLInputElement>document.getElementById("cpassword");
        if (this._loginform != null && this._cusername != null && this._cpassword != null) this.init();

    }

    private init() {

        let pristine = new Pristine(this._loginform);

        this._cusername.addEventListener("keyup", () => {
            if (this._cusername.value.length > 0) {
                this._cusername.classList.add("notEmpty");
            } else if (this._cusername.value.length == 0) {
                this._cusername.classList.remove("notEmpty");
            }
        });

        this._cpassword.addEventListener("keyup", () => {
            if (this._cpassword.value.length > 0) {
                this._cpassword.classList.add("notEmpty");
            } else if (this._cpassword.value.length == 0) {
                this._cpassword.classList.remove("notEmpty");
            }
        });

        this._loginform.addEventListener("submit", (e: Event) => {
            e.preventDefault();

            let _valid = pristine.validate();

            if (_valid) {
                Swal.fire({
                    title: "Authenticating...",
                    // timer: 2000,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showConfirmButton: false,
                    didOpen: () => {
                        console.log("didOpen")
                        Swal.showLoading();
                        this.doLogin();
                    }
                });



            }


        });
    }

    doLogin() {

        //@ts-ignore
        DotNet.invokeMethodAsync(assemblyName, 'doLogin', this._cusername.value, this._cpassword.value)
            .then(data => {
                console.log("data", data)
                Swal.hideLoading();
                if (data) {

                } else {


                }

            });
    }

}

export default function setupLogin() {
    console.log("setupLogin")
    // new loginForm();
}

new loginForm();

//export let _loginForm = new loginForm();