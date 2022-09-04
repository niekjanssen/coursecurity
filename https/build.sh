#CA CERT
#openssl ecparam -out coursecurity.key -name prime256v1 -genkey
#openssl req -new -sha256 -key coursecurity.key -out coursecurity.csr -config coursecurity.cnf
#openssl x509 -req -sha256 -days 365 -in coursecurity.csr -signkey coursecurity.key -out coursecurity.crt
# docker run -it --rm -v "C:\Users\jcdal\OneDrive\Software Design\Master Thesis\ITSecAwareness\platform\https:/openssl-certs" securefab/openssl
openssl ecparam -out sharedot.key -name prime256v1 -genkey
openssl req -new -sha256 -key sharedot.key -out sharedot.csr -config sharedot.cnf
openssl x509 -req -in sharedot.csr -CA coursecurity.crt -CAkey coursecurity.key -CAcreateserial -out sharedot.crt -days 365 -sha256 -extensions req_ext -extfile sharedot.cnf

