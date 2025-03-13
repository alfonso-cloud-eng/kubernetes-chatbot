variable "gcp_credentials" {
  description = "Path to the GCP credentials JSON file"
  type        = string
}

variable "gcp_project" {
  description = "GCP Project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP region to deploy the cluster"
  type        = string
  default     = "us-central1"
}

variable "cluster_name" {
  description = "Name of the GKE cluster"
  type        = string
  default     = "chatbot-autopilot-cluster"
}

variable "deployer_service_account_email" {
  description = "Email of the service account used for deployment (e.g., github-k8s-deployer@your-project.iam.gserviceaccount.com)"
  type        = string
}
