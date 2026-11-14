---
colorSchema: light
color: orange-light
layout: cover
theme: neversink
routerMode: hash
lineNumbers: true
neversink_string: "Winter School 2026 · Belle II China Group"
title: Grid Computing for Belle II Analysis
titleTemplate: '%s - Xiao Han'
favicon: /ihep_grid_ca_icon_refined.svg
download: './ws2026-belle2-ihepca.pdf'
fonts: false
transition: fade
---

### Grid Computing for Belle II Analysis

#### <mdi-earth /> Certificates · VOMS · gbasf2 — hands-on with the new IHEP CA

<br>

##### **Xiao Han · on behalf of Grid Group, IHEP Computing Center** <a href="mailto:hanx@ihep.ac.cn"></a><Email v="hanx@ihep.ac.cn" />

<br>

##### November 14–18, 2026 · Southeast University, Nanjing

<br>

<a href="https://indico.ihep.ac.cn/event/30604/" class="ns-c-iconlink"><mdi-open-in-new />Winter School 2026 for Belle II China Group</a>, <a href="https://gridca.ihep.ac.cn/webui/ihepca/" class="ns-c-iconlink"><mdi-open-in-new />gridca.ihep.ac.cn</a>

<img src="/ihepcc.png" style="position:absolute;top:5px;right:5px;width:250px;opacity:1;z-index:1;" />

---
layout: side-title
title: Table of Contents
color: rose-light
align: cm-lm
---

:: title ::

# Outline

:: content ::

<div class="toc">

- **The Grid & the New CA**
    - *What the grid is · what changed*
- **Before You Start**
    - *Preparation · certificate types*
- **Hands-on: User Certificate**
    - *Apply · review · approve · download*
- **Migrate from IHEP-2013**
    - *One-time path for old certificates*
- **Use It on the Grid**
    - *VO · VOMS · proxy · gbasf2*
- **Renewal & Revocation**
    - *Keep it valid · revoke when compromised*
- **Robot & Host Certificates**
    - *For services and machines*
- **Troubleshooting & Security**
    - *FAQ · safe habits · security*

</div>

---
layout: section
color: cyan-light
---

# 1 · The Grid & the New CA

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# What is the Belle II grid?

:: left ::

<AdmonitionType type='info'>
The grid is a <b>distributed computing system</b> used by Belle II — and many other experiments — to harness computing resources of universities and institutes worldwide.
</AdmonitionType>

**Why not one big data center?**

- Modern experiments collect **tens of petabytes**
- Processing all data / MC at a single site is **not sustainable**
- Belle II runs on grid sites across Asia, Europe and America

**The grid is used for:**

- MC production · data reprocessing · skimming
- **Your analysis** — this is where you come in

:: right ::

<div class="shot-real">
  <img src="/15.grid_map.png" alt="Worldwide grid computing map" />
</div>
<div class="shot-caption">Grid sites and transfers worldwide — computing centers, storage elements and their connections.<br/>
<a href="https://belle2.jp/computing/"><mdi-open-in-new /> View the live map</a> at belle2.jp/computing (opens in your browser).</div>

<div class="mt-3 text-sm" style="line-height:1.6">
<b>Your path today:</b><br/>
<mdi-certificate /> certificate&nbsp;→&nbsp;<mdi-account-group-outline /> VO membership&nbsp;→&nbsp;<mdi-key /> proxy&nbsp;→&nbsp;<mdi-cog-outline /> gbasf2 jobs
</div>

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# What changed: OpenCA → OpenXPKI

:: left ::

<div style="text-align: center; max-width: 100%; margin: 0 auto;">
  <img src="/cagrid_screenshot.png" style="width: 100%; border-radius: 12px; border: 1px solid #e5e7eb;" />
  <div style="font-size:0.8em;color:#888;margin-top:4px;"><mdi-web /> cagrid.ihep.ac.cn — the old CA web interface</div>
</div>

:: right ::

| Dimension | Old (OpenCA) | New (OpenXPKI) |
|---|---|---|
| URL | cagrid.ihep.ac.cn | **gridca.ihep.ac.cn** |
| Login | Basic web form | **IHEP Account** + cert migration |
| Approval | Offline email | **Online RA workflow** |
| Key generation | Browser-dependent | **Server-side, RSA 4096** |
| Automation | None | **EST · API** |
| CRL | Manual | **Automatic** |

<AdmonitionType type='warning'>
Old CA certificates will <b>no longer be recognized after end of 2026</b> — about 45 days after this school. Migrate or re-apply <b>now</b>.
</AdmonitionType>

---
layout: section
color: rose-light
---

# 2 · Before You Start

---
layout: top-title
color: gray-light
---

:: title ::

# Preparation checklist

:: content ::

