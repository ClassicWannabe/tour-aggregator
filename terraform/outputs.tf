
output "instance_public_ip" {
  description = "The public IP address of the instance"
  value       = yandex_compute_instance.app_instance.network_interface.0.nat_ip_address
}
