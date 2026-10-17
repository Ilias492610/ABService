import manifest from '../fixtures/dutch-route-source-manifest.json' with {type:'json'};
const paths=new Map(manifest.map(({from,to})=>[from,to]));
// This explicit test-source map never rewrites public URLs or unknown files.
export const resolveRouteSourcePath=path=>paths.get(path)??path;
export const restoreMovedRootImport=(source,path)=>path==='app/layout.js'
  ? source.replace('import "../globals.css";','import "./globals.css";') : source;
