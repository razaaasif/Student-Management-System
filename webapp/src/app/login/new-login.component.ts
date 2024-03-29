import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div
      class="vh-100 d-flex justify-content-center align-items-center"
      style="min-width: 100rem;"
    >
      <div class="container">
        <div class="row d-flex justify-content-center">
          <div class="flex-col">
            <div class="border border-3 border-primary"></div>
            <div class="card bg-white shadow-lg">
              <div class="card-body p-5">
                <div class="mb-3 mt-md-4">
                  <h2 class="fw-bold mb-4 mt-1 text-uppercase ">
                    Student Management System
                  </h2>
                  <div class="mb-3">
                    <label for="username" class="form-label ">Username</label>
                    <input
                      type="username"
                      class="form-control"
                      id="username"
                      placeholder="Please enter your username"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label ">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="*******"
                    />
                  </div>
                  <p class="small">
                    <a class="text-primary" href="#">Forgot password?</a>
                  </p>
                  <div class="d-grid">
                    <button class="btn btn-primary btn-lg btn-block">
                      Login
                    </button>
                  </div>
                </div>
                <div>
                  <p class="mb-0  text-center">
                    Don't have an account?
                    <a href="#" class="text-primary fw-bold">Sign Up</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class NewLoginComponent {}