<div class="check-grid mt-4">
  <div><mdi-check-circle-outline /><div><strong>IHEP Account / LDAP login works</strong><span>You will log in to the CA WebUI with your usual IHEP username and password (IHEP Account, formerly IHEP SSO). Test it at <a href="https://login.ihep.ac.cn/">login.ihep.ac.cn</a> first.</span></div></div>
  <div><mdi-check-circle-outline /><div><strong>Your LDAP email is correct</strong><span>It becomes the certificate's email SAN, and the system uses it for ownership and notifications. Wrong email → lost certificates.</span></div></div>
  <div><mdi-check-circle-outline /><div><strong>Decide your English name spelling</strong><span>The certificate Subject needs ASCII letters only (space, dot, hyphen, apostrophe allowed). Use the same spelling forever — renewals must match.</span></div></div>
  <div><mdi-check-circle-outline /><div><strong>Prepare an export password</strong><span>A secret only you know, used to encrypt the downloaded <code>.p12</code> file. It is <b>not</b> your LDAP password and cannot be recovered by the CA.</span></div></div>
</div>

<div class="mt-5">
<AdmonitionType type='note'>
Open <b>https://gridca.ihep.ac.cn/webui/ihepca/</b> in a modern browser (Firefox recommended). The WebUI, EST and login all require HTTPS.
</AdmonitionType>
</div>

---
layout: top-title
color: gray-light
---

:: title ::

# Three certificate types

:: content ::

| Type | Purpose | Private key generated & held by | How to obtain |
|---|---|---|---|
| **User** | Grid user authentication — browser / CLI clients | CA generates; you download `.p12` and protect it | WebUI |
| **Robot** | Non-human identities: experiment services, pilots, automation | CA generates; the responsible person downloads `.p12` | WebUI |
| **Host** | Server authentication for machines | CA generates (WebUI first issue); **EST auto-renews on the host** | WebUI + EST |

<br>

<AdmonitionType type='info'>
<mdi-account-question /> Not sure which one you need? As a student doing analysis: <b>User Certificate</b>. Running a Belle II pilot service or an automated production task: ask your group leader about a <b>Robot Certificate</b>.
</AdmonitionType>

---
layout: top-title
color: gray-light
---

:: title ::

# What is inside a certificate

:: content ::

| Information | Where it lives | Can you change it? |
|---|---|---|
| **Subject DN** (name, account, OU, O) | The certificate itself | No — keep identical across renewals |
| **SAN** (email / DNS names) | The certificate itself | No — changed DNS or ownership ⇒ new application |
| Issuer · CRL URL · Certificate Policies | The certificate itself | No |
| Requester · Owner email · Comment | OpenXPKI system metadata | Only via workflow / RA |

**Your real certificate, as openssl shows it:**

```text
subject=C=CN, O=HEP, O=IHEP, OU=CC, CN=hanx14, CN=Xiao Han
issuer=C=CN, O=HEP, CN=Institute of High Energy Physics Certification Authority 2026
```

<div class="mt-5">
<AdmonitionType type='note'>
In slash form — used by VOMS and older grid tools — your DN is:
<code>/C=CN/O=HEP/O=IHEP/OU=CC/CN=hanx14/CN=Xiao Han</code>. Grid services map it to VOMS roles and DIRAC accounts: <b>keep your name spelling forever</b>.
</AdmonitionType>
</div>

---
layout: section
color: blue-light
---

# 3 · Hands-on: User Certificate

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Step 1 — Log in with IHEP Account

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Open the WebUI</strong><a href="https://gridca.ihep.ac.cn/webui/ihepca/">https://gridca.ihep.ac.cn/webui/ihepca/</a></div></div>
  <div><span class="step-no">2</span><div><strong>Choose authentication method</strong>In the dropdown select <b>IHEP Account</b>.</div></div>
  <div><span class="step-no">3</span><div><strong>Enter IHEP credentials</strong>Username + password, then <b>Login</b>.</div></div>
  <div><span class="step-no">4</span><div><strong>Verify your account</strong>Top-right corner must show <b>your</b> account. Logout via the button — not by closing the tab.</div></div>
</div>

:: right ::

<div class="shot-real">
  <img src="/01.login.png" alt="WebUI login page" />
</div>
<div class="shot-caption">The WebUI login page — pick <b>IHEP Account</b> in the Authentication method dropdown.</div>

<div class="mt-3">
<AdmonitionType type='warning'>
<code>Login with the given credentials failed!</code> → check LDAP account/password, do <b>not</b> brute-force different accounts; contact CA support to check the LDAP mapping.
</AdmonitionType>
</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Step 2 — Know your two home pages

:: left ::

**Home → My Certificates**

- All certificates owned by your account
- Renewal and revocation start from here
- Download actions live in the certificate detail page

**Home → My Workflows**

- Every request you created
- Status, history, and error messages
- Bookmark the workflow ID before contacting support

:: right ::

<div class="shot-real tall">
  <img src="/02.home.png" alt="Home page after login" />
</div>
<div class="shot-caption">After login — the top menu with <b>Request Certificate</b>.</div>

