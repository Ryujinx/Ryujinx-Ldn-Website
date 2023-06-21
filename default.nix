{ pkgs ? (import <nixpkgs> {})}:
with pkgs;
with (import (fetchFromGitHub {
  owner = "TSRBerry";
  repo = "pnpm2nix";
  rev = "v0.1";
  sha256 = "0vyxcqhdazr17hym4fgh8dqq97lplmp5fmpwmdq2xk73mw060nvq";
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
      rm -rf "$out/bin" "$lib/node_modules/$pname"

      ln -s "$lib/node_modules" "$out/node_modules"
    '';
  };

in package
