import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



interface Person {
   name: string | undefined;
   title: string | undefined;
   phone: string | undefined;
   email: string | undefined;
}

@Component({
   selector: 'app-signature',
   templateUrl: './signature.component.html',
   styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {

   hasTitle: boolean | undefined;
   employee: Person | undefined;

   srcDocContent: string | undefined;
   srcDocContentNoTitle: string | undefined;

   contentSanitized: SafeHtml | undefined;

   mainForm: FormGroup | undefined;

   constructor(
      private formBuilder: FormBuilder,
      private sanitizer: DomSanitizer

   ) { }

   ngOnInit() {
      this.createForm();


   }

   createForm() {
      this.mainForm = this.formBuilder.group({
         fullName: ['', Validators.required],
         jobTitle: ['', Validators.required],
         phoneNumber: ['', Validators.required],
         emailAddress: ['', Validators.required],

         toggleTitle: [false]
      });
   }

   get fullName() { return this.mainForm?.get('fullName'); }
   get jobTitle() { return this.mainForm?.get('jobTitle'); }
   get phoneNumber() { return this.mainForm?.get('phoneNumber'); }
   get emailAddress() { return this.mainForm?.get('emailAddress'); }

   get toggleTitle() { return this.mainForm?.get('toggleTitle'); }


   onSubmit() {
      this.employee = {
         name: this.fullName?.value,
         title: this.jobTitle?.value,
         phone: this.phoneNumber?.value,
         email: this.emailAddress?.value
      };

      this.createContent();
      this.contentSanitized = this.sanitizer.bypassSecurityTrustHtml(this.toggleTitle?.value ? this.srcDocContent : this.srcDocContentNoTitle);
   }



   createContent() {
      this.srcDocContent = '\
    <table cellpadding="0" cellspacing="0" style="font-family: Avenir, Verdana, Arial, Tahoma, Gill Sans, Helvetica;">\
   <tbody>\
      <tr>\
         <td width=20>\
         <div></div>\
         </td>\
         <td height="20"></td>\
      </tr>\
      <tr>\
         <td width="20">\
         <div></div>\
         </td>\
         <td style="vertical-align: middle;">\
         <table cellpadding="0" cellspacing="0"\
            style="font-family: Avenir, Verdana, Arial, Tahoma, Gill Sans, Helvetica;letter-spacing: 2px">\
            <tbody>\
               <tr>\
               <td>\
                  <p style="margin: 0px; font-size: 20px; color: #333333; text-transform: uppercase; font-weight: 600;">'
         + this.employee?.name +
         '</p>\
               </td>\
               </tr>\
               <tr>\
               <td height="7"></td>\
               </tr>\
               <tr>\
               <td height="7">\
                  <table>\
                     <tbody>\
                     <tr>\
                        <td width="45" style="border-top: 1px solid #0076DB; display: block;">\
                           <div></div>\
                        </td>\
                     </tr>\
                     </tbody>\
                  </table>\
               </td>\
               </tr>\
               <tr height="25" style="vertical-align: middle;">\
               <td style="padding: 0px; text-decoration: none; font-size: 15px; text-transform: uppercase;">\
                  <span>'
         + this.employee?.title +
         '</span>\
               </td>\
               </tr>\
               <tr>\
               <td height="15"></td>\
               </tr>\
               <tr>\
               <td>\
                  <table cellpadding="0" cellspacing="0" style="font-family: Avenir, Verdana, Arial, Tahoma, Gill Sans, Helvetica;">\
                     <tbody>\
                     <tr height="25" style="vertical-align: middle;">\
                        <td style="padding: 0px; text-decoration: none;font-size: 13px;">\
                           <span>'
         + this.employee?.phone +
         '</span>\
                        </td>\
                     </tr>\
                     <tr height="25" style="vertical-align: middle;">\
                        <td style="padding: 0px; text-decoration: none;font-size: 14px;">\
                           <span>'
         + this.employee?.email +
         '</span>\
                        </td>\
                     </tr>\
                     </tbody>\
                  </table>\
               </td>\
               </tr>\
            </tbody>\
         </table>\
         </td>\
      </tr>\
      <tr>\
         <td height="15"></td>\
      </tr>\
      <tr>\
         <td height="10"></td>\
      </tr>\
      <tr>\
         <td width="20">\
         <div></div>\
         </td>\
         <td style="text-align: left; vertical-align: top;">\
         <table cellpadding="0" cellspacing="0"\
            style="font-family: Avenir, Verdana, Arial, Tahoma, Gill Sans, Helvetica; display: inline-block;">\
            <tbody>\
               <tr style="text-align: right;">\
               <td><a href="https://www.linkedin.com">\
                    \
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 11.536 11.535">\
                     <path\
                        d="M52.081,167.4a5.768,5.768,0,1,0,5.768,5.767,5.768,5.768,0,0,0-5.768-5.767m-1.525,8.609H49.178v-4.146h1.378Zm-.689-4.712h-.009a.788.788,0,1,1,.009,0m5.66,4.712H54.149v-2.219c0-.556-.2-.937-.7-.937a.755.755,0,0,0-.707.5.955.955,0,0,0-.046.337v2.315H51.319s.018-3.758,0-4.146H52.7v.587a1.37,1.37,0,0,1,1.243-.685c.907,0,1.587.593,1.587,1.866Z"\
                        transform="translate(-46.313 -167.401)" fill="#0076db" /></svg>\
                  </a>\
               </td>\
               <td width="9">\
                  <div></div>\
               </td>\
               <td><a href="https://www.facebook.com">\
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 11.535 11.535">\
                     <path\
                        d="M68.363,167.4a5.768,5.768,0,1,0,5.768,5.767,5.767,5.767,0,0,0-5.768-5.767m1.59,3.528h-.838a.317.317,0,0,0-.331.361v.78H69.95l-.137,1.324H68.784v3.77H67.225v-3.77h-.742v-1.325h.742v-.858a1.462,1.462,0,0,1,1.573-1.573l1.155.005Z"\
                        transform="translate(-62.596 -167.401)" fill="#0076db" /></svg>\
                  </a>\
               </td>\
               <td width="9">\
                  <div></div>\
               </td>\
               <td><a href="https://www.instagram.com">\
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 11.536 11.535">\
                     <g transform="translate(-78.876 -167.401)">\
                        <path d="M84.645,172.064a1.1,1.1,0,1,0,1.1,1.1,1.1,1.1,0,0,0-1.1-1.1" fill="#0076db" />\
                        <path\
                           d="M87.226,171.215a1,1,0,0,0-.247-.381,1.027,1.027,0,0,0-.381-.248,1.824,1.824,0,0,0-.615-.114c-.349-.016-.454-.019-1.338-.019s-.989,0-1.338.019a1.818,1.818,0,0,0-.615.114,1.1,1.1,0,0,0-.629.629,1.817,1.817,0,0,0-.114.614c-.016.35-.019.454-.019,1.339s0,.989.019,1.338a1.818,1.818,0,0,0,.114.615,1.018,1.018,0,0,0,.248.381,1.035,1.035,0,0,0,.38.248,1.839,1.839,0,0,0,.616.113c.349.017.453.02,1.338.02s.989,0,1.338-.02a1.832,1.832,0,0,0,.615-.113,1.093,1.093,0,0,0,.628-.629,1.812,1.812,0,0,0,.115-.615c.016-.349.019-.454.019-1.338s0-.989-.019-1.339a1.81,1.81,0,0,0-.115-.614m-2.581,3.653a1.7,1.7,0,1,1,1.7-1.7,1.7,1.7,0,0,1-1.7,1.7m1.768-3.071a.4.4,0,1,1,.4-.4.4.4,0,0,1-.4.4" fill="#0076db" />\
                        <path\
                           d="M84.644,167.4a5.768,5.768,0,1,0,5.768,5.768,5.768,5.768,0,0,0-5.768-5.768m3.293,7.133a2.442,2.442,0,0,1-.155.8,1.689,1.689,0,0,1-.969.968,2.436,2.436,0,0,1-.8.155c-.354.015-.467.019-1.366.019s-1.012,0-1.366-.019a2.441,2.441,0,0,1-.8-.155,1.681,1.681,0,0,1-.968-.968,2.392,2.392,0,0,1-.155-.8c-.016-.354-.02-.466-.02-1.365s0-1.013.02-1.365a2.4,2.4,0,0,1,.155-.805,1.694,1.694,0,0,1,.968-.969,2.421,2.421,0,0,1,.8-.153c.354-.017.467-.021,1.366-.021s1.012,0,1.365.021a2.417,2.417,0,0,1,.8.153,1.7,1.7,0,0,1,.969.969,2.455,2.455,0,0,1,.155.805c.015.352.019.465.019,1.365s0,1.011-.019,1.365" fill="#0076db" />\
                     </g>\
                     </svg>\
                  </a>\
               </td>\
               <td width="9">\
                  <div></div>\
               </td>\
               <td><a href="https://twitter.com">\
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 11.534 11.535">\
                     <path\
                        d="M100.926,167.4a5.768,5.768,0,1,0,5.767,5.768,5.768,5.768,0,0,0-5.767-5.768m2.634,4.5c0,.057,0,.113,0,.171a3.764,3.764,0,0,1-5.8,3.172,2.731,2.731,0,0,0,.315.018,2.662,2.662,0,0,0,1.645-.567,1.324,1.324,0,0,1-1.237-.919,1.264,1.264,0,0,0,.248.023,1.343,1.343,0,0,0,.35-.045,1.326,1.326,0,0,1-1.063-1.3v-.018a1.317,1.317,0,0,0,.6.166,1.325,1.325,0,0,1-.41-1.767,3.762,3.762,0,0,0,2.729,1.383,1.361,1.361,0,0,1-.034-.3,1.324,1.324,0,0,1,2.29-.907,2.629,2.629,0,0,0,.84-.321,1.326,1.326,0,0,1-.582.732,2.608,2.608,0,0,0,.76-.208,2.7,2.7,0,0,1-.659.686"\
                        transform="translate(-95.159 -167.401)" fill="#0076db" /></svg>\
                  </a>\
               </td>\
               <td width="5">\
                  <div></div>\
               </td>\
               </tr>\
            </tbody>\
         </table>\
         </td>\
      </tr>\
      <tr>\
         <td height="10"></td>\
      </tr>\
   </tbody>\
      </table>\
    ';

      this.srcDocContentNoTitle = '\
    <table cellpadding="0" cellspacing="0" style="font-family: Avenir, Verdana, Arial, Tahoma, Gill Sans, Helvetica;">\
   <tbody>\
      <tr>\
         <td width=20>\
         <div></div>\
         </td>\
         <td height="20"></td>\
      </tr>\
      <tr>\
         <td width="20">\
         <div></div>\
         </td>\
         <td style="vertical-align: middle;">\
         <table cellpadding="0" cellspacing="0"\
            style="font-family: Avenir, Verdana, Arial, Tahoma, Gill Sans, Helvetica;letter-spacing: 2px">\
            <tbody>\
               <tr>\
               <td>\
                  <p style="margin: 0px; font-size: 20px; color: #333333; text-transform: uppercase; font-weight: 600;">'
         + this.employee?.name +
         '</p>\
               </td>\
               </tr>\
               <tr>\
               <td height="7"></td>\
               </tr>\
               <tr>\
               <td height="7">\
                  <table>\
                     <tbody>\
                     <tr>\
                        <td width="45" style="border-top: 1px solid #0076DB; display: block;">\
                           <div></div>\
                        </td>\
                     </tr>\
                     </tbody>\
                  </table>\
               </td>\
               </tr>\
               \
               \
               <tr>\
               <td>\
                  <table cellpadding="0" cellspacing="0" style="font-family: Avenir, Verdana, Arial, Tahoma, Gill Sans, Helvetica;">\
                     <tbody>\
                     <tr height="25" style="vertical-align: middle;">\
                        <td style="padding: 0px; text-decoration: none;font-size: 13px;">\
                           <span>'
         + this.employee?.phone +
         '</span>\
                        </td>\
                     </tr>\
                     <tr height="25" style="vertical-align: middle;">\
                        <td style="padding: 0px; text-decoration: none;font-size: 14px;">\
                           <span>'
         + this.employee?.email +
         '</span>\
                        </td>\
                     </tr>\
                     </tbody>\
                  </table>\
               </td>\
               </tr>\
            </tbody>\
         </table>\
         </td>\
      </tr>\
      <tr>\
         <td height="15"></td>\
      </tr>\
      <tr>\
         <td width="20">\
         <div></div>\
         </td>\
         <td style="text-align: left; vertical-align: top;">\
         <table cellpadding="0" cellspacing="0"\
            style="font-family: Avenir, Verdana, Arial, Tahoma, Gill Sans, Helvetica; display: inline-block;">\
            <tbody>\
               <tr style="text-align: right;">\
               <td><a href="https://www.linkedin.com">\
                    \
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 11.536 11.535">\
                     <path\
                        d="M52.081,167.4a5.768,5.768,0,1,0,5.768,5.767,5.768,5.768,0,0,0-5.768-5.767m-1.525,8.609H49.178v-4.146h1.378Zm-.689-4.712h-.009a.788.788,0,1,1,.009,0m5.66,4.712H54.149v-2.219c0-.556-.2-.937-.7-.937a.755.755,0,0,0-.707.5.955.955,0,0,0-.046.337v2.315H51.319s.018-3.758,0-4.146H52.7v.587a1.37,1.37,0,0,1,1.243-.685c.907,0,1.587.593,1.587,1.866Z"\
                        transform="translate(-46.313 -167.401)" fill="#0076db" /></svg>\
                  </a>\
               </td>\
               <td width="9">\
                  <div></div>\
               </td>\
               <td><a href="https://www.facebook.com">\
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 11.535 11.535">\
                     <path\
                        d="M68.363,167.4a5.768,5.768,0,1,0,5.768,5.767,5.767,5.767,0,0,0-5.768-5.767m1.59,3.528h-.838a.317.317,0,0,0-.331.361v.78H69.95l-.137,1.324H68.784v3.77H67.225v-3.77h-.742v-1.325h.742v-.858a1.462,1.462,0,0,1,1.573-1.573l1.155.005Z"\
                        transform="translate(-62.596 -167.401)" fill="#0076db" /></svg>\
                  </a>\
               </td>\
               <td width="9">\
                  <div></div>\
               </td>\
               <td><a href="https://www.instagram.com">\
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 11.536 11.535">\
                     <g transform="translate(-78.876 -167.401)">\
                        <path d="M84.645,172.064a1.1,1.1,0,1,0,1.1,1.1,1.1,1.1,0,0,0-1.1-1.1" fill="#0076db" />\
                        <path\
                           d="M87.226,171.215a1,1,0,0,0-.247-.381,1.027,1.027,0,0,0-.381-.248,1.824,1.824,0,0,0-.615-.114c-.349-.016-.454-.019-1.338-.019s-.989,0-1.338.019a1.818,1.818,0,0,0-.615.114,1.1,1.1,0,0,0-.629.629,1.817,1.817,0,0,0-.114.614c-.016.35-.019.454-.019,1.339s0,.989.019,1.338a1.818,1.818,0,0,0,.114.615,1.018,1.018,0,0,0,.248.381,1.035,1.035,0,0,0,.38.248,1.839,1.839,0,0,0,.616.113c.349.017.453.02,1.338.02s.989,0,1.338-.02a1.832,1.832,0,0,0,.615-.113,1.093,1.093,0,0,0,.628-.629,1.812,1.812,0,0,0,.115-.615c.016-.349.019-.454.019-1.338s0-.989-.019-1.339a1.81,1.81,0,0,0-.115-.614m-2.581,3.653a1.7,1.7,0,1,1,1.7-1.7,1.7,1.7,0,0,1-1.7,1.7m1.768-3.071a.4.4,0,1,1,.4-.4.4.4,0,0,1-.4.4" fill="#0076db" />\
                        <path\
                           d="M84.644,167.4a5.768,5.768,0,1,0,5.768,5.768,5.768,5.768,0,0,0-5.768-5.768m3.293,7.133a2.442,2.442,0,0,1-.155.8,1.689,1.689,0,0,1-.969.968,2.436,2.436,0,0,1-.8.155c-.354.015-.467.019-1.366.019s-1.012,0-1.366-.019a2.441,2.441,0,0,1-.8-.155,1.681,1.681,0,0,1-.968-.968,2.392,2.392,0,0,1-.155-.8c-.016-.354-.02-.466-.02-1.365s0-1.013.02-1.365a2.4,2.4,0,0,1,.155-.805,1.694,1.694,0,0,1,.968-.969,2.421,2.421,0,0,1,.8-.153c.354-.017.467-.021,1.366-.021s1.012,0,1.365.021a2.417,2.417,0,0,1,.8.153,1.7,1.7,0,0,1,.969.969,2.455,2.455,0,0,1,.155.805c.015.352.019.465.019,1.365s0,1.011-.019,1.365" fill="#0076db" />\
                     </g>\
                     </svg>\
                  </a>\
               </td>\
               <td width="9">\
                  <div></div>\
               </td>\
               <td><a href="https://twitter.com">\
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 11.534 11.535">\
                     <path\
                        d="M100.926,167.4a5.768,5.768,0,1,0,5.767,5.768,5.768,5.768,0,0,0-5.767-5.768m2.634,4.5c0,.057,0,.113,0,.171a3.764,3.764,0,0,1-5.8,3.172,2.731,2.731,0,0,0,.315.018,2.662,2.662,0,0,0,1.645-.567,1.324,1.324,0,0,1-1.237-.919,1.264,1.264,0,0,0,.248.023,1.343,1.343,0,0,0,.35-.045,1.326,1.326,0,0,1-1.063-1.3v-.018a1.317,1.317,0,0,0,.6.166,1.325,1.325,0,0,1-.41-1.767,3.762,3.762,0,0,0,2.729,1.383,1.361,1.361,0,0,1-.034-.3,1.324,1.324,0,0,1,2.29-.907,2.629,2.629,0,0,0,.84-.321,1.326,1.326,0,0,1-.582.732,2.608,2.608,0,0,0,.76-.208,2.7,2.7,0,0,1-.659.686"\
                        transform="translate(-95.159 -167.401)" fill="#0076db" /></svg>\
                  </a>\
               </td>\
               <td width="5">\
                  <div></div>\
               </td>\
               </tr>\
            </tbody>\
         </table>\
         </td>\
      </tr>\
      <tr>\
         <td height="10"></td>\
      </tr>\
   </tbody>\
      </table>\
    ';
   }


}