<div class="mt-3">
<AdmonitionType type='info'>
These two pages answer 90% of "where is my certificate" questions. If a certificate is not in <b>My Certificates</b>, check which account (email) you logged in with.
</AdmonitionType>
</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Step 3 — Start a request

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Top menu → Request Certificate</strong>(<b>Request → Request Certificate</b> in older menus.)</div></div>
  <div><span class="step-no">2</span><div><strong>Select Profile: User Certificate</strong>It is the default — click <b>Continue</b>.</div></div>
</div>

<br>

**The other profiles in the list:**

- **Robot Certificate** — for experiment services and pilots (§7)
- **Host Certificate** — for machines (§7)

:: right ::

<div class="shot-real tall">
  <img src="/03.profile.png" alt="Select Profile page" />
</div>
<div class="shot-caption"><b>Select Profile</b> — User Certificate is the default.</div>

<div class="mt-3">
<AdmonitionType type='note'>
<b>Continue</b> only saves and moves to the next page. <b>Submit</b> is what actually sends the request to the system and RA. Review the summary before every Submit.
</AdmonitionType>
</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Step 4 — Edit Subject

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>First name / Last name</strong>ASCII only: letters, space, dot, hyphen, apostrophe. If LDAP returns your Chinese name, <b>type your English name yourself</b>.</div></div>
  <div><span class="step-no">2</span><div><strong>Username</strong>Pre-filled from LDAP, locked — it binds the cert to your account.</div></div>
  <div><span class="step-no">3</span><div><strong>Organization Unit / Organization</strong>Dropdowns — select your real department and institute.</div></div>
  <div><span class="step-no">4</span><div><strong>SAN Email</strong>Provided by LDAP — leave it untouched.</div></div>
</div>

:: right ::

<div class="shot-real tall">
  <img src="/04.edit_subject.png" alt="Edit Subject page" />
</div>
<div class="shot-caption"><b>Edit Subject</b> — type your ASCII name; Username and email come from LDAP.</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Step 5 — Certificate info

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Email address</strong>Your LDAP email — the ownership and notification address.</div></div>
  <div><span class="step-no">2</span><div><strong>Requester</strong>Your name, as the applicant.</div></div>
  <div><span class="step-no">3</span><div><strong>Comment</strong>e.g. "Belle II analysis user, winter school". <b>Never</b> put passwords or private key info here. Then <b>Continue</b>.</div></div>
</div>

<AdmonitionType type='info'>
Nothing here changes your identity — identity fields come from LDAP. Comment is free text for the RA reviewers.
</AdmonitionType>

:: right ::

<div class="shot-real tall">
  <img src="/05.cert_info.png" alt="Edit Certificate Info page" />
</div>
<div class="shot-caption"><b>Edit Certificate Info</b> — write your application reason in Comment.</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Step 6 — Review and submit

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Review Request</strong>check <b>Certificate Subject</b>, <b>SAN</b>, <b>Profile</b>, <b>Requester Information</b>; use <b>Edit Subject / Edit Certificate Info</b> to go back and fix anything.</div></div>
  <div><span class="step-no">2</span><div><strong>Submit request</strong></div></div>
  <div><span class="step-no">3</span><div><strong>Duplicate warning?</strong>Failed Policy Check means a repeated application — click <b>Submit with Policy Exception</b> and justify it (e.g. lost private-key password).</div></div>
</div>

<AdmonitionType type='note'>
Policy-exception requests show <b>Policy Violation Pending</b> and may take a little longer to be reviewed.
</AdmonitionType>

:: right ::

<div class="shot-real tall">
  <img src="/12.review.png" alt="Review Request page" />
</div>
<div class="shot-caption"><b>Review Request</b> — the last chance to fix mistakes before Submit.</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Step 7 — Set the private key password

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>This is the Private Key Password</strong>It protects your private key — and you will type it <b>again when downloading</b> the certificate.</div></div>
  <div><span class="step-no">2</span><div><strong>Rules</strong>At least 8 characters, mixing at least two of: upper case, lower case, digits, special characters.</div></div>
  <div><span class="step-no">3</span><div><strong>Memorize it</strong>The CA cannot recover it. Losing it means re-applying via policy exception.</div></div>
</div>

<AdmonitionType type='info'>
Two different passwords exist: this <b>Private Key Password</b> (now), and an <b>Export Password</b> you will set when downloading the <code>.p12</code> (leave it empty to reuse this one). Neither is your LDAP password.
</AdmonitionType>

:: right ::

<div class="shot-real tall">
  <img src="/06.password.png" alt="Enter a Password page" />
</div>
<div class="shot-caption"><b>Enter a Password</b> — the Private Key Password.</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Step 8 — Track your request

:: left ::

**Home → My Workflows** — click the workflow ID to see State, History and messages.

| Status | Meaning | Your action |
|---|---|---|
| `PENDING` / `ONHOLD` | Awaiting RA review | Wait; do **not** duplicate requests |
| `Policy Violation Pending` | Policy exception under review | Use **Recheck Status** to refresh |
| `SUCCESS` | Issued | Download from My Certificates |
| `REJECTED` | RA refused | Read the reason, fix, re-apply |
| `FAILURE` | Workflow error | Save the workflow ID, contact support |

