#!/usr/bin/env bash
# Pre-deploy gate: deploy to a Vercel PREVIEW, assert on it, and only promote to
# production if the assertions pass.
#
# Everything else built for this catches defects AFTER they are live. Four rendering
# bugs shipped and survived for months precisely because nothing looked at the rendered
# output before it reached users.
#
# Usage: ./predeploy-check.sh          (gate, then prompt to promote)
#        ./predeploy-check.sh --promote (gate, then promote automatically on pass)
set -euo pipefail

CHECKER="$HOME/claudebackup/delta-labs-ecosystem/worker/_site-integrity.cjs"
cd "$(dirname "$0")"

echo "==> deploying preview"
PREVIEW=$(vercel deploy --yes --archive=tgz 2>/dev/null | grep -Eo 'https://[a-z0-9-]+\.vercel\.app' | tail -1)
[ -z "$PREVIEW" ] && { echo "FATAL: no preview URL returned"; exit 2; }
echo "    $PREVIEW"

# Vercel preview protection returns 401 to unauthenticated fetches. If that is on, the
# gate cannot see the preview and must say so rather than passing silently.
# Protection shows up as 401/403 OR as a 302 to Vercel SSO. Checking only for 401 missed
# the redirect form and the gate then failed with a confusing "sitemap returned no URLs".
CODE=$(curl -s -o /dev/null -w '%{http_code}' -m 30 "$PREVIEW")
LOC=$(curl -s -o /dev/null -w '%{redirect_url}' -m 30 "$PREVIEW")
if [ "$CODE" = "401" ] || [ "$CODE" = "403" ] || [[ "$LOC" == *"vercel.com"* ]] || [[ "$CODE" == 3* ]]; then
  echo "FATAL: preview returns $CODE${LOC:+ -> $LOC} (deployment protection is on)."
  echo "       Disable protection for previews, or use a protection-bypass token."
  echo "       NOT promoting: the gate could not actually check anything."
  exit 3
fi

echo "==> asserting against the preview"
if node "$CHECKER" --site "$PREVIEW"; then
  echo "==> PASS"
  if [ "${1:-}" = "--promote" ]; then
    echo "==> promoting to production"
    vercel deploy --prod --yes --archive=tgz
  else
    echo "    run: vercel deploy --prod --yes --archive=tgz"
  fi
else
  echo "==> FAIL: not promoting. Fix the findings above and re-run."
  exit 1
fi
