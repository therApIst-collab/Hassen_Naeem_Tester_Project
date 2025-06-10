provider "google" {
  project = "hassan-naeem-tester-project"
  region  = "us-central1"
}

variable "project_id" {
  default = "hassan-naeem-tester-project"
}

resource "google_project_service" "cloud_run" {
  service = "run.googleapis.com"
}
resource "google_project_service" "secret_manager" {
  service = "secretmanager.googleapis.com"
}
resource "google_project_service" "kms" {
  service = "cloudkms.googleapis.com"
}
resource "google_project_service" "cloud_build" {
  service = "cloudbuild.googleapis.com"
}
resource "google_project_service" "logging" {
  service = "logging.googleapis.com"
}
resource "google_project_service" "monitoring" {
  service = "monitoring.googleapis.com"
}
resource "google_project_service" "firestore" {
  service = "firestore.googleapis.com"
}
resource "google_service_account" "devops" {
  account_id   = "svc-devops"
  display_name = "DevOps Service Account"
}
resource "google_kms_key_ring" "therapist" {
  name     = "therapist-keys"
  location = "us-central1"
}

resource "google_kms_crypto_key" "db_key" {
  name            = "db-key"
  key_ring        = google_kms_key_ring.therapist.id
  rotation_period = "100000s"
}

resource "null_resource" "secretmanager_service_identity" {
  provisioner "local-exec" {
    command = "gcloud beta services identity create --service=secretmanager.googleapis.com --project=${var.project_id}"
  }
}

resource "google_kms_crypto_key_iam_member" "secretmanager" {
  crypto_key_id = google_kms_crypto_key.db_key.id
  role          = "roles/cloudkms.cryptoKeyEncrypterDecrypter"
  member        = "serviceAccount:service-1066458309314@gcp-sa-secretmanager.iam.gserviceaccount.com"
  depends_on    = [null_resource.secretmanager_service_identity]
}

resource "google_secret_manager_secret" "db_uri" {
  secret_id = "DB_URI"
  replication {
    user_managed {
      replicas {
        location = "us-central1"
        customer_managed_encryption {
          kms_key_name = google_kms_crypto_key.db_key.id
        }
      }
    }
  }
  depends_on = [google_kms_crypto_key_iam_member.secretmanager]
}

resource "google_secret_manager_secret_version" "db_uri_version" {
  secret      = google_secret_manager_secret.db_uri.id
  secret_data = "your-db-uri-here"
}