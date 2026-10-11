# CMS Admin Login and Dashboard Test Plan

## Application Overview

Live-inspected Admin login flow at https://cms.anhtester.com/login. The page title is “Active eCommerce CMS | Anh Tester Demo”; the form contains Email, Password, Remember Me, Forgot password ?, and Login. Valid supplied test credentials redirected to https://cms.anhtester.com/admin and displayed the Admin Dashboard. Scope is restricted to authentication and reaching the Dashboard; product navigation and management are excluded. Each test begins in a fresh browser context with no authenticated session.

## Test Scenarios

### 1. Admin Login and Dashboard

**Seed:** `seed.spec.ts`

#### 1.1. Valid Admin credentials navigate to Dashboard

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login.
    - expect: The page title is Active eCommerce CMS | Anh Tester Demo.
    - expect: The login form displays Email, Password, Remember Me, Forgot password ?, and Login.
  2. Enter admin@example.com in Email and 123456 in Password.
    - expect: The email and password values are entered in the correct fields.
    - expect: The password is masked.
  3. Click Login and wait for navigation to finish.
    - expect: The browser navigates to https://cms.anhtester.com/admin.
    - expect: The Admin Dashboard is displayed, including the Dashboard navigation item and dashboard content.

#### 1.2. Empty credentials are prevented or rejected

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login and leave Email and Password empty.
    - expect: The login form is displayed.
  2. Click Login.
    - expect: Required-field browser or application validation is shown, or the server rejects the submission with a clear login error.
    - expect: The user is not authenticated and remains on the login page.

#### 1.3. Missing password is rejected

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login and enter admin@example.com in Email.
    - expect: Email is accepted in the email field and Password remains empty.
  2. Click Login.
    - expect: Password validation or a clear authentication error is shown.
    - expect: The user is not redirected to /admin.

#### 1.4. Missing email is rejected

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login and enter a password while leaving Email empty.
    - expect: The Password field accepts the entered value.
  2. Click Login.
    - expect: Email validation or a clear authentication error is shown.
    - expect: The user is not redirected to /admin.

#### 1.5. Incorrect password does not authenticate the user

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login and enter admin@example.com with an incorrect password.
    - expect: The credentials are entered in their respective fields.
  2. Click Login and wait for the result.
    - expect: Authentication fails and a clear error is displayed.
    - expect: The login page remains available and the Dashboard is not accessible as an authenticated user.

#### 1.6. Unknown email does not authenticate the user

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login and enter a well-formed, unregistered email address and a password.
    - expect: The entered credentials are available for submission.
  2. Click Login.
    - expect: Authentication fails with the site's normal login error handling.
    - expect: The user is not redirected to /admin and account existence is not unnecessarily disclosed.

#### 1.7. Malformed email is rejected

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login and enter a malformed email such as admin.example.com and a password.
    - expect: The malformed address is entered or flagged by email-field validation.
  2. Click Login.
    - expect: Email validation or a clear login error is shown.
    - expect: Authentication does not succeed and the Dashboard is not displayed.

#### 1.8. Login form supports keyboard submission

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login. Use the keyboard to enter admin@example.com in Email, move to Password, and enter 123456.
    - expect: Keyboard input reaches the intended fields.
  2. Press Enter while focused in Password.
    - expect: The form is submitted once.
    - expect: Valid credentials navigate to https://cms.anhtester.com/admin and display the Dashboard.

#### 1.9. Remember Me can be selected during successful login

**File:** `specs\login.spec.ts`

**Steps:**
  1. In a fresh browser context, navigate to https://cms.anhtester.com/login and verify Remember Me is initially unchecked.
    - expect: The Remember Me checkbox is visible and can be operated.
  2. Enter admin@example.com and 123456, check Remember Me, and click Login.
    - expect: The login succeeds and the Dashboard is displayed.
    - expect: The Remember Me option is included in the login submission without blocking navigation.
