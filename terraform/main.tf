resource "google_project_service" "enable_container_api" {
  project = var.gcp_project
  service = "container.googleapis.com"
}

resource "google_container_cluster" "chatbot_cluster" {
  name     = var.cluster_name
  location = var.gcp_region

  # Enable Autopilot mode
  autopilot {
    enabled = true
  }

    # For Autopilot clusters, you should remove the default node pool.
  remove_default_node_pool = true
  initial_node_count       = 1

  depends_on = [
    google_project_service.enable_container_api
  ]

  network    = "default"
  subnetwork = "default"

  # Disable legacy ABAC
  enable_legacy_abac = false

  # Optional: set master authorized networks if desired
  # master_authorized_networks_config { }
}

