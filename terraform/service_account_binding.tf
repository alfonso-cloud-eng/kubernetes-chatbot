data "google_compute_default_service_account" "default" {}

resource "google_service_account_iam_binding" "bind_deployer" {
  service_account_id = "projects/${var.gcp_project}/serviceAccounts/${data.google_compute_default_service_account.default.email}"
  role               = "roles/iam.serviceAccountUser"

  members = [
    "serviceAccount:${var.deployer_service_account_email}"
  ]
}
