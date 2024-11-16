
variable "yc_token" {
  description = "Yandex Cloud OAuth token"
  type        = string
  sensitive = true
}

variable "yc_state_bucket_access_key" {
  description = "Yandex Cloud State (.tfstate) Bucket Access Key"
  type        = string
  sensitive = true
}

variable "yc_state_bucket_secret_access_key" {
  description = "Yandex Cloud State (.tfstate) Bucket Secret Access Key"
  type        = string
  sensitive = true
}

variable "yc_cloud_id" {
  description = "Yandex Cloud ID"
  type        = string
}

variable "yc_folder_id" {
  description = "Yandex Folder ID"
  type        = string
}

variable "yc_subnet_id" {
  description = "Yandex Subnet ID"
  type        = string
}

variable "yc_compute_image_id" {
  description = "Yandex Compute Instance Image ID"
  type        = string
}
