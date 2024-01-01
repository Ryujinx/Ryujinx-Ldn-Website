{ pkgs ? (import <nixpkgs> {})}:
with pkgs;
let

  package = buildNpmPackage {
    pname = "ryujinx-ldn-website";
    version = "1.0.0";

    #linkDevDependencies = true;

    src = ./.;

    npmBuildScript = "release";
    npmBuildFlags = [ "--" "--outDir" "dist" ];
    installPhase = ''
      runHook preInstall
      cp -r dist $out/
      cp -r public package.json package-lock.json node_modules $out/

      makeWrapper '${nodejs}/bin/node' "$out/bin/ryujinx-ldn-website" --add-flags "$out/index.js"

      runHook postInstall
    '';

    npmDepsHash = "sha256-Wo4dGsUAZwXbkuWwTKNA5kv4ZUnekdKm/TagP4Q4Ds8=";
  };

in package
