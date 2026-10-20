#!/bin/bash
# uso: publicar.sh <pasta> <bucket> <distribuicao>
export AWS_PROFILE=genesis
R="$1"; BK="$2"; D="$3"
EX=(--exclude ".git/*" --exclude ".gitignore" --exclude "README.md" --exclude "LICENSE" --exclude ".DS_Store" --exclude "marca/*")
aws s3 sync "$R/" "s3://$BK/" --delete "${EX[@]}" --exclude "*.html" --cache-control "public, max-age=604800" --cli-connect-timeout 5 --only-show-errors
aws s3 sync "$R/" "s3://$BK/" "${EX[@]}" --exclude "*" --include "*.html" --cache-control "public, max-age=60" --content-type "text/html; charset=utf-8" --cli-connect-timeout 5 --only-show-errors
for p in politica-de-privacidade termos-de-uso; do
  [ -f "$R/$p.html" ] && aws s3 cp "$R/$p.html" "s3://$BK/$p" --cache-control "public, max-age=60" --content-type "text/html; charset=utf-8" --cli-connect-timeout 5 --only-show-errors
done
aws cloudfront create-invalidation --distribution-id "$D" --paths "/*" --cli-connect-timeout 5 --query "Invalidation.Id" --output text