:: right ::

<div class="shot-real tall">
  <img src="/07.workflows.png" alt="Waiting for approval" />
</div>
<div class="shot-caption">After submission — waiting for RA review (here: a policy-exception request).</div>

<div class="mt-3">
<AdmonitionType type='warning'>
The browser Back button does <b>not</b> cancel a request. Use the on-page <b>Cancel</b> action if you truly need to withdraw one.
</AdmonitionType>
</div>

---
layout: section
color: amber-light
---

# 4 · Migrate from IHEP-2013

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Already have an old personal certificate?

:: left ::

**Migration entry = one-time shortcut** for users holding a valid, unrevoked IHEP-2013 **personal** certificate:

<div class="step-list mt-2">
  <div><span class="step-no">1</span><div>Install the old personal certificate <b>with its private key</b> into your browser first.</div></div>
  <div><span class="step-no">2</span><div>Open the WebUI — the browser pops up the <b>certificate selection</b>: pick your <b>personal</b> IHEP-2013 certificate.</div></div>
  <div><span class="step-no">3</span><div>In <b>Authentication method</b> choose <b>IHEP-2013 certificate migration</b> and click <b>Login</b>.</div></div>
  <div><span class="step-no">4</span><div>Identity fields are <b>auto-filled</b> from the old cert + LDAP — no re-typing. Set a password, submit, download.</div></div>
</div>

<br>

**Rules:**

- One migration **per LDAP account** — ever
- Old cert expired/revoked, or email mismatch → use the normal IHEP Account request instead

:: right ::

<div class="shot-real" style="max-height:185px">
  <img src="/08.migration_login.png" alt="Migration login option" style="max-height:185px" />
</div>
<div class="shot-caption">The login page — choose <b>IHEP-2013 certificate migration</b>.</div>

<div class="shot-real mt-2" style="max-height:185px">
  <img src="/18.migration_subject.png" alt="Migration subject auto-filled" style="max-height:185px" />
</div>
<div class="shot-caption">Subject <b>auto-filled</b> from the old certificate and LDAP — read-only.</div>

---
layout: section
color: green-light
---

# 5 · Use It on the Grid

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Download your PKCS#12

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Issued notification email</strong>arrives with a direct link that opens your certificate.</div></div>
  <div><span class="step-no">2</span><div><strong>Home → My Certificates</strong>click the certificate's Subject or serial number.</div></div>
  <div><span class="step-no">3</span><div><strong>Action → Download private key/keystore</strong></div></div>
  <div><span class="step-no">4</span><div><strong>Move the <code>.p12</code> somewhere safe</strong>Out of the shared Downloads folder, restricted permissions. Not in /tmp, not on cloud drives.</div></div>
</div>

<AdmonitionType type='note'>
No download action? Either the private key is not held by the CA anymore, or the certificate came from EST — it does not mean the certificate is invalid.
</AdmonitionType>

:: right ::

<div class="shot-real tall">
  <img src="/09.download.png" alt="Certificate detail download action" />
</div>
<div class="shot-caption">Certificate detail — the <b>Action</b> area with the download entry.</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Download: format and the two passwords

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Download Format: PKCS12</strong>confirm it on the <b>Specify Required Format</b> page.</div></div>
  <div><span class="step-no">2</span><div><strong>Password</strong>enter the <b>Private Key Password</b> you set in Step 7.</div></div>
  <div><span class="step-no">3</span><div><strong>Export Password</strong>encrypts the downloaded <code>.p12</code> — leave empty to reuse the private key password.</div></div>
  <div><span class="step-no">4</span><div><strong>Continue → SUCCESS → Download</strong>save the file <b>immediately</b>.</div></div>
</div>

:: right ::

<div class="shot-real tall">
  <img src="/13.download_password.png" alt="Specify Required Format page" />
</div>
<div class="shot-caption"><b>Specify Required Format</b> — PKCS12, Private Key Password, Export Password.</div>

<div class="mt-3">
<AdmonitionType type='warning'>
The download entry <b>disappears once you leave the SUCCESS page</b>. If you miss it, reopen the certificate and start the download action again.
</AdmonitionType>
</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Install into Firefox

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Settings → Privacy & Security → Certificates → View Certificates</strong></div></div>
  <div><span class="step-no">2</span><div><strong>Your Certificates → Import</strong>pick your <code>.p12</code>, enter the export password.</div></div>
  <div><span class="step-no">3</span><div><strong>Verify the entry</strong>double-click it: <b>Issued By</b> = new IHEP Issuing CA; SAN contains your email.</div></div>
  <div><span class="step-no">4</span><div><strong>Try a client-cert website</strong>pick your new certificate when the browser asks.</div></div>
</div>

:: right ::

<div class="shot-real tall">
  <img src="/10.firefox_certs.png" alt="Firefox certificate manager" />
