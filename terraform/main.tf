resource "google_container_cluster" "chatbot_cluster" {
  name     = var.cluster_name
  location = var.gcp_region

  # Enable Autopilot mode
  autopilot {
    enabled = true
  }

  # Minimal cluster settings; Autopilot takes care of node provisioning.
  initial_node_count = 1

  network    = "default"
  subnetwork = "default"

  # Disable legacy ABAC
  enable_legacy_abac = false

  # Optional: set master authorized networks if desired
  # master_authorized_networks_config { }
}
