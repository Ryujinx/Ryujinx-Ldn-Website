{ pkgs ? (import <nixpkgs> {})}:
with pkgs;
with (import (fetchFromGitHub {
  owner = "TSRBerry";
  repo = "pnpm2nix";
  rev = "v0.2";
  sha256 = "1az22kj0q37xgwi47zjyimwvqn1a5spx60mf30aya7s63x0r8xzc";
}) { inherit pkgs; });


let

  buildPackage = mkPnpmPackage {
    src = nix-gitignore.gitignoreSource [] ./.;

    linkDevDependencies = true;

    postBuild = ''
      cp -R "node_modules/$pname"/* ./

      export PATH="node_modules/.bin:$PATH"

      mkdir -p "$out/dist"

      npm run build -- --outDir "$out/dist"
      mv public package.json pnpm-lock.yaml "$out/"
    '';

    postInstall = ''
      rm -rf "$out/bin" "$lib/node_modules/$pname"
    '';
  };

  package = mkPnpmPackage {
    src = buildPackage;

    postInstall = ''
      mv "$lib/node_modules/$pname/dist" "$lib/node_modules/$pname/public" "$lib/node_modules/$pname/package.json" "$out/"
      rm -rf "$lib/node_modules/$pname"

      ln -s "$lib/node_modules" "$out/node_modules"
      ln -s "$npm_config_nodedir/bin/node" "$out/bin/node"
    '';
  };

in package