</div>
<div class="shot-caption">Firefox <b>Certificate Manager → Your Certificates → Import</b> — pick your <code>.p12</code> and enter the Export Password.</div>

<div class="mt-3">
<AdmonitionType type='important'>
Importing only a <code>.crt</code>/<code>.pem</code> (public part) does <b>not</b> work — the browser needs the private key, which lives in the <code>.p12</code>.
</AdmonitionType>
</div>

<div class="text-sm mt-3" style="opacity:.75"><mdi-lightbulb-on-outline /> Tip: stick to one browser through apply → download → import, and avoid browser updates mid-workflow.</div>

---
layout: top-title
color: gray-light
---

:: title ::

# Export PEM files for the grid CLI

:: content ::

Rename the downloaded `.p12` — it is usually named after you, e.g. `Xiao Han.p12` — to **`myCert.p12`**, and upload it to **KEKCC or whichever server you will use** (e.g. with `scp`). Grid tools expect `~/.globus/usercert.pem` + `userkey.pem`:

```bash
mkdir -p "$HOME/.globus" && chmod 700 "$HOME/.globus"

openssl pkcs12 -in myCert.p12 -clcerts -nokeys -out "$HOME/.globus/usercert.pem"
openssl pkcs12 -in myCert.p12 -nocerts -out "$HOME/.globus/userkey.pem"
chmod 644 "$HOME/.globus/usercert.pem"
chmod 600 "$HOME/.globus/userkey.pem"
```

**Verify what you got** (subject, issuer, dates, SAN, and key match):

```bash
openssl x509 -in "$HOME/.globus/usercert.pem" -noout -subject -issuer -dates -ext subjectAltName
test "$(openssl x509 -in "$HOME/.globus/usercert.pem" -noout -modulus | openssl sha256)" \
  = "$(openssl rsa -in "$HOME/.globus/userkey.pem" -noout -modulus | openssl sha256)" \
  && echo 'certificate and key match'
```

<AdmonitionType type='warning'>
Delete <code>myCert.p12</code> on that server once the conversion succeeds — don't leave copies of the encrypted key around. If <code>openssl pkcs12</code> complains about the format, drop or add <code>-legacy</code>. Never send the <code>.p12</code> to anyone to "fix" it.
</AdmonitionType>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Register your Belle II VO membership

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Open the Belle II VOMS page</strong><a href="https://voms.cc.kek.jp:8443/voms/belle/user/home.action">voms.cc.kek.jp:8443/voms/belle</a> — log in <b>with your new certificate</b> (your first real use of it!).</div></div>
  <div><span class="step-no">2</span><div><strong>Request membership</strong>follow the page actions to register as a new member.</div></div>
  <div><span class="step-no">3</span><div><strong>Wait for approval</strong>a VO admin confirms — usually within a day or two.</div></div>
  <div><span class="step-no">4</span><div><strong>Done</strong>your DN now carries the <code>/belle</code> roles used by grid services.</div></div>
</div>

:: right ::

<div class="shot-real tall">
  <img src="/11.voms.png" alt="VOMS admin page for the belle VO" />
</div>
<div class="shot-caption"><b>VOMS Admin for the belle VO</b> — log in with your certificate; your DN and membership appear on your profile page.</div>

<div class="mt-3">
<AdmonitionType type='warning'>
Membership binds to your <b>DN</b>. A normal renewal keeps your DN — membership survives. But if your DN ever changes (different name spelling), you must register again.
</AdmonitionType>
</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# New certificate: update your VOMS binding

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>Log in with the old certificate</strong>the one already bound to your VO account.</div></div>
  <div><span class="step-no">2</span><div><strong>Add an additional certificate</strong>on your profile page, under <b>Certificates</b>.</div></div>
  <div><span class="step-no">3</span><div><strong>Select the new issuer</strong><i>Institute of High Energy Physics Certification Authority 2026</i> in the CA list.</div></div>
  <div><span class="step-no">4</span><div><strong>Enter your new DN</strong>slash form, e.g. <code>/C=CN/O=HEP/O=IHEP/OU=CC/CN=duran/CN=Ran Du</code> → <b>Request certificate</b>, then wait for VO admin approval.</div></div>
</div>

:: right ::

<div style="display:grid;grid-template-columns:1fr 1fr;gap:0.7rem">
  <div>
    <div class="shot-real" style="max-height:200px"><img src="/19.voms_add1.jpg" alt="VOMS profile, add certificate" style="max-height:200px" /></div>
    <div class="shot-caption">Profile → <b>Add an additional certificate</b></div>
  </div>
  <div>
    <div class="shot-real" style="max-height:200px"><img src="/20.voms_add2.png" alt="CA issuer list" style="max-height:200px" /></div>
    <div class="shot-caption">Pick the <b>2026 issuer</b> in the CA list</div>
  </div>
  <div>
    <div class="shot-real" style="max-height:200px"><img src="/21.voms_add3.png" alt="DN entry form" style="max-height:200px" /></div>
    <div class="shot-caption">Enter the new DN — or upload the <b>PEM only</b></div>
  </div>
  <div>
    <div class="shot-real" style="max-height:200px"><img src="/22.voms_add4.png" alt="Pending certificate" style="max-height:200px" /></div>
    <div class="shot-caption">New certificate <b>waiting for approval</b></div>
  </div>
