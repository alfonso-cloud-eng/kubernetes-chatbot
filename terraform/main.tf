resource "google_container_cluster" "chatbot_cluster" {
  name     = var.cluster_name
  location = var.gcp_region

  network    = "default"
  subnetwork = "default"

  # Enabling Autopilot for this cluster
  enable_autopilot = true
}