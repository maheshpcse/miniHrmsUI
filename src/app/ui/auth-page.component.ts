import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { PortalService } from "../api-services/portal.service";
import { AuthAdminService } from "../api-services/auth-admin.service";
@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
})
export class AuthPageComponent implements OnInit {
  @Input() mode = "login";
  name = "";
  lastName = "";
  email = "";
  username = "";
  password = "";
  confirmation = "";
  code = "";
  challenge = "";
  resetToken = "";
  busy = false;
  error = "";
  message = "";
  showPassword = false;
  step = 1;
  constructor(
    private api: PortalService,
    private auth: AuthAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    if (this.mode === "reset") {
      this.resetToken = this.route.snapshot.queryParamMap.get("token") || "";
      this.challenge = this.route.snapshot.queryParamMap.get("challenge") || "";
    }
  }
  get title() {
    return this.mode === "login"
      ? "Welcome back."
      : this.mode === "signup"
      ? "Create your employee account."
      : this.mode === "forgot"
      ? "Let’s get you back in."
      : "A fresh start, securely.";
  }
  get description() {
    return this.mode === "login"
      ? "Sign in to manage your employee services and HR operations."
      : this.mode === "signup"
      ? "Create your employee account. Your HR team will activate your workspace access."
      : this.mode === "forgot"
      ? "Enter your work email. We’ll send a one-time verification code."
      : "Verify your code and choose a strong new password.";
  }
  submit(form: NgForm) {
    if (this.busy) {
      return;
    }
    this.error = "";
    this.message = "";
    if (form.invalid) {
      Object.keys(form.controls).forEach((k) =>
        form.controls[k].markAsTouched()
      );
      this.error = "Please check the highlighted fields.";
      return;
    }
    if (
      (this.mode === "signup" || this.mode === "reset") &&
      this.password !== this.confirmation
    ) {
      this.error = "Your passwords do not match.";
      return;
    }
    this.busy = true;
    if (this.mode === "login") {
      this.api
        .post("/auth/login", {
          adminLoginName: this.username.trim(),
          adminPassword: this.password,
        })
        .subscribe(
          (data) => {
            this.auth.setSession(data);
            const url = this.route.snapshot.queryParamMap.get("returnUrl");
            this.router.navigateByUrl(
              url && url.startsWith("/admin/") && !url.startsWith("//")
                ? url
                : "/admin/dashboard"
            );
            this.busy = false;
          },
          (e) => this.fail(e)
        );
    } else if (this.mode === "signup") {
      this.api
        .post("/auth/signup", {
          firstName: this.name.trim(),
          lastName: this.lastName.trim(),
          email: this.email.trim(),
          userName: this.username.trim(),
          password: this.password,
        })
        .subscribe(
          () => {
            this.busy = false;
            this.step = 2;
            this.password = "";
            this.confirmation = "";
            this.message =
              "Your account has been created and is awaiting HR approval. We look forward to welcoming you.";
          },
          (e) => this.fail(e)
        );
    } else if (this.mode === "forgot") {
      this.api
        .post("/auth/forgot", { adminEmail: this.email.trim() })
        .subscribe(
          (data) => {
            this.busy = false;
            this.router.navigate(["/admin/reset-password"], {
              queryParams: { challenge: data.challenge },
            });
          },
          (e) => this.fail(e)
        );
    } else {
      this.api
        .post("/auth/reset", {
          challenge: this.challenge,
          code: this.code,
          password: this.password,
        })
        .subscribe(
          () => {
            this.busy = false;
            this.step = 2;
            this.password = "";
            this.confirmation = "";
            this.message =
              "Your password is updated. You can now sign in with your new password.";
          },
          (e) => this.fail(e)
        );
    }
  }
  fail(error: any) {
    this.busy = false;
    this.error = this.api.message(error);
  }
}
