# md2multihtml

This tool converts a single big markdown document to seperate HTML files.
The document is split by first-level sections.
The program creates a navigation bar, displays the document structure as tree graph and takes care of inline links across the document sections.

See a detailed description in [description.md](description.md).

## Usage

It will generate HTML files in the specified output folder (defaults to `html/`).

```
node md2multihtml.js -i <inputfile>
```

### Arguments
* `-o <inputfile>`: process the markdown file `<inputfile>`
* `-o <outputdir>`: set the output directory to `<outputdir>`
* `--delete-outdir=true` or `-d`: delete **(!)** and recreate the whole output dir before processing. **BE CAREFUL WHEN USING THIS!**



## License
Code released under the [MIT license](https://opensource.org/licenses/MIT).