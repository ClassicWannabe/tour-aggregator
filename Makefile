-include .env
export $(shell sed 's/=.*//' .env)

deploy-init:
	terraform -chdir=terraform init \
		-backend-config="access_key=${TF_VAR_yc_state_bucket_access_key}" \
		-backend-config="secret_key=${TF_VAR_yc_state_bucket_secret_access_key}"

deploy-plan:
	terraform -chdir=terraform plan

deploy-apply:
	terraform -chdir=terraform apply

deploy-apply-auto-approve:
	terraform -chdir=terraform apply -auto-approve