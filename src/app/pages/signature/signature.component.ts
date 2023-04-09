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
         <td>\
         <a href="https://yliang.net">\
         <svg width="57px" height="57px" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg"\
         xmlns:xlink="http://www.w3.org/1999/xlink">\
         <g id="" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
           <g id="" transform="translate(-72.000000, -153.000000)">\
             <g id="Group" transform="translate(72.000000, 153.000000)">\
               <polygon id="Fill-103" fill="#0037ff" points="22.345 2.483 24.828 2.483 24.828 0 22.345 0"></polygon>\
               <polygon id="Fill-104" fill="#0037ff" points="29.793 2.483 32.276 2.483 32.276 0 29.793 0"></polygon>\
               <polygon id="Fill-105" fill="#0037ff" points="37.241 2.483 39.724 2.483 39.724 0 37.241 0"></polygon>\
               <polygon id="Fill-106" fill="#0037ff" points="39.724 2.483 42.207 2.483 42.207 0 39.724 0"></polygon>\
               <polygon id="Fill-107" fill="#0037ff" points="42.207 2.483 44.689 2.483 44.689 0 42.207 0"></polygon>\
               <polygon id="Fill-108" fill="#0037ff" points="44.689 2.483 47.172 2.483 47.172 0 44.689 0"></polygon>\
               <polygon id="Fill-109" fill="#0037ff" points="47.172 2.483 49.655 2.483 49.655 0 47.172 0"></polygon>\
               <polygon id="Fill-110" fill="#0037ff" points="19.862 4.965 22.344 4.965 22.344 2.483 19.862 2.483"></polygon>\
               <polygon id="Fill-111" fill="#0037ff" points="24.828 4.965 27.311 4.965 27.311 2.483 24.828 2.483"></polygon>\
               <polygon id="Fill-112" fill="#0037ff" points="27.311 4.965 29.793 4.965 29.793 2.483 27.311 2.483"></polygon>\
               <polygon id="Fill-113" fill="#0037ff" points="34.759 4.965 37.241 4.965 37.241 2.483 34.759 2.483"></polygon>\
               <polygon id="Fill-114" fill="#0037ff" points="39.724 4.965 42.207 4.965 42.207 2.483 39.724 2.483"></polygon>\
               <polygon id="Fill-115" fill="#0037ff" points="44.689 4.965 47.172 4.965 47.172 2.483 44.689 2.483"></polygon>\
               <polygon id="Fill-116" fill="#0037ff" points="49.655 4.965 52.137 4.965 52.137 2.483 49.655 2.483"></polygon>\
               <polygon id="Fill-117" fill="#0037ff" points="24.828 7.448 27.311 7.448 27.311 4.965 24.828 4.965"></polygon>\
               <polygon id="Fill-118" fill="#0037ff" points="27.311 7.448 29.793 7.448 29.793 4.965 27.311 4.965"></polygon>\
               <polygon id="Fill-119" fill="#0037ff" points="29.793 7.448 32.276 7.448 32.276 4.965 29.793 4.965"></polygon>\
               <polygon id="Fill-120" fill="#0037ff" points="32.276 7.448 34.759 7.448 34.759 4.965 32.276 4.965"></polygon>\
               <polygon id="Fill-121" fill="#0037ff" points="34.759 7.448 37.241 7.448 37.241 4.965 34.759 4.965"></polygon>\
               <polygon id="Fill-122" fill="#0037ff" points="37.241 7.448 39.724 7.448 39.724 4.965 37.241 4.965"></polygon>\
               <polygon id="Fill-123" fill="#0037ff" points="39.724 7.448 42.207 7.448 42.207 4.965 39.724 4.965"></polygon>\
               <polygon id="Fill-124" fill="#0037ff" points="42.207 7.448 44.689 7.448 44.689 4.965 42.207 4.965"></polygon>\
               <polygon id="Fill-125" fill="#0037ff" points="44.689 7.448 47.172 7.448 47.172 4.965 44.689 4.965"></polygon>\
               <polygon id="Fill-126" fill="#0037ff" points="47.172 7.448 49.655 7.448 49.655 4.965 47.172 4.965"></polygon>\
               <polygon id="Fill-127" fill="#0037ff" points="49.655 7.448 52.137 7.448 52.137 4.965 49.655 4.965"></polygon>\
               <polygon id="Fill-128" fill="#0037ff" points="22.345 9.931 24.828 9.931 24.828 7.448 22.345 7.448"></polygon>\
               <polygon id="Fill-129" fill="#0037ff" points="27.311 9.931 29.793 9.931 29.793 7.448 27.311 7.448"></polygon>\
               <polygon id="Fill-130" fill="#0037ff" points="34.759 9.931 37.241 9.931 37.241 7.448 34.759 7.448"></polygon>\
               <polygon id="Fill-131" fill="#0037ff" points="44.689 9.931 47.172 9.931 47.172 7.448 44.689 7.448"></polygon>\
               <polygon id="Fill-132" fill="#0037ff" points="47.172 9.931 49.655 9.931 49.655 7.448 47.172 7.448"></polygon>\
               <polygon id="Fill-133" fill="#0037ff" points="24.828 12.413 27.311 12.413 27.311 9.931 24.828 9.931"></polygon>\
               <polygon id="Fill-134" fill="#0037ff" points="27.311 12.413 29.793 12.413 29.793 9.931 27.311 9.931"></polygon>\
               <polygon id="Fill-135" fill="#0037ff" points="32.276 12.413 34.759 12.413 34.759 9.931 32.276 9.931"></polygon>\
               <polygon id="Fill-136" fill="#0037ff" points="37.241 12.413 39.724 12.413 39.724 9.931 37.241 9.931"></polygon>\
               <polygon id="Fill-137" fill="#0037ff" points="39.724 12.413 42.207 12.413 42.207 9.931 39.724 9.931"></polygon>\
               <polygon id="Fill-138" fill="#0037ff" points="44.689 12.413 47.172 12.413 47.172 9.931 44.689 9.931"></polygon>\
               <polygon id="Fill-139" fill="#0037ff" points="19.862 14.897 22.344 14.897 22.344 12.414 19.862 12.414"></polygon>\
               <polygon id="Fill-140" fill="#0037ff" points="22.345 14.897 24.828 14.897 24.828 12.414 22.345 12.414"></polygon>\
               <polygon id="Fill-141" fill="#0037ff" points="24.828 14.897 27.311 14.897 27.311 12.414 24.828 12.414"></polygon>\
               <polygon id="Fill-142" fill="#0037ff" points="27.311 14.897 29.793 14.897 29.793 12.414 27.311 12.414"></polygon>\
               <polygon id="Fill-143" fill="#0037ff" points="32.276 14.897 34.759 14.897 34.759 12.414 32.276 12.414"></polygon>\
               <polygon id="Fill-144" fill="#0037ff" points="34.759 14.897 37.241 14.897 37.241 12.414 34.759 12.414"></polygon>\
               <polygon id="Fill-145" fill="#0037ff" points="44.689 14.897 47.172 14.897 47.172 12.414 44.689 12.414"></polygon>\
               <polygon id="Fill-146" fill="#0037ff" points="47.172 14.897 49.655 14.897 49.655 12.414 47.172 12.414"></polygon>\
               <polygon id="Fill-147" fill="#0037ff" points="49.655 14.897 52.137 14.897 52.137 12.414 49.655 12.414"></polygon>\
               <polygon id="Fill-148" fill="#0037ff" points="19.862 17.379 22.344 17.379 22.344 14.896 19.862 14.896"></polygon>\
               <polygon id="Fill-149" fill="#0037ff" points="24.828 17.379 27.311 17.379 27.311 14.896 24.828 14.896"></polygon>\
               <polygon id="Fill-150" fill="#0037ff" points="29.793 17.379 32.276 17.379 32.276 14.896 29.793 14.896"></polygon>\
               <polygon id="Fill-151" fill="#0037ff" points="34.759 17.379 37.241 17.379 37.241 14.896 34.759 14.896"></polygon>\
               <polygon id="Fill-152" fill="#0037ff" points="39.724 17.379 42.207 17.379 42.207 14.896 39.724 14.896"></polygon>\
               <polygon id="Fill-153" fill="#0037ff" points="44.689 17.379 47.172 17.379 47.172 14.896 44.689 14.896"></polygon>\
               <polygon id="Fill-154" fill="#0037ff" points="49.655 17.379 52.137 17.379 52.137 14.896 49.655 14.896"></polygon>\
               <polygon id="Fill-155" fill="#0037ff" points="19.862 19.862 22.344 19.862 22.344 17.379 19.862 17.379"></polygon>\
               <polygon id="Fill-156" fill="#0037ff" points="27.311 19.862 29.793 19.862 29.793 17.379 27.311 17.379"></polygon>\
               <polygon id="Fill-157" fill="#0037ff" points="29.793 19.862 32.276 19.862 32.276 17.379 29.793 17.379"></polygon>\
               <polygon id="Fill-158" fill="#0037ff" points="42.207 19.862 44.689 19.862 44.689 17.379 42.207 17.379"></polygon>\
               <polygon id="Fill-159" fill="#0037ff" points="44.689 19.862 47.172 19.862 47.172 17.379 44.689 17.379"></polygon>\
               <polygon id="Fill-160" fill="#0037ff" points="49.655 19.862 52.137 19.862 52.137 17.379 49.655 17.379"></polygon>\
               <polygon id="Fill-161" fill="#0037ff" points="9.931 22.344 12.413 22.344 12.413 19.862 9.931 19.862"></polygon>\
               <polygon id="Fill-162" fill="#0037ff" points="12.414 22.344 14.897 22.344 14.897 19.862 12.414 19.862"></polygon>\
               <polygon id="Fill-163" fill="#0037ff" points="14.896 22.344 17.379 22.344 17.379 19.862 14.896 19.862"></polygon>\
               <polygon id="Fill-164" fill="#0037ff" points="17.379 22.344 19.862 22.344 19.862 19.862 17.379 19.862"></polygon>\
               <polygon id="Fill-165" fill="#0037ff" points="27.311 22.344 29.793 22.344 29.793 19.862 27.311 19.862"></polygon>\
               <polygon id="Fill-166" fill="#0037ff" points="32.276 22.344 34.759 22.344 34.759 19.862 32.276 19.862"></polygon>\
               <polygon id="Fill-167" fill="#0037ff" points="34.759 22.344 37.241 22.344 37.241 19.862 34.759 19.862"></polygon>\
               <polygon id="Fill-168" fill="#0037ff" points="39.724 22.344 42.207 22.344 42.207 19.862 39.724 19.862"></polygon>\
               <polygon id="Fill-169" fill="#0037ff" points="44.689 22.344 47.172 22.344 47.172 19.862 44.689 19.862"></polygon>\
               <polygon id="Fill-170" fill="#0037ff" points="54.621 22.344 57.104 22.344 57.104 19.862 54.621 19.862"></polygon>\
               <polygon id="Fill-171" fill="#0037ff" points="57.104 22.344 59.587 22.344 59.587 19.862 57.104 19.862"></polygon>\
               <polygon id="Fill-172" fill="#0037ff" points="67.035 22.344 69.517 22.344 69.517 19.862 67.035 19.862"></polygon>\
               <polygon id="Fill-173" fill="#0037ff" points="4.965 24.828 7.448 24.828 7.448 22.345 4.965 22.345"></polygon>\
               <polygon id="Fill-174" fill="#0037ff" points="7.448 24.828 9.931 24.828 9.931 22.345 7.448 22.345"></polygon>\
               <polygon id="Fill-175" fill="#0037ff" points="9.931 24.828 12.413 24.828 12.413 22.345 9.931 22.345"></polygon>\
               <polygon id="Fill-176" fill="#0037ff" points="17.379 24.828 19.862 24.828 19.862 22.345 17.379 22.345"></polygon>\
               <polygon id="Fill-177" fill="#0037ff" points="27.311 24.828 29.793 24.828 29.793 22.345 27.311 22.345"></polygon>\
               <polygon id="Fill-178" fill="#0037ff" points="29.793 24.828 32.276 24.828 32.276 22.345 29.793 22.345"></polygon>\
               <polygon id="Fill-179" fill="#0037ff" points="39.724 24.828 42.207 24.828 42.207 22.345 39.724 22.345"></polygon>\
               <polygon id="Fill-180" fill="#0037ff" points="47.172 24.828 49.655 24.828 49.655 22.345 47.172 22.345"></polygon>\
               <polygon id="Fill-181" fill="#0037ff" points="49.655 24.828 52.137 24.828 52.137 22.345 49.655 22.345"></polygon>\
               <polygon id="Fill-182" fill="#0037ff" points="59.586 24.828 62.068 24.828 62.068 22.345 59.586 22.345"></polygon>\
               <polygon id="Fill-183" fill="#0037ff" points="64.552 24.828 67.035 24.828 67.035 22.345 64.552 22.345"></polygon>\
               <polygon id="Fill-184" fill="#0037ff" points="67.035 24.828 69.517 24.828 69.517 22.345 67.035 22.345"></polygon>\
               <polygon id="Fill-185" fill="#0037ff" points="69.517 24.828 72 24.828 72 22.345 69.517 22.345"></polygon>\
               <polygon id="Fill-186" fill="#0037ff" points="2.483 27.311 4.965 27.311 4.965 24.828 2.483 24.828"></polygon>\
               <polygon id="Fill-187" fill="#0037ff" points="14.896 27.311 17.379 27.311 17.379 24.828 14.896 24.828"></polygon>\
               <polygon id="Fill-188" fill="#0037ff" points="19.862 27.311 22.344 27.311 22.344 24.828 19.862 24.828"></polygon>\
               <polygon id="Fill-189" fill="#0037ff" points="22.345 27.311 24.828 27.311 24.828 24.828 22.345 24.828"></polygon>\
               <polygon id="Fill-190" fill="#0037ff" points="24.828 27.311 27.311 27.311 27.311 24.828 24.828 24.828"></polygon>\
               <polygon id="Fill-191" fill="#0037ff" points="27.311 27.311 29.793 27.311 29.793 24.828 27.311 24.828"></polygon>\
               <polygon id="Fill-192" fill="#0037ff" points="32.276 27.311 34.759 27.311 34.759 24.828 32.276 24.828"></polygon>\
               <polygon id="Fill-193" fill="#0037ff" points="37.241 27.311 39.724 27.311 39.724 24.828 37.241 24.828"></polygon>\
               <polygon id="Fill-194" fill="#0037ff" points="42.207 27.311 44.689 27.311 44.689 24.828 42.207 24.828"></polygon>\
               <polygon id="Fill-195" fill="#0037ff" points="49.655 27.311 52.137 27.311 52.137 24.828 49.655 24.828"></polygon>\
               <polygon id="Fill-196" fill="#0037ff" points="52.138 27.311 54.621 27.311 54.621 24.828 52.138 24.828"></polygon>\
               <polygon id="Fill-197" fill="#0037ff" points="57.104 27.311 59.587 27.311 59.587 24.828 57.104 24.828"></polygon>\
               <polygon id="Fill-198" fill="#0037ff" points="62.069 27.311 64.552 27.311 64.552 24.828 62.069 24.828"></polygon>\
               <polygon id="Fill-199" fill="#0037ff" points="64.552 27.311 67.035 27.311 67.035 24.828 64.552 24.828"></polygon>\
               <polygon id="Fill-200" fill="#0037ff" points="69.517 27.311 72 27.311 72 24.828 69.517 24.828"></polygon>\
               <polygon id="Fill-201" fill="#0037ff" points="2.483 29.793 4.965 29.793 4.965 27.311 2.483 27.311"></polygon>\
               <polygon id="Fill-202" fill="#0037ff" points="4.965 29.793 7.448 29.793 7.448 27.311 4.965 27.311"></polygon>\
               <polygon id="Fill-203" fill="#0037ff" points="9.931 29.793 12.413 29.793 12.413 27.311 9.931 27.311"></polygon>\
               <polygon id="Fill-204" fill="#0037ff" points="24.828 29.793 27.311 29.793 27.311 27.311 24.828 27.311"></polygon>\
               <polygon id="Fill-205" fill="#0037ff" points="32.276 29.793 34.759 29.793 34.759 27.311 32.276 27.311"></polygon>\
               <polygon id="Fill-206" fill="#0037ff" points="34.759 29.793 37.241 29.793 37.241 27.311 34.759 27.311"></polygon>\
               <polygon id="Fill-207" fill="#0037ff" points="39.724 29.793 42.207 29.793 42.207 27.311 39.724 27.311"></polygon>\
               <polygon id="Fill-208" fill="#0037ff" points="42.207 29.793 44.689 29.793 44.689 27.311 42.207 27.311"></polygon>\
               <polygon id="Fill-209" fill="#0037ff" points="52.138 29.793 54.621 29.793 54.621 27.311 52.138 27.311"></polygon>\
               <polygon id="Fill-210" fill="#0037ff" points="67.035 29.793 69.517 29.793 69.517 27.311 67.035 27.311"></polygon>\
               <polygon id="Fill-211" fill="#0037ff" points="69.517 29.793 72 29.793 72 27.311 69.517 27.311"></polygon>\
               <polygon id="Fill-212" fill="#0037ff" points="2.483 32.276 4.965 32.276 4.965 29.793 2.483 29.793"></polygon>\
               <polygon id="Fill-213" fill="#0037ff" points="4.965 32.276 7.448 32.276 7.448 29.793 4.965 29.793"></polygon>\
               <polygon id="Fill-214" fill="#0037ff" points="12.414 32.276 14.897 32.276 14.897 29.793 12.414 29.793"></polygon>\
               <polygon id="Fill-215" fill="#0037ff" points="14.896 32.276 17.379 32.276 17.379 29.793 14.896 29.793"></polygon>\
               <polygon id="Fill-216" fill="#0037ff" points="17.379 32.276 19.862 32.276 19.862 29.793 17.379 29.793"></polygon>\
               <polygon id="Fill-217" fill="#0037ff" points="19.862 32.276 22.344 32.276 22.344 29.793 19.862 29.793"></polygon>\
               <polygon id="Fill-218" fill="#0037ff" points="22.345 32.276 24.828 32.276 24.828 29.793 22.345 29.793"></polygon>\
               <polygon id="Fill-219" fill="#0037ff" points="27.311 32.276 29.793 32.276 29.793 29.793 27.311 29.793"></polygon>\
               <polygon id="Fill-220" fill="#0037ff" points="29.793 32.276 32.276 32.276 32.276 29.793 29.793 29.793"></polygon>\
               <polygon id="Fill-221" fill="#0037ff" points="37.241 32.276 39.724 32.276 39.724 29.793 37.241 29.793"></polygon>\
               <polygon id="Fill-222" fill="#0037ff" points="44.689 32.276 47.172 32.276 47.172 29.793 44.689 29.793"></polygon>\
               <polygon id="Fill-223" fill="#0037ff" points="47.172 32.276 49.655 32.276 49.655 29.793 47.172 29.793"></polygon>\
               <polygon id="Fill-224" fill="#0037ff" points="49.655 32.276 52.137 32.276 52.137 29.793 49.655 29.793"></polygon>\
               <polygon id="Fill-225" fill="#0037ff" points="57.104 32.276 59.587 32.276 59.587 29.793 57.104 29.793"></polygon>\
               <polygon id="Fill-226" fill="#0037ff" points="62.069 32.276 64.552 32.276 64.552 29.793 62.069 29.793"></polygon>\
               <polygon id="Fill-227" fill="#0037ff" points="69.517 32.276 72 32.276 72 29.793 69.517 29.793"></polygon>\
               <polygon id="Fill-228" fill="#0037ff" points="0 34.759 2.483 34.759 2.483 32.276 0 32.276"></polygon>\
               <polygon id="Fill-229" fill="#0037ff" points="7.448 34.759 9.931 34.759 9.931 32.276 7.448 32.276">\
                  <polygon id="Fill-230" fill="#0037ff" points="9.931 34.759 12.413 34.759 12.413 32.276 9.931 32.276"></polygon>\
               <polygon id="Fill-231" fill="#0037ff" points="12.414 34.759 14.897 34.759 14.897 32.276 12.414 32.276"></polygon>\
               <polygon id="Fill-232" fill="#0037ff" points="17.379 34.759 19.862 34.759 19.862 32.276 17.379 32.276"></polygon>\
               <polygon id="Fill-233" fill="#0037ff" points="24.828 34.759 27.311 34.759 27.311 32.276 24.828 32.276"></polygon>\
               <polygon id="Fill-234" fill="#0037ff" points="29.793 34.759 32.276 34.759 32.276 32.276 29.793 32.276"></polygon>\
               <polygon id="Fill-235" fill="#0037ff" points="32.276 34.759 34.759 34.759 34.759 32.276 32.276 32.276"></polygon>\
               <polygon id="Fill-236" fill="#0037ff" points="34.759 34.759 37.241 34.759 37.241 32.276 34.759 32.276"></polygon>\
               <polygon id="Fill-237" fill="#0037ff" points="37.241 34.759 39.724 34.759 39.724 32.276 37.241 32.276"></polygon>\
               <polygon id="Fill-238" fill="#0037ff" points="44.689 34.759 47.172 34.759 47.172 32.276 44.689 32.276"></polygon>\
               <polygon id="Fill-239" fill="#0037ff" points="54.621 34.759 57.104 34.759 57.104 32.276 54.621 32.276"></polygon>\
               <polygon id="Fill-240" fill="#0037ff" points="59.586 34.759 62.068 34.759 62.068 32.276 59.586 32.276"></polygon>\
               <polygon id="Fill-241" fill="#0037ff" points="64.552 34.759 67.035 34.759 67.035 32.276 64.552 32.276"></polygon>\
               <polygon id="Fill-242" fill="#0037ff" points="69.517 34.759 72 34.759 72 32.276 69.517 32.276"></polygon>\
               <polygon id="Fill-243" fill="#0037ff" points="0 37.241 2.483 37.241 2.483 34.759 0 34.759"></polygon>\
               <polygon id="Fill-244" fill="#0037ff" points="2.483 37.241 4.965 37.241 4.965 34.759 2.483 34.759"></polygon>\
               <polygon id="Fill-245" fill="#0037ff" points="14.896 37.241 17.379 37.241 17.379 34.759 14.896 34.759"></polygon>\
               <polygon id="Fill-246" fill="#0037ff" points="17.379 37.241 19.862 37.241 19.862 34.759 17.379 34.759"></polygon>\
               <polygon id="Fill-247" fill="#0037ff" points="19.862 37.241 22.344 37.241 22.344 34.759 19.862 34.759"></polygon>\
               <polygon id="Fill-248" fill="#0037ff" points="22.345 37.241 24.828 37.241 24.828 34.759 22.345 34.759"></polygon>\
               <polygon id="Fill-249" fill="#0037ff" points="24.828 37.241 27.311 37.241 27.311 34.759 24.828 34.759"></polygon>\
               <polygon id="Fill-250" fill="#0037ff" points="27.311 37.241 29.793 37.241 29.793 34.759 27.311 34.759"></polygon>\
               <polygon id="Fill-251" fill="#0037ff" points="29.793 37.241 32.276 37.241 32.276 34.759 29.793 34.759"></polygon>\
               <polygon id="Fill-252" fill="#0037ff" points="32.276 37.241 34.759 37.241 34.759 34.759 32.276 34.759"></polygon>\
               <polygon id="Fill-253" fill="#0037ff" points="37.241 37.241 39.724 37.241 39.724 34.759 37.241 34.759"></polygon>\
               <polygon id="Fill-254" fill="#0037ff" points="39.724 37.241 42.207 37.241 42.207 34.759 39.724 34.759"></polygon>\
               <polygon id="Fill-255" fill="#0037ff" points="49.655 37.241 52.137 37.241 52.137 34.759 49.655 34.759"></polygon>\
               <polygon id="Fill-256" fill="#0037ff" points="59.586 37.241 62.068 37.241 62.068 34.759 59.586 34.759"></polygon>\
               <polygon id="Fill-257" fill="#0037ff" points="69.517 37.241 72 37.241 72 34.759 69.517 34.759"></polygon>\
               <polygon id="Fill-258" fill="#0037ff" points="4.965 39.724 7.448 39.724 7.448 37.241 4.965 37.241"></polygon>\
               <polygon id="Fill-259" fill="#0037ff" points="7.448 39.724 9.931 39.724 9.931 37.241 7.448 37.241"></polygon>\
               <polygon id="Fill-260" fill="#0037ff" points="9.931 39.724 12.413 39.724 12.413 37.241 9.931 37.241"></polygon>\
               <polygon id="Fill-261" fill="#0037ff" points="24.828 39.724 27.311 39.724 27.311 37.241 24.828 37.241"></polygon>\
               <polygon id="Fill-262" fill="#0037ff" points="42.207 39.724 44.689 39.724 44.689 37.241 42.207 37.241"></polygon>\
               <polygon id="Fill-263" fill="#0037ff" points="52.138 39.724 54.621 39.724 54.621 37.241 52.138 37.241"></polygon>\
               <polygon id="Fill-264" fill="#0037ff" points="57.104 39.724 59.587 39.724 59.587 37.241 57.104 37.241"></polygon>\
               <polygon id="Fill-265" fill="#0037ff" points="62.069 39.724 64.552 39.724 64.552 37.241 62.069 37.241"></polygon>\
               <polygon id="Fill-266" fill="#0037ff" points="67.035 39.724 69.517 39.724 69.517 37.241 67.035 37.241"></polygon>\
               <polygon id="Fill-267" fill="#0037ff" points="0 42.207 2.483 42.207 2.483 39.724 0 39.724"></polygon>\
               <polygon id="Fill-268" fill="#0037ff" points="2.483 42.207 4.965 42.207 4.965 39.724 2.483 39.724"></polygon>\
               <polygon id="Fill-269" fill="#0037ff" points="4.965 42.207 7.448 42.207 7.448 39.724 4.965 39.724"></polygon>\
               <polygon id="Fill-270" fill="#0037ff" points="14.896 42.207 17.379 42.207 17.379 39.724 14.896 39.724"></polygon>\
               <polygon id="Fill-271" fill="#0037ff" points="17.379 42.207 19.862 42.207 19.862 39.724 17.379 39.724"></polygon>\
               <polygon id="Fill-272" fill="#0037ff" points="24.828 42.207 27.311 42.207 27.311 39.724 24.828 39.724"></polygon>\
               <polygon id="Fill-273" fill="#0037ff" points="27.311 42.207 29.793 42.207 29.793 39.724 27.311 39.724"></polygon>\
               <polygon id="Fill-274" fill="#0037ff" points="29.793 42.207 32.276 42.207 32.276 39.724 29.793 39.724"></polygon>\
               <polygon id="Fill-275" fill="#0037ff" points="32.276 42.207 34.759 42.207 34.759 39.724 32.276 39.724"></polygon>\
               <polygon id="Fill-276" fill="#0037ff" points="37.241 42.207 39.724 42.207 39.724 39.724 37.241 39.724"></polygon>\
               <polygon id="Fill-277" fill="#0037ff" points="44.689 42.207 47.172 42.207 47.172 39.724 44.689 39.724"></polygon>\
               <polygon id="Fill-278" fill="#0037ff" points="49.655 42.207 52.137 42.207 52.137 39.724 49.655 39.724"></polygon>\
               <polygon id="Fill-279" fill="#0037ff" points="52.138 42.207 54.621 42.207 54.621 39.724 52.138 39.724"></polygon>\
               <polygon id="Fill-280" fill="#0037ff" points="54.621 42.207 57.104 42.207 57.104 39.724 54.621 39.724"></polygon>\
               <polygon id="Fill-281" fill="#0037ff" points="57.104 42.207 59.587 42.207 59.587 39.724 57.104 39.724"></polygon>\
               <polygon id="Fill-282" fill="#0037ff" points="67.035 42.207 69.517 42.207 69.517 39.724 67.035 39.724"></polygon>\
               <polygon id="Fill-283" fill="#0037ff" points="69.517 42.207 72 42.207 72 39.724 69.517 39.724"></polygon>\
               <polygon id="Fill-284" fill="#0037ff" points="0 44.689 2.483 44.689 2.483 42.207 0 42.207"></polygon>\
               <polygon id="Fill-285" fill="#0037ff" points="2.483 44.689 4.965 44.689 4.965 42.207 2.483 42.207"></polygon>\
               <polygon id="Fill-286" fill="#0037ff" points="4.965 44.689 7.448 44.689 7.448 42.207 4.965 42.207"></polygon>\
               <polygon id="Fill-287" fill="#0037ff" points="9.931 44.689 12.413 44.689 12.413 42.207 9.931 42.207"></polygon>\
               <polygon id="Fill-288" fill="#0037ff" points="17.379 44.689 19.862 44.689 19.862 42.207 17.379 42.207"></polygon>\
               <polygon id="Fill-289" fill="#0037ff" points="22.345 44.689 24.828 44.689 24.828 42.207 22.345 42.207"></polygon>\
               <polygon id="Fill-290" fill="#0037ff" points="32.276 44.689 34.759 44.689 34.759 42.207 32.276 42.207"></polygon>\
               <polygon id="Fill-291" fill="#0037ff" points="44.689 44.689 47.172 44.689 47.172 42.207 44.689 42.207"></polygon>\
               <polygon id="Fill-292" fill="#0037ff" points="47.172 44.689 49.655 44.689 49.655 42.207 47.172 42.207"></polygon>\
               <polygon id="Fill-293" fill="#0037ff" points="57.104 44.689 59.587 44.689 59.587 42.207 57.104 42.207"></polygon>\
               <polygon id="Fill-294" fill="#0037ff" points="59.586 44.689 62.068 44.689 62.068 42.207 59.586 42.207"></polygon>\
               <polygon id="Fill-295" fill="#0037ff" points="69.517 44.689 72 44.689 72 42.207 69.517 42.207"></polygon>\
               <polygon id="Fill-296" fill="#0037ff" points="12.414 47.172 14.897 47.172 14.897 44.689 12.414 44.689"></polygon>\
               <polygon id="Fill-297" fill="#0037ff" points="14.896 47.172 17.379 47.172 17.379 44.689 14.896 44.689"></polygon>\
               <polygon id="Fill-298" fill="#0037ff" points="17.379 47.172 19.862 47.172 19.862 44.689 17.379 44.689"></polygon>\
               <polygon id="Fill-299" fill="#0037ff" points="19.862 47.172 22.344 47.172 22.344 44.689 19.862 44.689"></polygon>\
               <polygon id="Fill-300" fill="#0037ff" points="22.345 47.172 24.828 47.172 24.828 44.689 22.345 44.689"></polygon>\
               <polygon id="Fill-301" fill="#0037ff" points="24.828 47.172 27.311 47.172 27.311 44.689 24.828 44.689"></polygon>\
               <polygon id="Fill-302" fill="#0037ff" points="27.311 47.172 29.793 47.172 29.793 44.689 27.311 44.689"></polygon>\
               <polygon id="Fill-303" fill="#0037ff" points="32.276 47.172 34.759 47.172 34.759 44.689 32.276 44.689"></polygon>\
               <polygon id="Fill-304" fill="#0037ff" points="34.759 47.172 37.241 47.172 37.241 44.689 34.759 44.689"></polygon>\
               <polygon id="Fill-305" fill="#0037ff" points="37.241 47.172 39.724 47.172 39.724 44.689 37.241 44.689"></polygon>\
               <polygon id="Fill-306" fill="#0037ff" points="42.207 47.172 44.689 47.172 44.689 44.689 42.207 44.689"></polygon>\
               <polygon id="Fill-307" fill="#0037ff" points="47.172 47.172 49.655 47.172 49.655 44.689 47.172 44.689"></polygon>\
               <polygon id="Fill-308" fill="#0037ff" points="64.552 47.172 67.035 47.172 67.035 44.689 64.552 44.689"></polygon>\
               <polygon id="Fill-309" fill="#0037ff" points="69.517 47.172 72 47.172 72 44.689 69.517 44.689"></polygon>\
               <polygon id="Fill-310" fill="#0037ff" points="4.965 49.655 7.448 49.655 7.448 47.172 4.965 47.172"></polygon>\
               <polygon id="Fill-311" fill="#0037ff" points="7.448 49.655 9.931 49.655 9.931 47.172 7.448 47.172"></polygon>\
               <polygon id="Fill-312" fill="#0037ff" points="17.379 49.655 19.862 49.655 19.862 47.172 17.379 47.172"></polygon>\
               <polygon id="Fill-313" fill="#0037ff" points="19.862 49.655 22.344 49.655 22.344 47.172 19.862 47.172"></polygon>\
               <polygon id="Fill-314" fill="#0037ff" points="29.793 49.655 32.276 49.655 32.276 47.172 29.793 47.172"></polygon>\
               <polygon id="Fill-315" fill="#0037ff" points="32.276 49.655 34.759 49.655 34.759 47.172 32.276 47.172"></polygon>\
               <polygon id="Fill-316" fill="#0037ff" points="39.724 49.655 42.207 49.655 42.207 47.172 39.724 47.172"></polygon>\
               <polygon id="Fill-317" fill="#0037ff" points="42.207 49.655 44.689 49.655 44.689 47.172 42.207 47.172"></polygon>\
               <polygon id="Fill-318" fill="#0037ff" points="47.172 49.655 49.655 49.655 49.655 47.172 47.172 47.172"></polygon>\
               <polygon id="Fill-319" fill="#0037ff" points="49.655 49.655 52.137 49.655 52.137 47.172 49.655 47.172"></polygon>\
               <polygon id="Fill-320" fill="#0037ff" points="62.069 49.655 64.552 49.655 64.552 47.172 62.069 47.172"></polygon>\
               <polygon id="Fill-321" fill="#0037ff" points="67.035 49.655 69.517 49.655 69.517 47.172 67.035 47.172"></polygon>\
               <polygon id="Fill-322" fill="#0037ff" points="0 52.137 2.483 52.137 2.483 49.655 0 49.655"></polygon>\
               <polygon id="Fill-323" fill="#0037ff" points="2.483 52.137 4.965 52.137 4.965 49.655 2.483 49.655"></polygon>\
               <polygon id="Fill-324" fill="#0037ff" points="9.931 52.137 12.413 52.137 12.413 49.655 9.931 49.655"></polygon>\
               <polygon id="Fill-325" fill="#0037ff" points="14.896 52.137 17.379 52.137 17.379 49.655 14.896 49.655"></polygon>\
               <polygon id="Fill-326" fill="#0037ff" points="17.379 52.137 19.862 52.137 19.862 49.655 17.379 49.655"></polygon>\
               <polygon id="Fill-327" fill="#0037ff" points="22.345 52.137 24.828 52.137 24.828 49.655 22.345 49.655"></polygon>\
               <polygon id="Fill-328" fill="#0037ff" points="24.828 52.137 27.311 52.137 27.311 49.655 24.828 49.655"></polygon>\
               <polygon id="Fill-329" fill="#0037ff" points="27.311 52.137 29.793 52.137 29.793 49.655 27.311 49.655"></polygon>\
               <polygon id="Fill-330" fill="#0037ff" points="32.276 52.137 34.759 52.137 34.759 49.655 32.276 49.655"></polygon>\
               <polygon id="Fill-331" fill="#0037ff" points="34.759 52.137 37.241 52.137 37.241 49.655 34.759 49.655"></polygon>\
               <polygon id="Fill-332" fill="#0037ff" points="39.724 52.137 42.207 52.137 42.207 49.655 39.724 49.655"></polygon>\
               <polygon id="Fill-333" fill="#0037ff" points="44.689 52.137 47.172 52.137 47.172 49.655 44.689 49.655"></polygon>\
               <polygon id="Fill-334" fill="#0037ff" points="49.655 52.137 52.137 52.137 52.137 49.655 49.655 49.655"></polygon>\
               <polygon id="Fill-335" fill="#0037ff" points="52.138 52.137 54.621 52.137 54.621 49.655 52.138 49.655"></polygon>\
               <polygon id="Fill-336" fill="#0037ff" points="54.621 52.137 57.104 52.137 57.104 49.655 54.621 49.655"></polygon>\
               <polygon id="Fill-337" fill="#0037ff" points="57.104 52.137 59.587 52.137 59.587 49.655 57.104 49.655"></polygon>\
               <polygon id="Fill-338" fill="#0037ff" points="59.586 52.137 62.068 52.137 62.068 49.655 59.586 49.655"></polygon>\
               <polygon id="Fill-339" fill="#0037ff" points="62.069 52.137 64.552 52.137 64.552 49.655 62.069 49.655"></polygon>\
               <polygon id="Fill-340" fill="#0037ff" points="19.862 54.621 22.344 54.621 22.344 52.138 19.862 52.138"></polygon>\
               <polygon id="Fill-341" fill="#0037ff" points="22.345 54.621 24.828 54.621 24.828 52.138 22.345 52.138"></polygon>\
               <polygon id="Fill-342" fill="#0037ff" points="24.828 54.621 27.311 54.621 27.311 52.138 24.828 52.138"></polygon>\
               <polygon id="Fill-343" fill="#0037ff" points="27.311 54.621 29.793 54.621 29.793 52.138 27.311 52.138"></polygon>\
               <polygon id="Fill-344" fill="#0037ff" points="29.793 54.621 32.276 54.621 32.276 52.138 29.793 52.138"></polygon>\
               <polygon id="Fill-345" fill="#0037ff" points="32.276 54.621 34.759 54.621 34.759 52.138 32.276 52.138"></polygon>\
               <polygon id="Fill-346" fill="#0037ff" points="39.724 54.621 42.207 54.621 42.207 52.138 39.724 52.138"></polygon>\
               <polygon id="Fill-347" fill="#0037ff" points="49.655 54.621 52.137 54.621 52.137 52.138 49.655 52.138"></polygon>\
               <polygon id="Fill-348" fill="#0037ff" points="59.586 54.621 62.068 54.621 62.068 52.138 59.586 52.138"></polygon>\
               <polygon id="Fill-349" fill="#0037ff" points="64.552 54.621 67.035 54.621 67.035 52.138 64.552 52.138"></polygon>\
               <polygon id="Fill-350" fill="#0037ff" points="69.517 54.621 72 54.621 72 52.138 69.517 52.138"></polygon>\
               <polygon id="Fill-351" fill="#0037ff" points="19.862 57.104 22.344 57.104 22.344 54.621 19.862 54.621"></polygon>\
               <polygon id="Fill-352" fill="#0037ff" points="27.311 57.104 29.793 57.104 29.793 54.621 27.311 54.621"></polygon>\
               <polygon id="Fill-353" fill="#0037ff" points="29.793 57.104 32.276 57.104 32.276 54.621 29.793 54.621"></polygon>\
               <polygon id="Fill-354" fill="#0037ff" points="39.724 57.104 42.207 57.104 42.207 54.621 39.724 54.621"></polygon>\
               <polygon id="Fill-355" fill="#0037ff" points="44.689 57.104 47.172 57.104 47.172 54.621 44.689 54.621"></polygon>\
               <polygon id="Fill-356" fill="#0037ff" points="47.172 57.104 49.655 57.104 49.655 54.621 47.172 54.621"></polygon>\
               <polygon id="Fill-357" fill="#0037ff" points="49.655 57.104 52.137 57.104 52.137 54.621 49.655 54.621"></polygon>\
               <polygon id="Fill-358" fill="#0037ff" points="54.621 57.104 57.104 57.104 57.104 54.621 54.621 54.621"></polygon>\
               <polygon id="Fill-359" fill="#0037ff" points="59.586 57.104 62.068 57.104 62.068 54.621 59.586 54.621"></polygon>\
               <polygon id="Fill-360" fill="#0037ff" points="69.517 57.104 72 57.104 72 54.621 69.517 54.621"></polygon>\
               <polygon id="Fill-361" fill="#0037ff" points="19.862 59.587 22.344 59.587 22.344 57.104 19.862 57.104"></polygon>\
               <polygon id="Fill-362" fill="#0037ff" points="24.828 59.587 27.311 59.587 27.311 57.104 24.828 57.104"></polygon>\
               <polygon id="Fill-363" fill="#0037ff" points="34.759 59.587 37.241 59.587 37.241 57.104 34.759 57.104"></polygon>\
               <polygon id="Fill-364" fill="#0037ff" points="37.241 59.587 39.724 59.587 39.724 57.104 37.241 57.104"></polygon>\
               <polygon id="Fill-365" fill="#0037ff" points="39.724 59.587 42.207 59.587 42.207 57.104 39.724 57.104"></polygon>\
               <polygon id="Fill-366" fill="#0037ff" points="42.207 59.587 44.689 59.587 44.689 57.104 42.207 57.104"></polygon>\
               <polygon id="Fill-367" fill="#0037ff" points="47.172 59.587 49.655 59.587 49.655 57.104 47.172 57.104"></polygon>\
               <polygon id="Fill-368" fill="#0037ff" points="49.655 59.587 52.137 59.587 52.137 57.104 49.655 57.104"></polygon>\
               <polygon id="Fill-369" fill="#0037ff" points="59.586 59.587 62.068 59.587 62.068 57.104 59.586 57.104"></polygon>\
               <polygon id="Fill-370" fill="#0037ff" points="62.069 59.587 64.552 59.587 64.552 57.104 62.069 57.104"></polygon>\
               <polygon id="Fill-371" fill="#0037ff" points="69.517 59.587 72 59.587 72 57.104 69.517 57.104"></polygon>\
               <polygon id="Fill-372" fill="#0037ff" points="19.862 62.068 22.344 62.068 22.344 59.586 19.862 59.586"></polygon>\
               <polygon id="Fill-373" fill="#0037ff" points="27.311 62.068 29.793 62.068 29.793 59.586 27.311 59.586"></polygon>\
               <polygon id="Fill-374" fill="#0037ff" points="32.276 62.068 34.759 62.068 34.759 59.586 32.276 59.586"></polygon>\
               <polygon id="Fill-375" fill="#0037ff" points="34.759 62.068 37.241 62.068 37.241 59.586 34.759 59.586"></polygon>\
               <polygon id="Fill-376" fill="#0037ff" points="47.172 62.068 49.655 62.068 49.655 59.586 47.172 59.586"></polygon>\
               <polygon id="Fill-377" fill="#0037ff" points="49.655 62.068 52.137 62.068 52.137 59.586 49.655 59.586"></polygon>\
               <polygon id="Fill-378" fill="#0037ff" points="52.138 62.068 54.621 62.068 54.621 59.586 52.138 59.586"></polygon>\
               <polygon id="Fill-379" fill="#0037ff" points="54.621 62.068 57.104 62.068 57.104 59.586 54.621 59.586"></polygon>\
               <polygon id="Fill-380" fill="#0037ff" points="57.104 62.068 59.587 62.068 59.587 59.586 57.104 59.586"></polygon>\
               <polygon id="Fill-381" fill="#0037ff" points="59.586 62.068 62.068 62.068 62.068 59.586 59.586 59.586"></polygon>\
               <polygon id="Fill-382" fill="#0037ff" points="22.345 64.552 24.828 64.552 24.828 62.069 22.345 62.069"></polygon>\
               <polygon id="Fill-383" fill="#0037ff" points="27.311 64.552 29.793 64.552 29.793 62.069 27.311 62.069"></polygon>\
               <polygon id="Fill-384" fill="#0037ff" points="32.276 64.552 34.759 64.552 34.759 62.069 32.276 62.069"></polygon>\
               <polygon id="Fill-385" fill="#0037ff" points="34.759 64.552 37.241 64.552 37.241 62.069 34.759 62.069"></polygon>\
               <polygon id="Fill-386" fill="#0037ff" points="37.241 64.552 39.724 64.552 39.724 62.069 37.241 62.069"></polygon>\
               <polygon id="Fill-387" fill="#0037ff" points="42.207 64.552 44.689 64.552 44.689 62.069 42.207 62.069"></polygon>\
               <polygon id="Fill-388" fill="#0037ff" points="44.689 64.552 47.172 64.552 47.172 62.069 44.689 62.069"></polygon>\
               <polygon id="Fill-389" fill="#0037ff" points="57.104 64.552 59.587 64.552 59.587 62.069 57.104 62.069"></polygon>\
               <polygon id="Fill-390" fill="#0037ff" points="67.035 64.552 69.517 64.552 69.517 62.069 67.035 62.069"></polygon>\
               <polygon id="Fill-391" fill="#0037ff" points="34.759 67.035 37.241 67.035 37.241 64.552 34.759 64.552"></polygon>\
               <polygon id="Fill-392" fill="#0037ff" points="42.207 67.035 44.689 67.035 44.689 64.552 42.207 64.552"></polygon>\
               <polygon id="Fill-393" fill="#0037ff" points="44.689 67.035 47.172 67.035 47.172 64.552 44.689 64.552"></polygon>\
               <polygon id="Fill-394" fill="#0037ff" points="47.172 67.035 49.655 67.035 49.655 64.552 47.172 64.552"></polygon>\
               <polygon id="Fill-395" fill="#0037ff" points="49.655 67.035 52.137 67.035 52.137 64.552 49.655 64.552"></polygon>\
               <polygon id="Fill-396" fill="#0037ff" points="52.138 67.035 54.621 67.035 54.621 64.552 52.138 64.552"></polygon>\
               <polygon id="Fill-397" fill="#0037ff" points="64.552 67.035 67.035 67.035 67.035 64.552 64.552 64.552"></polygon>\
               <polygon id="Fill-398" fill="#0037ff" points="67.035 67.035 69.517 67.035 69.517 64.552 67.035 64.552"></polygon>\
               <polygon id="Fill-399" fill="#0037ff" points="69.517 67.035 72 67.035 72 64.552 69.517 64.552"></polygon>\
               <polygon id="Fill-400" fill="#0037ff" points="22.345 69.517 24.828 69.517 24.828 67.035 22.345 67.035"></polygon>\
               <polygon id="Fill-401" fill="#0037ff" points="24.828 69.517 27.311 69.517 27.311 67.035 24.828 67.035"></polygon>\
               <polygon id="Fill-402" fill="#0037ff" points="34.759 69.517 37.241 69.517 37.241 67.035 34.759 67.035"></polygon>\
               <polygon id="Fill-403" fill="#0037ff" points="37.241 69.517 39.724 69.517 39.724 67.035 37.241 67.035"></polygon>\
               <polygon id="Fill-404" fill="#0037ff" points="39.724 69.517 42.207 69.517 42.207 67.035 39.724 67.035"></polygon>\
               <polygon id="Fill-405" fill="#0037ff" points="42.207 69.517 44.689 69.517 44.689 67.035 42.207 67.035"></polygon>\
               <polygon id="Fill-406" fill="#0037ff" points="44.689 69.517 47.172 69.517 47.172 67.035 44.689 67.035"></polygon>\
               <polygon id="Fill-407" fill="#0037ff" points="47.172 69.517 49.655 69.517 49.655 67.035 47.172 67.035"></polygon>\
               <polygon id="Fill-408" fill="#0037ff" points="52.138 69.517 54.621 69.517 54.621 67.035 52.138 67.035"></polygon>\
               <polygon id="Fill-409" fill="#0037ff" points="54.621 69.517 57.104 69.517 57.104 67.035 54.621 67.035"></polygon>\
               <polygon id="Fill-410" fill="#0037ff" points="57.104 69.517 59.587 69.517 59.587 67.035 57.104 67.035"></polygon>\
               <polygon id="Fill-411" fill="#0037ff" points="62.069 69.517 64.552 69.517 64.552 67.035 62.069 67.035"></polygon>\
               <polygon id="Fill-412" fill="#0037ff" points="67.035 69.517 69.517 69.517 69.517 67.035 67.035 67.035"></polygon>\
               <polygon id="Fill-413" fill="#0037ff" points="69.517 69.517 72 69.517 72 67.035 69.517 67.035"></polygon>\
               <polygon id="Fill-414" fill="#0037ff" points="22.345 72 24.828 72 24.828 69.517 22.345 69.517"></polygon>\
               <polygon id="Fill-415" fill="#0037ff" points="27.311 72 29.793 72 29.793 69.517 27.311 69.517"></polygon>\
               <polygon id="Fill-416" fill="#0037ff" points="29.793 72 32.276 72 32.276 69.517 29.793 69.517"></polygon>\
               <polygon id="Fill-417" fill="#0037ff" points="34.759 72 37.241 72 37.241 69.517 34.759 69.517"></polygon>\
               <polygon id="Fill-418" fill="#0037ff" points="39.724 72 42.207 72 42.207 69.517 39.724 69.517"></polygon>\
               <polygon id="Fill-419" fill="#0037ff" points="47.172 72 49.655 72 49.655 69.517 47.172 69.517"></polygon>\
               <polygon id="Fill-420" fill="#0037ff" points="49.655 72 52.137 72 52.137 69.517 49.655 69.517"></polygon>\
               <polygon id="Fill-421" fill="#0037ff" points="52.138 72 54.621 72 54.621 69.517 52.138 69.517"></polygon>\
               <polygon id="Fill-422" fill="#0037ff" points="59.586 72 62.068 72 62.068 69.517 59.586 69.517"></polygon>\
               <polygon id="Fill-423" fill="#0037ff" points="62.069 72 64.552 72 64.552 69.517 62.069 69.517"></polygon>\
               <polygon id="Fill-424" fill="#0037ff" points="67.035 72 69.517 72 69.517 69.517 67.035 69.517"></polygon>\
               <path  d="M2.606,14.772 L14.772,14.772 L14.772,2.606 L2.606,2.606 L2.606,14.772 Z M14.772,0 L2.607,0 L7.10542736e-15,0 L7.10542736e-15,2.607 L7.10542736e-15,14.772 L7.10542736e-15,17.379 L2.607,17.379 L14.772,17.379 L17.379,17.379 L17.379,14.772 L17.379,2.607 L17.379,0 L14.772,0 Z"\
                 id="Fill-425" fill="#0037ff"></path>\
               <path\
                 d="M57.227,14.772 L69.393,14.772 L69.393,2.606 L57.227,2.606 L57.227,14.772 Z M69.393,0 L57.228,0 L54.621,0 L54.621,2.607 L54.621,14.772 L54.621,17.379 L57.228,17.379 L69.393,17.379 L72,17.379 L72,14.772 L72,2.607 L72,0 L69.393,0 Z"\
                 id="Fill-426" fill="#0037ff"></path>\
               <path\
                 d="M2.606,69.393 L14.772,69.393 L14.772,57.227 L2.606,57.227 L2.606,69.393 Z M14.772,54.621 L2.607,54.621 L7.10542736e-15,54.621 L7.10542736e-15,57.228 L7.10542736e-15,69.393 L7.10542736e-15,72 L2.607,72 L14.772,72 L17.379,72 L17.379,69.393 L17.379,57.228 L17.379,54.621 L14.772,54.621 Z"\
                 id="Fill-427" fill="#0037ff"></path>\
               <polygon id="Fill-428" fill="#0037ff" points="4.965 12.413 12.413 12.413 12.413 4.965 4.965 4.965"></polygon>\
               <polygon id="Fill-429" fill="#0037ff" points="59.586 12.413 67.034 12.413 67.034 4.965 59.586 4.965"></polygon>\
               <polygon id="Fill-430" fill="#0037ff" points="4.965 67.034 12.413 67.034 12.413 59.586 4.965 59.586"></polygon>\
               <image id="Image-431" x="24.8275833" y="24.8275757" width="22.344827" height="22.344827"  xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD8AAAA/CAYAAABXXxDfAAAEGWlDQ1BrQ0dDb2xvclNwYWNlR2VuZXJpY1JHQgAAOI2NVV1oHFUUPrtzZyMkzlNsNIV0qD8NJQ2TVjShtLp/3d02bpZJNtoi6GT27s6Yyc44M7v9oU9FUHwx6psUxL+3gCAo9Q/bPrQvlQol2tQgKD60+INQ6Ium65k7M5lpurHeZe58853vnnvuuWfvBei5qliWkRQBFpquLRcy4nOHj4g9K5CEh6AXBqFXUR0rXalMAjZPC3e1W99Dwntf2dXd/p+tt0YdFSBxH2Kz5qgLiI8B8KdVy3YBevqRHz/qWh72Yui3MUDEL3q44WPXw3M+fo1pZuQs4tOIBVVTaoiXEI/MxfhGDPsxsNZfoE1q66ro5aJim3XdoLFw72H+n23BaIXzbcOnz5mfPoTvYVz7KzUl5+FRxEuqkp9G/Ajia219thzg25abkRE/BpDc3pqvphHvRFys2weqvp+krbWKIX7nhDbzLOItiM8358pTwdirqpPFnMF2xLc1WvLyOwTAibpbmvHHcvttU57y5+XqNZrLe3lE/Pq8eUj2fXKfOe3pfOjzhJYtB/yll5SDFcSDiH+hRkH25+L+sdxKEAMZahrlSX8ukqMOWy/jXW2m6M9LDBc31B9LFuv6gVKg/0Szi3KAr1kGq1GMjU/aLbnq6/lRxc4XfJ98hTargX++DbMJBSiYMIe9Ck1YAxFkKEAG3xbYaKmDDgYyFK0UGYpfoWYXG+fAPPI6tJnNwb7ClP7IyF+D+bjOtCpkhz6CFrIa/I6sFtNl8auFXGMTP34sNwI/JhkgEtmDz14ySfaRcTIBInmKPE32kxyyE2Tv+thKbEVePDfW/byMM1Kmm0XdObS7oGD/MypMXFPXrCwOtoYjyyn7BV29/MZfsVzpLDdRtuIZnbpXzvlf+ev8MvYr/Gqk4H/kV/G3csdazLuyTMPsbFhzd1UabQbjFvDRmcWJxR3zcfHkVw9GfpbJmeev9F08WW8uDkaslwX6avlWGU6NRKz0g/SHtCy9J30o/ca9zX3Kfc19zn3BXQKRO8ud477hLnAfc1/G9mrzGlrfexZ5GLdn6ZZrrEohI2wVHhZywjbhUWEy8icMCGNCUdiBlq3r+xafL549HQ5jH+an+1y+LlYBifuxAvRN/lVVVOlwlCkdVm9NOL5BE4wkQ2SMlDZU97hX86EilU/lUmkQUztTE6mx1EEPh7OmdqBtAvv8HdWpbrJS6tJj3n0CWdM6busNzRV3S9KTYhqvNiqWmuroiKgYhshMjmhTh9ptWhsF7970j/SbMrsPE1suR5z7DMC+P/Hs+y7ijrQAlhyAgccjbhjPygfeBTjzhNqy28EdkUh8C+DU9+z2v/oyeH791OncxHOs5y2AtTc7nb/f73TWPkD/qwBnjX8BoJ98VQNcC+8AAAA4ZVhJZk1NACoAAAAIAAGHaQAEAAAAAQAAABoAAAAAAAKgAgAEAAAAAQAAAD+gAwAEAAAAAQAAAD8AAAAAvC3qMgAAGFhJREFUaAXFWlmMZddVXW9+r+a5q7u6enJPrm53p21sJ06InAABoYgfEEh8hCAQIEUgIn7ywRcSfESILxDkh8gECHJGoiTKgBw7ttOO447jMe6qHtzVXVPXPL2qeiNrnX33u7eqKzEhSOzSvWefffbZZ09nuOdVqtlsb+L/BVIcVUOrdDBak7QU21QKjJpm2SAtTYqrLLzOJ8Onwcfb1DdD/hrLbNRPUiS3HmhpVNjyc4GpZeolcSmiusAN9NKo8dv77aao5hJMhmTKHVZaqwyXXC/dKeIT3mBZi/qxCBK9v9zyc0E8mCkhYUmaC3dast2j5Dy7TU26RPFyV/zkyMsBkileyxCToQzQ+HuzofqzGO/qqBRI4DvR3GjnCx2jl7eZYnGLJ7uXahFuMswQ51ZfRVIgXA5I8qmfaAIbx/orG1I/i/HqLPAyif9vaEEYX1JW4KVG0Pz2OW+GG22/Oa++PuddhvgUcc8G8UierRFqC1Oi2eyg5lLePBaX6uC0vbjqAm/30qj7vzOoIsfhM/yrkKW6P1ug7ifPaSod7qWZJeY4bxW34bspnPMetb2lujhtL656EpwvKdza1zbyeOl7XXjxuWHM3skjl+/EQ49l8Uu/fg2DA7fJFPcV5hJsvTcZrnicDaKLe78dQFyaCumoVG+nxdJJRMoiH1C+fP6IySGpkmguwNuTpQYUR4MJl8bzTw3ii585grfeTGFldR1rm8vY3tlEIZ/Ho4+O4SN/vIUHH72Bnu4V9vKxJc/HcD3MUONR6go8up7O4hGY25Irhskzh5gMOYOO++n7fFIJF25D7H4bX5NpXa13oV6v48uf7cOXPnMMm5vATmUTU3M3sLC2yPYacpk0etu7MdR/EGMPHMQf/XmTTvgR1Vmj2NgoU9pGMqcm80R40lDX76fRYrcGJ5nxSQ+7wRo0iZsS7/zO4D8/fwpP/MNRrDLa5Z0VRnwNK2sLqNUr6G1rw8GubmwxENu1Oja3NjB2/zn81d914+Klpyle64Hr46U7ZK/xnvYxny1+vtC5Q2yhszbRLFuiyCc7i9H9TDSko9pdkOPJPk5L4/XXTuJvPnECc7NlbG6vYHruOirVMjoLBYwdPIz3nxnDfSMjuLM4j5evT+CHk29jYbOMD37gAfztp5a5DtzkWHt1cOOTev38tOiQ44a5sSqTtP3we2krq4P49N9fQGWHq3pqjeUmMqk6fvXcg3j8wiM40NWGo0dHUWprx3mm/6XTp/Dg1R/jX557Fk89/SaefOI8PvYXdzi2780eBjnXnL17LmeopUdZOtsWF68N0lFO0tZ2L19kvHtaAjyKXjpNC4Yr4bjaBBokhy999iH84IU5FIt5bGytYXVjHr945iI+/rt/ieGhw3TGDAo5KtKscOFbQk/fAB69cAGZfBs++ZUv4gtPzuK3P9qBwf7lIFWv2GTTUUtVrKMMUl36COQap4kuUGkuM0e5TC3JAdTZmEyQC0zSxOj00CmqGz49PYxvfkVy6lhZmcL0/Ns40deHP/vNj+P06fehq+courpPo9HMYWt7DeXNdeLc9bN5PHj2PC4dP42Jawu4/EwPZeT4yExblW3b0k5ida3UhivywvUIV3uSZnya69LcppNosiTNvwAq5GOVSdwjHbEFHotF6NZ6ZfDaDx/H6kqeBlUwu3QHqXoVH37Xe9HT0Y215Uk+d7CxcRebGwvY3uYXVa4dxUIbim3d6Ozsx2PnfgEN7hLf+Za+xDSGmWIfMvpA0RPThMvRRjOnm2YeSCuNZqbHGdKy1gaKI29+adkVKWJ1E2VdhVvfndoA3nh5FOvr81hencfG9iYG2ttwdvQs6o0qyuV51Ko7aNQoO1VAvnAAuWwPqpU8ZufLmJicwfFDJzHcN4QrVypYXOoKst1Ui3xsujlHY3sUXRdpKVzgpXA33nBraSjM+3UUk2CvI7yeLIG1lVOYvt3E6vostiplGrWDHm5pRR5miqUB9PU9gO7e08hmeymziO3NDdy68Ra+/vRX8e3nv4m5mZvoKhbx2APvweL8Nm5e0wJl+7UpauPFuHQTiC5QabkQqpHhNh1EiTPaaOLNJD9sTLR1No9q+N0etLoPaT14els8gFuTU9yzV1Bt1NFo1LiHN5DJldDdfwzzCwt4+9YraGxPoZCuUGoat26/jvWVSRRzedwtL6N3bQ7vvfgIblx/BTdfrOHhR6SwVu97NdD6bWA5IFxHWplkZdQcTQstdLF1jtdkfCzIBYpmhu9ts2GszXDxbqx1YXr2BnZqVaZ5nSe8JhY21rHTyOPKK8/i6sRLXADfQK5exsHOIg4OH0OhkKYjUvjWxA10da5jsFTCww+PobfvEL73nUn82u/n0NW+E1nhTndXyEzNaQXJdRSuld4XN7WoX5JPtHjbyyoNLGH0tlRzcVazBJQWNrRziyJI8QjbhfWNxYA3mlSLjNvVGjOhjr5cNw4NjWJx/RYy1QbbGujsOYD+Alf1VA6/1XMIuVQDJ0eOordzEO8aeze+8Mw4ro/ncenSVtDIgqFMkAamhZUyzMCiK+PkgN3ZYnu8W+NbYQNZM0UCvYNHXRTHbUBLHR9c7YJ0SPNqrcIzewk1Rl6wzUNMjY5YWx3Hly9/HhMLS3j3idM4x0PO4WOP8SzQjzxTvmd+gl967Th05FFkiyM4Ono/ltZruPJiO41fjzTwKEqyZYFH1Jygt5yjsVWqLscoyipd8926M/K7k9j9Y+x7o0w5LVGG650vzCGT5r5J49O1bZ7ugHKFW97qAj744K/gI+29mJz8PtKNCgb6TyCXa0Mbo9zZPcopso5SO1f/Qi/qtRza2ljShms/7qYBc9ROCutJmiCt3cDQxLpnQdJA62f95RRJi+2NTngu3gQZk3d0r9lw5pzdLurum6bSnahUuH2keFmRzWJ7awvXuA784cmL6B84jqGB09zrrzPam6hWV1DqPE/jT2B58SqW5saxsbKGQudhOqDBjKlzMRxBefsW2ovbQel7dXIjXU/X3eqmrXBvtwXRMsFoDJIxiDnG5R/z7l6ahDnNBDdo3BJGDh7h3t1O47Pc0vIhAV8cfwm3J+c5z7t4kDnN5zhqvD5r1kuYeO0p3Jy4zPWihq1yGePjT+H2289xmszyQ2iHC+cQHTjoFkWlBcI1VWlpLo0ssrYIavFzmuiqxzRb9HiHZ52UMmLy1LHUMPNtiJiPbBRsnrW2zu5lnDx1EtevzzPqRaQ5BXKpFK5OTeDZH3wND536ELNilYedO9gu38UMv/RefuMp9HcewNDgYX7XH+LwM3TCAqa3mjz3b1GwMuk0x7rNxyLlptt2JlpyK/QtLMlr64/1M43t7C/9w4JnBptAyiNoeTFw81VT2jjV21Vv8jCzjiPH2hjxNrowjTzLWrGBtY1VfOGFT6O+PR2Ou9XqPHq7OtHddRRjJx5DlSdB0M656Tnk8wUMHTyGb7/0aoh8R2eJX4Sa9zrn675PkfNxhUtv00i4RdODp/bk4qd+u4Orvq05b4Ji8eR+B5BADS4v7lDxW+gojdLgCWQzBRSydew0y/j+tVfQkwcG+BmbT+2gMlXB6OAyCtt1VFdW0Z7uxMB9ZzFw4iQq6SJevf7vaPKQlEpx8cyWKN+cbsa6ljJS45sO5gI33OlsboFoMSikPikowowwlt14LEre1HDW7oZbnyYGh2fR33cS7W0HeGOzw2zo4nd7F1bWV/HCTS5q5U32zaCv1I7q1hJSZa4VpcNo561Ox1A38qV+vDE9g7dnboURNjfm+KHTxT42rkXOVpvYDDM7rps25hRRY41tSnvdnBcibyLdjGSqG7MMtWlhPDaY84mW5XbXgVF+yGQyW1hcGUe1tonuds5l9p1auIvLXAPec/QYBg8dweiBE/zCW8fSxiz6evqRK3GBzHTjy89/HVu8BxBM3Znix9ARjlukhL3X3MkU9ikgmukrh9nWJ73lIE0L0QTKbjvYBeNVMVBndTAhFl21eLcYFya6tXCo6hhOnjnGC4osxt8+zq+1V7hib6GrbQCrzRom5+d4rVXG8lYZj6XyOHv4HA7zmIumdocOXH71u/jRxBWmuw4mNH5qBrNTfTh4yHWztNZ4dpoLbMT9TJ9c3Cyy4jQNVVp/o1nfaM4njRWjzHezxL4XYoowraDZHD9O+viNXhxFN7e0+aUf8+THsz6/74s8wUnKMr/mnrk2gYn5BVwcuY5jA8MY6OhFYeYtPPv6ZdQrPM5q8+X5uFqp4vWXT+H+Sz/i+qFLTX0QSYqM8Gir7llg+nq7pTlZo14ewKQ1rQXPBJsp6mJMJtA7OE9MNUeJe3D4Jq69Tj+n2niC41ylqAwZ6ykiPM/ns4Ugs85j7+TCLO4sL6DET96Rnl48dPgIr7fLNJxG1Xn+5xGvysuQhZkLuHl1Cifv30Q2Pcf+cUQ1pvRSoFy/3QbG2np+ilt/Fti09nlLM/OYmSVxLijGfSewvAgsQZAUyuHAyA0G5CpWl0dp6CjnfpFpvx2cUK3xIoMOaCmfopH0zganwDV+++suf6itSAOzPP3pRAcs8Obn7twMbl39U3R03cXwyBs8Qi8yztweA5hmseF7NfV67DA33bOCOSMmP/rdi1u76PETe1uCVcugvX2GV1K3MXd3Eh1tIygVBxTw4GnN41q1gtpOlSc8ffLyHwRofDqdCfjM2irmeX2d5Y8ZdX0SMvU3+evOCz/4ElaWmCnjn+DJ7yTHKnKsLB8FSUHT2Ep7e4RbLqhu7dYmfrVZu+PkUoOEWGk4SQGclqzHvjaqVs46jSpwzh6lslWe2kYZxQIqtTJ2eGefY8q3lbpQKHVwbdAJkOPRMxkam80VuDbwNminQh0oWy/W60z/N8efxTe+9gRvikYwfev3sFk+xUbFT07XI62TuAXIaIbH2qruYHjajBbRHWC4ecxxd4J7WvWkt3NYWngPP1KGGeEMr6zamOZ1pmmKT4bToJ3ZcJBzvBPtpU46opPrgpYbZZwuLKvYYeoHh3CNsCnCL0PeDP3Xdz+Fy899A/WdMdSrh8hrN7vS18B1i6qtwo2NS2lvzjCn8XvePKg+Jk4MwnwLsbo6GhYLsD7875b6AUxN/gZ/he1Bb0+RX245pDY/isz6HNKdGZS6+5BplCixjCavrJv8Xs9jm3WNrZGYOVGaNnhatE2LWlR5RbbUxFeezOH8xTROjJWZJTk00zz9sb8vXu4GmaQ/6W+47+/S2fJEV2iGM+vMUG+0WmgNzDFmHF6PS7lkcf5xLNx5HypbPWgrct7y9im9/Cfo7OC3/n2cfUUOXGafDeLUTerpfyNsqbVbei1z5gprYzXwSNXr08DnntjGxUc+jBNnr7AfBQUpFkFPbTPcguO4BVfS9vLyaNbEMMXoP5TMI1JBbMYs0+w0pLrxuBvEb/fm5fVB3uMN8BM0hd7+Jm9zuCz1pFF6gAYwjDyqY4fGy1gGDhndYPFXaUXY806neH7jQBuiwG/vNJrozz9d5E/eH0RXb5PT6jO8/eEXZFpHZpnphkknd6HjskWuSmaBbOHt7fgPn2KLOkRM2pdbwA78VeUegYElopN/4W47Xn0xg+tvAvztgZnAa6xVztkpGk+jK/z1qUlr+OHGn6xawqmAjSqSVgAmCCcG+fjIUcls0A9Y//jXQzxA/Q4OH/kQ14wt7g4KicngEcFwmmGhc4vIQODyEwN5tchm5yYPhrUrbEskBttlVwRafUVrqnPkVA0o4HYd2rao5ewdZjUNVlrffIsfoWTauWE/OHuKN2ilROi8JhBdRku0DOUsCXXnVzaIrgxRn7dms/inTwJ/8LED4NkoGBT0owB+OrQesu4COSYJ4lW/tJBdIINIkKf0qJ0LtglWqScSxgWdK7O18fIGvUNAGy3YWuc8Vmoz0lJcIIOUvslPFK3bSZChirqM1hBql0NUyuFqf43Z9c2vIvzTgwxQ0HRnKj1CXYwJ2Gt4oolzXpZGEVWpvsn+wr3ZG8IgpKuraBpcRnf1UVFqygMdV2RmAX91ynIKKGouw6Ma+kYy5CBlgHj0yFjxOV0O0HTQ9JADZm/zBEi5pTbykVEGhv4sPQPIFnD+hBBA2augyVnukKyi5x4L6WC8Zhhx9ZWi4nHQfBG4MC1qPTR8g1+jUoinVNQZZt5NBBC7y+H4AVRPiAw0tck4JlcwxqeHnECxISuEX3+dDphhpjH1M/SUHC4jMxrIByAqnYPRMoCPDE8CDznGJGIwMBAM97pKGeyP6oFGTWS4nDDElM9SiSJztneYyjD1FUYpm4TgSBI0jMBL8UU6hqmhSKpN00QR53ISskK2zfH53KdZchUsaJ4QlPa8+A1OcP32lsYZj6nD7s8E+wnUIjdEg/v6qQC1vfAwM4DOqPIbROJllKLpQRHNH6IBV1DkAPF4yguX4eorfs8KyRvnVv8fnwNviihfBIJ4NAWVBYqyj7FX57BOsD0dGkJXe3lKq+aRTtJckNqFhxFYFLm4nX8XBVLTi5e45fEpUzGxuOGRjqQkFAs1c5BQ8chopbzmvgKreicfpb6cJLocdOVl4N+etMXPHUDy7vSWAhE4qnVO815yW8xupJgcj/oFQ91wL71NpbzdzpVp+BAV5UL3AA84Sl1FU/JkVNJ4VgO0FGItjMtS/QTuNBksmu8CapMj5ITvPgP8878yK5QiBJfX4GCaCoHG0gMVSgqUfcF4X/2MdX8lXYjzJOsaI6QSLXVZ588A9+mExzY9bvx+DpAsb5cs8XvERZfxwQH6nwWCtkx3htbU157n2eK2WszIsO2xQ0h9lRE9BE24GAlpecAfI1ndcaWIR9pLtQUPqlRFAxBpDUJSZzvwvvebkgqK0tgNVOnguPpSTJChUgudIqNHzlAGCUTXtqdHuJygteDGpMnfpRfpAh/DanwHpU12i5ZEWoa6YVEH8bQWE7bJy0qxQBcPH/XV/nvuFKfBATNK9y9SVhCxuQ5GjOgyXI+MFb9SXVkgB1S5lfoCKJr4BJK3uMi6EILrHlVb44S6E8kX0j70+D94BR/oxQGkyAD3/uNjNnclngt0MEjjJ40ULpo/MtyNV9nNR2KV7nIC19bwaN4XOIaiz7uQ2GgXxDI4hAMoYC0vEBW8o/HuRWPf/VbEk/MqtHJAjS3QfcUlznud0KSgQOkqPTSwG6m66+Z9VXcHCO/kI8MlR8YXaXl+kHWVfPgPnq0tj80tR0qeZ6boAtFkl+sUKqEleqlREBhZhoCyImODsAgP7cKFJEB1HYDOnWbqH+W+fCtu1BxV2grcaMmXQ1QKwngsXaz4+ZUcxs8y2vyJP2yrGkc34yM8Z4S1i3wholFHFZIlnbV7BCBR9HRY0HxEEiRMTwuEJ2hhjlPjEPGoTbzeL1lKmV6u0B/4ZZu7iWHCAqjIiuZiPBNUKspe19zXXA8nOJVLXED58P8gQt9eriunjpOfHXR3oLKlB/mlRytDI1vUng2uJ4MqDj8RlxAxSYAVFqlk36hdDRpQW9/FMZ7+mJZlWuDGOpsMVERchJfiU5uDO0P0AJw/bXwKNPzMGf5uwGwI85sCNK74MhTcsoWEZPQ1jp3w1CHxSLga9QgcV2cNEHitqdXm/UNmsC0cM6mEotXPz9sTPPFJIZcZdQ+FG+njeKlGtcnw5CMaxYYtjj8K8X91KZvCd+kV6Um2GNgpZIAobI+Nj1jCwD66BIiukaKOIoTm8CKuOh+lVkg7ahZSj/VAo9a6cbl4wU5lcoA/Eu2gIZIQiQ8k4UkniFc0TQfN715uB66HKWftgY+ManO9w3oVDRbWBja1GkPnQDABMjpEXBoLvCQaZEbCQ8QTeEsJ0vhfaTh/FjjACGlAPQkxrBkEeV5hqbob6m0q5Qg9Al2idHM7CRlJ5hZf1FmFINC9ojp5g/EtGpHAFDEHg1zLSLAYAo9eEQQFE/XQRa+orzzfRQVHuPJrm2ptMS5gTylRPqzw/R51EZ3/tRpOkzJGENJaDcKjjp4VoUq+EH22p4PHSI34zNViEIEQhEX1ICQQI37vp4GF/5RHiw//bScYLtGeARK3H0ikg/j9EV2PUl4P/2Wf1+WmbwiWdCCDppzq/OEngPq3dFQbvZsO85Qt3lFfZ/49rEVLBnlb0rhWG3nCVkK+VjuFB1z9I1z8l87x1MfUj/QI0Q2pZ6R73hS5L4iuR3v/GWaTFjvZoSO1ShncChpx2aMOssN1lM68tzfGIM14AqPogZZIXafp8BKafRAJFTvrLSCuwQKQX+cJ/i8Sho7yCorncImIxAQWDePsgfA/ePGAFw5RukAJY1OIf9eHkjroElaOl6e17UpFjaXrrf8G7gYUSGIqbUMAAAAASUVORK5CYII=">\
               </image>\
             </g>\
           </g>\
         </g>\
       </svg>\
         </a>\
         </td>\
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
   }


}