</div>

<div class="mt-3">
<AdmonitionType type='important'>
The form also accepts a <b>certificate file upload</b> — if you use it, upload the <b>PEM certificate only</b> (<code>usercert.pem</code>). <b>Never upload your <code>.p12</code> — it contains your private key.</b>
</AdmonitionType>
</div>

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# Use it: gBASF2 proxy example

:: left ::

**On an IHEP login node (or KEKCC):**

```bash
source /cvmfs/belle.kek.jp/grid/gbasf2/pro/bashrc
gb2_proxy_init
```

**What the proxy output shows:**

```text
subject      : /C=CN/O=HEP/O=IHEP/OU=CC/CN=hanx14/CN=Xiao Han
issuer       : /C=CN/O=HEP/CN=Institute of High Energy Physics
               Certification Authority 2026
timeleft     : 23:53:58
DIRAC group  : belle
VOMS         : True
VOMS fqan    : ['/belle']
```

:: right ::

<AdmonitionType type='info'>
The proxy is a <b>short-lived credential</b> derived from your certificate. Your long-lived secret (private key) never leaves your machine.
</AdmonitionType>

<br>

**Remember:**

- Certificate expires in ~1 year — renew in time (§6)
- New certificate ⇒ new proxy: re-run `gb2_proxy_init`
- Belle II VO membership (VOMS `/belle`) is registered against your DN — changing your DN breaks it

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# gbasf2: setup and your first job

:: left ::

**Setup (KEKCC or IHEP login node):**

```bash
source /cvmfs/belle.kek.jp/grid/gbasf2/pro/bashrc
gb2_check_release   # check your gbasf2 release
```

- <mdi-alert-circle-outline /> **basf2 and gbasf2 are NOT compatible** — use separate shell sessions
- gbasf2 and basf2 versions are **independent** of each other

<br>

**Golden rule**

<AdmonitionType type='important'>
Always run your script with <b>basf2 first</b> on local samples — only then submit it to the grid.
</AdmonitionType>

:: right ::

**Submit a job — same logic as basf2:**

```bash
gbasf2 ./ana01.py -s release-08-01-05 \
  -p 20261114_myproject --input_dslist input1.txt
```

- `-s` basf2 release · `-p` your project name · `--input_dslist` input dataset
- Monitor jobs in the <a href="https://dirac.cc.kek.jp:8443/DIRAC/"><b>DIRAC portal</b></a>

<div class="shot-real mt-3" style="max-height:250px">
  <img src="/16.dirac_portal.png" alt="BelleDIRAC job monitor" style="max-height:250px" />
</div>
<div class="shot-caption">The BelleDIRAC <b>Job Monitor</b></div>

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# Useful commands and where to get help

:: left ::

| Command | Purpose |
|---|---|
| `gb2_job_status -p PROJ` | Job status of your project |
| `gb2_job_output -p PROJ --status Failed` | Fetch logs of failed jobs |
| `gb2_job_reschedule -p PROJ` | Retry failed jobs |
| `gb2_job_kill -p PROJ` | Kill remaining jobs |
| `gb2_ds_list /belle/user/<you>/PROJ` | Count output files |
| `gb2_ds_get /belle/user/<you>/PROJ` | Download outputs |
| `gb2_ds_rm "/belle/user/<you>/*"` | Remove obsolete datasets |

:: right ::

**Questions & discussion**

- <a href="https://questions.belle2.org/questions/">questions.belle2.org</a> — the computing Q&A forum

**Mailing list**

- <a href="mailto:comp-users-forum@belle2.org">comp-users-forum@belle2.org</a> — user discussion; subscribe at the list page

**Documentation**

- <a href="https://software.belle2.org/development/sphinx/online_book/computing/computing_system.html">Belle II computing documentation</a> — online book (BASF2 / gbasf2 / grid)

<br>

<AdmonitionType type='note'>
For <b>certificate</b> problems (login, issuance, renewal, revocation) — contact the IHEP CA support, not the Belle II forum.
</AdmonitionType>

---
layout: section
color: red-light
---

# 6 · Renewal & Revocation

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# Renew before expiry

:: left ::

<div class="step-list">
  <div><span class="step-no">1</span><div><strong>My Certificates → open a still-valid certificate</strong></div></div>
  <div><span class="step-no">2</span><div><strong>Action → Renew</strong>profile and Subject are carried over — verify, don't retype.</div></div>
  <div><span class="step-no">3</span><div><strong>New export password → Submit</strong></div></div>
  <div><span class="step-no">4</span><div><strong>Download the new <code>.p12</code>, reinstall</strong>browser + <code>.globus</code>, then make a fresh proxy.</div></div>
