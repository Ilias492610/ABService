import row from "./google-review-diagnostics-history.json" with {type:"json"};

export function beforeGoogleReviewDiagnosticsBytes(bytes,path) {
  if(path!==row.path)return bytes;
  let source=bytes.toString("utf8");
  for(const {before,after} of row.changes)if(source.split(after).length===2)source=source.replace(after,before);
  return Buffer.from(source);
}
