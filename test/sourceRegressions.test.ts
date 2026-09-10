import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import { describe, test } from "node:test";

const readSource = (relativePath: string) =>
  readFile(new URL(`../${relativePath}`, import.meta.url), "utf8");

describe("source regressions", () => {
  test("guards optional ring click handlers", async () => {
    const source = await readSource("src/stage0/3DComponents/Ring/Ring.tsx");
    assert.match(source, /typeof onClick === "function"/);
    assert.doesNotMatch(source, /onClick=\{\(\) => onClick\(\)\}/);
    assert.doesNotMatch(source, /groupRef\.current && pos\.x/);
  });

  test("stacks project technologies in one explicit grid column", async () => {
    const source = await readSource(
      "src/stage1/2DComponents/ProjectDisplay/ProjectDisplay.styles.ts"
    );
    assert.match(source, /grid-template-columns: 1fr/);
    assert.match(source, /grid-auto-flow: row/);
    assert.doesNotMatch(source, /min-max/);
  });

  test("does not use random React keys", async () => {
    const source = await readSource(
      "src/stage1/2DComponents/ProjectDisplay/ProjectDisplay.tsx"
    );
    assert.doesNotMatch(source, /key=\{[^}]*Math\.random/);
  });

  test("uses a guarded ref for the about timeline", async () => {
    const source = await readSource("src/stage3/Stage3Overlay.tsx");
    assert.match(source, /timelineRef\.current\?\.timeScale/);
    assert.doesNotMatch(source, /const timeline = useMemo/);
    assert.doesNotMatch(source, /window\.offsetInterval/);
  });

  test("provides semantic DOM controls and image alternatives", async () => {
    const [menuStyles, warning, projectDisplay] = await Promise.all([
      readSource("src/stage0/2DComponents/Menu/Menu.styles.ts"),
      readSource("src/stage0/2DComponents/Warning/Warning.tsx"),
      readSource(
        "src/stage1/2DComponents/ProjectDisplay/ProjectDisplay.tsx"
      ),
    ]);
    assert.match(menuStyles, /styled\.button/);
    assert.match(warning, /role="dialog"/);
    assert.match(projectDisplay, /alt=\{`Project/);
  });

  test("does not forward styling-only opacity flags to the DOM", async () => {
    const [footer, footerStyles, stageStyles] = await Promise.all([
      readSource("src/Footer/Footer.tsx"),
      readSource("src/Footer/Footer.styles.ts"),
      readSource("src/stage3/Stage3Overlay.styles.ts"),
    ]);

    assert.doesNotMatch(footer, /<FooterText\s+opacity/);
    assert.doesNotMatch(footerStyles, /opacity\?: boolean/);
    assert.doesNotMatch(stageStyles, /opacity\?: boolean/);
  });

  test("loads deferred stages through dynamic imports", async () => {
    const source = await readSource("src/App.tsx");
    assert.match(source, /import\("\.\/stage1\/Stage1"\)/);
    assert.match(source, /import\("\.\/stage2\/Stage2"\)/);
    assert.match(source, /import\("\.\/stage3\/Stage3Overlay"\)/);
    assert.doesNotMatch(source, /from "@react-three\/rapier"/);
  });

  test("starts the camera zoom from the loader reveal handoff", async () => {
    const [app, loader] = await Promise.all([
      readSource("src/App.tsx"),
      readSource("src/Loader/Loader.tsx"),
    ]);

    assert.match(loader, /dispatch\(startLoaderReveal\(\)\)/);
    assert.match(app, /if \(!isLoaderRevealing\) return undefined/);
    assert.match(app, /\}, \[isLoaderRevealing\]\);/);
  });

  test("animates the live chromatic effect when the inner ring is hovered", async () => {
    const [effects, ring, app] = await Promise.all([
      readSource("src/stage0/3DComponents/Effects/Effects.tsx"),
      readSource("src/stage0/3DComponents/Ring/Ring.tsx"),
      readSource("src/App.tsx"),
    ]);

    assert.match(effects, /ref=\{chromaticEffectRef\}/);
    assert.match(effects, /chromaticEffectRef\.current\?\.offset/);
    assert.match(effects, /x: isGlitch \? 0\.08 : 0\.0008/);
    assert.match(effects, /y: isGlitch \? 0\.08 : 0\.0008/);
    assert.doesNotMatch(effects, /gsap\.to\(initialOffset/);
    assert.match(ring, /handleGlitchDisk\(true\)/);
    assert.match(ring, /handleGlitchDisk\(false\)/);
    assert.match(app, /handleGlitchDisk=\{handleGlitchDisk\}[\s\S]*?scale=\{0\.5\}/);
    assert.match(app, /<Effects[\s\S]*?isGlitch=\{isGlitch\}/);
  });

  test("gives every contact-plane HTML portal the unclipped wrapper", async () => {
    const source = await readSource(
      "src/stage2/3DComponents/Cube/Side.tsx"
    );
    const htmlOpenings = source.match(/<Html\b[\s\S]*?(?=>)/g) ?? [];

    assert.equal(htmlOpenings.length, 10);
    for (const opening of htmlOpenings) {
      assert.match(opening, /wrapperClass="cubeHTML"/);
    }
  });

  test("exempts only the generated contact-plane layers from global clipping", async () => {
    const styles = await readSource(
      "src/stage2/3DComponents/Cube/html.css"
    );

    assert.match(
      styles,
      /\.cubeHTML,\s*\.cubeHTML > div,\s*\.cubeHTML > div > div\s*\{\s*overflow: visible !important;/
    );
    assert.doesNotMatch(styles, /\.cubeHTML\s+\*/);

    const inputRule = styles.match(/\.input\s*\{([^}]*)\}/)?.[1];
    const textareaRule = styles.match(/\.textarea\s*\{([^}]*)\}/)?.[1];
    assert.match(inputRule ?? "", /overflow: auto/);
    assert.match(textareaRule ?? "", /overflow: auto/);
  });

  test("renders the message field with one outer frame", async () => {
    const [source, styles] = await Promise.all([
      readSource("src/stage2/3DComponents/Cube/Side.tsx"),
      readSource("src/stage2/3DComponents/Cube/html.css"),
    ]);
    const textareaClasses = source.match(/className="textarea"/g) ?? [];
    const messageFieldClasses = source.match(/className="message-field"/g) ?? [];
    const textareaRule = styles.match(/\.textarea\s*\{([^}]*)\}/)?.[1] ?? "";

    assert.equal(textareaClasses.length, 1);
    assert.equal(messageFieldClasses.length, 1);
    assert.match(styles, /\.message-field\s*\{[^}]*border: 2px solid black;/s);
    assert.match(styles, /\.message-field:focus-within/);
    assert.match(textareaRule, /box-sizing: border-box/);
    assert.match(textareaRule, /border: none/);
    assert.match(textareaRule, /outline: none/);
    assert.match(styles, /\.textarea:focus\s*\{/);
    assert.doesNotMatch(styles, /\.textarea:focus-within/);
  });

  test("renders message text at double resolution inside the 3D transform", async () => {
    const [source, styles] = await Promise.all([
      readSource("src/stage2/3DComponents/Cube/Side.tsx"),
      readSource("src/stage2/3DComponents/Cube/html.css"),
    ]);
    const textareaRule = styles.match(/\.textarea\s*\{([^}]*)\}/)?.[1] ?? "";
    const focusRule = styles.match(/\.textarea:focus\s*\{([^}]*)\}/)?.[1] ?? "";
    const messagePortal = source.match(
      /position=\{\[0, -0\.3, -1\]\}[\s\S]*?<\/Html>/
    )?.[0] ?? "";

    assert.match(messagePortal, /scale=\{5\}/);
    assert.match(styles, /\.message-field\s*\{[^}]*width: 210px;/s);
    assert.match(textareaRule, /font-size: 24px/);
    assert.match(focusRule, /min-height: 120px/);
    assert.doesNotMatch(focusRule, /font-size:/);
  });

  test("latches the hidden contact UI through the phase-five hover zoom", async () => {
    const [source, app] = await Promise.all([
      readSource("src/stage2/3DComponents/Cube/Side.tsx"),
      readSource("src/App.tsx"),
    ]);

    assert.match(source, /if \(!html\) return undefined/);
    assert.match(source, /const timer = setTimeout\(\(\) => setIsHTML\(true\), 1000\)/);
    assert.match(source, /return \(\) => clearTimeout\(timer\)/);
    assert.doesNotMatch(source, /setIsHTML\(false\)/);
    assert.match(source, /isHTML && contactPhase !== 4/);
    assert.match(source, /onPointerEnter=\{\(\) => dispatch\(setContactCount\(5\)\)\}/);
    assert.match(app, /5: \{ x: 19, y: 4, z: -17, duration: 1\.5 \}/);
  });

  test("documents contact configuration without committing a real key", async () => {
    const [example, readme] = await Promise.all([
      readSource(".env.example"),
      readSource("readme.md"),
    ]);
    assert.match(example, /VITE_EMAIL_KEY=your_emailjs_public_key/);
    assert.match(readme, /VITE_EMAIL_KEY/);
  });

  test("declares directly imported packages", async () => {
    const packageJson = JSON.parse(await readSource("package.json")) as {
      dependencies: Record<string, string>;
      devDependencies: Record<string, string>;
      engines: { node: string };
      packageManager: string;
      scripts: Record<string, string>;
    };
    assert.ok(packageJson.dependencies["@emotion/react"]);
    assert.ok(packageJson.dependencies.postprocessing);
    assert.ok(packageJson.devDependencies.typescript);
    assert.ok(packageJson.devDependencies.tsx);
    assert.equal(packageJson.packageManager, "yarn@1.22.22");
    assert.equal(packageJson.engines.node, "^20.19.0 || ^22.13.0 || >=24");
    assert.match(packageJson.scripts.test, /^tsx --test/);
    assert.equal(packageJson.scripts.lint, "eslint . --max-warnings 0");
    assert.equal(packageJson.scripts.postinstall, "husky");
    assert.equal(
      packageJson.scripts.validate,
      "yarn lint && yarn typecheck && yarn test && yarn build"
    );
  });

  test("runs every repository quality gate before commits", async () => {
    const [hook, eslintConfig] = await Promise.all([
      readSource(".husky/pre-commit"),
      readSource("eslint.config.mjs"),
    ]);

    assert.equal(hook.trim(), "yarn validate");
    assert.match(eslintConfig, /recommendedTypeChecked/);
    assert.match(eslintConfig, /"react-hooks\/rules-of-hooks": "error"/);
    assert.match(eslintConfig, /"react-hooks\/exhaustive-deps": "error"/);
    assert.match(eslintConfig, /"react-refresh\/only-export-components"/);
    assert.match(eslintConfig, /projectService: true/);
  });

  test("contains no JavaScript source or test modules", async () => {
    const root = new URL("../", import.meta.url);
    const [sourceFiles, testFiles] = await Promise.all([
      readdir(new URL("src/", root), { recursive: true }),
      readdir(new URL("test/", root), { recursive: true }),
    ]);
    const legacyModules = [...sourceFiles, ...testFiles].filter((file) =>
      /\.(?:js|jsx)$/.test(file)
    );

    assert.deepEqual(legacyModules, []);
  });

  test("uses strict TypeScript and Yarn-only project metadata", async () => {
    const [tsconfigSource, lockfile, indexSource, viteConfig] =
      await Promise.all([
      readSource("tsconfig.json"),
      readSource("yarn.lock"),
      readSource("index.html"),
        readSource("vite.config.ts"),
      ]);
    const tsconfig = JSON.parse(tsconfigSource) as {
      compilerOptions: { allowJs: boolean; strict: boolean };
    };

    assert.equal(tsconfig.compilerOptions.strict, true);
    assert.equal(tsconfig.compilerOptions.allowJs, false);
    assert.match(lockfile, /yarn lockfile v1/);
    assert.match(indexSource, /src\/main\.tsx/);
    for (const singleton of [
      "react",
      "react-dom",
      "three",
      "@react-three/fiber",
    ]) {
      assert.match(viteConfig, new RegExp(`"${singleton}"`));
    }
    await assert.rejects(access(new URL("../package-lock.json", import.meta.url)));
  });
});
