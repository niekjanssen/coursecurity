SANDBOXES=(
  "P"
  "Q"
  "R"
  "S"
  "T"
  "V"
  "W"
  "X"
  "Y"
  "Z"
)

for SANDBOX in "${SANDBOXES[@]}"; do
  cd $SANDBOX
  docker-compose down --remove-orphans
  cd ../
done
