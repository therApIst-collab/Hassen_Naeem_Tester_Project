# HIPAA-Compliant GCP Proof-of-Concept

This project demonstrates a HIPAA-ready cloud setup on Google Cloud Platform (GCP) using Terraform, Secret Manager, KMS, Cloud Run, and a Node.js API stub.

---

## 🚀 Features

- **Infrastructure as Code:** All GCP resources are provisioned with Terraform.
- **KMS & Secret Manager:** Secrets are encrypted with customer-managed keys.
- **Service Account Security:** Least-privilege access for automation and runtime.
- **Stub API:** Simple Node.js API deployed to Cloud Run.
- **Manual CI/CD:** Cloud Build and `cloudbuild.yaml` for automated builds and deploys.
- **Ready for HIPAA:** Follows GCP best practices for compliance.

---

## 🛠️ Setup Instructions

### 1. **Clone the Repository**
```sh
git clone https://github.com/<your-org-or-username>/<your-repo>.git
cd <your-repo>
```

---

### 2. **Provision Infrastructure with Terraform**
```sh
terraform init
terraform apply
```
This will:
- Enable required GCP APIs
- Create a KMS key ring and key
- Create a Secret Manager secret encrypted with CMEK
- Create a service account and grant it secret access

---

### 3. **Build and Deploy the API**

#### Build and Push Docker Image
```sh
cd api
docker build -t gcr.io/<your-gcp-project>/dev-api .
gcloud auth configure-docker
docker push gcr.io/<your-gcp-project>/dev-api
```

#### Deploy to Cloud Run
```sh
gcloud run deploy dev-api \
  --image gcr.io/<your-gcp-project>/dev-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --project <your-gcp-project>
```

---

### 4. **Test the API**

Get your Cloud Run URL from the GCP Console or CLI, then:
```sh
curl https://<your-cloud-run-url>/auth/login
```

---

### 5. **Test Secret Manager**
```sh
gcloud secrets versions access latest --secret=DB_URI --project=<your-gcp-project>
```

---

### 6. **Manual CI/CD with Cloud Build**
```sh
gcloud builds submit --config cloudbuild.yaml .
```

---

### 7. **Service Account Permissions (if needed)**
```sh
gcloud projects add-iam-policy-binding <your-gcp-project> \
  --member="serviceAccount:svc-devops@<your-gcp-project>.iam.gserviceaccount.com" \
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding <your-gcp-project> \
  --member="serviceAccount:svc-devops@<your-gcp-project>.iam.gserviceaccount.com" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding <your-gcp-project> \
  --member="serviceAccount:svc-devops@<your-gcp-project>.iam.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

### 8. **GCP Project Configuration**
```sh
gcloud config set project <your-gcp-project>
gcloud auth application-default set-quota-project <your-gcp-project>
```

---

### 9. **Create a GCS Bucket for Logs (if needed)**
```sh
gsutil mb -l us-central1 gs://your-build-logs-bucket
```

---

### 10. **Get Project Number**
```sh
gcloud projects describe <your-gcp-project> --format='value(projectNumber)'
```

---

## 📁 Project Structure

```
.
├── api/                # Node.js API stub (Dockerized)
├── main.tf             # Terraform infrastructure
├── cloudbuild.yaml     # Cloud Build pipeline
├── .gitignore
└── README.md
```

---

## 🛡️ HIPAA Compliance Notes

- All secrets are encrypted with customer-managed keys (CMEK).
- Service accounts follow least-privilege principle.
- All actions are auditable via GCP logs.
- For production HIPAA workloads, ensure a BAA with Google and review all GCP security best practices.

---

## 📝 License

MIT

---

## 🙋 Need Help?

Open an issue or contact the project maintainer.