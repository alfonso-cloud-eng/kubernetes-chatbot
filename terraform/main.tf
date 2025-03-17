resource "google_project_service" "enable_container_api" {
  project = var.gcp_project
  service = "container.googleapis.com"
}

resource "google_project_service" "enable_cloudresourcemanager_api" {
  project = var.gcp_project
  service = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "enable_compute_api" {
  project = var.gcp_project
  service = "compute.googleapis.com"
}

resource "google_container_cluster" "chatbot_cluster" {
  name     = var.cluster_name
  location = var.gcp_region

  network    = "default"
  subnetwork = "default"

  # Enabling Autopilot for this cluster
  enable_autopilot = true
}