</div>

:: right ::

**Good to know:**

- Renewal issues a **new private key and serial** — never stitch the new cert onto the old key by hand
- The old certificate stays valid until its original expiry → smooth switchover
- Renew ≠ change: different department, name spelling or ownership = **new application**, not renewal
- Expiry reminder emails are sent automatically — keep your LDAP email correct

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# Revoke when compromised

:: left ::

**When to revoke immediately:**

- Private key or `.p12` suspected leaked
- You stop being the responsible person (Robot/Host)

**How:**

<div class="step-list mt-2">
  <div><span class="step-no">1</span><div><strong>My Certificates → open the certificate</strong></div></div>
  <div><span class="step-no">2</span><div><strong>Action → Revoke</strong>choose the most accurate reason, explain for the RA.</div></div>
  <div><span class="step-no">3</span><div><strong>Submit</strong>and wait for CRL publication.</div></div>
</div>

:: right ::

<AdmonitionType type='important'>
<b>Revocation is irreversible.</b> If the key may be compromised: stop using it first, then revoke — do not wait for expiry, and do not just delete local files (copies may exist elsewhere).
</AdmonitionType>

<br>

**Propagation:** relying parties fetch the CRL on their own schedule — a revoked cert may still be accepted for a while by some services.

---
layout: section
color: purple-light
---

# 7 · Robot & Host Certificates

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# Robot certificates

:: left ::

For **non-human identities**: experiment pilots, production automation, service agents — not for natural persons.

**Application highlights (WebUI, like §3):**

- **Experiment** — e.g. `Belle` (letters, digits, dot, underscore, hyphen)
- **Submodule / purpose** — e.g. `pilot`
- **OU / O** — the responsible group
- SAN email = the responsible person's LDAP email (automatic)

<AdmonitionType type='important'>
Every Robot certificate needs a <b>responsible person</b>. Ownership change, purpose change or key leak ⇒ revoke and re-apply — do not "migrate" a Robot cert to someone else.
</AdmonitionType>

:: right ::

<div class="shot-real tall">
  <img src="/14.robot_subject.png" alt="Robot certificate subject form" />
</div>
<div class="shot-caption"><b>Robot certificate</b> — Experiment + Submodule / purpose; the second CN is fixed to <b>Robot</b>.</div>

<br>

**Resulting DN shape:**

```text
CN=Belle pilot,CN=Robot,OU=<dept>,O=<inst>,O=HEP,C=CN
```

---
layout: top-title-two-cols
color: gray-light
---

:: title ::

# Host certificates & EST

:: left ::

**WebUI first issue (site admin):**

- **Hostname** = primary FQDN (`host01.ihep.ac.cn`, never short names)
- **Additional hostnames** = one FQDN per entry, no wildcards, no IPs/URLs
- Names are issued lowercase; email SAN = applicant's LDAP mail

**Install to the host** (`.p12` → PEM):

```bash
openssl pkcs12 -in host01.p12 -clcerts -nokeys \
  -out /etc/grid-security/hostcert.pem
openssl pkcs12 -in host01.p12 -nocerts -nodes \
  -out /etc/grid-security/hostkey.pem
chmod 444 /etc/grid-security/hostcert.pem
chmod 400 /etc/grid-security/hostkey.pem
```

:: right ::

**EST auto-renewal (hands-free afterwards):**

- Script `ihep-host-auto.sh` on the host
- Renews automatically within **45 days** of expiry
- Old IHEP-2013 host certs migrate through the same script (mTLS, one-time per hostname)
- Site admins deploy it — users normally never touch this

<AdmonitionType type='note'>
Full details (wrapper script, cron, RELOAD_CMD) in the <b>IHEPCA User Guide</b> — linked at the end.
</AdmonitionType>

---
layout: section
color: gray-light
---

# 8 · Troubleshooting & Security

---
layout: top-title
color: gray-light
---

:: title ::

# Common problems

:: content ::

| Symptom | Check first |
|---|---|
| WebUI login fails | LDAP account/password; wrong client cert selected; system clock |
| Cannot find my certificate | **My Certificates** + which email you logged in with |
| Stuck in `PENDING` | workflow ID from **My Workflows** → contact RA; don't re-submit |
| No "download key" action | Key not CA-generated / already exported / EST-issued — not an error |
| Browser never offers the certificate | Import the `.p12` (with key!); check cached choices |
| Certificate chain fails | Client must trust the **new Root + Issuing CA**; CRL URLs reachable |

<AdmonitionType type='info'>
<mdi-face-agent /> Contact support with: certificate serial or Subject · workflow ID · time (UTC) · full error text. <b>Never</b> send private keys, <code>.p12</code>, or passwords.
</AdmonitionType>

---
layout: top-title
color: gray-light
---

:: title ::

# Security habits

:: content ::

