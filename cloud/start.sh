if [ -z "$1" ]
  then
    SANDBOXES=(
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
      docker-compose up -d
      cd ../
    done
  else
    cd $1
    docker-compose up -d
fi
