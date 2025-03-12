output "cluster_name" {
  value = google_container_cluster.chatbot_cluster.name
}

output "endpoint" {
  value = google_container_cluster.chatbot_cluster.endpoint
}