<div class="check-grid mt-4">
  <div><mdi-check-circle-outline /><div><strong>Move <code>.p12</code> out of Downloads immediately</strong><span>Restricted location and permissions. Not /tmp, not sync drives, not group-readable home.</span></div></div>
  <div><mdi-check-circle-outline /><div><strong>One export password, kept secret</strong><span>Not the LDAP password; never recovered by the CA; never shared.</span></div></div>
  <div><mdi-check-circle-outline /><div><strong>Revoke on suspicion</strong><span>Lost key or leaked file → stop using it and revoke. Fast beats perfect.</span></div></div>
  <div><mdi-check-circle-outline /><div><strong>Keep your LDAP email current</strong><span>Expiry alerts and ownership follow that address.</span></div></div>
</div>

<div class="dont-grid mt-4">
<div class="check-grid">
  <div><mdi-close-circle-outline /><div><strong>Never</strong> <span>e-mail / chat / cloud-share a <code>.p12</code>, <code>userkey.pem</code> or password</span></div></div>
  <div><mdi-close-circle-outline /><div><strong>Never</strong> <span>write passwords or key material in the Comment field</span></div></div>
</div>
</div>

---
layout: top-title-two-cols
color: gray-light
align: c-lt-lt
---

:: title ::

# Summary — do it this week

:: left ::

<div class="step-list mt-2">
  <div><span class="step-no">1</span><div><strong>Check your IHEP Account login and LDAP email</strong>— everything hangs on these two.</div></div>
  <div><span class="step-no">2</span><div><strong>Request / migrate your certificate</strong>at gridca.ihep.ac.cn — new request, or the IHEP-2013 migration entry.</div></div>
  <div><span class="step-no">3</span><div><strong>Install to browser + <code>.globus</code></strong>— bring a working proxy to the hands-on session.</div></div>
  <div><span class="step-no">4</span><div><strong>Register / update your VOMS membership</strong>join the belle VO — or add your new DN.</div></div>
</div>

<div class="mt-2">
<AdmonitionType type='important'>
<b>Deadline:</b> old-CA certificates stop being recognized at the <b>end of 2026</b>.
</AdmonitionType>
</div>

:: right ::

<div class="step-list compact mt-2">
  <div><mdi-certificate /><div><strong>IHEP CA WebUI</strong><a href="https://gridca.ihep.ac.cn/webui/ihepca/">gridca.ihep.ac.cn/webui/ihepca</a></div></div>
  <div><mdi-book-open-variant /><div><strong>IHEP CA user guide</strong><a href="https://cchelp.ihep.ac.cn/grid/new-ca/">cchelp.ihep.ac.cn/grid/new-ca</a></div></div>
  <div><mdi-book-open-variant /><div><strong>gbasf2 user manual</strong><a href="https://software.belle2.org/development/sphinx/online_book/computing/gbasf2.html">Belle II online book — gbasf2</a></div></div>
  <div><mdi-account-group-outline /><div><strong>Belle II VOMS</strong><a href="https://voms.cc.kek.jp:8443/voms/belle/user/home.action">voms.cc.kek.jp/voms/belle</a></div></div>
  <div><mdi-help-circle-outline /><div><strong>Questions &amp; forum</strong><a href="https://questions.belle2.org/questions/">questions.belle2.org</a></div></div>
  <div><mdi-monitor-dashboard /><div><strong>DIRAC portal</strong><a href="https://dirac.cc.kek.jp:8443/DIRAC/">dirac.cc.kek.jp/DIRAC</a></div></div>
</div>

---
layout: cover
color: navy
title: credits/people
---

<div class="credits-wrap">
  <div class="credits-cols">
    <div>
      <div class="credits-title"><mdi-certificate-outline /> IHEP Computing Center — PKI Team</div>
      <div class="credits-grid">
        <div class="k">Reporter</div><div>Xiao Han · <i>IHEP, CC</i></div>
        <div class="k">Current Developer</div><div>Xiao Han · <i>IHEP, CC</i></div>
        <div class="k">People</div><div>Xiao Han · <i>CA Administrator · RA Administrator</i><br/>Gongxing Sun · <i>RA Administrator (former)</i> · Tian Yan · <i>CA Administrator (former)</i></div>
        <div class="k">Acknowledgements</div><div>The Interoperable Global Trust Federation (IGTF) · The Asia Pacific Grid Policy Management Authority (APGridPMA) · The European Policy Management Authority for Grid Authentication (EUGridPMA)</div>
      </div>
    </div>
    <div class="credits-side">
      <div class="credits-link"><a href="https://gridca.ihep.ac.cn/webui/ihepca/"><mdi-open-in-new /> gridca.ihep.ac.cn</a></div>
      <img class="wechat-card" src="/23.wechat_group.jpg" alt="Belle and Belle II China WeChat group" />
      <div class="credits-caption">WeChat group · Belle&amp;Belle II 中国人组</div>
    </div>
  </div>
  <div class="credits-q"><strong>Questions?</strong></div>
  <div class="credits-thanks">Thank you!</div>
</div>
